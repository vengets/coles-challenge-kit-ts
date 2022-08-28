
export class SummaryBuffer {
  private static map: Map<number, string[]> = new Map<number, string[]>();

  private static counter = 0;

  public static get(orderId: number): string[] | undefined {
    return this.map.get(orderId);
  }

  public static set(orderId: number, product: string[]) {
    this.counter++;
    let products = this.map.get(orderId);
    if(products) {
      products.concat(product);
      this.map.set(orderId, products);
    } else {
      this.map.set(orderId, product);
    }

  }

  public static clearMap() {
    this.map.clear();
  }

  public static getMapItemCount() {
    return this.counter;
  }
}
