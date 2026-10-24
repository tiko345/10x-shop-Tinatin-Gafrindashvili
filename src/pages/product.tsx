import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../api/products";
import type { Product as ProductType } from "../types/products";
import NotFound from "./notFound";

function Product() {
    // Get the product ID from the URL parameters and convert it to a number
    const { id } = useParams();
    const productId = Number(id);
    const isValidId = Number.isInteger(productId) && productId > 0;
    // State variables to hold the product data, loading state, and error message
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    // Use the useEffect hook to fetch the product data when the component mounts 
    // or when the product ID changes
    useEffect(() => {
        if (!isValidId) {
        return;
        }

        let ignore = false;
        // Function to load the product data from the API
        async function loadProduct() {
        setLoading(true);
        setError("");
        setProduct(null);

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
                <div className="rounded-xl border border-gray-200 p-6">
                <img
                    src={product.images[0] || product.thumbnail}
                    alt={product.title}
                    className="h-80 w-full object-contain"
                />
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
                </div>
            </div>
            </section>
        );
    
}

export default Product;