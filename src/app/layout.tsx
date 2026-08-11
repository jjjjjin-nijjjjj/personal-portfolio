import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiaying Jin — AI Product & Risk Strategy",
  description: "Portfolio of Jiaying Jin, an AI product and risk strategy professional building credit decision systems, AI approval workflows, and data-driven risk products.",
  openGraph: {
    title: "Jiaying Jin | AI Product × Risk Strategy",
    description: "AI products, intelligent decision systems, credit strategy, and risk innovation.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
