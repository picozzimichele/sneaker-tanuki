import Register from "@/components/login/Register";
import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getSession } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
    title: "Sign-up",
    description:
        "See your friends' and your own travel timeline. See where you've been and where you're going.",
};

export default async function SignUp() {
    const session = await getSession();
    if (session) redirect("/");

    return <Register />;
}
