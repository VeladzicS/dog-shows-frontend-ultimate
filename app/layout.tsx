import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair_display",
    subsets: ["latin"],
    weight: ["700", "900"],
    preload: true,
    display: "swap",
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    preload: true,
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Dog Show Results | ShowSight Magazine",
        template: "%s | Dog Show Results",
    },
    description:
        "Comprehensive dog show results, judge profiles, and dog records — powered by ShowSight Magazine.",
    keywords: [
        "dog show results",
        "AKC dog shows",
        "conformation results",
        "obedience results",
        "rally results",
        "dog show judges",
        "breed results",
        "best in show",
        "ShowSight Magazine",
    ],
    authors: [{ name: "ShowSight Magazine" }],
    creator: "ShowSight Magazine",
    openGraph: {
        type: "website",
        siteName: "Dog Show Results | ShowSight Magazine",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${montserrat.variable} ${playfairDisplay.variable} antialiased`}
        >
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}
