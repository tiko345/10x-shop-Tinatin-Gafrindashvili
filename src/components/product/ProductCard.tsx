import { Link } from "react-router";
import type { Product } from "../../types/products.ts";

// Describe the product received by each card
type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        // Raise the hovered card above its neighbors while it enlarges
        <article className="relative h-full min-w-0 rounded-2xl border border-teal-100 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:z-20 hover:scale-105 hover:border-teal-200 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:scale-100">
            {/* Keep the whole card clickable and show keyboard focus inside its edges */}
            <Link
                to={`/products/${product.id}`}
                className="flex h-full flex-col rounded-2xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-600"
            >
                {/* Give the product image its own softly colored surface */}
                <div className="rounded-xl bg-gradient-to-br from-teal-50 to-slate-50 p-3">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="h-48 w-full object-contain"
                    />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal-700">
                    {product.category}
                </p>

                <h2 className="mt-2 break-words text-lg font-semibold text-slate-900">
                    {product.title}
                </h2>

                {/* Push the price toward the bottom for consistent card alignment */}
                <p className="mt-auto pt-4 text-xl font-bold text-teal-800">
                    ${product.price.toFixed(2)}
                </p>
            </Link>
        </article>
    );
}

export default ProductCard;