import type { ProductSort } from "../../api/products";

// Define the props for the CatalogToolbar component
type CatalogToolbarProps = {
  query: string;
  sort: ProductSort;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: ProductSort) => void;
};

// CatalogToolbar component to provide search and sorting functionality for the product catalog
function CatalogToolbar({
  query,
  sort,
  onQueryChange,
  onSortChange,
}: CatalogToolbarProps) {// Function to handle changes in the search query and call the onQueryChange prop
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full min-w-0 sm:w-80">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
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
              onSortChange(value);
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
  );
}

export default CatalogToolbar;