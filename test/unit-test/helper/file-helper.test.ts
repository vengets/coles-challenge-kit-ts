import { FileUtil } from '../../utils/file-util';
import { FileHelper } from '../../../src/helper/file-helper';
import * as path from 'path';
import { ReadStreamHelper } from '../../../src/helper/read-stream-helper';
import { pipeline } from "stream";
import { promisify } from 'util';
import { WriteStreamHelper } from '../../../src/helper/write-stream-helper';
const pipelineAsync = promisify(pipeline);
describe('FileHelper class tests', () => {
  describe('getLineCount() test', () => {
    let csvFilePath = path.join(__dirname, '../../data/unordered.csv');
    let testFilePath = path.join(__dirname, '../../data/test.txt');
    async function invokeMethod(fileName: string) {
      return await FileHelper.getLineCount(fileName);
    }

    it('should return line count correctly', async () => {
      let contents = '1\n2\n3\n';
      FileUtil.writeToFile(csvFilePath, contents);
      FileUtil.writeToFile(testFilePath, '');
      let readStream = ReadStreamHelper.getReadStream(csvFilePath);
      let writeStream = WriteStreamHelper.getWriteStream(testFilePath);
      await pipelineAsync(
        readStream,
        writeStream
      );
      let count = await invokeMethod(testFilePath);
        expect(count).toEqual(3);
    });

    it('should return line count for empty file as 0', async () => {
      let contents = '';
      await FileUtil.writeToFile(testFilePath, contents);
      let count = await invokeMethod(testFilePath);
      expect(count).toEqual(0);
    });
  });
});
