import Link from "next/link";
import React from "react";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function ColorSelector({ selectedColor }: { selectedColor: string }) {
    let color;
    switch (selectedColor) {
        case "blue":
            color = "bg-blue-500";
            break;
        case "red":
            color = "bg-red-500";
            break;
        case "green":
            color = "bg-green-500";
            break;
        case "black":
            color = "bg-black";
            break;
    }
    return (
        <Link
            href={`?color=${"blue"}`}
            className="flex w-full max-w-[30px] aspect-square items-center justify-center rounded-full hover:border-gray-800 hover:border-[1.5px] hover:cursor-pointer p-0.5"
        >
            <div className="bg-green-200 h-full w-full rounded-full"></div>
        </Link>
    );
}
