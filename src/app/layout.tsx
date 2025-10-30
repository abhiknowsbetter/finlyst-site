import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap" });
import Navbar from "@/components/Navbar";
import SpotlightFX from "@/components/SpotlightFX";
import Particles from "@/components/Particles";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Finlyst – Coming Soon | Join the Waitlist",
  description:
    "Finlyst helps you track, spend, and grow your money smarter with AI-powered insights.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:title" content="Finlyst – Coming Soon | Join the Waitlist" />
        <meta property="og:description" content="Finlyst helps you track, spend, and grow your money smarter with AI-powered insights." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={`${poppins.className} min-h-dvh bg-[#0A0A0A] text-[#F3F4F6] antialiased`}>
  <SpotlightFX />
  <Navbar />
  <PageTransition>{children}</PageTransition>
  <Particles />
      </body>
    </html>
  );
}