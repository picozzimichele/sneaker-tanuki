"use client";
import { ReactNode, createContext, use, useEffect, useState } from "react";
type ProductContext = {
    selectedProducts: any[];
    setSelectedProducts: any;
    propertyAddress: {
        streetAddress: string;
        country: string;
        city: string;
        countryLatitude: number;
        countryLongitude: number;
    };
    setPropertyAddress: any;
};

export const ProductContext = createContext<ProductContext>({
    selectedProducts: [],
    setSelectedProducts: () => {},
    propertyAddress: {
        streetAddress: "",
        country: "",
        city: "",
        countryLatitude: 0,
        countryLongitude: 0,
    },
    setPropertyAddress: () => {},
});

function getSelectedProducts() {
    if (typeof window !== "undefined") {
        const selectedProducts = localStorage.getItem("selectedProducts");
        return selectedProducts ? JSON.parse(selectedProducts) : [];
    }
}

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProducts, setSelectedProducts] = useState(getSelectedProducts());
    const [propertyAddress, setPropertyAddress] = useState({
        streetAddress: "" as string,
        country: "" as string,
        city: "" as string,
        countryLatitude: 0 as number,
        countryLongitude: 0 as number,
    });

    // make local storage persistent
    useEffect(() => {
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    }, [selectedProducts]);
    return (
        <ProductContext.Provider
            value={{ selectedProducts, setSelectedProducts, propertyAddress, setPropertyAddress }}
        >
            {children}
        </ProductContext.Provider>
    );
};
