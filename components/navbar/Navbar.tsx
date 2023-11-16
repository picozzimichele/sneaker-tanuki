import React from "react";
import UserSvg from "@/public/svg/userSvg";
import MobileButton from "./MobileButton";
import DesktopLink from "./DesktopLink";
import LoginComponent from "./LoginComponent";
import TanukiLogoSvg from "@/public/svg/tanukiLogoSvg";
import { getCurrentUser } from "@/lib/actions/user.actions";
import SneakerSvg from "@/public/svg/sneakerSvg";
import BackButton from "../ui/BackButton";

export default async function Navbar() {
    return (
        <>
            {/* Desktop Navbar */}
            <div className="flex w-full h-14 fixed top-0 bg-white md:border-b z-50">
                <div className="flex md:justify-between justify-end w-[95%] mx-auto items-center">
                    <div className="md:flex gap-20 hidden">
                        <DesktopLink text="Tanuki" href={"/"} />
                    </div>
                    {/* Login Button image */}
                    <LoginComponent />
                </div>
            </div>
        </>
    );
}
