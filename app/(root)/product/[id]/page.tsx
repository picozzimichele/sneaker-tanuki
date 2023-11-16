import ColorSelector from "@/components/products/ColorSelector";
import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import SizeSelector from "@/components/products/SizeSelector";
import BackButton from "@/components/ui/BackButton";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { id: string };
};

export default async function ProductInfoPage({ searchParams, params }: Props) {
    const colorVariants = ["blue", "green", "black", "white", "brown"];
    const sizeVariants = ["7", "8", "9", "10", "11", "12"];

    const selectedColor = (searchParams.color as string) || "black";
    const selectedSize = (searchParams.size as string) || "7";

    // const productDetails = await fetchProductDetails({
    //     productId: params.id,
    //     isClient: false,
    // });
    return (
        <div className="min-h-screen flex">
            <div className="flex flex-col min-h-full lg:flex-row w-full justify-between mt-14">
                {/* Product Picture Div */}
                <div className="flex flex-1 lg:max-w-[50%]">
                    <div className="flex relative w-[90%] items-center justify-center mx-auto">
                        <ProductImageWithBlur />
                    </div>
                </div>
                {/* Info Div */}
                <div className="flex flex-col flex-1 lg:max-w-[50%] relative bg-gray-100 pb-20">
                    <div className="flex flex-col md:w-[80%] w-[90%] mx-auto justify-between min-h-full">
                        <BackButton href={"/explore"} />
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
                        {/* Size & Color selectors using url as state for sharable link and better server components instead of client */}
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
                        {/* Product Description */}
                        <div className="flex w-full">
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
                            <div className="flex w-full h-10 btn-grad items-center justify-center rounded-md hover:cursor-pointer lg:max-w-[200px]">
                                <p className="text-white text-sm">Add to Cart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
