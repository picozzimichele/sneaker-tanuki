"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";
import UserSvg from "@/public/svg/userSvg";

export default function LoginComponent() {
    const domNode = useClickOutside(() => setOpen(false));
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    return (
        <div ref={domNode} className="relative">
            <div
                onClick={() => setOpen((prevState) => !prevState)}
                className="hover:cursor-pointer md:border md:border-gray-300 rounded-full hover:shadow-lg md:w-[74px] md:pr-1 md:pl-[10px] md:h-[42px] flex justify-between items-center"
            >
                <div className="hidden md:flex">
                    <svg
                        className="fill-current h-[14px] w-[14px]"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </div>
                <div className="flex shrink-0 aspect-square w-8 relative items-center justify-center bg-slate-200 rounded-full">
                    {session?.user?.image ? (
                        <Image
                            src={session?.user?.image || ""}
                            alt="user profile picture"
                            fill
                            className="rounded-full object-cover bg-slate-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="h-5 w-5 text-gray-500">
                            <UserSvg />
                        </div>
                    )}
                </div>
            </div>
            {open && (
                <div className="absolute w-[250px] bg-white drop-shadow-xl top-10 right-0 mt-1 rounded-md py-2 z-50">
                    {session?.user && (
                        <div className="flex flex-col">
                            <Link
                                href={"/profile"}
                                onClick={() => {
                                    setOpen(false);
                                }}
                                className="text-sm px-4 py-2 hover:bg-gray-100 ease-in-out duration-100"
                            >
                                Profile
                            </Link>
                            <Link
                                href={"/explore"}
                                onClick={() => {
                                    setOpen(false);
                                }}
                                className="text-sm px-4 py-2 hover:bg-gray-100 ease-in-out duration-100"
                            >
                                Explore
                            </Link>
                            <p
                                onClick={() => {
                                    signOut();
                                    setOpen(false);
                                }}
                                className="text-sm px-4 py-2 hover:bg-gray-100 ease-in-out duration-100"
                            >
                                Log out
                            </p>
                        </div>
                    )}
                    {!session?.user && (
                        <div className="flex flex-col">
                            <Link
                                href="/sign-in"
                                className="text-sm px-4 py-2 hover:bg-gray-100 ease-in-out duration-100"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/sign-up"
                                className="text-sm px-4 py-2 hover:bg-gray-100 ease-in-out duration-100"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
