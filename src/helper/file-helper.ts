const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { log } from './logger';

const logger = log.getChildLogger({ name: 'FileHelper' });

export class FileHelper {
  public static async getLineCount(fileName: string): Promise<number> {
    logger.debug(`Counting number of lines for ${fileName}`);
    let res = await exec(`wc ${fileName}`);
    return parseInt(res.stdout);
  };

}
