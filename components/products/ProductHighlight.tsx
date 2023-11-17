import React from "react";
import ProductImageWithBlur from "./ProductImageWithBlur";
import { splitName } from "@/utils/helperFunctions";

export default function ProductHighlight({
    imageURL,
    name,
    price,
}: {
    imageURL: string;
    name: string;
    price: number;
}) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex w-full relative h-full bg-[#F6F6F6]">
                <ProductImageWithBlur imageURL={imageURL} />
            </div>
            <div className="flex w-full items-center justify-end gap-6">
                <p className="font-bold text-xs uppercase">{splitName(name)}</p>
                <p className="text-xs font-light">$ {price}</p>
            </div>
        </div>
    );
}
