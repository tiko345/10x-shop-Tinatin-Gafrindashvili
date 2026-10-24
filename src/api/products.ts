import type { ProductsResponse } from "../types/products.ts";

// Fetch products from the API returning a Promise that resolves to a ProductsResponse object
async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=12&skip=0"
  );

  if (!response.ok) {
    throw new Error("Failed to load products");
  }
  // Parse the response as JSON and return it
  const data: ProductsResponse = await response.json();

  return data;
}
export default getProducts;