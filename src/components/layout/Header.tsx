import { NavLink } from "react-router";
import { UserRound, ShoppingCart, Moon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Header() {
    //get current user from authentication context
    const { user } = useAuth();

    // Read the shared cart items
    const { items } = useCart();

    // Count all units rather than the number of different products
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <NavLink to="/" className="text-2xl font-bold text-blue-600">
                    10X Shop
                </NavLink>

                <nav className="flex items-center gap-6">
                    <NavLink
                        to={user ? "/profile" : "/login"}
                        aria-label={user ? "Profile" : "Login"}
                        title={user ? "Profile" : "Login"}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        <UserRound size={24} />
                    </NavLink>
                    <NavLink
                        to="/cart"
                        aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                        title="Shopping cart"
                        className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded text-gray-700 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <ShoppingCart size={24} aria-hidden="true" />

                        {/* Show the badge only when the cart contains items */}
                        {itemCount > 0 && (
                            <span
                                aria-hidden="true"
                                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white"
                            >
                                {itemCount}
                            </span>
                        )}
                    </NavLink>
                    <button
                        type="button"
                        aria-label="Toggle theme"
                        title="Toggle theme"
                        className="cursor-pointer text-gray-700 hover:text-blue-600"
                    >
                        <Moon size={24} />
                    </button>
                </nav>
            </div>

        </header>
    );
}

export default Header;