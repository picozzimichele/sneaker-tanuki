import React from "react";
import Login from "@/components/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign-in",
    description:
        "See your friends' and your own travel timeline. See where you've been and where you're going.",
};

export default function SignIn() {
    return <Login />;
}
