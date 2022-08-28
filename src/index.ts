import { CustomerOrderSummaryJob } from './jobs/customer-order-summary-job';
import dotenv from 'dotenv';
import { CsvHelper } from './helper/csv-helper';

if(!dotenv.config()) {
  throw new Error('Unable to initialize environment configuration!');
}

const ORDERS_CSV_PATH: string = process.env.ORDERS_CSV_PATH || './data/Orders.csv';
const SUMMARY_OUTPUT_PATH: string = process.env.SUMMARY_OUTPUT_PATH || './output/summaries/GroupedOrders.json';
const BUFFER_FILE_PATH: string = process.env.BUFFER_FILE_PATH || './output/summaries/buffer.json';

const main = async () => {
  let job = new CustomerOrderSummaryJob(ORDERS_CSV_PATH, SUMMARY_OUTPUT_PATH);
  await job.run();
  await CsvHelper.sortCSV(SUMMARY_OUTPUT_PATH, BUFFER_FILE_PATH, 1);
};

main();
