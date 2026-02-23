import type { Metadata } from "next";
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
  title: "Mathiter — AI Math Learning Navigator",
  description:
    "Gamification + Dual-Engine AI powered global math courseware. From diagnosis to practice to exam prep — your personalized math learning journey.",
  keywords: [
    "math",
    "AI tutor",
    "SAT math",
    "IGCSE math",
    "IB math",
    "gamification",
    "edtech",
    "international school",
    "adaptive learning",
    "personalized education",
  ],
  openGraph: {
    title: "Mathiter — AI Math Learning Navigator",
    description:
      "Gamification + Dual-Engine AI powered global math courseware for international school students.",
    url: "https://mathiter.com",
    siteName: "Mathiter",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
