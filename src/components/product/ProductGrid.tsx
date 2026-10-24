import type { Product } from "../../types/products.ts";
import ProductCard from "./ProductCard.tsx";
// Define the props for the ProductGrid component, which includes an array of products of type Product
type ProductGridProps = {
  products: Product[];
};
// The ProductGrid component displays a grid of ProductCard components for each product in the products array
function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;