import { ProductOrders, Stock } from '../type/stock';
import { REDIS_CACHE } from '../helper/redis-helper';

export class UpdateStockQuantityFromRedisStream {
  transform(object: Stock) {
    let counter = 0;
    for(let order of object.shopping.productOrders) {
      counter++;
      let prodName: string = order?.productName || '';
      if(prodName!= '' && REDIS_CACHE?.has(prodName)) {
        order.quantitySoldToday = (REDIS_CACHE?.get(prodName)) || 0;
        REDIS_CACHE?.delete(prodName);
      }
    }
    for(let key of REDIS_CACHE.keys()) {
      counter++;
      let missedOrders: ProductOrders = {
        id: counter.toString(),
        productName: key,
        quantitySoldToday: REDIS_CACHE?.get(key) || 1
      };
      object.shopping.productOrders.push(missedOrders);
    }
    REDIS_CACHE.clear();
    return object;
  }
}
