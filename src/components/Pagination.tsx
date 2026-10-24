// Pagination component to navigate through pages of products
type PaginationProps = {
  page: number;
  pageCount: number;
  loading: boolean;
  onPageChange: (page: number) => void;
};
// Pagination component to navigate through pages of products
function Pagination({
  page,
  pageCount,
  loading,
  onPageChange,
}: PaginationProps) {// Function to handle page changes and call the onPageChange prop
  if (pageCount <= 1) return null;

  const navigationClass =
    "h-9 rounded-md px-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Product pages"
      className="mt-8 flex flex-wrap justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={loading || page <= 1}
        className={navigationClass}
      >
        Previous
      </button>

      {Array.from({ length: pageCount }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
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
        onClick={() => onPageChange(page + 1)}
        disabled={loading || page >= pageCount}
        className={navigationClass}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;