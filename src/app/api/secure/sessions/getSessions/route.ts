import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from '@/lib/store/prisma'; 

export async function GET(request: NextRequest){ 
  try{
    const currentSessions = await prisma.session.findMany({}); 
    if(currentSessions.length === 0){ 
      return NextResponse.json({ 
        error: "No sessions found"
      }, {status: 404}); 
    }

    return NextResponse.json({ 
      message: "Successfully found all Sessions", 
      currentSessions
    }, {status: 200}); 
  }catch(error){ 
    return NextResponse.json({ 
      error: "Unexpected error"
    }, {status: 500}); 
  }
}