import { OrderHelper } from '../../../src/helper/order-helper';

describe('OrderHelper class tests', () => {
  describe('parseOrderFromCSV()', () => {
   function invokeMethod(data: string) {
     return OrderHelper.parseOrderFromCSV(data);
   }

   it('should return order object for a simple row', () => {
     let data = '1,department,prod,custId';
     let order = invokeMethod(data);
     expect(order).not.toBeNull();
     expect(order.id).toEqual('1');
     expect(order.customerId).toEqual('custId');
     expect(order.product).toEqual('prod');
     expect(order.department).toEqual('department');
   });

    it('should return order object for a row with escape characters', () => {
      let data = '866,Jewelry,"Shrimp - 16/20, Peeled Deviened",660';
      let order = invokeMethod(data);
      expect(order).not.toBeNull();
      expect(order.id).toEqual('866');
      expect(order.customerId).toEqual('660');
      expect(order.product).toEqual('"Shrimp - 16/20, Peeled Deviened"');
      expect(order.department).toEqual('Jewelry');
    });

  });
});
