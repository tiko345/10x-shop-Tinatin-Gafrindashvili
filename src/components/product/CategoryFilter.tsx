import type { Category } from "../../types/products.ts";

// Define the props for the CategoryFilter component
type CategoryFilterProps = {
  categories: Category[];
  category: string;
  error: string | null;
  onCategoryChange: (category: string) => void;
};

// CategoryFilter component to display a list of categories and allow users to filter products by category
function CategoryFilter({
  categories,
  category,
  error,
  onCategoryChange,
}: CategoryFilterProps) {
    // Function to determine the CSS classes for the category buttons based on whether they are selected or not
    function buttonClass(isSelected: boolean) {
        return `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
        isSelected
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-blue-50"
        }`;
  }

  return (
    <div className="min-w-0 w-full">
      <p id="category-label" className="mb-2 text-sm font-medium">
        Categories
      </p>

      <div
        role="group"
        aria-labelledby="category-label"
        className="flex w-full min-w-0 gap-2 overflow-x-auto px-1 py-2"
      >
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          aria-pressed={category === ""}
          className={buttonClass(category === "")}
        >
          All
        </button>

        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => onCategoryChange(item.slug)}
            aria-pressed={category === item.slug}
            className={buttonClass(category === item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default CategoryFilter;