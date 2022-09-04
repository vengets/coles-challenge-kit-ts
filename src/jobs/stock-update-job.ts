import { Job } from './job';
import { ReadStreamHelper } from '../helper/read-stream-helper';
import { pipeline } from 'stream';
import { OrdersCsvRowToProductOnlyRowStream } from '../streams/orders-csv-row-to-product-only-row-stream';
import { MockRedisCacheStream } from '../streams/mock-redis-cache-stream';
import * as fs from 'fs';
import { XmlToJsonStream } from '../streams/xml-to-json-stream';
import { Stock } from '../type/stock';
import { UpdateStockQuantityFromRedisStream } from '../streams/update-stock-quantity-from-redis-stream';
import { JsonToXmlStream } from '../streams/json-to-xml-stream';

const es = require('event-stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const STOCK_XML_FILE_PATH = process.env.STOCK_XML_FILE_PATH || './data/Stock.xml';
const ORDERS_CSV_PATH: string = process.env.ORDERS_CSV_PATH || './data/Orders.csv';
const STOCK_OUTPUT_PATH = process.env.STOCK_OUTPUT_PATH || './output/Stock.xml';

export class StockUpdateJob extends Job {
  async run() {
    let ordersReadStream = ReadStreamHelper.getReadStream(ORDERS_CSV_PATH);
    let removeUnwantedFields = new OrdersCsvRowToProductOnlyRowStream();
    let updateRedisCache = new MockRedisCacheStream();

    await pipelineAsync(
      ordersReadStream,
      es.split(),
      removeUnwantedFields,
      updateRedisCache,
    );

    const XMLdata: string = fs.readFileSync(STOCK_XML_FILE_PATH).toString();
    const jsonData: Stock = new XmlToJsonStream().transform(XMLdata);
    const updatedStock = new UpdateStockQuantityFromRedisStream().transform(jsonData);
    const xmlContent = new JsonToXmlStream().transform(updatedStock);
    fs.writeFileSync(STOCK_OUTPUT_PATH, xmlContent);
  }

}
