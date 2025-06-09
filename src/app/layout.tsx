import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/compoments/Navbar/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/compoments/Footer/Footer";
import Template from "./template";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventora",
  description: "Plan Events Like a Pro with Eventora",
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
        <div className="">
          <Navbar />
        </div>
        <Toaster position="top-right" />

        <main className="pt-16 bg-gray-100">
          <Template>
            {children}
          </Template>
        </main>

        <div className=" bottom-0 w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
