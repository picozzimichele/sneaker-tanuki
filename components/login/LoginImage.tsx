"use client";
import React from "react";
import Image from "next/image";

export default function LoginImage() {
    return (
        <Image
            src={"/images/travel-login.jpg"}
            alt="user profile picture"
            fill
            className="object-cover blur-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoadingComplete={(image) => {
                image.classList.remove("blur-2xl");
            }}
        />
    );
}
