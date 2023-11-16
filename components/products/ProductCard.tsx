import React from "react";
import ProductImageWithBlur from "./ProductImageWithBlur";
import Link from "next/link";

export default function ProductCard() {
    const testId = "test-id";
    return (
        <Link
            href={`/product/${testId}`}
            className="flex bg-white border border-gray-300 rounded-lg aspect-square"
        >
            <div className="relative h-[70%] w-[70%] m-auto">
                <ProductImageWithBlur />
            </div>
        </Link>
    );
}
