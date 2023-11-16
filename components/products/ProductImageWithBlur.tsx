"use client";
import React from "react";
import Image from "next/image";

export default function ProductImageWithBlur() {
    return (
        <Image
            alt="listing"
            src={"/images/sneakers/Air-Jordan-1-Retro-High-OG-Royal-Reimagined-Product.avif"}
            fill
            className="object-contain blur-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoadingComplete={(image) => {
                image.classList.remove("blur-lg");
            }}
        />
    );
}
