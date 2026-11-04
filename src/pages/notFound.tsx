import { Link } from "react-router";

function NotFound() {
    return (
        <section className="mx-auto w-full max-w-xl px-4 py-16">
            {/* Match the soft mint cards used throughout the shop */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center shadow-lg shadow-teal-900/10">
                <p className="text-sm font-semibold tracking-widest text-teal-700">
                    404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-slate-900">
                    Page not found
                </h1>

                <p className="mt-4 text-slate-600">
                    The page you are looking for does not exist.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Go to catalog
                </Link>
            </div>
        </section>
    );
}

export default NotFound;