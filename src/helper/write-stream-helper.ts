import { createWriteStream, WriteStream } from 'fs';
import { log } from '../helper/logger';
const logger = log.getChildLogger({ name: 'WriteStreamHelper' });

export class WriteStreamHelper {
  public static getWriteStream(fileName: string ): WriteStream {
    let writeStream = createWriteStream(fileName);
    writeStream.on('finish', () => {
      logger.info(`WriteStream done writing.`);
    });
    writeStream.on('error', (e) => {
      logger.error(e.message);
    });
    return writeStream;
  }

  public static getAppendStream(fileName: string): WriteStream {
    let writeStream = createWriteStream(fileName, { 'flags': 'a'});
    writeStream.on('finish', () => {
      logger.info(`WriteStream done writing.`);
    });
    writeStream.on('error', (e) => {
      logger.error(e.message);
    });
    return writeStream;
  }
}
