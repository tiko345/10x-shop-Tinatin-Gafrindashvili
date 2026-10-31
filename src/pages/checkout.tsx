import { useState, type SubmitEvent } from "react";
import { Navigate, Link } from "react-router";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/cart";

// Define the field names and the type of value each field stores
type CheckoutFields = {
    fullName: string;
    email: string;
    address: string;
    city: string;
};

// Store the completed order separately from the active cart
type OrderSummary = {
    items: CartItem[];
    shipping: CheckoutFields;
    total: number;
};

function Checkout() {
    // Read cart items from the shared CartContext
    const { items, clearCart } = useCart();

    // null means no order has been placed during this visit
    const [order, setOrder] = useState<OrderSummary | null>(null);

    // Prevent further submission once a valid order is being placed
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Store all four controlled input values in one state object
    const [fields, setFields] = useState<CheckoutFields>({
        fullName: "",
        email: "",
        address: "",
        city: "",
    });
    // Each field can have an error message or no error
    type CheckoutErrors = {
        fullName?: string;
        email?: string;
        address?: string;
        city?: string;
    };

    // Store validation messages separately from the input values
    const [errors, setErrors] = useState<CheckoutErrors>({});

    // keyof CheckoutFields allows only the four field names defined above
    function updateField(name: keyof CheckoutFields, value: string) {
        // Use the latest state and create a new object without changing the old one
        setFields((currentFields) => ({
            // Preserve the values of the other fields
            ...currentFields,

            // Update the property matching the supplied field name
            [name]: value,
        }));
    }
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        // Prevent the browser from reloading the page
        event.preventDefault();
        // Ignore submission if an order already exists or the cart is empty
        if (isSubmitting || order !== null || items.length === 0) {
            return;
        }
        // Build a fresh collection of errors for this submission
        const nextErrors: CheckoutErrors = {};

        // trim ensures that spaces alone do not count as a value
        if (fields.fullName.trim() === "") {
            nextErrors.fullName = "Full name is required";
        }

        if (fields.email.trim() === "") {
            nextErrors.email = "Email is required";
        }

        if (fields.address.trim() === "") {
            nextErrors.address = "Address is required";
        }

        if (fields.city.trim() === "") {
            nextErrors.city = "City is required";
        }

        // Replace previous errors so corrected fields lose their messages
        setErrors(nextErrors);

        // Stop submission if any required field is missing
        if (
            nextErrors.fullName ||
            nextErrors.email ||
            nextErrors.address ||
            nextErrors.city
        ) {
            return;
        }

        // Lock submission after validation succeeds
        setIsSubmitting(true);

        // Save the current order before clearing the shared cart
        setOrder({
            items: items.map((item) => ({ ...item })),
            shipping: {
                fullName: fields.fullName.trim(),
                email: fields.email.trim(),
                address: fields.address.trim(),
                city: fields.city.trim(),
            },
            total,
        });

        // Empty the active cart without changing the saved order
        clearCart();
    }
    // Calculate the total using the same discount formula as the Cart page
    const total = items.reduce((sum, { product, quantity }) => {
        const unitPrice =
            product.price * (1 - product.discountPercentage / 100);

        return sum + unitPrice * quantity;
    }, 0);

    // Show the completed order before checking whether the cart is empty
    // Show confirmation before checking whether the cart is empty
    if (order !== null) {
        return (
            <section className="mx-auto w-full max-w-4xl px-4 py-10">
                {/* Stack on mobile and arrange the card horizontally on larger screens */}
                <div className="flex flex-col gap-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="min-w-0">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Thank you!
                        </h1>

                        <p className="mt-3 text-green-700" role="status">
                            Your order has been placed.
                        </p>

                        <p className="mt-2 break-words text-slate-600">
                            Thank you for shopping with us, {order.shipping.fullName}.
                        </p>
                    </div>

                    {/* Separate the order total and navigation from the message */}
                    <div className="flex shrink-0 flex-col gap-4 border-t border-blue-200 pt-6 sm:items-end sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                        <div>
                            <p className="text-sm text-slate-600">
                                Order total
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                                ${order.total.toFixed(2)}
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="rounded-lg bg-blue-700 px-5 py-3 text-center font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // Redirect only when there is no completed order and the cart is empty
    if (items.length === 0) {
        return <Navigate to="/cart" state="checkout-empty" replace />;
    }
    // Keep hooks above conditional returns so they run in the same order
    // Redirect an empty cart and pass a message identifier to the Cart page
    if (items.length === 0) {
        return <Navigate to="/cart" state="checkout-empty" replace />;
    }

    return (
        <section className="mx-auto w-full max-w-xl px-4 py-10">
            <h1 className="text-3xl font-bold">Checkout</h1>

            {/* Prevent submission from reloading the page */}
            {/* Use our React validation instead of browser validation popups */}
            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-4"
            >
                <div>
                    {/* htmlFor connects the label to the input with this id */}
                    <label
                        htmlFor="fullName"
                        className="mb-1 block font-medium"
                    >
                        Full name
                    </label>

                    {/* value reads from state and onChange updates that state */}
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={fields.fullName}
                        onChange={(event) =>
                            updateField("fullName", event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-700" role="alert">
                            {errors.fullName}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1 block font-medium"
                    >
                        Email
                    </label>

                    {/* type email enables browser email validation */}
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={fields.email}
                        onChange={(event) =>
                            updateField("email", event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-700" role="alert">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="mb-1 block font-medium"
                    >
                        Address
                    </label>

                    {/* autoComplete helps the browser suggest a saved address */}
                    <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        required
                        value={fields.address}
                        onChange={(event) =>
                            updateField("address", event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-700" role="alert">
                            {errors.address}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="mb-1 block font-medium"
                    >
                        City
                    </label>

                    {/* address-level2 is the autocomplete hint commonly used for a city */}
                    <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        required
                        value={fields.city}
                        onChange={(event) =>
                            updateField("city", event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-700" role="alert">
                            {errors.city}
                        </p>
                    )}
                </div>
                {/* Display the products being ordered from shared cart state */}
                <section
                    aria-labelledby="order-summary-heading"
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                    <h2
                        id="order-summary-heading"
                        className="text-xl font-semibold"
                    >
                        Order summary
                    </h2>

                    <ul className="mt-4 divide-y divide-gray-200">
                        {items.map(({ product, quantity }) => {
                            // Apply the product discount before multiplying by quantity
                            const unitPrice =
                                product.price * (1 - product.discountPercentage / 100);
                            const lineTotal = unitPrice * quantity;

                            return (
                                <li
                                    key={product.id}
                                    className="flex items-start justify-between gap-4 py-3"
                                >
                                    <div className="min-w-0">
                                        <p className="break-words font-medium">
                                            {product.title}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-600">
                                            ${unitPrice.toFixed(2)} × {quantity}
                                        </p>
                                    </div>

                                    <p className="shrink-0 font-medium">
                                        ${lineTotal.toFixed(2)}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Format the total for display without changing the calculation */}
                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-300 pt-4 text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </section>
                {/* Submit the form through handleSubmit */}
                {/* Disable submission while completing the order */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "Placing order..." : "Place order"}
                </button>
            </form>
        </section>
    );
}

export default Checkout;