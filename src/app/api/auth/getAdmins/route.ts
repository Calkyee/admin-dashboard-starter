import {NextRequest, NextResponse} from 'next/server'; 
import { Permissions } from "@prisma/client"; 
import {prisma} from '@/lib/store/prisma'; 
import {hash} from 'bcrypt'; 
import {ZodError, z} from 'zod'; 
import { UserSchema } from "@/zod"; 


export async function GET(request: NextRequest){ 
  try{



  }catch(error){ 
    if(error instanceof ZodError){ 
      return NextResponse.json({
        error: "Validation error", 
        issues: error.flatten()
      })
    }
    return NextResponse.json({ 
      error: "Unexpected Error"
    }, {status: 500})
  }
}