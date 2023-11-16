"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LeftArrowSvg from "@/public/svg/leftArrowSvg";

export default function BackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="flex items-center bg-green-100 h-10 group gap-1"
        >
            <div className="h-4 w-4 flex items-center justify-center group-hover:scale-110">
                <LeftArrowSvg />
            </div>
            <p className="text-sm font-bold">BACK</p>
        </button>
    );
}
