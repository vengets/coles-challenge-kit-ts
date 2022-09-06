import { FileHelper } from '../../../src/helper/file-helper';
import * as path from 'path';
import { FileUtil } from '../../utils/file-util';

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

  describe('sortFile() tests', () => {
    let sortInFilePath = path.join(__dirname, '../../data/sort-input.csv');
    function invokeFunction(fileName: string, hasHeader: boolean) {
      return FileHelper.sortFile(fileName, hasHeader);
    }

    it('should sort a file as expected without header', () => {
      FileUtil.writeToFile(sortInFilePath, '1\n3\n5\n4\n2\n');
      const ret = invokeFunction(sortInFilePath, false);
      const output = FileUtil.readFromFile(sortInFilePath)
      expect(output).toEqual("1\n2\n3\n4\n5");
    });

    it('should sort a file as expected with header', () => {
      FileUtil.writeToFile(sortInFilePath, 'items\n1\n3\n5\n4\n2\n');
      const ret = invokeFunction(sortInFilePath, true);
      const output = FileUtil.readFromFile(sortInFilePath)
      expect(output).toEqual("items\n1\n2\n3\n4\n5");
    });

  });
});
