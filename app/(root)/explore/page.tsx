import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/actions/products.actions";
import Link from "next/link";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Explore({ searchParams }: Props) {
    // we use query params over state because we want to be able to share the link and avoid client components and use server components instead, query params should be validated in production
    const sneakersCategories = ["Nike", "Adidas", "Puma", "Reebok", "Vans", "Converse"];
    const sortOptions = ["Newest", "Price: High to Low", "Price: Low to High"];

    const categoryParam = (searchParams.category as string) || sneakersCategories[0];
    const sortParam = (searchParams.sort as string) || sortOptions[0];

    //TODO: fetch products based on category and sort params
    const productsResponse = await getAllProducts();
    const productsArray = productsResponse.products;

    // simple logic to filter the products based on the category param and sort them based on the sort param
    const filteredProducts = productsArray
        .filter((product: any) => product.brand.toLowerCase() === categoryParam.toLowerCase())

        .sort((a: any, b: any) => {
            // Price: High to Low
            if (sortParam === sortOptions[1]) return b.price - a.price;
            // Price: Low to High
            if (sortParam === sortOptions[2]) return a.price - b.price;
        });
    console.log(filteredProducts);

    return (
        <div className="w-[95%] flex mx-auto gap-4 py-16">
            {/* Filters */}
            <div className="hidden lg:flex flex-col lg:w-[20%] z-20">
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
                        <div
                            className={`${
                                sort === sortParam ? "bg-red-700 border-red-700" : "border-gray-700"
                            } border-[0.5px] aspect-square rounded-full w-3`}
                        ></div>
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
                    {filteredProducts.map((product: any) => (
                        <ProductCard
                            id={product.id}
                            brand={product.brand}
                            category={product.category}
                            imageURL={product.imageURL}
                            price={product.price}
                            key={product.id}
                            name={product.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
