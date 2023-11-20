"use client";
import { type } from "os";
import { ReactNode, createContext, useState } from "react";

type ProductContext = {
    selectedProducts: any[];
    setSelectedProducts: any;
};

export const ProductContext = createContext<ProductContext>({
    selectedProducts: [],
    setSelectedProducts: () => {},
});

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    return (
        <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
