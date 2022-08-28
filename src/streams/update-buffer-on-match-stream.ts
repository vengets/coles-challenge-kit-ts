import { Transform, TransformCallback } from 'stream';
import { SummaryBuffer } from '../helper/summary-buffer';

export class UpdateBufferOnMatchStream extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    let splitChunk = chunk.split(',');
    let orderId = splitChunk[0];
    let products = splitChunk[1];
    let bufferValue = SummaryBuffer.get(orderId);
    if(bufferValue) {
      let productArray = products.split(',');
      bufferValue.push(productArray);
      SummaryBuffer.set(orderId, bufferValue);
      //Not writing to a file, but to update the buffer.
      callback(null, null);
    } else {
      //Sending data to the pipe for updating the file
      callback(null, chunk);
    }

  }

}
