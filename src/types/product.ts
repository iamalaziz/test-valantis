export interface Product {
  id: string;
  product: string,
  brand: string;
  price: number;
}
export interface Filters {
  product: string;
  price: string;
  brand: string;
}

export interface ProductIds {
  result: string[]
}