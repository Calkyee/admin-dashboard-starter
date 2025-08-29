import { NextResponse } from "next/server";

import { prisma } from '@/lib/store/prisma'; 
import { ZodError } from "zod";

export async function GET(){ 
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
    if(error instanceof ZodError){ 
      return NextResponse.json({ 
        error: "Validation error", 
        issues: error.issues
      })
    }
    return NextResponse.json({ 
      error: "Unexpected error"
    }, {status: 500});
  }
}