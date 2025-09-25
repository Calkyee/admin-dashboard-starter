import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import NavigationBar from '@/components/ui/navigationBar/NavigationBar'
import Buttons from '@/components/ui/navigationBar/Buttons/Buttons'


import "./globals.css";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"]
})


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Admin dasboard starting package",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <NavigationBar Buttons={Buttons}/>
        </div>
        {children}
      </body>
    </html>
  );
}
