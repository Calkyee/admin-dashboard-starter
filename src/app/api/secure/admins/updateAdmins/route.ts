import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ZodError } from "zod";

import passwordHash from '@/lib/hashing/passwordHash'; 
import { prisma } from '@/lib/store/prisma'; 
import { UserSchema } from "@/zod";

const UserInputSchema = UserSchema.pick({ 
  name: true, 
  email: true, 
  passwordHash: true, 
  id: true 
}).partial({ name: true, email: true, passwordHash: true});

export async function PUT(request: NextRequest){ 
  try{
    const data = await request.json(); 
    const validatedData = UserInputSchema.safeParse(data); 

    if(!validatedData.success){ 
      return NextResponse.json({ 
        error: "Validation error", issues: validatedData.error.flatten()
      }, {status: 400}); 
    }

    const currentUser = await prisma.user.findUnique({ 
      where: {id: validatedData.data?.id}
    }); 

    if(!currentUser?.id){ 
      return NextResponse.json({ 
        error: "Unable to find User"
      }, {status: 404}); 
    }

    let hashedPassword: string | undefined;
    if (validatedData.data.passwordHash) {
      hashedPassword = await passwordHash(validatedData.data.passwordHash);
    }
     
    const validatedUser = validatedData.data; 
    const updatedUser = await prisma.user.update({
      where: {id: validatedUser.id}, 
      data: { 
        ...(validatedUser.email && {email: validatedUser.email}), 
        ...(validatedUser.name && {name: validatedUser.name}), 
        ...(validatedUser.passwordHash && {passwordHash: hashedPassword})
      }
    }); 
    return NextResponse.json({ 
      message: "Successfully Updated user", 
      old_user_data: currentUser, 
      new_user_data: updatedUser
    }, {status: 200}); 
  }catch(error){ 
    if(error instanceof ZodError){ 
      return NextResponse.json({ 
        error: "Validation error",
        issues: error.flatten()
      }, {status: 401}); 
    }
    return NextResponse.json({ 
      error: "Unexpected Error"
    }, {status: 500}); 
  }
}