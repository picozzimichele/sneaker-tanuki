import Link from "next/link";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function ColorSelector() {
    return (
        <Link
            href={`?color=${"blue"}`}
            className="flex w-full max-w-[40px] aspect-[14/9] items-center justify-center border border-gray-400 rounded-sm hover:border-gray-800 hover:cursor-pointer"
        >
            <p className="text-xs font-semibold text-gray-600">1</p>
        </Link>
    );
}
