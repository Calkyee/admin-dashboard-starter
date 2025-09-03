import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/store/prisma"; 

export async function middleware(req: NextRequest) {
  const token  = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as { 
    id: string; 
    verificationToken: string; 
    role: string; 
  };


  const valid = await prisma.verificationToken.findFirst({
    where: {
      identifier: token?.id,
      token: token?.verificationToken,
      expires: { gt: new Date() },
    },
  });
  
  if(!valid){ 
    return NextResponse.redirect(new URL('/login', req.url)); 
  }

  if (req.nextUrl.pathname.startsWith("/api/secure")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (token.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secure/:path*"],
};
