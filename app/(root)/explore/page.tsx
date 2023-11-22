import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/actions/products.actions";
import FilterIconSvg from "@/public/svg/filterIconSvg";
import SneakerMobileSvg from "@/public/svg/sneakerMobileSvg";
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
            <div className="w-[95%] flex mx-auto gap-4 md:py-16 pt-14">
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
                <div className="flex w-full flex-col">
                    {/* Mobile Page Title */}
                    <div className="flex items-center w-full lg:hidden mb-2">
                        <div className="h-5 w-5 mb-1">
                            <SneakerMobileSvg />
                        </div>
                        <p className="font-bold text-xl">Sneak-ers</p>
                    </div>
                    {/* Filters for Mobile */}
                    <div className="flex gap-3 lg:hidden mb-2 overflow-x-scroll scrollbar-hide">
                        {sortOptions.map((sort) => (
                            <Link
                                key={sort}
                                className={`${
                                    sort === sortParam ? "bg-[#B9F637]" : "bg-gray-200"
                                } rounded-md p-1 text-sm`}
                                href={`?category=${categoryParam}&sort=${sort}&filter=${filterParam}`}
                            >
                                {sort}
                            </Link>
                        ))}
                    </div>
                    <div className="flex gap-3 lg:hidden mb-2 overflow-x-scroll scrollbar-hide">
                        {sneakersCategories.map((category) => (
                            <Link
                                key={category}
                                className={`${
                                    category === categoryParam ? "bg-[#B9F637]" : "bg-gray-200"
                                } rounded-md p-1 text-sm`}
                                href={`?category=${category}&sort=${sortParam}&filter=${filterParam}`}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                    {/* Sneaker display */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {/* Handle a case where there are no shoes available */}
                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col w-full col-span-2 sm:col-span-3 md:col-span-6 gap-4 mt-6">
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
        </>
    );
}
