import type { Metadata } from "next";
import { Quicksand, Open_Sans, Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["600"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Substitute for Isidora Sans Alt (paid font used for the h1 in the Figma
// source) — closest free, license-clean geometric sans available on Google Fonts.
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "FlowSpark — Digital Marketing Solutions",
  description:
    "We believe that marketing shouldn't be a headache, so we've crafted a platform that's super easy to use but doesn't skimp on the powerful stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${quicksand.variable} ${openSans.variable} ${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-300 font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
