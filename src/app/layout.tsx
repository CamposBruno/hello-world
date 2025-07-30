import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello World - Multi-Language",
  description: "A beautiful Hello World page with dynamic language transitions and animations",
  keywords: ["hello world", "multi-language", "animation", "react", "next.js"],
  authors: [{ name: "Development Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Hello World - Multi-Language",
    description: "A beautiful Hello World page with dynamic language transitions",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1e1b4b" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
