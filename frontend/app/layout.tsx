import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/Appbar";
import DisclaimerModal from "@/components/DisclaimerModel";
import MobileCheck from "@/components/MobileCheck";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quix",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileCheck>
          <Appbar />
          {children}
          <DisclaimerModal />
        </MobileCheck>
      </body>
    </html>
  );
}
