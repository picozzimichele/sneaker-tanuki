import React from "react";
import UserSvg from "@/public/svg/userSvg";
import MobileButton from "./MobileButton";
import DesktopLink from "./DesktopLink";
import LoginComponent from "./LoginComponent";
import TanukiLogoSvg from "@/public/svg/tanukiLogoSvg";
import { getCurrentUser } from "@/lib/actions/user.actions";
import SneakerSvg from "@/public/svg/sneakerSvg";

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
            {/* <div className="flex w-full h-14 bg-white items-center md:hidden fixed bottom-0 border-t z-50">
                <div className="flex w-[90%] mx-auto justify-between">
                    <MobileButton href={"/"} svg={<TanukiLogoSvg />} text="Home" />
                    <MobileButton href={`/explore`} svg={<SneakerSvg />} text="Explore" />
                    <MobileButton
                        href={`/profile/${userId?._id.toString()}`}
                        svg={<UserSvg />}
                        text="Profile"
                    />
                </div>
            </div> */}
        </>
    );
}
