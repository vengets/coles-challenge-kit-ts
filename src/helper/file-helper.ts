const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { log } from '../helper/logger';

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

}
