import React from "react";
import ProductImageWithBlur from "./ProductImageWithBlur";
import Link from "next/link";
import { splitName } from "@/utils/helperFunctions";
import { de } from "date-fns/locale";

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
    let bgColor;
    switch (brand.toLowerCase()) {
        case "nike":
            bgColor = "bg-[#F6F6F6]";
            break;
        case "vans":
            bgColor = "bg-gradient-to-t from-[#F0F1F5] to-[#CDD1D6]";
            break;
        case "adidas":
            bgColor = "bg-[#ECEEF0]";
            break;
        default:
            bgColor = "bg-[#F6F6F6]";
            break;
    }

    return (
        <div className="flex flex-col">
            <Link
                href={`/product/${id}`}
                className={`flex ${bgColor} border border-gray-300 hover:border-gray-700 rounded-lg aspect-square`}
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
