"use client";
import ProductCard from "@/components/products/ProductCard";
import { useSession } from "next-auth/react";
import React from "react";
import dummyDataJSON from "@/data/sneakersDummyData.json";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session } = useSession();
    // if the user is not logged in, redirect to sign in page in an idal async scenario, here we just return null for simplicity
    if (!session?.user) return null;
    // dummy details for testing purposes, ideally we would fetch userOrder from the database and filter from most recent to oldest
    const productDetails = dummyDataJSON;
    return (
        <div className="py-16 flex flex-col">
            <div className="flex flex-col w-[95%] mx-auto">
                {session?.user && (
                    <div>
                        <p className="text-xl font-bold">
                            Welcome back, {session?.user?.name?.split(" ")[0]}!
                        </p>
                        <p className="text-xs font-light">{session?.user?.email}</p>
                        <p className="text-lg mt-6 font-semibold">Your Orders</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                            {productDetails.products.slice(0, 3).map((product, index) => (
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
                    </div>
                )}
            </div>
        </div>
    );
}
