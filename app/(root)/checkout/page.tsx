"use client";
import GoogleAutosuggest from "@/components/checkout/GoogleAutosuggest";
import ProductCard from "@/components/products/ProductCard";
import { ProductContext } from "@/context/ProductContext";
import dummyDateJSON from "@/data/sneakersDummyData.json"; // dummy data for testing purposes
import MinusSvg from "@/public/svg/minusSvg";
import PlusSvg from "@/public/svg/plusSvg";
import { capitalizeString, getValuesAndQuantities } from "@/utils/helperFunctions";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    // In a real case scenario with database the call here should be handled by the server component rather than here
    // Since we do not have an actual database call, but only limited dummy data this will do for testing purposes with filtering on the client side that has access to local storage and context
    // fetch products based on category and sort params
    const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
    const [mounted, setMounted] = useState(false);

    const quantityAndProducts = getValuesAndQuantities(selectedProducts);
    const productDetails = dummyDateJSON;
    const filteredData = productDetails.products.filter((item) =>
        selectedProducts?.includes(item.id.toString())
    );

    const filteredDataWithQuantity = filteredData?.map((item) => {
        const quantity = quantityAndProducts.find(
            (product) => product.value === item.id.toString()
        );
        return { ...item, quantity: quantity?.quantity as number };
    });

    // this should be handled by the server component in a real case scenario since it is more secure
    const totalPrice = filteredDataWithQuantity?.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
    );

    const removeProductFromCart = (productId: string) => {
        const index = selectedProducts.indexOf(productId);
        if (index > -1) {
            setSelectedProducts((prev: []) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    };

    const addProductToCart = (productId: string) => {
        setSelectedProducts((prev: []) => [...prev, productId]);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        // this solves hydratation issue with context, we want to make sure that the context and local storage is available before rendering the page
        mounted && (
            <div className="py-16 flex flex-col w-full">
                <div className="flex flex-col w-[95%] mx-auto">
                    {/* Empty Product Cart */}
                    {filteredDataWithQuantity?.length === 0 && (
                        <>
                            <Link href={"/explore"} className="text-xl hover:text-red-700">
                                You have no products in your cart. Go back and explore some more!
                            </Link>
                            <div className="flex w-full mt-2">
                                <p>Here below some products that might interest you</p>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-6">
                                {productDetails.products.slice(0, 12).map((product, index) => (
                                    <ProductCard
                                        id={product.id.toString()}
                                        brand={product.brand}
                                        category={product.category}
                                        imageURL={product.imageURL}
                                        price={product.price}
                                        key={product.id}
                                        name={product.name}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {/* Filled Product Cart */}
                    {filteredDataWithQuantity?.length > 0 && (
                        <div className="flex">
                            <p className="text-2xl mb-6 font-bold">Your Items</p>
                        </div>
                    )}
                    <section className="flex flex-col gap-6">
                        {filteredDataWithQuantity?.map((item, index) => (
                            <div key={index} className="flex w-full h-60 border-b pb-10">
                                <div className="flex aspect-square">
                                    <ProductCard
                                        id={item.id.toString()}
                                        name={item.name}
                                        price={item.price}
                                        imageURL={item.imageURL}
                                        brand={item.brand}
                                        category={item.category}
                                    />
                                </div>
                                {/* Buttons and Gender */}
                                <div className="flex flex-1 flex-col justify-center gap-2 px-5">
                                    <div className="flex w-full gap-2 items-center">
                                        <button
                                            onClick={() => {
                                                removeProductFromCart(item.id.toString());
                                            }}
                                            className="bg-blue-200 hover:bg-blue-400 text-white rounded-md flex w-5 h-5 items-center justify-center p-1"
                                        >
                                            <MinusSvg />
                                        </button>
                                        <p className="font-light text-sm">{item.quantity}</p>
                                        <button
                                            onClick={() => {
                                                addProductToCart(item.id.toString());
                                            }}
                                            className="bg-blue-200 hover:bg-blue-400 text-white rounded-md flex w-5 h-5 items-center justify-center p-1"
                                        >
                                            <PlusSvg />
                                        </button>
                                    </div>
                                    <div className="text-sm">{capitalizeString(item.gender)}</div>
                                </div>
                            </div>
                        ))}
                    </section>
                    {totalPrice > 0 && (
                        <div className="mt-20 flex flex-col max-w-lg">
                            <p className="font-bold text-xl">Bill Details:</p>
                            <div className="flex justify-between">
                                <p className="font-light">Shipping</p>
                                <p className="font-light">$ 10</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-light">Items total</p>
                                <p className="font-light">$ {totalPrice}</p>
                            </div>
                        </div>
                    )}
                    {filteredDataWithQuantity?.length > 0 && (
                        <section className="flex flex-col max-w-lg mt-6 gap-3">
                            <p className="font-bold text-xl">Shipping Details:</p>
                            <GoogleAutosuggest />
                            <div></div>
                        </section>
                    )}
                </div>
            </div>
        )
    );
}
