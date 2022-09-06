import { Job } from './job';
import { ReadStreamHelper } from '../helper/read-stream-helper';
import { log } from '../helper/logger';
import { OrdersWithCustomerIdStream } from '../streams/orders-with-customerId-stream';
import { OrdersCsvRowToSummaryRowStream } from '../streams/orders-csv-row-to-summary-row-stream';
import { WriteStreamHelper } from '../helper/write-stream-helper';
import { pipeline } from 'stream';
import { SummaryGroupingStream } from '../streams/summary-grouping-stream';
import { FileHelper } from '../helper/file-helper';
import { PopulateProductCountStream } from '../streams/populate-product-count-stream';
import { LineCountStream } from '../streams/line-count-stream';

const es = require('event-stream');
const { promisify } = require('util');
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
    let removeExcessFields = new OrdersCsvRowToSummaryRowStream();
    let writeToSummaryFile = WriteStreamHelper.getWriteStream(this.summaryFilePath);
    let countLines = new LineCountStream();
    LineCountStream.numberOfLines = 0;

    await pipelineAsync(
      ReadStreamHelper
        .getReadStream(this.orderFilePath),
      es.split(),
      getOrdersWithCustomerId,
      removeExcessFields,
      writeToSummaryFile
    );

    FileHelper.sortFile(this.summaryFilePath);

    await new Promise(process.nextTick);
    let fileLines = await FileHelper.getLineCount(this.summaryFilePath);
    fileLines = await FileHelper.getLineCount(this.summaryFilePath);
    let summaryGrouping = new SummaryGroupingStream(fileLines+1);
    let writeToBufferFile = WriteStreamHelper.getWriteStream(BUFFER_FILE_PATH);
    LineCountStream.numberOfLines = 0;
    countLines = new LineCountStream();
    await pipelineAsync(
      ReadStreamHelper
        .getReadStream(this.summaryFilePath),
      es.split(),
      summaryGrouping,
      countLines,
      writeToBufferFile
    );

    FileHelper.amendFile(BUFFER_FILE_PATH, ']}]');

    fileLines = await FileHelper.getLineCount(BUFFER_FILE_PATH);
    let populateCount = new PopulateProductCountStream(fileLines+1);
    writeToSummaryFile = WriteStreamHelper.getWriteStream(this.summaryFilePath);

    await pipelineAsync(
      ReadStreamHelper
        .getReadStream(BUFFER_FILE_PATH),
      es.split(),
      populateCount,
      writeToSummaryFile,
    );

    return false;
  }

}
