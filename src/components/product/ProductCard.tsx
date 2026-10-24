import { Link } from "react-router";
import type { Product } from "../../types/products.ts";

// Define the props for the ProductCard component, which includes a single product of type Product
type ProductCardProps = {
  product: Product;
};
// The ProductCard component displays a product's information in a card format
function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Link to the product's detail page using the product's id */}
      <Link
        to={`/products/${product.id}`}
        className="block p-4"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="h-56 w-full object-contain"
        />

        <p className="mt-4 text-sm text-gray-500">
          {product.category}
        </p>

        <h2 className="mt-1 text-lg font-semibold">
          {product.title}
        </h2>

        <p className="mt-3 text-xl font-bold">
          ${product.price.toFixed(2)}
        </p>
      </Link>
    </article>
  );
}

export default ProductCard;