import ProductHighlight from "@/components/products/ProductHighlight";
import { getProductById } from "@/lib/actions/products.actions";
import Link from "next/link";

export default async function Home() {
    // have some sort of logic to get the main highlight product from the db, reusing the getProductById action for simplicity
    const getMainHighlightProduct = await getProductById({ id: "2" });
    const getSecondaryHighlightProduct = await getProductById({ id: "5" });
    // this step when fetching from database would not be needed
    const highlightProduct = getMainHighlightProduct[0];
    const secondaryHighlightProduct = getSecondaryHighlightProduct[0];
    return (
        <Link href={"/explore"} className="flex w-[95%] h-full mx-auto pt-16 min-h-screen pb-10">
            <div className="flex flex-col md:flex-row w-full mx-auto gap-6 md:gap-0">
                {/* Column Logo and Subtitles */}
                <div className="hidden lg:flex w-[10%] flex-col">
                    <div className="h-[30%] pt-[60px]">
                        <p className="-rotate-90 text-xl font-bold">TANUKI</p>
                    </div>
                    <div className="flex flex-col flex-1 items-center justify-end pb-20">
                        <div>
                            <p className="text-xs font-bold">CRAZY</p>
                            <p className="text-xs font-bold">NEW</p>
                            <p className="text-xs font-bold">SNEAKERS</p>
                            <br />
                            <p className="text-xs font-bold">HOME</p>
                            <p className="text-xs font-bold">EXPLORE</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-full min-h-full md:w-[40%] md:pr-10">
                    <div className="flex flex-col h-full w-full">
                        {/* Main Product */}
                        <ProductHighlight
                            imageURL={highlightProduct.imageURL}
                            name={highlightProduct.name}
                            price={highlightProduct.price}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full h-full min-h-full md:w-[20%]">
                    <div className="flex flex-col w-full md:h-1/2 h-full">
                        <ProductHighlight
                            objectCover={true}
                            imageURL={"/images/models/model-1.webp"}
                            name={"Sneakers blaze"}
                            price={175}
                        />
                    </div>
                    <div className="flex flex-col justify-end w-full flex-1 ">
                        <p className="text-3xl underline font-extralight">
                            Are you <br className="hidden md:flex" /> A shoes{" "}
                            <br className="hidden md:flex" />
                            Addict ?
                        </p>
                    </div>
                </div>
                <div className="items-end justify-end flex flex-col h-full min-h-full md:pl-20 pb-16 md:pb-0">
                    <div className="flex flex-col w-full h-full md:h-1/2">
                        {/* Main Product */}
                        <ProductHighlight
                            imageURL={secondaryHighlightProduct.imageURL}
                            name={secondaryHighlightProduct.name}
                            price={secondaryHighlightProduct.price}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}
