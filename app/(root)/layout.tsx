import AuthProvider from "@/components/login/Providers";
import "../globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://sneakerdopamine.com"),
    title: {
        default: "Coolest Sneaker Marketplace",
        template: `%s | Dopamine Marketplace`,
    },
    description:
        "Dopamine is the coolest sneaker marketplace. Buy and sell sneakers with the community.",
    verification: {
        //google: "google-site-verification=0lG9gDyI6TPzL4dgW6DCgOUpRa5QJwAlMUDwC4UhMd8",
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <AuthProvider>
                    <Navbar />
                    <div className="mt-14">{children}</div>
                </AuthProvider>
            </body>
        </html>
    );
}
