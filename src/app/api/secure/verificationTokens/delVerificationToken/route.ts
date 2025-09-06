import { NextResponse, NextRequest } from "next/server";
import { sendToUser } from "@/app/api/secure/events/route"; 

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

    if(includeSession){ 
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