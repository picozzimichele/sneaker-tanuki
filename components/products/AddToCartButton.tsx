"use client";
import { ProductContext } from "@/context/ProductContext";
import React, { useContext } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
    const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

    // Adding function to add product to cart, the logic now is simple, just adding the ID to the array, more logic could be implemented here
    const addProductToCart = () => {
        setSelectedProducts((prev: []) => [...prev, productId]);
    };

    return (
        <button
            onClick={() => addProductToCart()}
            className="flex w-full h-10 bg-blue-600 hover:bg-blue-700 items-center justify-center rounded-md hover:cursor-pointer lg:max-w-[200px]"
        >
            <p className="text-white text-sm">Add to Cart</p>
        </button>
    );
}
