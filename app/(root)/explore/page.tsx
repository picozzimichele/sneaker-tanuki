import ProductCard from "@/components/products/ProductCard";
import React from "react";

export default async function Explore() {
    return (
        <div className="w-[95%] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <ProductCard key={item} />
            ))}
        </div>
    );
}
