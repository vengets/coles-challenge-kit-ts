import { CustomerOrderSummaryJob } from './jobs/customer-order-summary-job';
import dotenv from 'dotenv';
import { StockUpdateJob } from './jobs/stock-update-job';
import { Job } from './jobs/job';

const readline = require('readline-sync');
if (!dotenv.config()) {
  throw new Error('Unable to initialize environment configuration!');
}

const ORDERS_CSV_PATH: string = process.env.ORDERS_CSV_PATH || './data/Orders.csv';
const SUMMARY_OUTPUT_PATH: string = process.env.SUMMARY_OUTPUT_PATH || './output/summaries/GroupedOrders.json';

const main = async () => {
  let showChoice = true;
  while (showChoice) {
    console.log(`Choose your job: \n 1. Customer Order Grouping \n 2. Updating Stock \n Press 1 or 2 or any other key to exit.`);
    let choice = Number(readline.question());
    let job: Job;
    switch (choice) {
      case 1:
        job = new CustomerOrderSummaryJob(ORDERS_CSV_PATH, SUMMARY_OUTPUT_PATH);
        await job.run();
        break;
      case 2:
        job = new StockUpdateJob();
        await job.run();
        break;
      default:
        showChoice = false;
        break;
    }
  }
};

main();
