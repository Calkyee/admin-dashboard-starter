import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/store/prisma"; 

export async function GET(request: NextRequest){ 
  try{
    const failedLogins = await prisma.failedLogin.findMany({});
    if(failedLogins.length === 0){ 
      return NextResponse.json({ 
        error: "No failedLogins found", 
      }, {status: 404}); 
    } 
    return NextResponse.json({ 
      message: "Successfully found failed logins", 
      failedLogins
    }, {status: 200}); 
  }catch(error){ 
    if(error){ 
      return NextResponse.json({ 
        error: "Unexpected Error", 
      }, {status: 500}); 
    }
  }
}