"use client";

import Link from "next/link";
import { useState } from "react";
import GoogleSvg from "@/public/svg/googleSvg";
import MailSvg from "@/public/svg/mailSvg";
import PasswordSvg from "@/public/svg/passwordSvg";
import UserSvg from "@/public/svg/userSvg";
import { usePathname, useRouter } from "next/navigation";
import { RegisterUserWithEmail, FetchUserId } from "@/lib/actions/user.actions";
import OAuthButton from "./OAuthButton";
import { signIn } from "next-auth/react";
import GithubSvg from "@/public/svg/githubSvg";

export default function Register() {
    const pathname = usePathname();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!email || !password || !fullName) {
            setError("Please fill out all fields");
            return;
        }

        try {
            //check if mail has already been registered
            const userId = await FetchUserId({ email: email, isClient: true });
            if (userId) {
                setError("Email already exists");
                return;
            }

            //register user
            await RegisterUserWithEmail({ email, password, fullName });
            //redirect to sign in page if all is good
            router.push("/sign-in");
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        <div className="flex w-full flex-col md:max-w-md gap-6">
            {/* Title */}
            <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-2xl font-semibold">Welcome To Tanuki</p>
                <p className="text-sm font-light text-gray-500">
                    To proceed, select a method to register
                </p>
            </div>
            {/* Login Options */}
            <div className="flex flex-wrap items-center justify-center gap-4">
                <OAuthButton
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    svg={<GoogleSvg />}
                    text="Google"
                />
                <OAuthButton
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    svg={<GithubSvg />}
                    text="Github"
                />
            </div>
            {/* Register with email */}
            <div className="flex w-full items-center gap-4">
                <div className="flex-1 bg-gray-500 h-[1px]" />
                <p className="text-sm text-gray-500 font-light">or register with email</p>
                <div className="flex-1 bg-gray-500 h-[1px]" />
            </div>
            {/* Login Form Email*/}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex border h-14 items-center rounded-xl bg-gray-50 px-4 gap-4">
                    <div className="h-5 w-5 text-gray-400">
                        <UserSvg />
                    </div>
                    <input
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        className="w-full focus:outline-none text-gray-500 text-sm font-normal bg-gray-50 "
                        placeholder="Full Name"
                    />
                </div>
                <div className="flex border h-14 items-center rounded-xl bg-gray-50 px-4 gap-4">
                    <div className="h-5 w-5 text-gray-400">
                        <MailSvg />
                    </div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full focus:outline-none text-gray-500 text-sm font-normal bg-gray-50 "
                        placeholder="Email"
                    />
                </div>
                <div className="flex border h-14 items-center rounded-xl bg-gray-50 px-4 gap-4">
                    <div className="h-5 w-5 text-gray-400">
                        <PasswordSvg />
                    </div>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full focus:outline-none text-gray-500 text-sm font-normal bg-gray-50 "
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="btn-grad flex border h-14 items-center rounded-xl px-4 gap-4 text-center justify-center text-white font-light"
                >
                    Register
                </button>
                {/* Error Message */}
                {error && <p className="text-xs text-red-600">{error}</p>}
                <div className="flex w-full justify-between">
                    <p className="text-xs">Already have an account?</p>
                    <Link className="text-xs hover:text-gray-700" href="/sign-in">
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
}
