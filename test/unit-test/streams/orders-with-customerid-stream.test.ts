import { pipeline, Readable } from 'stream';
import { OrdersWithCustomerIdStream } from '../../../src/streams/orders-with-customerId-stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);
describe('OrdersWithCustomerIdStream class tests', () => {
  describe('_transform() tests', () => {
    it('should return single record customerId', async () => {
      const transformStream = new OrdersWithCustomerIdStream();
      const items = ['1,Garden,Muffin - Mix - Strawberry Rhubarb,101'];
      let expectedResult = '1,Garden,Muffin - Mix - Strawberry Rhubarb,101';
      await pipelineAsync(
        Readable.from(items),
        transformStream
          .on('data', (data) => {
            expect(data.toString()).toEqual(expectedResult);
          })
      );
    });

    it('should filter out single record without customerId', async () => {
      const transformStream = new OrdersWithCustomerIdStream();
      const items = ['1,Garden,Muffin - Mix - Strawberry Rhubarb'];
      await pipelineAsync(
        Readable.from(items),
        transformStream
          .on('data', (data) => {
            expect(data.toString()).toEqual('');
          })
      );
    });

  });
});
