import { ReadStreamHelper } from '../../../src/helper/read-stream-helper';
import path from 'path';
import { FileUtil } from '../../utils/file-util';
import { createWriteStream, ReadStream } from 'fs';
import { promisify } from "util";
import { pipeline } from "stream";
const pipelineAsync = promisify(pipeline);
describe('ReadStreamHelper class tests', () => {
  describe('getReadStream()', () => {
    let testFilePath = path.join(__dirname, '../../data/ReadStreamHelper.txt');

    function invokeMethod(fileName: string) {
      return ReadStreamHelper.getReadStream(fileName);
    }

    it('should return file contents', async () => {
      let data = ['1,department,prod,custId'];
      let writeStream = createWriteStream(testFilePath);
      await pipelineAsync (
        ReadStream.from(data),
        writeStream
          .on('close', () => {
            let fileStream = invokeMethod(testFilePath);

            fileStream.on('data', (chunk) => {
              expect(chunk).not.toBeNull();
              expect(chunk.toString()).toEqual(data[0]);
            });
          })
      );
    });

    it('should return file contents when file is empty', () => {
      let data = '';
      FileUtil.writeToFile(testFilePath, data);
      let fileStream = invokeMethod(testFilePath);
      fileStream.on('data', (chunk) => {
        expect(chunk).not.toBeNull();
        expect(chunk.toString()).toEqual(data);
      });
    });

  });
});
