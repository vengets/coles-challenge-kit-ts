import { Transform, TransformCallback } from 'stream';
import { OrderHelper } from '../helper/order-helper';
import { SummaryBuffer } from '../helper/summary-buffer';
import { log } from '../helper/logger';

const logger = log.getChildLogger({ name: 'CreateSummaryItemStream' });
const SUMMARY_BUFFER_THRESHOLD = parseInt(process.env.SUMMARY_BUFFER_THRESHOLD || '10');

export class CreateSummaryItemStream extends Transform {
  constructor() {
    super();
    logger.info(`CreateSummaryItemStream uses SummaryBuffer of size ${SUMMARY_BUFFER_THRESHOLD}`)
  }
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {

    let order = OrderHelper.parseOrderFromCSV(chunk.toString());
    if(SummaryBuffer.getMapItemCount() < SUMMARY_BUFFER_THRESHOLD) {
      SummaryBuffer.set(Number(order.customerId), [order.product]);
    } else {
      // Call UpdateSummaryStream

    }

  }

}
