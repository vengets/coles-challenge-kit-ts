import { createReadStream, ReadStream } from 'fs';
import { log } from '../helper/logger';
const logger = log.getChildLogger({ name: 'ReadStreamHelper' });
export class ReadStreamHelper {

  public static getReadStream(fileName: string): ReadStream {
    let readStream = createReadStream(fileName, {
      highWaterMark: parseInt(process.env.READ_STREAM_HIGH_WATER_MARK || '128' )
    });
    readStream.on('error', (e) => {
      logger.error(e.message);
    });

    return readStream;
  }

}
