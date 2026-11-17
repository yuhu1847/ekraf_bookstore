import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ink & Ember — Curated books for slow evenings",
  description:
    "An independent bookstore curating fiction, essays and slow-living titles since 2016. Hand-picked by real readers, shipped free and carbon-neutral.",
  keywords: ["bookstore", "books", "reading", "independent bookstore", "curated books", "fiction"],
  authors: [{ name: "Ink & Ember" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ink & Ember — Curated books for slow evenings",
    description: "Hand-picked books, free carbon-neutral shipping, and a community of 12,000 readers.",
    siteName: "Ink & Ember",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${nunito.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
