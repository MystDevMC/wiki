import "./globals.css";
import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MystDev's Wiki",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-900 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <div className={"max-w-screen-xl mx-auto w-full "}>{children}</div>
        </main>
      </body>
    </html>
  );
}
