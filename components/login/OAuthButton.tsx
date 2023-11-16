"use client";
import React from "react";

export default function OAuthButton({
    svg,
    text,
    onClick,
}: {
    svg: React.ReactNode;
    text: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="flex items-center border border-gray-400 rounded-md h-12 gap-2 px-4 hover:cursor-pointer hover:border-gray-500"
        >
            <div className="h-5 w-5">{svg}</div>
            <p className="text-sm">{text}</p>
        </div>
    );
}
