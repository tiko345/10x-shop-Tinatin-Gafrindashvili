import type { Product } from "./products";


// Define a type for a cart item, which includes a product and its quantity
export type CartItem = {
  product: Product;
  quantity: number;
};