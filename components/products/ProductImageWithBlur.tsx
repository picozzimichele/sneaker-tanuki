"use client";
import React from "react";
import Image from "next/image";

export default function ProductImageWithBlur({
    imageURL,
    objectCover,
}: {
    imageURL: string;
    objectCover?: boolean;
}) {
    return (
        <Image
            alt="listing"
            src={imageURL}
            fill
            className={`${objectCover ? "object-cover" : "object-contain"}  blur-lg`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoadingComplete={(image) => {
                image.classList.remove("blur-lg");
            }}
        />
    );
}
