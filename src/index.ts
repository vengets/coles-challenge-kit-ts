import { CustomerOrderGroupingJob } from './jobs/customer-order-grouping-job';
import dotenv from 'dotenv';

if(!dotenv.config()) {
  throw new Error('Unable to initialize environment configuration!');
}

const ORDERS_CSV_PATH: string = process.env.ORDERS_CSV_PATH || './data/Orders.csv';
const SUMMARY_OUTPUT_PATH: string = process.env.SUMMARY_OUTPUT_PATH || './output/summaries/GroupedOrders.json';

const main = () => {
  let job = new CustomerOrderGroupingJob(ORDERS_CSV_PATH, SUMMARY_OUTPUT_PATH);
  job.run();
};

main();
