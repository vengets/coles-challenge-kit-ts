import { Transform, TransformCallback } from 'stream';
import { log } from '../helper/logger';
const logger = log.getChildLogger({ name: 'SummaryGroupingStream' });

export class SummaryGroupingStream extends Transform {
  static customerId: string = '';
  static rowCount: number = 0;
  totalRows = 0;
  constructor(totalRows: number) {
    super();
    logger.info(`Total rows to be processed: ${totalRows}`);
    this.totalRows = totalRows+1;
  }
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    let data = chunk.toString();
    let index = data.indexOf(',');
    let customerId = data.substring(0, index);
    let product = data.substring(index+1);
    if(product.indexOf('"') > -1) {
      logger.info(`Before Product = ${product}`);
    }
    product = product.replaceAll('"', "\\\"");
    if(product.indexOf('"') > -1) {
      logger.info(`After Product = ${product}`);
    }
    product = `"${product}"`;
    SummaryGroupingStream.rowCount++;
    logger.debug(`Processing row:#${SummaryGroupingStream.rowCount} for ${customerId} & ${product}`);
    if(customerId == 'customerId') {
      callback(null, '[');
    }
    else if(SummaryGroupingStream.customerId != customerId) {
      SummaryGroupingStream.customerId = customerId;
      switch (SummaryGroupingStream.rowCount ) {
        case 2:
          callback(null, `{customerId: ${customerId}, products: [${product}`);
          break;
        case this.totalRows:
          callback(null, `]},{customerId: ${customerId}, products: [${product}]}]`);
          break;
        default:
          callback(null, `]},\n{customerId: ${customerId}, products: [${product}`);
      }
    } else
    {
      switch (SummaryGroupingStream.rowCount ) {
        case this.totalRows:
          callback(null, `,${product}]}]`);
          break;
        default:
          callback(null, `,${product}`);
      }
    }
  }
}
