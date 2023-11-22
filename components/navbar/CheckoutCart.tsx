"use client";
import { ProductContext } from "@/context/ProductContext";
import ShoppingCart from "@/public/svg/shoppingCart";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function CheckoutCart() {
    const { selectedProducts } = useContext(ProductContext);
    // this is to make sure that the cart icon is not rendered on the server side
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Link className="hover:text-red-700 h-6 w-6 flex relative" href={"/checkout"}>
            <ShoppingCart />
            {mounted && selectedProducts && selectedProducts?.length > 0 && (
                <div className="flex h-3 absolute -bottom-0.5 -right-1 bg-red-700 rounded-full aspect-square items-center justify-center">
                    <p className="text-[8px] text-white">{selectedProducts?.length}</p>
                </div>
            )}
        </Link>
    );
}
