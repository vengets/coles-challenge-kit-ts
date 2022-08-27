import { Transform, TransformCallback } from 'stream';
import { IOrder } from '../type/order';
import { OrderHelper } from '../helper/order-helper';

export class OrdersCsvStringToJsonStringStream extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    let order: IOrder = OrderHelper.parseOrderFromCSV(chunk.toString());
    callback(null, JSON.stringify(order));
  }

}
