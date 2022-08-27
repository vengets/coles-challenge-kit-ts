import { createWriteStream, WriteStream } from 'fs';
import { log } from '../helper/logger';
const logger = log.getChildLogger({ name: 'WriteStreamHelper' });

export class WriteStreamHelper {
  public static getWriteStream(fileName: string): WriteStream {
    let writeStream = createWriteStream(fileName);
    writeStream.on('error', (e) => {
      logger.error(e.message);
    });
    return writeStream;
  }
}
