import { Link } from "react-router";

function NotFound() {
    return (
        <section className="mx-auto w-full max-w-xl px-4 py-16">
            {/* Match the card colors to the selected theme */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center shadow-lg shadow-teal-900/10 dark:border-teal-800 dark:bg-[#14332e] dark:text-slate-100 dark:shadow-black/20">
                <p className="text-sm font-semibold tracking-widest text-teal-700 dark:text-teal-300">
                    404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Page not found
                </h1>

                <p className="mt-4 text-slate-600 dark:text-slate-300">
                    The page you are looking for does not exist.
                </p>

                {/* Return to the catalog without reloading the page */}
                <Link
                    to="/"
                    className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-400"
                >
                    Go to catalog
                </Link>
            </div>
        </section>
    );
}

export default NotFound;