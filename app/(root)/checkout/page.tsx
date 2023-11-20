"use client";
import { ProductContext } from "@/context/ProductContext";
import dummyDateJSON from "@/data/sneakersDummyData.json"; // dummy data for testing purposes
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    const { selectedProducts } = useContext(ProductContext);
    const [mounted, setMounted] = useState(false);
    console.log(selectedProducts);
    // In a real case scenario with database the call here should be handled by the server component rather than here
    // Since we do not have an actual database call, but only limited dummy data this will do for testing purposes with filtering on the client side that has access to local storage and context
    // fetch products based on category and sort params
    const productDetails = dummyDateJSON;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        // this solves hydratation issue with context, we want to make sure that the context and local storage is available before rendering the page
        mounted && (
            <div className="mt-20">
                {selectedProducts?.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        )
    );
}
