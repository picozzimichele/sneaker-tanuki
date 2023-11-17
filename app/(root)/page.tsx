import ProductHighlight from "@/components/products/ProductHighlight";
import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import { getProductById } from "@/lib/actions/products.actions";
import { splitName } from "@/utils/helperFunctions";

export default async function Home() {
    // have some sort of logic to get the main highlight product from the db, reusing the getProductById action for simplicity
    const getMainHighlightProduct = await getProductById({ id: "2" });
    const getSecondaryHighlightProduct = await getProductById({ id: "5" });
    // this step when fetching from database would not be needed
    const highlightProduct = getMainHighlightProduct[0];
    const secondaryHighlightProduct = getSecondaryHighlightProduct[0];
    console.log(highlightProduct);
    console.log(secondaryHighlightProduct);
    return (
        <main className="flex w-[95%] mx-auto pt-16 min-h-screen pb-10">
            <div className="flex flex-col flex-1 max-w-[30%] aspect-[4/5]">
                {/* Main Product */}
                <ProductHighlight
                    imageURL={highlightProduct.imageURL}
                    name={highlightProduct.name}
                    price={highlightProduct.price}
                />
            </div>
        </main>
    );
}
