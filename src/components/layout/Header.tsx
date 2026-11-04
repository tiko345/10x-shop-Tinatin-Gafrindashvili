import { NavLink, useNavigate } from "react-router";
import { UserRound, ShoppingCart, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

function Header() {
    //get current user from authentication context
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    //get current theme and toggle function from theme context
    const { theme, toggleTheme } = useTheme();

    // Clear authentication and return to the catalog without changing the cart
    function handleLogout() {
        logout();
        navigate("/", { replace: true });
    }

    // Read the shared cart items
    const { items } = useCart();

    // Count all units rather than the number of different products
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="border-b border-teal-200 bg-teal-50 shadow-sm dark:border-teal-900 dark:bg-[#102a26]">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">

                <NavLink
                    to="/"
                    className="rounded text-2xl font-bold tracking-tight text-teal-800 hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
                >
                    10X Shop
                </NavLink>

                <nav className="flex items-center gap-2 sm:gap-4">
                    <NavLink
                        to={user ? "/profile" : "/login"}
                        aria-label={user ? "Profile" : "Login"}
                        title={user ? "Profile" : "Login"}
                        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white"
                    >
                        <UserRound size={24} />
                    </NavLink>
                    {/* Show Logout only when a user is logged in */}
                    {user !== null && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            aria-label="Log out"
                            title="Log out"
                            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white"
                        >
                            <LogOut size={24} aria-hidden="true" />
                        </button>
                    )}
                    <NavLink
                        to="/cart"
                        aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                        title="Shopping cart"
                        className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white"
                    >
                        <ShoppingCart size={24} aria-hidden="true" />

                        {/* Show the badge only when the cart contains items */}
                        {itemCount > 0 && (
                            <span
                                aria-hidden="true"
                                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1 text-xs font-bold text-white"
                            >
                                {itemCount}
                            </span>
                        )}
                    </NavLink>
                    {/* Show the icon for the theme the button will switch to */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white"
                    >
                        {theme === "light" ? (
                            <Moon size={24} aria-hidden="true" />
                        ) : (
                            <Sun size={24} aria-hidden="true" />
                        )}
                    </button>
                </nav>
            </div>

        </header>
    );
}

export default Header;