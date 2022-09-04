import { Readable } from 'stream';
import { PopulateProductCountStream } from '../../../src/streams/populate-product-count-stream';

describe('PopulateProductCountStream class tests', () => {
  describe('_transform() tests', () => {
    it('should return product count for single product', async () => {
      const items =
        ['[{"customerId": 3, "products": ["Bread - Hamburger Buns"]},',
          '{"customerId": 4, "products": ["Trueblue - Blueberry 12x473ml"]},',
          '{"customerId": 8, "products": ["Bay Leaf Ground"]}]'];

      const transformStream = new PopulateProductCountStream(items.length);
      const expectedResult =
        ['[{"customerId":3,"summary":[{"product":"Bread - Hamburger Buns","quantity":1}]},\n',
          '{"customerId":4,"summary":[{"product":"Trueblue - Blueberry 12x473ml","quantity":1}]},\n',
          '{"customerId":8,"summary":[{"product":"Bay Leaf Ground","quantity":1}]}]\n'];

      let index = 0;
      Readable.from(items)
        .pipe(transformStream)
        .on('data', (data) => {
          if (index < expectedResult.length)
            expect(data.toString()).toEqual(expectedResult[index++]);
        });
      await new Promise(process.nextTick);
    });

    it('should return product count for multiple product', async () => {
      const items =
        ['[{"customerId": 3, "products": ["Bread - Hamburger Buns", "Bread - Hamburger Buns"]},',
          '{"customerId": 4, "products": ["Trueblue - Blueberry 12x473ml"]},',
          '{"customerId": 8, "products": ["Bay Leaf Ground", "Bay Leaf Ground", "Bay Leaf Ground"]}]'];

      const transformStream = new PopulateProductCountStream(items.length);
      const expectedResult =
        ['[{"customerId":3,"summary":[{"product":"Bread - Hamburger Buns","quantity":2}]},\n',
          '{"customerId":4,"summary":[{"product":"Trueblue - Blueberry 12x473ml","quantity":1}]},\n',
          '{"customerId":8,"summary":[{"product":"Bay Leaf Ground","quantity":3}]}]\n'];

      let index = 0;
      Readable.from(items)
        .pipe(transformStream)
        .on('data', (data) => {
          if (index < expectedResult.length)
            expect(data.toString()).toEqual(expectedResult[index++]);
        });
      await new Promise(process.nextTick);
    });
  });
});
