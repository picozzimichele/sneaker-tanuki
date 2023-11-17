import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Explore({ searchParams }: Props) {
    // we use query params over state because we want to be able to share the link and avoid client components and use server components instead
    const sneakersCategories = ["Nike", "Adidas", "Puma", "Reebok", "Vans", "Converse"];
    const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

    const categoryParam = (searchParams.category as string) || sneakersCategories[0];
    const sortParam = (searchParams.sort as string) || sortOptions[0];

    return (
        <div className="w-[95%] flex mx-auto gap-4 py-16">
            {/* Filters */}
            <div className="hidden lg:flex flex-col lg:w-[25%] bg-green-200">
                {/* Sneaker */}
                <p className="font-bold mb-3">Sneakers</p>
                {sneakersCategories.map((category) => (
                    <div className="flex items-center gap-2" key={category}>
                        {category === categoryParam && (
                            <div className="border-[0.5px] border-red-700 w-5" />
                        )}
                        <Link
                            className={`${
                                category === categoryParam ? "text-red-700" : "text-gray-700"
                            } text-sm hover:text-red-700`}
                            href={`?category=${category}&sort=${sortParam}`}
                        >
                            {category}
                        </Link>
                    </div>
                ))}
                {/* Sort Options */}
                <p className="font-bold mt-6 mb-3">Sort</p>
                {sortOptions.map((sort) => (
                    <div className="flex items-center gap-2" key={sort}>
                        {sort === sortParam && (
                            <div className="border-[0.5px] aspect-square rounded-full border-red-700 w-3"></div>
                        )}
                        <Link
                            className={`${
                                sort === sortParam ? "text-red-700" : "text-gray-700"
                            } text-sm hover:text-red-700`}
                            href={`?category=${categoryParam}&sort=${sort}`}
                        >
                            {sort}
                        </Link>
                    </div>
                ))}
            </div>
            {/* Main Display Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <ProductCard key={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
