"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DesktopLink({ text, href }: { text: string; href: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            className={`flex flex-col items-center justify-center hover:cursor-pointer hover:text-blue-900 text-sm ${
                isActive ? "text-blue-900 " : ""
            }`}
            href={href}
        >
            {text}
        </Link>
    );
}
