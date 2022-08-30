import { Stock } from '../type/stock';
import { REDIS_CACHE } from '../helper/redis-helper';

export class UpdateStockQuantityFromRedisStream {
  transform(object: Stock) {
    REDIS_CACHE?.get('sd');
    for(let order of object.shopping.productOrders) {
      let prodName: string = order?.productName || '';
      if(prodName!= '' && REDIS_CACHE?.has(prodName)) {
        order.quantitySoldToday = (REDIS_CACHE?.get(prodName)) ?? 0;
        REDIS_CACHE?.delete(prodName);
      }
    }
    return object;
  }
}
