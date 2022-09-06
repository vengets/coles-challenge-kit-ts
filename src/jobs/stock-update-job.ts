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

export class StockUpdateJob extends Job {
  stockInputFilePath;
  ordersFilePath;
  stockOutputFilePath;

  constructor(stockInputFile: string, ordersFile: string, stockOutputFile: string) {
    super();
    this.stockInputFilePath = stockInputFile;
    this.stockOutputFilePath = stockOutputFile;
    this.ordersFilePath = ordersFile;
  }
  async run() {
    let ordersReadStream = ReadStreamHelper.getReadStream(this.ordersFilePath);
    let removeUnwantedFields = new OrdersCsvRowToProductOnlyRowStream();
    let updateRedisCache = new MockRedisCacheStream();

    await pipelineAsync(
      ordersReadStream,
      es.split(),
      removeUnwantedFields,
      updateRedisCache,
    );

    const XMLdata: string = fs.readFileSync(this.stockInputFilePath).toString();
    const jsonData: Stock = new XmlToJsonStream().transform(XMLdata);
    const updatedStock = new UpdateStockQuantityFromRedisStream().transform(jsonData);
    const xmlContent = new JsonToXmlStream().transform(updatedStock);
    fs.writeFileSync(this.stockOutputFilePath, xmlContent);
  }

}
