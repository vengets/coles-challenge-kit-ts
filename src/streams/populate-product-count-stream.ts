import { Transform, TransformCallback } from 'stream';
import { log } from '../helper/logger';
import { IntermediateSummary } from '../type/intermediate-summary';
import { ProductCount, SummaryItem } from '../type/summary-item';

const logger = log.getChildLogger({ name: 'PopulateProductCountStream' });

export class PopulateProductCountStream extends Transform {
  lineNo = 0;
  totalLines = 0;

  constructor(totalLines: number) {
    super();
    this.totalLines = totalLines;
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    this.lineNo++;
    let data = chunk.toString();
    if (this.lineNo == 1) {
      data = data.substring(1);
    }
    data = data.substring(0, data.length - 1);
    logger.info('PopulateProductCountStream => ' + data);
    let intermediateSummaryObj: IntermediateSummary = JSON.parse(data);
    let summaryObj: SummaryItem = {
      customerId: intermediateSummaryObj.customerId,
      summary: [],
    };
    let map = new Map<string, number>();
    for (let product of intermediateSummaryObj.products) {
      if (map.has(product)) {
        let count = map.get(product) || 0;
        count++;
        map.set(product, count);
      } else {
        map.set(product, 1);
      }
    }
    for (let key of map.keys()) {
      let pc: ProductCount = {
        product: key,
        quantity: map.get(key) || 0,
      };
      summaryObj.summary.push(pc);
    }
    let response = `${JSON.stringify(summaryObj)}`;
    if (this.lineNo == 1) {
      response = '[' + response;
    }
    if (this.lineNo == this.totalLines) {
      response += ']';
    }
    if (this.lineNo < this.totalLines) {
      response += ',';
    }
    callback(null, response + '\n');
  }
}
