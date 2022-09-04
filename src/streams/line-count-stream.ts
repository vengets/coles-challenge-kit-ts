import { Transform, TransformCallback } from 'stream';
import { log } from '../helper/logger';
const logger = log.getChildLogger({ name: 'LineCountStream' });
export class LineCountStream extends Transform {
  static numberOfLines = 0;

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    if(chunk!=null || chunk.toString().trim().length<1)
      LineCountStream.numberOfLines++;
    callback(null, chunk.toString());
  }

  _final(callback: (error?: (Error | null)) => void) {
    logger.info(`Total number of lines = ${LineCountStream.numberOfLines}`);
    super._final(callback);
  }
}
