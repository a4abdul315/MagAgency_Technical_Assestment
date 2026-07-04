import type { Metadata } from "next";
import { Quicksand, Open_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Quicksand 700 renders "FlowSpark" at 243.4px vs the Figma's 244px —
// a sub-pixel match for Isidora Sans Alt 600 (paid font we can't bundle),
// with the same rounded terminals and single-story 'a'.
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${quicksand.variable} ${openSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans dark:bg-neutral-800">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
