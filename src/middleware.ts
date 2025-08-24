import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest){ 
  const token = await getToken({req, secret: process.env.AUTH_SECRET}); 
  if(!token){ 
    return NextResponse.json({ 
      error: "Unauthorised"
    }, {status: 401, headers: {"Content-Type": "application/json"}})
  }
  return NextResponse.next(); 
}

// backend routes only, frontend is already secured
export const config = { 
  matcher: [ 
    "/app/api/createAdmins/:path*", 
    "/app/api/getAdmins/:path*"
  ]
}; 