import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../api/products";
import type { Product as ProductType } from "../types/products";
import NotFound from "./notFound";
import { useCart } from "../context/CartContext";

function Product() {
    // Route parameters are strings, so convert the ID to a number
    const { id } = useParams();
    const productId = Number(id);

    // Accept only positive whole-number IDs
    const isValidId = Number.isInteger(productId) && productId > 0;

    // null means no product has been loaded yet
    const [product, setProduct] = useState<ProductType | null>(null);

    // Track the API request status separately from the product data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Store the selected image's array index; zero selects the first image
    const [selectedImage, setSelectedImage] = useState(0);

    // This is the quantity selected for the NEXT addition to the cart
    const [quantity, setQuantity] = useState(1);

    // Read shared cart state and its add operation through Context
    const { items, addItem } = useCart();

    // Display success feedback or a stock-limit message
    const [cartMessage, setCartMessage] = useState("");

    // Keep all hooks above conditional returns so they run in a consistent order
    useEffect(() => {
        // Only hide success feedback automatically
        // Stock-limit messages remain visible
        if (cartMessage !== "Added to cart.") {
            return;
        }

        // Clear the success message after two seconds
        const timeoutId = setTimeout(() => {
            setCartMessage("");
        }, 2000);

        // Cancel the previous timer before this effect runs again
        // or when the component unmounts
        return () => clearTimeout(timeoutId);

        // A successful addition changes items, restarting the timer
        // even when the success message text stays the same
    }, [cartMessage, items]);

    // Load product data when the component mounts or the route ID changes
    useEffect(() => {
        // check if ID id valid
        if (!isValidId) {
            return;
        }

        // Ignore a request's result if this effect has already been cleaned up
        // This prevents an older response from replacing a newer product
        // It does not cancel the network request itself
        let ignore = false;

        async function loadProduct() {
            // Reset the previous product
            setLoading(true);
            setError("");
            setProduct(null);
            setSelectedImage(0);
            setQuantity(1);
            setCartMessage("");

            try {
                const data = await getProductById(productId);

                // Update state only if this request is still relevant
                if (!ignore) {
                    setProduct(data);
                }
            } catch (error: unknown) {
                if (!ignore) {
                    // A thrown value can have any type
                    // instanceof checks that it is an Error before reading message
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Failed to load product"
                    );
                }
            } finally {
                // Stop loading whether the relevant request succeeds or fails
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        // Run before loading another ID or leaving this page
        return () => {
            ignore = true;
        };
    }, [productId, isValidId]);

    function handleAddToCart() {
        // Ensure a product exists before accessing its properties
        if (!product) {
            return;
        }

        // Look for this product's existing row in the shared cart
        const existingItem = items.find(
            (item) => item.product.id === product.id
        );

        // Optional chaining reads quantity only if the item exists
        // uses zero when there is no existing item.
        const currentQuantity = existingItem?.quantity ?? 0;

        // Include units already in the cart when checking available stock
        const availableQuantity = product.stock - currentQuantity;

        if (quantity > availableQuantity) {
            setCartMessage(
                availableQuantity > 0
                    ? `You can add only ${availableQuantity} more to your cart.`
                    : "You already have all available stock in your cart."
            );
            return;
        }

        // The Context updates shared state using the selected quantity
        addItem(product, quantity);
        setCartMessage("Added to cart.");
    }

    // Conditional rendering handles invalid IDs and request states
    if (!isValidId) {
        return <NotFound />;
    }

    if (loading) {
        return (
            <p className="px-4 py-10" role="status">
                Loading product...
            </p>
        );
    }

    if (error) {
        return (
            <p className="px-4 py-10 text-red-600" role="alert">
                {error}
            </p>
        );
    }

    if (!product) {
        return <NotFound />;
    }

    // use the displayed cart quantity directly from shared state
    const quantityInCart =
        items.find((item) => item.product.id === product.id)?.quantity ?? 0;

    // Convert the discount percentage into the discounted unit price
    const discountedPrice =
        product.price * (1 - product.discountPercentage / 100);

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            {/* Stack on small screens; use two columns from the md breakpoint */}
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <div className="rounded-xl border border-gray-200 p-6">
                        {/* Fall back to the thumbnail if the selected image is unavailable */}
                        <img
                            src={product.images[selectedImage] || product.thumbnail}
                            alt={product.title}
                            className="h-80 w-full object-contain"
                        />
                    </div>

                    {/* Show image-selection buttons only for multiple images */}
                    {product.images.length > 1 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() => setSelectedImage(index)}
                                    aria-label={`Show image ${index + 1} of ${product.title}`}
                                    aria-pressed={selectedImage === index}
                                    className={`rounded-lg border-2 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
                                        selectedImage === index
                                            ? "border-gray-900"
                                            : "border-gray-200 hover:border-gray-400"
                                    }`}
                                >
                                    {/* The button already provides an accessible label */}
                                    <img
                                        src={image}
                                        alt=""
                                        className="h-16 w-16 object-contain"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{product.title}</h1>

                    <div className="mt-4 flex items-center gap-3">
                        {/* toFixed formats the displayed price to two decimal places */}
                        <span className="text-2xl font-bold">
                            ${discountedPrice.toFixed(2)}
                        </span>

                        {/* Show the original price and discount only when discounted */}
                        {product.discountPercentage > 0 && (
                            <>
                                <span className="text-gray-500 line-through">
                                    ${product.price.toFixed(2)}
                                </span>

                                <span className="rounded bg-red-100 px-2 py-1 text-sm text-red-700">
                                    -{product.discountPercentage}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Match the stock message and its color to availability */}
                    <p
                        className={`mt-4 font-medium ${
                            product.stock === 0
                                ? "text-red-600"
                                : product.stock <= 5
                                    ? "text-orange-600"
                                    : "text-green-700"
                        }`}
                    >
                        {product.stock === 0
                            ? "Out of stock"
                            : product.stock <= 5
                                ? `Only ${product.stock} left!`
                                : "In stock"}
                    </p>

                    <p className="mt-6 leading-relaxed text-gray-600">
                        {product.description}
                    </p>

                    {/* Place quantity controls and Add to Cart beside each other
                        allowing them to wrap when space is limited */}
                    <div className="mt-6 flex flex-wrap items-end gap-4">
                        <div className="mt-6">
                            <p className="mb-2 font-medium">Quantity</p>

                            <div className="inline-flex items-center rounded-lg border border-gray-300">
                                <button
                                    type="button"
                                    aria-label="Decrease quantity"
                                    disabled={quantity <= 1 || product.stock === 0}
                                    // Calculate from the latest state and keep quantity at least 1
                                    onClick={() =>
                                        setQuantity((current) =>
                                            Math.max(1, current - 1)
                                        )
                                    }
                                    className="rounded-l-lg px-4 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                                >
                                    −
                                </button>

                                {/* Announce quantity changes without moving focus
                                    Show zero when the product is unavailable */}
                                <span
                                    className="min-w-12 px-3 text-center"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {product.stock === 0 ? 0 : quantity}
                                </span>

                                <button
                                    type="button"
                                    aria-label="Increase quantity"
                                    disabled={quantity >= product.stock}
                                    // Keep the selected quantity within the product's stock
                                    // handleAddToCart also accounts for units already in the cart
                                    onClick={() =>
                                        setQuantity((current) =>
                                            Math.min(product.stock, current + 1)
                                        )
                                    }
                                    className="rounded-r-lg px-4 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Pass the handler to React so it runs when clicked */}
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600 sm:w-auto"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Show this product's total quantity currently in the cart */}
                    <span
                        className="mt-3 block text-sm font-medium text-blue-700"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        In your cart: {quantityInCart}
                    </span>

                    {/* role="status" announces success and stock-limit feedback */}
                    <p
                        role="status"
                        className="mt-3 text-sm text-gray-700"
                    >
                        {cartMessage}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Product;