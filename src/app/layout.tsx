'use client'; 
import "./globals.css";

import { SessionProvider } from "next-auth/react";

// import components here 
import SideNav from '@/components/SideNav';
import SecureRoutes from '@/app/(auth)/layout'; 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-w-screen min-h-screen flex flex-col">
      <body
        
        className="flex-1 flex flex-row bg-[#CCCCCC]"
      >
        <SessionProvider>
          <SideNav />
          <SecureRoutes>
            {children}
          </SecureRoutes>
        </SessionProvider>
      </body>
    </html>
  );
}
