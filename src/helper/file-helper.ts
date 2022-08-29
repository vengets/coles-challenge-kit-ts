const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { log } from '../helper/logger';
import { createReadStream } from 'fs';

const logger = log.getChildLogger({ name: 'FileHelper' });

export class FileHelper {
  public static async getLineCount(fileName: string) {
    logger.debug(`Counting number of lines for ${fileName}`);
    let res = await exec(`wc ${fileName}`);
    let res1 = await exec(`wc ${fileName}`);
    if (res1 > res) {
      return parseInt(res1.stdout);
    }
    return parseInt(res.stdout);
  };

  public static async countFileLines(filePath: string) {
    return new Promise((resolve, reject) => {
      let lineCount = 0;
      createReadStream(filePath)
        .on('data', (buffer) => {
          // console.log(buffer);
          let idx = -1;
          lineCount--;
          do {
            idx = buffer.indexOf('\n');
            lineCount++;
          } while (idx !== -1);
        }).on('end', () => {
        resolve(lineCount);
      }).on('error', reject);
    });
  };

}
