import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Katoen Natie Moves Together",
    template: "%s | Katoen Natie Moves Together",
  },
  description:
    "Unite through sport — cycling, running, football predictions, and more. One Company. One Movement.",
  keywords: ["Katoen Natie", "sports", "cycling", "football", "wellbeing", "corporate"],
  authors: [{ name: "Katoen Natie NV" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KN Moves Together",
  },
};

export const viewport: Viewport = {
  themeColor: "#ebe6e1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col page-bg">{children}</body>
    </html>
  );
}