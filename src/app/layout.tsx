import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import NavigationBar from '@/components/ui/navigationBar/NavigationBar'
import Buttons from '@/components/ui/navigationBar/Buttons/Buttons'
import LogoutButton from "@/components/ui/navigationBar/Buttons/LogoutButton";


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
        <div className="
          flex flex-row
        ">
          {/* Navigation Bar */}
          <div className="
            w-2/12
            min-h-screen 
            bg-white
            
            flex flex-col gap-8 justify-around
          ">
            {/* Heading */}
            <div className="
              min-w-full h-fit flex flex-col items-center
              p-2
            ">
              <h2 className="
              font-bold 
              text-[1.5rem]
              ">Admin Dashboard</h2>
              <h3 className="
                font-semibold
                text-[1.25rem]
              ">app_name</h3>
            </div>
            {/* Buttons */}
            <NavigationBar Buttons={Buttons}/>
            <div className="
              min-w-full h-fit 
              flex justify-center
              mb-5
            ">
              <LogoutButton />
            </div>
          </div>
          {/* App */}
          <div className="
            p-2
            flex-1 
            h-screen
          ">
            {
              children
            }
          </div>
        </div>
      </body>
    </html>
  );
}
