import { OrdersCsvRowToSummaryRowStream } from '../../../src/streams/orders-csv-row-to-summary-row-stream';
import { Readable } from 'stream';
import { promisify } from 'util';
import { pipeline } from 'stream/promises';

const pipelineAsync = promisify(pipeline);
describe('OrdersCsvRowToSummaryRowStream class tests',() => {
  describe('_transform() tests', () => {
    it('should transform single order from csv to (customerId and product) csv', () => {
      const transformStream = new OrdersCsvRowToSummaryRowStream();
      const items = ['1,Garden,Muffin - Mix - Strawberry Rhubarb,101'];
      let expectedResult = '101,Muffin - Mix - Strawberry Rhubarb\n';
      Readable.from(items).pipe(
        transformStream)
        .on('data', (data) => {
          expect(data.toString()).toEqual(expectedResult);
        });
    });

    it('should transform multiple orders successfully ', () => {
      const transformStream = new OrdersCsvRowToSummaryRowStream();
      const items = [
        '1,Garden,Muffin - Mix - Strawberry Rhubarb,101',
        '2,Industrial,Pork - Belly Fresh,554',
        '3,Electronics,Sobe - Orange Carrot,2',
        '4,Outdoors,Stock - Fish,3',
        '5,Clothing,"Soup - Knorr, Chicken Noodle",171'];
      const expectedResult = [
        '101,Muffin - Mix - Strawberry Rhubarb\n',
        '554,Pork - Belly Fresh\n',
        '2,Sobe - Orange Carrot\n',
        '3,Stock - Fish\n',
        '171,"Soup - Knorr, Chicken Noodle"\n',
      ];

      let index = 0;
      Readable.from(items)
        .pipe(transformStream)
        .on('data', (data) => {
          expect(data.toString()).toEqual(expectedResult[index++]);
        });
    });

  });
});
