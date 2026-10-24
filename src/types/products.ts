//define the Product type
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
};

//define the ProductsResponse type
export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

//define the Category type
export type Category = {
  slug: string;
  name: string;
  url: string;
};