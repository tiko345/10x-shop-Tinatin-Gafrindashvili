import { NavLink } from "react-router";

function Footer() {
    return (
        <footer className="border-t border-teal-200 bg-teal-50 text-slate-700 dark:border-teal-900 dark:bg-[#102a26] dark:text-slate-200">
            {/* Stack on mobile and arrange horizontally on larger screens */}
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
                <NavLink
                    to="/"
                    className="rounded text-lg font-bold tracking-tight text-teal-800 transition-colors hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-teal-300 dark:hover:text-teal-200 dark:focus-visible:outline-teal-400"
                >
                    10X Shop
                </NavLink>

                <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                    © {new Date().getFullYear()} 10X Shop. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;