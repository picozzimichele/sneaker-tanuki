"use client";

import GoogleSvg from "@/public/svg/googleSvg";
import MailSvg from "@/public/svg/mailSvg";
import PasswordSvg from "@/public/svg/passwordSvg";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GithubSvg from "@/public/svg/githubSvg";
import OAuthButton from "./OAuthButton";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill out all fields");
            return;
        }

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            //check if there are any errors with email and password
            if (res?.error) {
                setError("Incorrect email or password");
                return;
            }

            router.push("/");
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        <div className="flex w-full flex-col md:max-w-md gap-6">
            {/* Title */}
            <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-2xl font-semibold">Welcome Back</p>
                <p className="text-sm font-light text-gray-500">
                    To proceed, select a method to login
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
            {/* Continue with email */}
            <div className="flex w-full items-center gap-4">
                <div className="flex-1 bg-gray-500 h-[1px]" />
                <p className="text-sm text-gray-500 font-light">or continue with email</p>
                <div className="flex-1 bg-gray-500 h-[1px]" />
            </div>
            {/* Login Form Email*/}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                <button className="btn-grad flex border h-14 items-center rounded-xl px-4 gap-4 text-center justify-center text-white font-light">
                    Continue
                </button>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <div className="flex w-full justify-between">
                    <Link className="text-xs hover:text-gray-700" href="/forgot-password">
                        Forgot password?
                    </Link>
                    <Link className="text-xs hover:text-gray-700" href="/sign-up">
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    );
}
