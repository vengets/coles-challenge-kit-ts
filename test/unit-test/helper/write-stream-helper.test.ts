import { ReadStreamHelper } from '../../../src/helper/read-stream-helper';
import path from 'path';
import { FileUtil } from '../../utils/file-util';
import { WriteStreamHelper } from '../../../src/helper/write-stream-helper';
import { pipeline } from "stream";
import { promisify } from 'util';
const pipelineAsync = promisify(pipeline);
describe('WriteStreamHelper class tests', () => {
  describe('getWriteStream()', () => {
    let testFilePath = path.join(__dirname, '../../data/test.txt');
    let csvFilePath = path.join(__dirname, '../../data/unordered.csv');

    function invokeMethod(fileName: string) {
      return WriteStreamHelper.getWriteStream(fileName);
    }

    it('should write file contents', async () => {
      let data = '1,department,prod,custId';
      FileUtil.writeToFile(csvFilePath, data);
      FileUtil.writeToFile(testFilePath, '');

      let readStream = ReadStreamHelper.getReadStream(csvFilePath);
      let writeStream = invokeMethod(testFilePath);
      await pipelineAsync(
        readStream,
        writeStream
      );
      let fileContents = FileUtil.readFromFile(testFilePath);
      expect(fileContents).toEqual(data);
    });
  });
});
