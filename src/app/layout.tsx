import type { Metadata } from "next";
import { Quicksand, Open_Sans, Poppins, Inter } from "next/font/google";
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
// source) — Poppins shares its defining traits (flat-cut terminals,
// single-story 'a', geometric circles) and is the closest license-clean
// match on Google Fonts.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600"],
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
      className={`${quicksand.variable} ${openSans.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans dark:bg-neutral-800">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
