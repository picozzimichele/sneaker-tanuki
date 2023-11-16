import React from "react";
import LeftArrowSvg from "@/public/svg/leftArrowSvg";
import Link from "next/link";

export default function BackButton({ href }: { href: string }) {
    return (
        <Link href={href} className="flex items-center bg-green-100 h-10 group gap-1">
            <div className="h-4 w-4 flex items-center justify-center group-hover:scale-110">
                <LeftArrowSvg />
            </div>
            <p className="text-sm font-bold">BACK</p>
        </Link>
    );
}
