import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "@/src/lib/providers/TanstackQueryProvider";
import {Toaster} from "@/components/ui/sonner";
import {Suspense} from "react";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "Cardii",
    description: "cardii web app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${dmSans.variable} font-sans antialiased`}>
        <TanstackQueryProvider>
            <Suspense>
                {children}
                <Toaster position={"top-center"} duration={4000} />
            </Suspense>
        </TanstackQueryProvider>
        </body>
        </html>
    );
}
