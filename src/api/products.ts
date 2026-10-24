import type { ProductsResponse, Category, Product } from "../types/products.ts";

// Define a type for the sorting options available for products
export type ProductSort =
  | ""
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "title-asc";


// Function to fetch products from the API with optional search query and sorting
async function getProducts(
    // Optional search query to filter products
    query: string = "",
    // Optional sorting option to sort products
    sort: ProductSort = "",
    // Optional page number for pagination (default is 1)
    page: number = 1,
    // Optional category filter to fetch products from a specific category
    category: string = ""
): Promise<ProductsResponse>// Fetch products from the API and return a promise that resolves to a ProductsResponse
{   // Trim the search query to remove any extra spaces
    const search = query.trim();
    let endpoint = "https://dummyjson.com/products";

    if (category) {
    endpoint += `/category/${encodeURIComponent(category)}`;
    } else if (search) {
    endpoint += "/search";
}
    // Set the limit of products per page and calculate the number of products to skip based 
    // on the current page
    const limit = 12;
    const skip = (page - 1) * limit;
    // Create a URLSearchParams object to construct the query parameters for the API request
    const params = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
    });
    // If a search query is provided, add it to the query parameters
    if (search && !category) {
        params.set("q", search);
    }
    // If a sorting option is provided, split it into sortBy and order and add them to the 
    // query parameters
    if (sort) {
        const [sortBy, order] = sort.split("-");

        params.set("sortBy", sortBy);
        params.set("order", order);
    }
    // Fetch the products from the API using the constructed endpoint and query parameters
    const response = await fetch(`${endpoint}?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to load products");
    }
    // Parse the JSON response and return it as a ProductsResponse type
    const data: ProductsResponse = await response.json();

    return data;
}

// Function to fetch categories from the API and return a promise that resolves to an 
// array of Category objects
async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    "https://dummyjson.com/products/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  const data: Category[] = await response.json();

  return data;
}

// Function to fetch a single product by its ID from the API and 
// return a promise that resolves to a Product object or null if not found
async function getProductById(id: number): Promise<Product | null> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid product ID");
  }
  // Fetch the product from the API using the provided ID
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  // If the response status is 404, return null to indicate that the product was not found
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load product");
  }

  const data: Product = await response.json();

  return data;
}

export default getProducts;
export { getCategories,  getProductById };
