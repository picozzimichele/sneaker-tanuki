import React from "react";
import ProductImageWithBlur from "./ProductImageWithBlur";
import Link from "next/link";
import { splitName } from "@/utils/helperFunctions";

export default function ProductCard({
    id,
    name,
    price,
    imageURL,
    brand,
    category,
}: {
    id: string;
    name: string;
    price: number;
    imageURL: string;
    brand: string;
    category: string;
}) {
    return (
        <div className="flex flex-col">
            <Link
                href={`/product/${id}`}
                className="flex bg-[#F6F6F6] border border-gray-300 hover:border-gray-700 rounded-lg aspect-square"
            >
                <div className="relative h-[70%] w-[70%] m-auto">
                    <ProductImageWithBlur imageURL={imageURL} />
                </div>
            </Link>
            {/* Details and Price */}
            <div className="flex w-full flex-col">
                <p className="font-medium">{splitName(name)}</p>
                <p className="text-gray-500 font-light text-xs">$ {price}</p>
            </div>
        </div>
    );
}
