import React from "react";
import DesktopLink from "./DesktopLink";
import LoginComponent from "./LoginComponent";
import CheckoutCart from "./CheckoutCart";

export default async function Navbar() {
    return (
        <>
            {/* Desktop Navbar */}
            <div className="flex w-full h-14 fixed top-0 bg-white md:border-b z-50">
                <div className="flex md:justify-between justify-end w-[95%] mx-auto items-center">
                    <div className="md:flex gap-20 hidden">
                        <DesktopLink text="TANUKI" href={"/"} />
                    </div>
                    {/* Login & Cart */}
                    <div className="flex  gap-3 md:gap-8 items-center">
                        {/* Checkout Icon */}
                        <CheckoutCart />
                        {/* Login Component */}
                        <LoginComponent />
                    </div>
                </div>
            </div>
        </>
    );
}
