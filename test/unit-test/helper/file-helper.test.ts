import { FileHelper } from '../../../src/helper/file-helper';
import * as path from 'path';

describe('FileHelper class tests', () => {
  describe('getLineCount() test', () => {
    let testFilePath = path.join(__dirname, '../../data/getLineCountTest.txt');
    async function invokeMethod(fileName: string) {
      return await FileHelper.getLineCount(fileName);
    }

    it('should return line count correctly', async () => {
      let sourceCount = await invokeMethod(testFilePath);
      expect(sourceCount).toEqual(5);
    });
  });
});
