import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/store/prisma"; 
import { FailedLoginSchema } from "@/zod";

const idSchema = FailedLoginSchema.pick({ 
  userId: true 
}); 

export async function GET(request: NextRequest){ 
  const url = new URL(request.url); 
  const id = url.pathname.split('/').pop(); 
  if(!id){ 
    return NextResponse.json({ 
      error: "Missing Id", 
    }, {status: 400})
  }
  const validated = idSchema.safeParse(idSchema); 
  
  if(!validated.success){ 
    return NextResponse.json({ 
      error: "Validation error",
      issues: validated.error.flatten()  
    }); 
  }

  const failedLogins = await prisma.failedLogin.findFirst({ 
    where: {userId: validated.data.userId}
  }); 
  if(!failedLogins){ 
    return NextResponse.json({ 
      error: "No failed logins found"
    }, {status: 404}); 
  }

  return NextResponse.json({ 
    message: "Found failed logins", 
    failedLogins
  }, {status: 200}); 
}