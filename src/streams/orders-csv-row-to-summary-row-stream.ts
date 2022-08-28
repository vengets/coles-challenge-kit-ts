import { Transform, TransformCallback } from 'stream';
import { IOrder } from '../type/order';
import { OrderHelper } from '../helper/order-helper';
import { log } from '../helper/logger';

const logger = log.getChildLogger({ name: 'OrdersCsvRowToSummaryRowStream' });

export class OrdersCsvRowToSummaryRowStream extends Transform {

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    logger.trace(`OrdersCsvRowToSummaryRowStream -> transform`);
    let order: IOrder = OrderHelper.parseOrderFromCSV(chunk.toString());
    callback(null,order.customerId+','+order.product+'\n');
  }

}
