import { useEffect, useState } from "react";
import  getProducts, {getCategories} from "../api/products";
import type { Product, Category } from "../types/products.ts";
import ProductGrid from "../components/product/ProductGrid.tsx";
import type { ProductSort } from "../api/products";
import { useSearchParams } from "react-router";

function Catalog() {
    // State to hold the products, loading status, and error message
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<ProductSort>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState("");
    const [categoryError, setCategoryError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState(0);

    const pageValue = Number(searchParams.get("page") ?? "1");
    const page =
    Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;

    const limit = 12;
    const pageCount = Math.ceil(total / limit);
    // useEffect to fetch products when the component mounts
    useEffect(() => {
    let ignore = false;
    // Function to load products from the API
    async function loadProducts() {
        // Set loading to true and clear any previous error
        setLoading(true);
        setError(null);

        try {
            // Fetch products from the API using the getProducts function
            const data = await getProducts(query, sort, page, category);
            
            if (!ignore) {
                setProducts(data.products);
                setTotal(data.total);
            }
        } catch (error: unknown) { // Catch any errors that occur during the fetch
            if (!ignore) {
                setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
                );
            }
        } finally { // Finally block to set loading to false after the fetch is complete
        if (!ignore) {
            setLoading(false);
        }
        }
    }
    
    loadProducts();

    return () => {
        ignore = true;
    };
    }, [query, sort, page, category]); // Dependency array to re-run the effect when query or sort changes

    // useEffect to fetch categories when the component mounts
    useEffect(() => {
        let ignore = false;
        // Function to load categories from the API
        async function loadCategories() {
            try {
            const data = await getCategories();

            if (!ignore) {
                setCategories(data);
            }
            } catch {
            if (!ignore) {
                setCategoryError("Could not load categories.");
            }
            }
        }
    
        loadCategories();

        return () => {
            ignore = true;
        };
    }, []);
    // Function to select a category and reset the search query and page number
    function selectCategory(value: string) {
        setCategory(value);
        setQuery("");
        resetPage();
    }
    // Function to change the page when the user navigates through pagination
    function changePage(nextPage: number) {
        if (nextPage < 1 || nextPage > pageCount) return;

        const params = new URLSearchParams(searchParams);
        params.set("page", String(nextPage));

        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function resetPage() {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        setSearchParams(params, { replace: true });
    }
    return (
        <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Catalog</h1>
        <div className="mb-8 min-w-0 space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:w-80">
                    <input
                        id="product-search"
                        type="search"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setCategory("");
                            resetPage();
                        }}
                        placeholder="Search by name..."
                        className="w-full min-w-0 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    </div>
                    <div className="w-full min-w-0 sm:w-56">
                    <label
                        htmlFor="product-sort"
                        className="mb-2 block text-sm font-medium"
                    >
                        Sort by
                    </label>
                    {/* Dropdown for sorting products */}
                    <select
                        id="product-sort"
                        value={sort}
                        onChange={(event) => {
                        const value = event.target.value;

                        if (
                            value === "" ||
                            value === "price-asc" ||
                            value === "price-desc" ||
                            value === "rating-desc" ||
                            value === "title-asc"
                        ) {
                            setSort(value);
                            resetPage();
                        }
                        }}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="">Default</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="rating-desc">Rating: high to low</option>
                        <option value="title-asc">Name A–Z</option>
                    </select>
                </div>
            </div>
            <div className="min-w-0 w-full" >
                <p id="category-label" className="mb-2 text-sm font-medium">
                    Categories
                </p>

                <div
                    role="group"
                    aria-labelledby="category-label"
                    className="flex gap-2 overflow-x-auto py-1"
                >
                    <button
                    type="button"
                    onClick={() => selectCategory("")}
                    aria-pressed={category === ""}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                        category === ""
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                    }`}
                    >
                    All
                    </button>

                    {categories.map((item) => (
                    <button
                        key={item.slug}
                        type="button"
                        onClick={() => selectCategory(item.slug)}
                        aria-pressed={category === item.slug}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                        category === item.slug
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                        }`}
                    >
                        {item.name}
                    </button>
                    ))}
                </div>

                {categoryError && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                    {categoryError}
                    </p>
                )}
            </div>
        </div>
        {error ? (// Display an error message if there is an error
        <p role="alert" className="text-red-600">
            {error}
        </p>
        ) : products.length > 0 ? (// Display the ProductGrid component if there are products to show
            <ProductGrid products={products} />
        ) : !loading ? (// Display a message if there are no products found and loading is complete
            <p>No products found.</p>
        ) : null}
        {/* Display a loading message if the products are still being fetched */}
        {!error && pageCount > 1 && (
            <nav
                aria-label="Product pages"
                className="mt-8 flex flex-wrap justify-center gap-1"
            >
                <button
                type="button"
                onClick={() => changePage(page - 1)}
                disabled={loading || page <= 1}
                className="h-9 rounded-md px-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                Previous
                </button>

                {Array.from({ length: pageCount }, (_, index) => {
                const pageNumber = index + 1;

                return (
                    <button
                    key={pageNumber}
                    type="button"
                    onClick={() => changePage(pageNumber)}
                    disabled={loading}
                    aria-current={page === pageNumber ? "page" : undefined}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${
                        page === pageNumber
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    >
                    {pageNumber}
                    </button>
                );
                })}

                <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={loading || page >= pageCount}
                className="h-9 rounded-md px-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                Next
                </button>
            </nav>
        )}
        </section>
    );
}
export default Catalog;