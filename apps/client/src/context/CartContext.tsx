import { IProduct } from "@shared/factories/ProductFactory";
import React, { createContext, useState, useContext, ReactNode } from "react";

type CartItem = IProduct & {
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  updateCart: (newCart: CartItem[]) => void;
  getItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart_items")) || []
  );

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart_items", JSON.stringify(newCart || []));
  };

  const getItemsCount = () => {
    return cart.reduce((acc, curr) => {
      acc += curr.quantity;
      return acc;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, getItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("use useCart within CartProvider");
  }
  return context;
};
