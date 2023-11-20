import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/actions/products.actions";
import FilterIconSvg from "@/public/svg/filterIconSvg";
import SneakerSvg from "@/public/svg/sneakerSvg";
import XSvg from "@/public/svg/xSvg";
import Link from "next/link";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Explore({ searchParams }: Props) {
    // we use query params over state because we want to be able to share the link and avoid client components and use server components instead, query params should be validated in production
    const sneakersCategories = ["Nike", "Adidas", "Hushpuppies", "Reebok", "Vans", "Converse"];
    const sortOptions = ["Newest", "Price: High to Low", "Price: Low to High"];

    const categoryParam = (searchParams.category as string) || sneakersCategories[0];
    const sortParam = (searchParams.sort as string) || sortOptions[0];
    const filterParam = (searchParams.filter as string) || "";

    // fetch products based on category and sort params
    const productsResponse = await getAllProducts();
    const productsArray = productsResponse.products;

    // simple logic to filter the products based on the category param and sort them based on the sort param
    const filteredProducts = productsArray
        .filter((product: any) => product.brand.toLowerCase() === categoryParam.toLowerCase())
        .sort((a: any, b: any) => {
            // Newest, we dont have a date added since its dummy data we go by id
            if (sortParam === sortOptions[0]) return b.id - a.id;
            // Price: High to Low
            if (sortParam === sortOptions[1]) return b.price - a.price;
            // Price: Low to High
            if (sortParam === sortOptions[2]) return a.price - b.price;
        });

    return (
        <>
            <div className="w-[95%] flex mx-auto gap-4 py-16">
                {/* Filters For Desktop */}
                <div className="hidden lg:flex flex-col lg:w-[20%] z-20">
                    <div className="flex flex-col fixed">
                        {/* Sneaker */}
                        <p className="font-bold mb-3">Sneakers</p>
                        {sneakersCategories.map((category) => (
                            <div className="flex items-center gap-2" key={category}>
                                {category === categoryParam && (
                                    <div className="border-[0.5px] border-red-700 w-5" />
                                )}
                                <Link
                                    className={`${
                                        category === categoryParam
                                            ? "text-red-700"
                                            : "text-gray-700"
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
                                        sort === sortParam
                                            ? "bg-red-700 border-red-700"
                                            : "border-gray-700"
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
                </div>
                {/* Main Display Grid */}
                <div className="flex-1 flex-col">
                    {/* Mobile Page Title */}
                    <div className="flex justify-between lg:hidden mb-2">
                        <p className="font-bold text-xl">Explore Sneakers</p>
                        <Link
                            className="flex items-center gap-2 group hover:text-red-700"
                            href={`?category=${categoryParam}&sort=${sortParam}&filter=open`}
                        >
                            <p className="text-sm font-medium">Filter</p>
                            <div className="h-3 mt-1">
                                <FilterIconSvg />
                            </div>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {/* Handle a case where there are no shoes available */}
                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col w-full col-span-2 sm:col-span-3 md:col-span-6 gap-4">
                                <div className="flex items-center gap-3">
                                    <p className="text-3xl font-semibold text-pink-500">Whooops!</p>
                                    <div className="h-8 w-8 text-red-700 animate-pulse">
                                        <SneakerSvg />
                                    </div>
                                </div>
                                <p className="text-md md:text-xl max-w-lg font-medium">
                                    It seems that there are no shoes for the chosen brand at the
                                    moment, come back another time or continue exploring other
                                    brands!
                                </p>
                            </div>
                        )}
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
            {/* Filters For Mobile */}
            {filterParam === "open" && (
                <div className="fixed lg:hidden bottom-0 left-0 w-full h-full bg-white z-50">
                    <div className="flex w-full items-end justify-end p-2">
                        <Link
                            className="hover:text-red-700 h-4"
                            href={`?category=${categoryParam}&sort=${sortParam}&filter=close`}
                        >
                            <XSvg />
                        </Link>
                    </div>
                    {/* Repeated code, should be exported as component for simplicity, however right now only used in this page */}
                    <div className="flex flex-col w-full">
                        {/* Sneaker */}
                        <p className="font-bold mb-3">Sneakers</p>
                        {sneakersCategories.map((category) => (
                            <div className="flex items-center gap-2" key={category}>
                                {category === categoryParam && (
                                    <div className="border-[0.5px] border-red-700 w-5" />
                                )}
                                <Link
                                    className={`${
                                        category === categoryParam
                                            ? "text-red-700"
                                            : "text-gray-700"
                                    } text-sm hover:text-red-700`}
                                    href={`?category=${category}&sort=${sortParam}&filter=${filterParam}`}
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
                                        sort === sortParam
                                            ? "bg-red-700 border-red-700"
                                            : "border-gray-700"
                                    } border-[0.5px] aspect-square rounded-full w-3`}
                                ></div>
                                <Link
                                    className={`${
                                        sort === sortParam ? "text-red-700" : "text-gray-700"
                                    } text-sm hover:text-red-700`}
                                    href={`?category=${categoryParam}&sort=${sort}&filter=${filterParam}`}
                                >
                                    {sort}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
