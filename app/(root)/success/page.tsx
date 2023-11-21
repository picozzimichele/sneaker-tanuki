"use client";
import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import { ProductContext } from "@/context/ProductContext";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

export default function CongratulationPage() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

    // we clear the cart here for convinience to have a good user flow, we could move this into another component and make this a server component and avoid the use client
    useEffect(() => {
        selectedProducts?.length > 0 && setSelectedProducts([]);
    }, [selectedProducts?.length, setSelectedProducts]);

    return (
        <div className="flex py-16 flex-col">
            <div className="flex flex-col w-[95%] mx-auto">
                <div className="flex w-full relative lg:aspect-video h-[70vh]">
                    <ProductImageWithBlur
                        objectCover={true}
                        imageURL="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <div className="flex absolute h-full w-full bg-cyan-800 opacity-50"></div>
                    <div className="flex flex-col absolute z-10 h-full w-full items-center pt-4">
                        <p className="text-3xl text-center text-white">
                            Step into Style, Confirming Your Stride with Every Order!
                        </p>
                        {/* Dynamic SVG Animated */}
                        <div className="h-8 w-8 text-red-700 mt-6">
                            <g
                                className="svggryno dark:stroke-slate-200 stroke-red-700 dark:fill-slate-200 fill-red-700"
                                strokeWidth="0.05"
                                fill="none"
                                fillRule="nonzero"
                            >
                                <svg
                                    className="svgpathryno"
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 168 128"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M148.235 70.3021L104.348 55.6756C102.066 54.9132 99.9676 53.6842 98.186 52.0669C96.4044 50.4495 94.9789 48.4791 94 46.281L77.2271 7.06249V6.99022C76.0328 4.31127 73.8649 2.18637 71.1626 1.04587C68.4602 -0.0946393 65.4255 -0.165497 62.6729 0.847644L7.95332 20.7135C5.7256 21.5294 3.80167 23.0089 2.44098 24.9523C1.0803 26.8958 0.348319 29.2098 0.34375 31.5822V115.75C0.34375 118.817 1.56194 121.758 3.73033 123.926C5.89872 126.094 8.83968 127.312 11.9062 127.312H156.438C159.504 127.312 162.445 126.094 164.613 123.926C166.782 121.758 168 118.817 168 115.75V97.7269C168 91.6598 166.092 85.7463 162.545 80.8242C158.997 75.902 153.991 72.2209 148.235 70.3021ZM66.6258 11.6875L71.7639 23.7053L56.1834 29.3781C54.9053 29.842 53.8316 30.7415 53.151 31.9186C52.4704 33.0956 52.2264 34.4749 52.462 35.814C52.6975 37.1532 53.3975 38.3664 54.439 39.2406C55.4804 40.1147 56.7966 40.5938 58.1562 40.5937C58.8296 40.5928 59.4975 40.4729 60.1291 40.2396L76.3166 34.3572L79.742 42.357L67.7459 46.693C66.4469 47.1421 65.3504 48.0393 64.6531 49.2237C63.9558 50.4081 63.7032 51.8022 63.9407 53.1559C64.1783 54.5097 64.8903 55.7345 65.9492 56.6108C67.008 57.487 68.3445 57.9574 69.7188 57.9375C70.3921 57.9366 71.06 57.8167 71.6916 57.5834L84.4104 52.9584C85.8691 55.6439 87.7421 58.0827 89.9603 60.1849L79.3084 64.0584C78.0252 64.5187 76.946 65.4177 76.2614 66.5966C75.5768 67.7754 75.3307 69.1583 75.5667 70.501C75.8028 71.8436 76.5057 73.0597 77.5513 73.9344C78.5969 74.809 79.918 75.2861 81.2812 75.2812C81.9539 75.2793 82.6211 75.1619 83.2541 74.9344L103.488 67.5777L144.586 81.2721C147.202 82.1469 149.572 83.6333 151.499 85.6078C153.426 87.5823 154.854 89.9879 155.664 92.625H11.9062V31.5822L66.6258 11.6875ZM11.9062 115.75V104.187H156.438V115.75H11.9062Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </g>
                        </div>
                        <p className="pt-6 font-light text-sm text-white">
                            Congratulation your order has been shipped!
                        </p>
                        <p className="font-light text-sm text-white">Order #944502553</p>
                    </div>
                </div>
                <Link
                    href={"/explore"}
                    className="flex md:max-w-sm w-full h-10 bg-blue-600 hover:bg-blue-700 items-center justify-center rounded-md hover:cursor-pointer mt-10 text-white"
                >
                    Go Back & Explore
                </Link>
            </div>
        </div>
    );
}
