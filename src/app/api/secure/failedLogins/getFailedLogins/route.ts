import { NextResponse } from "next/server";
import { prisma } from "@/lib/store/prisma"; 

export async function GET(){ 
  try{
    const failedLogins = await prisma.failedLogin.findMany();
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