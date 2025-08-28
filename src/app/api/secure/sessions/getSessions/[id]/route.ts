import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/store/prisma"; 

export async function GET(
  request: NextRequest, 
  {params}: {params: {id: string}}
){ 

  const userId = params.id; 

  const currentSession = await prisma.session.findFirst({ 
    where: { userId }
  }); 
  if(!currentSession) return NextResponse.json({ 
    error: "Unable to find Session"
  }, {status: 404}); // This should realistically never be called but just incase 

  return NextResponse.json({ 
    message: "Successfully found session", 
    currentSession
  }, {status: 200}); 
}