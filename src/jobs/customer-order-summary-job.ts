import { Job } from './job';
import { ReadStreamHelper } from '../helper/read-stream-helper';
const es = require('event-stream');
import { log } from '../helper/logger';
import { OrdersWithCustomerIdStream } from '../streams/orders-with-customerId-stream';
import { OrdersCsvRowToSummaryRowStream } from '../streams/orders-csv-row-to-summary-row-stream';
import { WriteStreamHelper } from '../helper/write-stream-helper';
import { CsvHelper } from '../helper/csv-helper';

const { promisify } = require('util');
import { pipeline } from 'stream';
import { SummaryGroupingStream } from '../streams/summary-grouping-stream';
import { FileHelper } from '../helper/file-helper';

const pipelineAsync = promisify(pipeline);

const logger = log.getChildLogger({ name: 'CustomerOrderGroupingJob' });
const BUFFER_FILE_PATH: string = process.env.BUFFER_FILE_PATH || './output/summaries/buffer.csv';
export class CustomerOrderSummaryJob extends Job {
  orderFilePath: string;
  summaryFilePath: string;

  constructor(orderFilePath: string, summaryFilePath: string) {
    logger.info(`CustomerOrderGroupingJob created. Orders from [${orderFilePath}] -> Transforms to -> summary to [${summaryFilePath}]`);
    super();
    this.orderFilePath = orderFilePath;
    this.summaryFilePath = summaryFilePath;
  }

  async run() {
    logger.info('Starting to execute CustomerOrderGroupingJob');
    let getOrdersWithCustomerId = new OrdersWithCustomerIdStream();
    let convertCSVToJSON = new OrdersCsvRowToSummaryRowStream();
    let writeToSummaryFile = WriteStreamHelper.getWriteStream(this.summaryFilePath);

    await pipelineAsync(
      ReadStreamHelper
        .getReadStream(this.orderFilePath),
      es.split(),
      getOrdersWithCustomerId,
      convertCSVToJSON,
      writeToSummaryFile.on('finish', async () => {
        await CsvHelper.sortCSV(this.summaryFilePath, BUFFER_FILE_PATH, 1);
      })
    );

    let fileLines = await FileHelper.getLineCount(BUFFER_FILE_PATH);
    console.log(`========= ${fileLines}`);

    fileLines = await FileHelper.getLineCount(BUFFER_FILE_PATH);
    console.log(`========= ${fileLines}`);

    let summaryGrouping = new SummaryGroupingStream(fileLines);
    writeToSummaryFile = WriteStreamHelper.getWriteStream(this.summaryFilePath);

    await pipelineAsync(
      ReadStreamHelper
        .getReadStream(BUFFER_FILE_PATH),
      es.split(),
      summaryGrouping,
      writeToSummaryFile
        // .on('finish', () => {
        //   writeToSummaryFile = WriteStreamHelper.getAppendStream(this.summaryFilePath);
        //   writeToSummaryFile.write(']}]');
        //   writeToSummaryFile.close();
        // })
    );

    return false;
  }

}
