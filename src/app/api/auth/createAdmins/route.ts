import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'; 
import { hash } from 'bcrypt'; 
import { ZodError } from "zod";

const prisma: PrismaClient = new PrismaClient(); 

export async function POST(request: NextRequest){ 
  try{

  }catch(error){
    if(error instanceof ZodError){ 
      return NextResponse.json({ 
        error: "validation error", 
        issues: error.flatten()
      }, {status: 400}); 
    }
    return NextResponse.json({ 
      error: "Unexpected error"
    }, {status: 500}); 
  }
}