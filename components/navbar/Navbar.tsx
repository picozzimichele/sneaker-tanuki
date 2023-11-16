import React from "react";
import UserSvg from "@/public/svg/userSvg";
import MobileButton from "./MobileButton";
import WorldMap from "@/public/svg/worldMap";
import DesktopLink from "./DesktopLink";
import LoginComponent from "./LoginComponent";
import TanukiLogoSvg from "@/public/svg/tanukiLogoSvg";
import { getCurrentUser } from "@/lib/actions/user.actions";

export default async function Navbar() {
    const user = await getCurrentUser();
    const userId = user?._id;
    return (
        <>
            {/* Desktop Navbar */}
            <div className="flex w-full h-14 fixed top-0 bg-white border-b z-50">
                <div className="flex md:justify-between justify-end w-[95%] mx-auto items-center">
                    <div className="md:flex gap-20 hidden">
                        <DesktopLink text="Tanuki" href={"/"} />
                    </div>
                    {/* Login Button image */}
                    <LoginComponent />
                </div>
            </div>
            {/* Mobile Navbar */}
            <div className="flex w-full h-14 bg-white items-center md:hidden fixed bottom-0 border-t z-50">
                <div className="flex w-[90%] mx-auto justify-between">
                    <MobileButton href={"/"} svg={<TanukiLogoSvg />} text="Home" />
                    <MobileButton
                        href={`/travels/${userId?._id.toString()}`}
                        svg={<WorldMap />}
                        text="Travels"
                    />
                    <MobileButton
                        href={`/profile/${userId?._id.toString()}`}
                        svg={<UserSvg />}
                        text="Profile"
                    />
                </div>
            </div>
        </>
    );
}
