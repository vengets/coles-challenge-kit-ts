import { Transform, TransformCallback } from 'stream';
import { log } from '../helper/logger';

const logger = log.getChildLogger({ name: 'SummaryGroupingStream' });

export class SummaryGroupingStream extends Transform {
  customerId: string = '';
  rowCount: number = 0;
  totalRows = 0;

  constructor(totalRows: number) {
    super();
    logger.info(`Total rows to be processed: ${totalRows}`);
    this.totalRows = totalRows;
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    let data = chunk.toString();
    let index = data.indexOf(',');
    let customerId = data.substring(0, index);
    let product = data.substring(index + 1);
    product = product.replaceAll('"', '\\"');
    product = `"${product}"`;
    this.rowCount++;
    logger.debug(`Processing row:#${this.rowCount} for ${customerId} & ${product}`);
    if (customerId == 'customerId') {
      if(this.totalRows == 1) {
        callback(null, '[]')
      } else {
        callback(null, '[');
      }
    } else if (this.customerId != customerId) {
      this.customerId = customerId;
      switch (this.rowCount) {
        case 2:
          callback(null, `{"customerId": ${customerId}, "products": [${product}`);
          break;
        case this.totalRows:
          callback(null, `]},\n{"customerId": ${customerId}, "products": [${product}]}]`);
          break;
        default:
          callback(null, `]},\n{"customerId": ${customerId}, "products": [${product}`);
      }
    } else {
      switch (this.rowCount) {
        case this.totalRows:
          callback(null, `,${product}]}]`);
          break;
        default:
          callback(null, `,${product}`);
      }
    }
  }
}
