import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/products";
import type { CartItem } from "../types/cart";

type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: number) => void;
    setQuantity: (productId: number, quantity: number) => void;
};

type CartProviderProps = {
    children: ReactNode;
};

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addItem(product: Product, quantity: number) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            return;
        }

        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            const nextQuantity = (existingItem?.quantity ?? 0) + quantity;

            if (nextQuantity > product.stock) {
                return currentItems;
            }

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: nextQuantity }
                        : item
                );
            }

            return [...currentItems, { product, quantity }];
        });
    }



    function removeItem(productId: number) {
        setItems((currentItems) =>
            currentItems.filter((item) => item.product.id !== productId)
        );
    }

    function setQuantity(productId: number, quantity: number) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.product.id !== productId) {
                    return item;
                }

                if (quantity > item.product.stock) {
                    return item;
                }

                return { ...item, quantity };
            })
        );
    }
    return (
        <CartContext.Provider value={{ items, addItem, removeItem, setQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}

export default CartProvider;