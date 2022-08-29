import { Transform, TransformCallback } from 'stream';
import { log } from '../helper/logger';
import { IntermediateSummary } from '../type/intermediate-summary';
import { ProductCount, SummaryItem } from '../type/summary-item';

const logger = log.getChildLogger({ name: 'PopulateProductCountStream' });

export class PopulateProductCountStream extends Transform {
  static lineNo = 0;
  static totalLines = 0;

  constructor(totalLines: number) {
    super();
    PopulateProductCountStream.totalLines = totalLines + 1;
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {

    PopulateProductCountStream.lineNo++;
    let data = chunk.toString();
    if (PopulateProductCountStream.lineNo == 1) {
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
    if (PopulateProductCountStream.lineNo == 1) {
      response = '[' + response;
    }
    if (PopulateProductCountStream.lineNo == PopulateProductCountStream.totalLines) {
      response += ']';
    }
    if (PopulateProductCountStream.lineNo < PopulateProductCountStream.totalLines) {
      response += ',';
    }
    callback(null, response + '\n');
  }
}
