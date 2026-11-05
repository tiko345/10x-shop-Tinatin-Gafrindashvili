import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserRound, ShoppingCart, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

function Header() {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Track whether the mobile navigation is open
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Count all units in the shared cart
    const itemCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Share styling while setting visibility on each element
    const iconClass =
        "min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white dark:focus-visible:outline-teal-400";

    const menuItemClass =
        "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition-colors hover:bg-teal-100 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white dark:focus-visible:outline-teal-400";

    function closeMenu() {
        setIsMenuOpen(false);
    }

    // Clear authentication and return to the catalog
    function handleLogout() {
        logout();
        closeMenu();
        navigate("/", { replace: true });
    }

    return (
        <header className="border-b border-teal-200 bg-teal-50 shadow-sm dark:border-teal-900 dark:bg-[#102a26]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex items-center justify-between gap-2 py-4">
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className="shrink-0 rounded text-xl font-bold tracking-tight text-teal-800 hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 sm:text-2xl dark:text-teal-300 dark:hover:text-teal-200 dark:focus-visible:outline-teal-400"
                    >
                        10X Shop
                    </NavLink>

                    {/* Show all navigation actions on larger screens */}
                    <nav
                        aria-label="Main navigation"
                        className="hidden items-center gap-4 sm:flex"
                    >
                        <NavLink
                            to={user ? "/profile" : "/login"}
                            aria-label={user ? "Profile" : "Login"}
                            title={user ? "Profile" : "Login"}
                            className={`${iconClass} inline-flex`}
                        >
                            <UserRound size={24} aria-hidden="true" />
                        </NavLink>

                        {user !== null && (
                            <button
                                type="button"
                                onClick={handleLogout}
                                aria-label="Log out"
                                title="Log out"
                                className={`${iconClass} inline-flex cursor-pointer`}
                            >
                                <LogOut size={24} aria-hidden="true" />
                            </button>
                        )}

                        <NavLink
                            to="/cart"
                            onClick={closeMenu}
                            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                            title="Shopping cart"
                            className={`${iconClass} relative inline-flex`}
                        >
                            <ShoppingCart size={24} aria-hidden="true" />

                            {itemCount > 0 && (
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1 text-xs font-bold text-white"
                                >
                                    {itemCount}
                                </span>
                            )}
                        </NavLink>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={
                                theme === "light"
                                    ? "Switch to dark mode"
                                    : "Switch to light mode"
                            }
                            title={
                                theme === "light"
                                    ? "Switch to dark mode"
                                    : "Switch to light mode"
                            }
                            className={`${iconClass} inline-flex cursor-pointer`}
                        >
                            {theme === "light" ? (
                                <Moon size={24} aria-hidden="true" />
                            ) : (
                                <Sun size={24} aria-hidden="true" />
                            )}
                        </button>
                    </nav>

                    {/* Show only the menu button beside the logo on mobile */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        className={`${iconClass} inline-flex cursor-pointer sm:hidden`}
                    >
                        {isMenuOpen ? (
                            <X size={24} aria-hidden="true" />
                        ) : (
                            <Menu size={24} aria-hidden="true" />
                        )}
                    </button>
                </div>

                {/* Show all mobile actions inside the expanded menu */}
                <nav
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                    hidden={!isMenuOpen}
                    className="space-y-1 border-t border-teal-200 py-3 sm:hidden dark:border-teal-900"
                >
                    <NavLink
                        to={user ? "/profile" : "/login"}
                        onClick={closeMenu}
                        className={menuItemClass}
                    >
                        <UserRound size={20} aria-hidden="true" />
                        <span>{user ? "Profile" : "Log in"}</span>
                    </NavLink>

                    <NavLink
                        to="/cart"
                        onClick={closeMenu}
                        className={menuItemClass}
                    >
                        <ShoppingCart size={20} aria-hidden="true" />
                        <span>Cart ({itemCount})</span>
                    </NavLink>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`${menuItemClass} cursor-pointer`}
                    >
                        {theme === "light" ? (
                            <Moon size={20} aria-hidden="true" />
                        ) : (
                            <Sun size={20} aria-hidden="true" />
                        )}
                        <span>
                            {theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"}
                        </span>
                    </button>

                    {user !== null && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={`${menuItemClass} cursor-pointer`}
                        >
                            <LogOut size={20} aria-hidden="true" />
                            <span>Log out</span>
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;