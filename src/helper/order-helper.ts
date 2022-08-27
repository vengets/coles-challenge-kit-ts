import { IOrder } from '../type/order';

export class OrderHelper {
  public static parseOrderFromCSV(data: string): IOrder {
    let myregexp2 = new RegExp(',(?=(?:[^"]*"[^"]*")*[^"]*$)');
    let orderStr = data.split(myregexp2);
    let order: IOrder = {
      id: parseInt(orderStr[0]),
      department: orderStr[1],
      product: orderStr[2],
      customerId: orderStr[3] ? parseInt(orderStr[3]) : null,
    };
    return order;
  }
}
