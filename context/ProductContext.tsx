"use client";
import { ReactNode, createContext, use, useEffect, useState } from "react";
type ProductContext = {
    selectedProducts: any[];
    setSelectedProducts: any;
};

export const ProductContext = createContext<ProductContext>({
    selectedProducts: [],
    setSelectedProducts: () => {},
});

function getSelectedProducts() {
    if (typeof window !== "undefined") {
        const selectedProducts = localStorage.getItem("selectedProducts");
        return selectedProducts ? JSON.parse(selectedProducts) : [];
    }
}

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProducts, setSelectedProducts] = useState(getSelectedProducts());

    // make local storage persistent
    useEffect(() => {
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    }, [selectedProducts]);
    return (
        <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
