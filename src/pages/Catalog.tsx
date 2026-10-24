import { useEffect, useState } from "react";
import  getProducts from "../api/products";
import type { Product } from "../types/products.ts";
import ProductGrid from "../components/product/ProductGrid.tsx";

function Catalog() {
    // State to hold the products, loading status, and error message
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect to fetch products when the component mounts
    useEffect(() => {
        let ignore = false;
        // Function to load products from the API
        async function loadProducts() {
        try {
            const data = await getProducts();
            // If the component is still mounted, update the state with the fetched products
            if (!ignore) {
            setProducts(data.products);
            }
        } catch (error: unknown) { // Catch any errors that occur during the fetch
            if (!ignore) {
            setError(
                error instanceof Error
                ? error.message
                : "Something went wrong"
            );
            }
        } finally { // Finally block to set loading to false after the fetch attempt
            if (!ignore) {
            setLoading(false);
            }
        }
        }
        // Call the loadProducts function to initiate the fetch
        loadProducts();
        // Cleanup function to set ignore to true if the component unmounts before the fetch completes
        return () => {
        ignore = true;
        };
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Catalog</h1>

        {loading ? (
            <p role="status">Loading products...</p>
        ) : error ? (
            <p role="alert" className="text-red-600">
            {error}
            </p>
        ) : products.length === 0 ? (
            <p>No products available.</p>
        ) : (
            <ProductGrid products={products} />
        )}
        </section>
    );
}
export default Catalog;