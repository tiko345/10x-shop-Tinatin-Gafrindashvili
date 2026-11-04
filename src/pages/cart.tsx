import { Link, useLocation } from "react-router";
import { useCart } from "../context/CartContext";

function Cart() {
    // Read shared cart items and the function for updating quantities
    const { items, setQuantity, removeItem } = useCart();

    // Add together each product's discounted price multiplied by its quantity
    const total = items.reduce((sum, { product, quantity }) => {
        const unitPrice =
            product.price * (1 - product.discountPercentage / 100);

        return sum + unitPrice * quantity;
    }, 0);
    const location = useLocation();
    const redirectedFromCheckout = location.state === "checkout-empty";

    // Show an empty state instead of the product list when the cart has no items
    if (items.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-10 text-center">
                <h1 className="text-3xl font-bold">Cart</h1>

                <p className="mt-4 text-gray-600">
                    Your cart is empty.
                </p>

                {redirectedFromCheckout && (
                    <p className="mt-2 text-gray-600" role="status">
                        Add products to your cart before proceeding to checkout.
                    </p>
                )}
                {/* Navigate to the catalog without reloading the page */}
                <Link
                    to="/"
                    className="mt-6 inline-block rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Browse products
                </Link>
            </section>
        );
    }

    return (
        <section className="ml-auto w-full max-w-7xl px-4 py-10 sm:px-8">
            <h1 className="text-3xl font-bold">Cart</h1>

            <ul className="mt-6 space-y-4">
                {/* Destructure each cart item to access its product and quantity */}
                {items.map(({ product, quantity }) => {
                    // Calculate the discounted price for one unit
                    const unitPrice =
                        product.price * (1 - product.discountPercentage / 100);

                    // Calculate this row's total using its current quantity
                    const lineTotal = unitPrice * quantity;

                    return (
                        // Use a stable product ID so React can identify each list item
                        <li
                            key={product.id}
                            className="flex flex-col gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-5 shadow-md shadow-teal-900/10 sm:flex-row sm:items-center"
                        >
                            {/* Stack content on mobile and arrange it in a row on larger screens */}
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-32 w-32 shrink-0 rounded-xl border border-teal-100 bg-white/60 p-2 object-contain"
                            />

                            <div className="min-w-0 flex-1">
                                {/* Open this product's details using its ID */}
                                <Link
                                    to={`/products/${product.id}`}
                                    className="break-words text-lg font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                >
                                    {product.title}
                                </Link>

                                {/* Format the unit price to two decimal places for display */}
                                <p className="mt-2 text-sm text-gray-600">
                                    Unit price: ${unitPrice.toFixed(2)}
                                </p>

                                <div className="mt-3 inline-flex items-center rounded-lg border border-teal-200">
                                    {/* Decrease the shared quantity and stop at a minimum of one */}
                                    <button
                                        type="button"
                                        aria-label={`Decrease quantity of ${product.title}`}
                                        disabled={quantity <= 1}
                                        onClick={() => setQuantity(product.id, quantity - 1)}
                                        className="rounded-l-lg px-4 py-2 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                                    >
                                        −
                                    </button>

                                    {/* Announce quantity changes to screen readers without moving focus */}
                                    <span
                                        className="min-w-12 px-3 text-center"
                                        aria-live="polite"
                                        aria-atomic="true"
                                    >
                                        {quantity}
                                    </span>

                                    {/* Increase the shared quantity without exceeding available stock */}
                                    <button
                                        type="button"
                                        aria-label={`Increase quantity of ${product.title}`}
                                        disabled={quantity >= product.stock}
                                        onClick={() => setQuantity(product.id, quantity + 1)}
                                        className="rounded-r-lg px-4 py-2 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 sm:items-end">
                                {/* Recalculate the line total on each render after a quantity update */}
                                <p className="font-semibold">
                                    Line total: ${lineTotal.toFixed(2)}
                                </p>
                                {/* Remove this product's entire row from the cart */}
                                <button
                                    type="button"
                                    onClick={() => removeItem(product.id)}
                                    aria-label={`Remove ${product.title} from cart`}
                                    className="self-start rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:self-center"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>

                    );
                })}
            </ul>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <Link
                    to="/"
                    className="text-teal-700 hover:text-teal-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Continue shopping
                </Link>

                {/* Keep the total and checkout together */}
                <div className="flex flex-col gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-6 shadow-md shadow-teal-900/10 sm:items-end">
                    {/* Subtotal includes product discounts and matches total without extra charges */}
                    <div className="w-full space-y-3 sm:min-w-64">
                        <div className="flex justify-between gap-8 text-gray-600">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between gap-8 border-t border-teal-200 pt-3 text-xl font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link
                        to="/checkout"
                        className="w-full rounded-lg bg-teal-700 px-6 py-3 text-center font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto"
                    >
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </section >
    );
}

export default Cart;