"use client";
import GoogleAutosuggest from "@/components/checkout/GoogleAutosuggest";
import ProductCard from "@/components/products/ProductCard";
import { ProductContext } from "@/context/ProductContext";
import dummyDataJSON from "@/public/data/sneakersDummyData.json"; // dummy data for testing purposes
import MinusSvg from "@/public/svg/minusSvg";
import PlusSvg from "@/public/svg/plusSvg";
import { capitalizeString, getValuesAndQuantities } from "@/utils/helperFunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    // In a real case scenario with database the call here should be handled by the server component rather than here
    // Since we do not have an actual database call, but only limited dummy data this will do for testing purposes with filtering on the client side that has access to local storage and context
    // fetch products based on category and sort params
    const router = useRouter();
    const { selectedProducts, setSelectedProducts, propertyAddress } = useContext(ProductContext);
    const [mounted, setMounted] = useState(false);

    const quantityAndProducts = getValuesAndQuantities(selectedProducts);
    const productDetails = dummyDataJSON;
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

    // we clear the cart here for convinience
    const completeOrder = () => {
        router.push("/success");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        // this solves hydratation issue with context, we want to make sure that the context and local storage is available before rendering the page
        mounted && (
            <div className="pt-16 pb-8 flex flex-col w-full h-full min-h-screen">
                <div className="flex flex-1 flex-col w-[95%] mx-auto">
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
                    {filteredDataWithQuantity?.length > 0 && (
                        <section className="flex flex-col max-w-lg mt-6 gap-3">
                            <p className="font-bold text-xl">Shipping Details:</p>
                            <GoogleAutosuggest />
                        </section>
                    )}
                    {totalPrice > 0 && (
                        <section className="mt-6 flex flex-col flex-1 h-full max-w-lg justify-between">
                            <div className="flex flex-col">
                                <p className="font-bold text-xl">Bill Details:</p>
                                <div className="flex justify-between">
                                    <p className="font-light text-sm">Shipping</p>
                                    <p className="font-light text-sm">$ 10</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-light text-sm">Items total</p>
                                    <p className="font-light text-sm">$ {totalPrice}</p>
                                </div>
                            </div>
                            <button
                                disabled={totalPrice === 0 || !propertyAddress.streetAddress.length}
                                onClick={() => completeOrder()}
                                className="flex w-full h-10 bg-blue-600 hover:bg-blue-700 items-center justify-center rounded-md hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:bg-gray-300 mt-10"
                            >
                                <p className="text-white text-sm">Proceed to payment</p>
                            </button>
                        </section>
                    )}
                </div>
            </div>
        )
    );
}
