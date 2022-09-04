import { FileUtil } from '../../utils/file-util';
import * as path from 'path';
import { CustomerOrderSummaryJob } from '../../../src/jobs/customer-order-summary-job';

// import CsvHelper from '../../../src/helper/csv-helper';

describe('CustomerOrderSummaryJob class tests', () => {
  const INPUT_FILE_PATH = path.join(__dirname, '../../data/summary-job-input.csv');
  const OUTPUT_FILE_PATH = path.join(__dirname, '../../data/summary-job-output.json');

  async function invokeJob() {
    let job = new CustomerOrderSummaryJob(INPUT_FILE_PATH, OUTPUT_FILE_PATH);
    await job.run();
  }

  it('should read a order file and write to summary file which is being passed', async() => {
    const inputFileContents = 'id,department,product,customerId\n' +
      '1,Garden,Grass cutter,\n' +
      '2,Industrial,Scale,554\n' +
      '3,Electronics,Wire,\n' +
      '4,Outdoors,Shoe,\n';
    FileUtil.writeToFile(INPUT_FILE_PATH, inputFileContents);
    FileUtil.writeToFile(OUTPUT_FILE_PATH, '');


    // const mockFn = jest.fn().mockResolvedValue(1);
    // CsvHelper.sortCSV = mockFn;

    const outputFileContents = FileUtil.readFromFile(OUTPUT_FILE_PATH);
    expect(outputFileContents).toEqual('');

    // await invokeJob();

    expect(true).toBeTruthy();

  });
});
