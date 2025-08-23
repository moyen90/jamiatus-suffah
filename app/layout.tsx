import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './../providers/Providers';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyCourier",
  description: "EasyCourier is a user-friendly web-based delivery management system that streamlines courier operations for shop owners, admins, and delivery personnel. Built with modern technologies, it simplifies order creation, assignment, tracking, and status updates — ensuring efficient and transparent delivery workflows.",
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
        <Providers>
           {children}
           <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </Providers>
      </body>
    </html>
  );
}
