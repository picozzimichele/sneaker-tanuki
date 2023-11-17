import ColorSelector from "@/components/products/ColorSelector";
import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import SizeSelector from "@/components/products/SizeSelector";
import BackButton from "@/components/ui/BackButton";
import { getProductById } from "@/lib/actions/products.actions";
import { capitalizeString } from "@/utils/helperFunctions";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { id: string };
};

export default async function ProductInfoPage({ searchParams, params }: Props) {
    const colorVariants = ["blue", "green", "black", "red", "brown"];
    const sizeVariants = ["7", "8", "9", "10", "11", "12"];

    const selectedColor = (searchParams.color as string) || colorVariants[2];
    const selectedSize = (searchParams.size as string) || sizeVariants[0];

    const productDetails = await getProductById({ id: params.id });
    const product = productDetails[0];

    // helps with the bg color for the image since not all pictures have the same background color
    let bgColor;
    switch (product.brand.toLowerCase()) {
        case "nike":
            bgColor = "bg-[#F6F6F6]";
            break;
        case "vans":
            bgColor = "bg-gradient-to-t from-[#F0F1F5] to-[#CDD1D6]";
            break;
        case "adidas":
            bgColor = "bg-[#ECEEF0]";
            break;
        case "hushpuppies":
            bgColor = "bg-white";
            break;
        default:
            bgColor = "bg-[#F6F6F6]";
            break;
    }

    return (
        <div className="min-h-screen flex">
            <div className="absolute md:hidden top-2 left-2 z-50 bg-white">
                <BackButton href={"/explore"} />
            </div>
            <div className="flex flex-col min-h-full lg:flex-row w-full justify-between pt-14">
                {/* Product Picture Div */}
                <div className={`flex flex-1 lg:max-w-[50%] ${bgColor}`}>
                    <div className="flex relative w-[90%] items-center justify-center mx-auto">
                        <ProductImageWithBlur imageURL={product.imageURL} />
                    </div>
                </div>
                {/* Info Div */}
                <div className="flex flex-col flex-1 lg:max-w-[50%] relative bg-white pb-5 lg:pb-16">
                    <div className="flex flex-col md:w-[80%] w-[90%] mx-auto justify-between min-h-full">
                        <div className="hidden md:flex ">
                            <BackButton href={"/explore"} />
                        </div>
                        <div className="flex flex-col mt-6 md:mt-0">
                            <p className="text-xs font-bold text-red-700">NEW ARRIVAL</p>
                            {/* Price Info and Gender Model */}
                            <div className="flex justify-between">
                                <p className="text-sm">
                                    {capitalizeString(product.gender)}&apos;s Sneaker
                                </p>
                                <p className="font-semibold">$ {product.price}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <p className="font-bold text-2xl">{product.name}</p>
                        </div>
                        {/* Size & Color selectors using url as state for sharable link and better server components instead of client */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xs hidden lg:block">Select Size</p>
                            <div className="flex w-full flex-wrap gap-3">
                                {sizeVariants.map((size) => (
                                    <SizeSelector
                                        selectedColor={selectedColor}
                                        selectedSize={selectedSize}
                                        size={size}
                                        key={size}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs hidden lg:block">Select Color</p>
                            <div className="flex w-full flex-wrap gap-3">
                                {colorVariants.map((color) => (
                                    <ColorSelector
                                        color={color}
                                        selectedColor={selectedColor}
                                        size={selectedSize}
                                        key={color}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Product Description */}
                        <div className="w-full hidden md:flex">
                            <p className="text-xs">
                                You don&apos;t need a cloak to fly. All you need is AJ1. These are
                                the shoes Miles wears in &quot;Spider-Man: Across the
                                Spider-Verse,&quot; which will be released in theaters this June. A
                                fresh take on Chicago&apos;s iconic colors and a mix of materials,
                                including glossy leather and soft suede. Wear these shoes and save
                                the world.
                            </p>
                        </div>
                        <div className="flex w-full">
                            <div className="flex w-full h-10 bg-blue-600 hover:bg-blue-700 items-center justify-center rounded-md hover:cursor-pointer lg:max-w-[200px]">
                                <p className="text-white text-sm">Add to Cart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
