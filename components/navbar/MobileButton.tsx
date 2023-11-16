"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileButton({
    svg,
    text,
    href,
}: {
    svg: React.ReactNode;
    text: string;
    href: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center hover:cursor-pointer hover:text-blue-900 ${
                isActive ? "text-blue-900 " : ""
            }`}
        >
            <div className="h-5 w-5">{svg}</div>
            <p className="text-[10px] font-semibold">{text}</p>
        </Link>
    );
}
