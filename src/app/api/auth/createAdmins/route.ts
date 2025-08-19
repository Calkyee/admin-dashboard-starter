import { NextRequest, NextResponse } from "next/server";
import {Permissions, PrismaClient, Role} from '@prisma/client'; 
import { hash } from 'bcrypt'; 
import { ZodError, z } from "zod";
import { UserSchema } from "@/zod";

const SignUpSchema = UserSchema.pick({
  email: true,
  name: true,
}).extend({
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type SignUpInput = z.infer<typeof SignUpSchema> 

const prisma: PrismaClient = new PrismaClient(); 

export async function POST(request: NextRequest){ 
  try{
    const body = await request.json(); 
    const parsed = SignUpSchema.safeParse(body); 
    
    if(!parsed.success){ 
      return NextResponse.json({ 
        error: "validation error", issues: parsed.error.flatten()
      }, {status: 400}); 
    }

    const {email, name, password}: SignUpInput = parsed.data; 
    const existingUser = await prisma.user.findUnique({where: {email}}); 
    if(existingUser){ 
      return NextResponse.json({error: "User already exists"}, {status: 400}); 
    }

    const passwordHash = await hash(password, 10); 

    const user = await prisma.user.create({
      data: {email, name, passwordHash, role: "ADMIN", admin: { 
        create: {
          permissions: [Permissions.READ, Permissions.WRITE, Permissions.UPDATE, Permissions.DELETE]
        }
      }}, 
      select: {
        id: true, 
        email: true,
        name: true, 
        role: true, 
        admin: { 
          select: {permissions: true}
        }
      }

    }); 

    return NextResponse.json({user}, {status: 201}); 
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