import ProductImageWithBlur from "@/components/products/ProductImageWithBlur";
import { getProductById } from "@/lib/actions/products.actions";

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
        <main className="flex w-[95%] mx-auto pt-16 min-h-screen bg-green-200">
            <div className="bg-gray-100">
                <ProductImageWithBlur imageURL={highlightProduct.imageURL} />
            </div>
        </main>
    );
}
