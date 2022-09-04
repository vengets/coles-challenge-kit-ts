const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { log } from './logger';
import { readFileSync, writeFileSync } from 'fs';

const logger = log.getChildLogger({ name: 'FileHelper' });

export class FileHelper {
  public static async getLineCount(fileName: string): Promise<number> {
    logger.debug(`Counting number of lines for ${fileName}`);
    let res = await exec(`wc ${fileName}`);
    return parseInt(res.stdout);
  };

  public static sortFile(fileName: string, hasHeaders = true) {
    logger.info(`Sorting the file contents: ${fileName}`);
    let contents: string[] = readFileSync(fileName,
      {encoding:'utf8', flag:'r'}).split('\n');
    let header = '';
    if(hasHeaders) {
      header = contents[0] + '\n';
      contents = contents.splice(1);
    }
    let filteredContents = contents.filter(c => c.length>0);
    filteredContents.sort();
    let sorted = header + filteredContents.join('\n');
    writeFileSync(fileName, sorted);
  }

  public static amendFile(fileName: string, contents: string) {
    writeFileSync(fileName, contents, {
      encoding: "utf8",
      flag: "a+",
      mode: 0o666
    })
  }
}
