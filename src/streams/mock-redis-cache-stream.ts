import { Transform, TransformCallback } from 'stream';
import { REDIS_CACHE } from '../helper/redis-helper';

export class MockRedisCacheStream extends Transform {

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    let key = chunk.toString();
    let count = 1;
    if(REDIS_CACHE?.has(key)) {
      count = (REDIS_CACHE?.get(key) || 0) + 1;
    }
    REDIS_CACHE?.set(key, count);
    callback();
  }
}
