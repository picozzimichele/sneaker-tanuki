"use client";
import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import { ProductContext } from "@/context/ProductContext";
import SneakerSvg from "@/public/svg/sneakerSvg";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

export default function CongratulationPage() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

    // we clear the cart here for convinience to have a good user flow, we could move this into another component and make this a server component and avoid the use client
    useEffect(() => {
        selectedProducts?.length > 0 && setSelectedProducts([]);
    }, [selectedProducts?.length, setSelectedProducts]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col w-full bg-white h-[50vh] min-h-[400px] pt-14 ">
                <div className="flex relative h-full w-full bg-[#638971] rounded-bl-3xl overflow-hidden">
                    <ProductImageWithBlur imageURL="/images/models/sneaker-confirmation.png" />
                    <p className="absolute -top-10 left-0 mx-auto w-[300px] font-bold text-[180px] text-[#536F5C]">
                        TANUKI
                    </p>
                    <p className="absolute -bottom-20 right-0 mx-auto w-[300px] font-bold text-[180px] text-[#536F5C]">
                        TANUKI
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-full bg-[#638971] h-[50vh] min-h-[400px]">
                <div className="flex flex-col w-full h-full bg-white rounded-tr-3xl items-center gap-6 justify-center relative">
                    <div className="h-10 w-10 z-10">
                        <SneakerSvg />
                    </div>
                    <p className="text-center font-light z-10">
                        Congratulation your order has been shipped! <br />
                        Order#944502553
                    </p>
                    <p className="text-[#536F5C] z-10">
                        Step into Style, Confirming Your Stride with Every Order!
                    </p>
                </div>
            </div>
        </div>
    );
}
