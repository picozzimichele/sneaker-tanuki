"use client";
import { ReactNode, createContext, useState } from "react";

export const ProductContext = createContext({});

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProcuts, setSelectedProducts] = useState([]);
    return (
        <ProductContext.Provider value={{ selectedProcuts }}>{children}</ProductContext.Provider>
    );
};
