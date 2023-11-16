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
    return <div>ProductInfoPage</div>;
}
