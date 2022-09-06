import { FileUtil } from '../../utils/file-util';
import * as path from 'path';
import { CustomerOrderSummaryJob } from '../../../src/jobs/customer-order-summary-job';
import { StockUpdateJob } from '../../../src/jobs/stock-update-job';

describe('StockUpdateJob class tests', () => {
  const INPUT_FILE_PATH = path.join(__dirname, '../../data/stock-update-job-input.xml');
  const OUTPUT_FILE_PATH = path.join(__dirname, '../../data/stock-update-job-output.xml');
  const ORDERS_FILE_PATH = path.join(__dirname, '../../data/stock-update-orders.csv');
  const EXPECTED_OUTPUT_FILE_PATH = path.join(__dirname, '../../data/stock-update-job-expected-output.xml');

  async function invokeJob() {
    let job = new StockUpdateJob(INPUT_FILE_PATH, ORDERS_FILE_PATH, OUTPUT_FILE_PATH);
    await job.run();
  }

  it('should read a stock file and write to summary file which is being passed', async() => {
    FileUtil.writeToFile(OUTPUT_FILE_PATH, '');

    const outputFileContents = FileUtil.readFromFile(OUTPUT_FILE_PATH);
    expect(outputFileContents).toEqual('');

    await invokeJob();

    const output = FileUtil.readFromFile(OUTPUT_FILE_PATH);
    const expectedOutput = FileUtil.readFromFile(EXPECTED_OUTPUT_FILE_PATH)
    expect(output).toEqual(expectedOutput);

  });
});
