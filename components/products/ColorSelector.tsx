import Link from "next/link";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function ColorSelector({
    selectedColor,
    color,
    size,
}: {
    selectedColor: string;
    size: number | string;
    color: string;
}) {
    let bgColor;
    switch (color) {
        case "blue":
            bgColor = "bg-blue-700";
            break;
        case "black":
            bgColor = "bg-black";
            break;
        case "white":
            bgColor = "bg-white";
            break;
        case "green":
            bgColor = "bg-green-800";
            break;
        case "brown":
            bgColor = "bg-amber-400";
            break;
    }
    return (
        <Link
            href={`?color=${"blue"}&size=${size}`}
            className="flex w-full max-w-[30px] aspect-square items-center justify-center rounded-full hover:border-gray-800 hover:border-[1.5px] hover:cursor-pointer p-0.5"
        >
            <div className={`${bgColor} h-full w-full rounded-full`}></div>
        </Link>
    );
}
