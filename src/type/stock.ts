export interface Stock {
 shopping: Stock
}
export interface Stock {
  productOrders: ProductOrders[]
}

export interface ProductOrders {
  id: string,
  productName: string,
  quantitySoldToday: number
}
