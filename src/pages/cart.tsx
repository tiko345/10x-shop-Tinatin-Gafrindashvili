import { Link } from "react-router";
import { useCart } from "../context/CartContext";

function Cart() {
    const { items, setQuantity } = useCart();

    if (items.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-10 text-center">
                <h1 className="text-3xl font-bold">Cart</h1>

                <p className="mt-4 text-gray-600">
                    Your cart is empty.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Browse products
                </Link>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-bold">Cart</h1>

            <ul className="mt-6 space-y-4">
                {items.map(({ product, quantity }) => {
                    const unitPrice =
                        product.price * (1 - product.discountPercentage / 100);

                    const lineTotal = unitPrice * quantity;

                    return (
                        <li
                            key={product.id}
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                        >
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-24 w-24 shrink-0 object-contain"
                            />

                            <div className="min-w-0 flex-1">
                                <Link
                                    to={`/products/${product.id}`}
                                    className="break-words font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    {product.title}
                                </Link>

                                <p className="mt-2 text-sm text-gray-600">
                                    Unit price: ${unitPrice.toFixed(2)}
                                </p>

                                <div className="mt-3 inline-flex items-center rounded-lg border border-gray-300">
                                    <button
                                        type="button"
                                        aria-label={`Decrease quantity of ${product.title}`}
                                        disabled={quantity <= 1}
                                        onClick={() => setQuantity(product.id, quantity - 1)}
                                        className="rounded-l-lg px-4 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                                    >
                                        −
                                    </button>

                                    <span
                                        className="min-w-12 px-3 text-center"
                                        aria-live="polite"
                                        aria-atomic="true"
                                    >
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label={`Increase quantity of ${product.title}`}
                                        disabled={quantity >= product.stock}
                                        onClick={() => setQuantity(product.id, quantity + 1)}
                                        className="rounded-r-lg px-4 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <p className="font-semibold">
                                Line total: ${lineTotal.toFixed(2)}
                            </p>
                        </li>
                    );
                })}
            </ul>

            <Link
                to="/"
                className="mt-6 inline-block text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Continue shopping
            </Link>
        </section>
    );
}

export default Cart;