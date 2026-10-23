import { NavLink } from "react-router";
import { UserRound, ShoppingCart, Moon } from "lucide-react";


function  Header() {    
    return(
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <NavLink to="/" className="text-2xl font-bold text-blue-600">
                    10X Shop
                </NavLink>
                
                <nav className="flex items-center gap-6">
                <NavLink
                    to="/login"
                    aria-label="Login"
                    title="Login"
                    className="text-gray-700 hover:text-blue-600"
                >
                    <UserRound size={24} />
                </NavLink>          
                 <NavLink
                    to="/cart"
                    aria-label="Shopping cart"
                    title="Shopping cart"
                    className="text-gray-700 hover:text-blue-600"
                >
                    <ShoppingCart size={24} />
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