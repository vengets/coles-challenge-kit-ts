import { Transform, TransformCallback } from 'stream';
import { IOrder } from '../type/order';
import { OrderHelper } from '../helper/order-helper';
import { log } from '../helper/logger';

const logger = log.getChildLogger({ name: 'OrdersWithCustomerIdStream' });

export class OrdersWithCustomerIdStream extends Transform {

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {

    let val = chunk.toString().split(',');
    if (val[0] == 'id') {
      logger.debug(`Skipping the heading column`);
      callback(null, null);
    } else {
      let obj: IOrder = OrderHelper.parseOrderFromCSV(chunk.toString());
      if (obj.customerId) {
        logger.debug(`Passing the value to the pipe since it has customerId: [${chunk.toString()}]`);
        callback(null, chunk);
      } else {
        logger.debug(`Skipping the row [${chunk.toString()}]`);
        callback();
      }

    }

  }
}
