import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/store/prisma"; 
import { UserSchema } from "@/zod";
import { ZodError, z } from "zod";

// process.env.ROOT_EMAIL ||
const rootAdminEamil: string =  'root@admin.com'; 
const UserInputSchema = UserSchema.pick({ 
  id: true
}); 

type UserInputType = z.infer<typeof UserInputSchema> 

export async function DELETE(request: NextRequest){ 
  try{
    const data: UserInputType = await request.json(); 
    const validatedData = UserInputSchema.safeParse(data); 
    if(!validatedData.success){ 
      return NextResponse.json({ 
        error: "Validation error", 
        issues: validatedData.error.flatten()
      }, {status: 400}); 
    }; 

    const currentUser = await prisma.user.findUnique({ 
      where: {id: validatedData.data.id}
    }); 

    if(!currentUser){ 
      return NextResponse.json({ 
        error: "Unable to find User"
      }, {status: 404}); 
    }
 
    if(currentUser.email === rootAdminEamil){ 
      return NextResponse.json({ 
        error: "Unable to delete root admin", 
        currentUser
      }, {status: 400}); 
    }

    await prisma.admin.deleteMany({ where: { userId: currentUser.id } });
    const deletedUser = await prisma.user.delete({ where: { id: currentUser.id } });

    return NextResponse.json({ 
      message: "Successfully deleted User", 
      currentUser 
    }, {status: 200}); 
  }catch(error){ 
    if(error instanceof ZodError){ 
      return NextResponse.json({ 
        error: "Validation error", 
        issue: error.issues
      })
    }
    return NextResponse.json({ 
      error: "Unexpected Error", 
    }, {status: 500}); 
  }
}