import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh bg-[#0A0A0A] text-[#F3F4F6] font-[Poppins] antialiased">
  <SpotlightFX />
  <Particles />
  <Navbar />
  <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}