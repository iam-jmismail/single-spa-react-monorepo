import { IProduct } from "@shared/factories/ProductFactory";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductContextType {
  products: IProduct[];
  updateProducts: (products: IProduct[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>(
    JSON.parse(localStorage.getItem("cart_items")) || []
  );

  const updateProducts = (products: IProduct[]) => {
    setProducts(products);
  };

  return (
    <ProductContext.Provider value={{ updateProducts, products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("use useProduct within ProductProvider");
  }
  return context;
};
