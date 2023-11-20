"use client";
import { ProductContext } from "@/context/ProductContext";
import dummyDateJSON from "@/data/sneakersDummyData.json"; // dummy data for testing purposes
import { getValuesAndQuantities } from "@/utils/helperFunctions";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    // In a real case scenario with database the call here should be handled by the server component rather than here
    // Since we do not have an actual database call, but only limited dummy data this will do for testing purposes with filtering on the client side that has access to local storage and context
    // fetch products based on category and sort params
    const { selectedProducts } = useContext(ProductContext);
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
        return { ...item, quantity: quantity?.quantity };
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        // this solves hydratation issue with context, we want to make sure that the context and local storage is available before rendering the page
        mounted && (
            <div className="py-16">
                {filteredDataWithQuantity?.map((item, index) => (
                    <div key={index}>
                        {item.name} {item.quantity}
                    </div>
                ))}
            </div>
        )
    );
}
