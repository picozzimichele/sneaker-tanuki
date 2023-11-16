import React from "react";
import ProductImageWithBlur from "./ProductImageWithBlur";
import Link from "next/link";

export default function ProductCard() {
    const testId = "test-id";
    return (
        <div className="flex flex-col">
            <Link
                href={`/product/${testId}`}
                className="flex bg-white border border-gray-300 hover:border-gray-700 rounded-lg aspect-square"
            >
                <div className="relative h-[70%] w-[70%] m-auto">
                    <ProductImageWithBlur />
                </div>
            </Link>
            {/* Details and Price */}
            <div className="flex w-full flex-col">
                <p className="font-medium">Item Name</p>
                <p className="text-gray-500 font-light text-xs">$ 350</p>
            </div>
        </div>
    );
}
