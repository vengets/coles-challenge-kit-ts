export interface SummaryItem {
  customerId: string
  summary: ProductCount[]
}

export interface ProductCount {
  product: string;
  quantity: number;
}
