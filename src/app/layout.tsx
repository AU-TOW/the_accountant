import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Accountant - AI-Powered Accounting for UK Business Owners",
  description:
    "Your AI accountant that teaches as it works. Plain English tax advice, receipt scanning, and proactive tax savings for UK sole traders and limited companies.",
  keywords: [
    "AI accountant",
    "UK tax",
    "small business accounting",
    "receipt scanning",
    "tax savings",
    "HMRC",
    "sole trader",
    "limited company",
  ],
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
