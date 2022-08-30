import { Transform, TransformCallback } from 'stream';
import { log } from '../helper/logger';
import { IOrder } from '../type/order';
import { OrderHelper } from '../helper/order-helper';

const logger = log.getChildLogger({ name: 'OrdersCsvRowToProductOnlyRowStream' });

export class OrdersCsvRowToProductOnlyRowStream extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    logger.trace('OrdersCsvRowToProductOnlyRowStream -> transform');
    let order: IOrder = OrderHelper.parseOrderFromCSV(chunk.toString());
    if(order.product == 'product') {
      callback();
    } else {
      callback(null, order.product + '\n');
    }
  }
}
