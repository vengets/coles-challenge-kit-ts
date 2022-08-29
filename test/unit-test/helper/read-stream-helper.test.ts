import { ReadStreamHelper } from '../../../src/helper/read-stream-helper';
import path from 'path';
import { FileUtil } from '../../utils/file-util';

describe('ReadStreamHelper class tests', () => {
  describe('getReadStream()', () => {
    let testFilePath = path.join(__dirname, '../../data/test.txt');

    function invokeMethod(fileName: string) {
      return ReadStreamHelper.getReadStream(fileName);
    }

    it('should return file contents', () => {
      let data = '1,department,prod,custId';
      FileUtil.writeToFile(testFilePath, data);

      let fileStream = invokeMethod(testFilePath);

      fileStream.on('data', (chunk) => {
        expect(chunk).not.toBeNull();
        expect(chunk.toString).toEqual(data);
      });
    });

    it('should return file contents when file is empty', () => {
      let data = '';
      FileUtil.writeToFile(testFilePath, data);

      let fileStream = invokeMethod(testFilePath);

      fileStream.on('data', (chunk) => {
        expect(chunk).not.toBeNull();
        expect(chunk.toString).toEqual(data);
      });
    });

  });
});
