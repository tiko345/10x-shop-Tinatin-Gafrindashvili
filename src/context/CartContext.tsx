import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/products";
import type { CartItem } from "../types/cart";

// Define the state and functions available to components using this context
type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: number) => void;
    setQuantity: (productId: number, quantity: number) => void;
};

// ReactNode allows the provider to receive JSX content through children
type CartProviderProps = {
    children: ReactNode;
};

// null means no provider is available above the component reading the context
const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: CartProviderProps) {
    // Store the shared cart as a typed array, initially empty
    const [items, setItems] = useState<CartItem[]>([]);

    function addItem(product: Product, quantity: number) {
        // Only allow positive whole-number quantities
        if (!Number.isInteger(quantity) || quantity < 1) {
            return;
        }

        // Use a functional update to calculate changes from the latest state
        setItems((currentItems) => {
            // Check whether this product already has a row in the cart
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            // Use the existing quantity if found otherwise start from zero
            const nextQuantity = (existingItem?.quantity ?? 0) + quantity;

            // Reject the addition if the combined quantity exceeds stock
            // Returning the same array leaves state unchanged
            if (nextQuantity > product.stock) {
                return currentItems;
            }

            if (existingItem) {
                // Create a new array and replace only the matching item
                // Spread copies the item before updating its quantity
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: nextQuantity }
                        : item
                );
            }

            // For a new product, create a new array containing the old items
            // followed by the new cart item
            return [...currentItems, { product, quantity }];
        });
    }

    function removeItem(productId: number) {
        // filter creates a new array excluding the product being removed
        setItems((currentItems) =>
            currentItems.filter((item) => item.product.id !== productId)
        );
    }

    function setQuantity(productId: number, quantity: number) {
        // Reject decimals, zero, and negative quantities
        // Removing an item is handled separately by removeItem
        if (!Number.isInteger(quantity) || quantity < 1) {
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) => {
                // Keep other products unchanged
                if (item.product.id !== productId) {
                    return item;
                }

                // Keep this item's current quantity if the request exceeds stock
                if (quantity > item.product.stock) {
                    return item;
                }

                // Copy the matching item and replace its quantity
                // Unlike addItem, this sets the quantity rather than adding to it
                return { ...item, quantity };
            })
        );
    }

    // Share the cart and its operations with all components inside this provider
    return (
        <CartContext.Provider value={{ items, addItem, removeItem, setQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook that gives components convenient access to the cart context
export function useCart() {
    const context = useContext(CartContext);

    // Catch usage outside CartProvider and narrow the TypeScript type
    // from CartContextValue | null to CartContextValue
    if (context === null) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}

export default CartProvider;