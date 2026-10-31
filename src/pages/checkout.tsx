import { Navigate } from "react-router";
import { useCart } from "../context/CartContext";

function Checkout() {
    const { items } = useCart();

    // Return to the cart when there are no products to order
    if (items.length === 0) {
        return <Navigate to="/cart" state="checkout-empty" replace />;
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-bold">Checkout</h1>
        </section>
    );
}

export default Checkout;