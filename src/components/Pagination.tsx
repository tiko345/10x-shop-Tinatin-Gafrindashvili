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
    "h-11 rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-40 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white dark:focus-visible:outline-teal-400";

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
            className={`flex h-11 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:focus-visible:outline-teal-400 disabled:cursor-not-allowed disabled:opacity-50 ${page === pageNumber
                ? "bg-teal-700 text-white shadow-sm dark:bg-teal-300 dark:text-teal-950"
                : "text-slate-600 hover:bg-teal-100 hover:text-teal-800 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white"
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