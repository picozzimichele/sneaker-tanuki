"use client";
import { ProductContext } from "@/context/ProductContext";
import React, { useContext } from "react";

export default function Page() {
    const { selectedProducts } = useContext(ProductContext);
    console.log(selectedProducts);
    return <div>Checkout</div>;
}
