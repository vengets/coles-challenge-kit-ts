import { Job } from './job';
import { ReadStreamHelper } from '../helper/read-stream-helper';

const es = require('event-stream');
import { log } from '../helper/logger';
import { OrdersWithCustomerIdStream } from '../streams/orders-with-customerId-stream';
import { OrdersCsvStringToJsonStringStream } from '../streams/orders-csv-string-to-json-string-stream';
import { WriteStreamHelper } from '../helper/write-stream-helper';

const logger = log.getChildLogger({ name: 'CustomerOrderGroupingJob' });

export class CustomerOrderGroupingJob extends Job {
  orderFilePath: string;
  summaryFilePath: string;

  constructor(orderFilePath: string, summaryFilePath: string = './summaries/GroupedOrders.json') {
    logger.info(`CustomerOrderGroupingJob created. Orders from [${orderFilePath}] -> Transforms to -> summary to [${summaryFilePath}]`);
    super();
    this.orderFilePath = orderFilePath;
    this.summaryFilePath = summaryFilePath;
  }

  run(): boolean {
    logger.info('Starting to execute CustomerOrderGroupingJob');
    let getOrdersWithCustomerId = new OrdersWithCustomerIdStream();
    let convertCSVToJSON = new OrdersCsvStringToJsonStringStream();
    let writeToSummaryFile = WriteStreamHelper.getWriteStream(this.summaryFilePath);

    ReadStreamHelper
      .getReadStream(this.orderFilePath)
      .pipe(es.split())
      .pipe(getOrdersWithCustomerId)
      .pipe(convertCSVToJSON)
      .pipe(writeToSummaryFile);

    return false;
  }

}
