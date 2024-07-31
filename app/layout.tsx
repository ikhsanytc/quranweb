import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quran Web",
  description: "Learn and read quran from website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
