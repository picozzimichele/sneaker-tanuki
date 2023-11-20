"use client";
import ProductCard from "@/components/products/ProductCard";
import { ProductContext } from "@/context/ProductContext";
import dummyDateJSON from "@/data/sneakersDummyData.json"; // dummy data for testing purposes
import { getValuesAndQuantities } from "@/utils/helperFunctions";
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
        selectedProducts.includes(item.id.toString())
    );

    const filteredDataWithQuantity = filteredData.map((item) => {
        const quantity = quantityAndProducts.find(
            (product) => product.value === item.id.toString()
        );
        return { ...item, quantity: quantity?.quantity as number };
    });

    // this should be handled by the server component in a real case scenario since it is more secure
    const totalPrice = filteredDataWithQuantity.reduce(
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
            <div className="py-16 flex flex-col w-full gap-10">
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
                    {filteredDataWithQuantity?.map((item, index) => (
                        <div key={index} className="flex w-full h-40">
                            <div className="bg-gray-200 flex aspect-square">
                                <ProductCard
                                    id={item.id.toString()}
                                    name={item.name}
                                    price={item.price}
                                    imageURL={item.imageURL}
                                    brand={item.brand}
                                    category={item.category}
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-2 px-5">
                                <div>Quantity: {item.quantity}</div>
                                <div>Price: $ {item.price}</div>
                                <button
                                    onClick={() => {
                                        removeProductFromCart(item.id.toString());
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => {
                                        addProductToCart(item.id.toString());
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    {totalPrice > 0 && <div>Total price: $ {totalPrice}</div>}
                </div>
            </div>
        )
    );
}
