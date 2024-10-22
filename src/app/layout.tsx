import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ServiceProvider from '@/app/components/ServiceProvider'

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
  title: "SaaS AI-Expense Tracker",
  description: "AI-Expense Tracker deisnged for personal and business use", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ServiceProvider>
          {children}
        </ServiceProvider>
      </body>
    </html>
  );
}
