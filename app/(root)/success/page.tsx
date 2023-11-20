"use client";
import { ProductContext } from "@/context/ProductContext";
import React, { use, useContext, useEffect } from "react";

export default function CongratulationPage() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

    // we clear the cart here for convinience to have a good user flow
    useEffect(() => {
        selectedProducts?.length > 0 && setSelectedProducts([]);
    }, [selectedProducts?.length, setSelectedProducts]);
    return (
        <div className="flex py-16 flex-col">
            <div className="flex flex-col w-[95%] mx-auto">page</div>
        </div>
    );
}
