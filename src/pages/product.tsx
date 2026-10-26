import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../api/products";
import type { Product as ProductType } from "../types/products";
import NotFound from "./notFound";

function Product() {
    // Get the product ID from the URL parameters and convert it to a number
    const { id } = useParams();
    const productId = Number(id);
    // Check if the product ID is a valid integer greater than 0
    const isValidId = Number.isInteger(productId) && productId > 0;
    // State variables to hold the product data, loading state, and error message
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // State variable to hold the index of the currently selected image
    const [selectedImage, setSelectedImage] = useState(0);
    // State variable to hold the quantity of the product to be added to the cart
    const [quantity, setQuantity] = useState(1);
    // Use the useEffect hook to fetch the product data when the component mounts 
    // or when the product ID changes
    useEffect(() => {
        if (!isValidId) {
            return;
        }

        let ignore = false;
        // Function to load the product data from the API
        async function loadProduct() {
            // Set loading to true, clear any previous error, reset the product state, selected image, and quantity
            setLoading(true);
            setError("");
            setProduct(null);
            setSelectedImage(0);
            setQuantity(1);

            try {
                const data = await getProductById(productId);

                if (!ignore) {
                    setProduct(data);
                }
            } catch (error: unknown) {
                if (!ignore) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Failed to load product"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => {
            ignore = true;
        };
    }, [productId, isValidId]);

    if (!isValidId) {
        return <NotFound />;
    }

    if (loading) {
        return <p className="px-4 py-10" role="status">Loading product...</p>;
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
    // Calculate the discounted price based on the original price and discount percentage
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <div className="rounded-xl border border-gray-200 p-6">
                        {/* Display the selected product image or the thumbnail if no image is selected */}
                        <img
                            src={product.images[selectedImage] || product.thumbnail}
                            alt={product.title}
                            className="h-80 w-full object-contain"
                        />
                    </div>
                    {/* Display image thumbnails if there are multiple images for the product */}
                    {product.images.length > 1 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() => setSelectedImage(index)}
                                    aria-label={`Show image ${index + 1} of ${product.title}`}
                                    aria-pressed={selectedImage === index}
                                    className={`rounded-lg border-2 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${selectedImage === index
                                        ? "border-gray-900"
                                        : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
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
                        <span className="text-2xl font-bold">
                            ${discountedPrice.toFixed(2)}
                        </span>

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

                    <p
                        className={`mt-4 font-medium ${product.stock === 0
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
                    <div className="mt-6">
                        <p className="mb-2 font-medium">Quantity</p>

                        <div className="inline-flex items-center rounded-lg border border-gray-300">
                            <button
                                type="button"
                                aria-label="Decrease quantity"
                                disabled={quantity <= 1 || product.stock === 0}
                                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                className="rounded-l-lg px-4 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                −
                            </button>

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
                                onClick={() =>
                                    setQuantity((current) => Math.min(product.stock, current + 1))
                                }
                                className="rounded-r-lg px-4 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default Product;