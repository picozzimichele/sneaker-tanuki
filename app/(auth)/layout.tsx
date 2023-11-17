import "../globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import AuthProvider from "@/components/login/Providers";
import LoginImage from "@/components/login/LoginImage";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://sneakerdopamine.com"),
    title: {
        default: "Ape Sneaker Marketplace",
        template: `%s | Dopamine Marketplace`,
    },
    description:
        "Dopamine is the coolest sneaker marketplace. Buy and sell sneakers with the community.",
    verification: {
        //google: "google-site-verification=0lG9gDyI6TPzL4dgW6DCgOUpRa5QJwAlMUDwC4UhMd8",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${outfit.className}`}>
                <AuthProvider>
                    <div className="flex w-full min-h-screen justify-between">
                        <div className="flex flex-1 lg:max-w-[50%]">
                            <div className="flex w-[90%] items-center justify-center mx-auto">
                                {children}
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-1 max-w-[50%] relative">
                            <LoginImage />
                        </div>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
