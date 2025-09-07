import { NextResponse, NextRequest } from "next/server";
import { sendToUser } from "@/lib/sse.ts";
import { prisma } from "@/lib/store/prisma"; 

import { z, ZodError } from 'zod'; 
import { VerificationTokenSchema } from "@/zod";

const TokenIdSchema = VerificationTokenSchema.pick({ 
  identifier: true
}).extend({ 
  includeSession: z.boolean().optional() 
}); 

type TokenIdType = z.infer<typeof TokenIdSchema>; 


export async function DELETE(req: NextRequest){ 
  try{
    const body: TokenIdType = await req.json(); 
    const validated = TokenIdSchema.safeParse(body); 
    if(!validated.success){ 
      return NextResponse.json({ 
        error: "Validation error", 
        issues: validated.error.flatten() 
      }, {status: 400}); 
    }
    const {identifier, includeSession} = validated.data; 
    const token = await prisma.verificationToken.findFirst({ 
      where: { identifier }
    }); 

    if(token){ 
      await prisma.verificationToken.deleteMany({ // Delete Tokens  
        where: { identifier }
      })
    }

    if(includeSession){ 
      const session = await prisma.session.findFirst({ 
        where: { userId: identifier}
      }); 
      if(!session){ 
        return NextResponse.json({ 
          error: "No Sessions found"
        }, {status: 404}); 
      }

      await prisma.session.deleteMany({ 
        where: { userId: identifier }
      }); 
      
      const ok = sendToUser(identifier, 'force-kick'); 
      if(!ok){ 
        return NextResponse.json({error: "Failed to kick user from session"}, {status: 400}); 
      }
    }

    return NextResponse.json({ 
      message: includeSession ? 'Successfully deleted verificationToken and Session' : 'Succssfully deleted verificationToken', 
    }, {status: 200}); 
  }catch(error){ 
    if(error instanceof ZodError){ 
      return NextResponse.json({ 
        error: "Validation error", 
        issues: error.flatten() 
      }, {status: 400}); 
    }
    return NextResponse.json({ 
      error: "Unexpected error"
    }, {status: 500}); 
  }
}