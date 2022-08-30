import { Readable } from 'stream';
import { SummaryGroupingStream } from '../../../src/streams/summary-grouping-stream';

describe('SummaryGroupingStream class tests', () => {
  describe('_transform() tests', () => {
    it('should group items of same customerID along with other customerIds', async () => {
      const items = [
        'customerId,product',
        '1,GardenMuffin - Mix - Strawberry Rhubarb',
        '1,IndustrialPork - Belly Fresh',
        '2,ElectronicsSobe - Orange Carrot',
        '3,Outdoors,Stock - Fish'];
      const transformStream = new SummaryGroupingStream(items.length);
      const expectedResult = [
        '[',
        '{"customerId": 1, "products": ["GardenMuffin - Mix - Strawberry Rhubarb"',
        ',"IndustrialPork - Belly Fresh"',
        ']},\n{"customerId": 2, "products": ["ElectronicsSobe - Orange Carrot"',
        ']},\n{"customerId": 3, "products": ["Outdoors,Stock - Fish"]}]'];

      let index = 0;
      Readable.from(items)
        .pipe(transformStream)
        .on('data', (data) => {
          expect(data.toString()).toEqual(expectedResult[index++]);
        });
      await new Promise(process.nextTick);
    });

    it('should return empty array when no records', async () => {
      const items = [
        'customerId,product',
      ];
      const transformStream = new SummaryGroupingStream(items.length);
      const expectedResult = ['[]'];
      let index = 0;
      Readable.from(items)
        .pipe(transformStream)
        .on('data', (data) => {
          expect(data.toString()).toEqual(expectedResult[index++]);
        });
      await new Promise(process.nextTick);
    });

    it('Construct valid json when last 2 records are from same customer', async () => {
      const items = [
        'customerId,product',
        '1,apple',
        '1,orange',
      ];
      const transformStream = new SummaryGroupingStream(items.length);
      const expectedResult = [
        '[',
        '{"customerId": 1, "products": ["apple"',
        ',"orange"]}]'];
      let index = 0;
      Readable.from(items)
        .pipe(transformStream)
        .on('data', (data) => {
          expect(data.toString()).toEqual(expectedResult[index++]);
        });
      await new Promise(process.nextTick);
    });

  });
});
