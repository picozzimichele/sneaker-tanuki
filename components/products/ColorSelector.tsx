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
        case "red":
            bgColor = "bg-red-700";
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
            href={`?color=${color}&size=${size}`}
            className={`${
                color === selectedColor ? "border-gray-800 border-[1.5px]" : ""
            } flex w-full max-w-[30px] aspect-square items-center justify-center rounded-full hover:border-gray-800 hover:border-[1.5px] hover:cursor-pointer p-0.5`}
        >
            <div className={`${bgColor} h-full w-full rounded-full`}></div>
        </Link>
    );
}
