import {NextResponse} from 'next/server'; 
import {prisma} from '@/lib/store/prisma'; 
import {ZodError} from 'zod'; 

// This seems way to easy 😭
export async function GET(){ 
  try{
    const admins = await prisma.user.findMany({ 
      where: {role: 'ADMIN'}
    }); 

    if(!admins) return NextResponse.json({
      error: "No admins found"
    }, {status: 404}); 

    return NextResponse.json({ 
      message: "Successfully found admins", 
      admins
    }, {status: 200}); 
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