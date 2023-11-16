import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import BackButton from "@/components/ui/BackButton";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { id: string };
};

export default async function ProductInfoPage({ searchParams, params }: Props) {
    // const productDetails = await fetchProductDetails({
    //     productId: params.id,
    //     isClient: false,
    // });
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen justify-between">
            {/* Product Picture Div */}
            <div className="flex flex-1 lg:max-w-[50%]">
                <div className="flex relative w-[90%] items-center justify-center mx-auto">
                    <ProductImageWithBlur />
                </div>
            </div>
            {/* Info Div */}
            <div className="flex flex-col flex-1 lg:max-w-[50%] relative bg-gray-100">
                <BackButton />
                <div className="flex">
                    <p className="text-xs font-bold">NEW</p>
                </div>
                {/* Price Info and Gender Model */}
                <div className="flex justify-between">
                    <p className="text-sm">Men&apos;s Sneaker</p>
                    <p className="font-semibold">$ 350</p>
                </div>
                <div className="flex">
                    <p className="font-bold text-2xl">Nike Air Max 270</p>
                </div>
            </div>
        </div>
    );
}
