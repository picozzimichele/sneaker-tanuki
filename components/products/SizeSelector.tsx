import Link from "next/link";

export default function SizeSelector({ size }: { size: number }) {
    const urlSize = 10;
    return (
        <Link
            href={`?size=${size}`}
            className={`${
                urlSize === size ? "border-gray-800" : "border-gray-400"
            } flex w-full max-w-[40px] aspect-[14/9] items-center justify-center border rounded-sm hover:border-gray-800 hover:cursor-pointer`}
        >
            <p className="text-xs font-semibold text-gray-600">{size}</p>
        </Link>
    );
}
