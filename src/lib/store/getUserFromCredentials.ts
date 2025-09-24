import prisma from "@/lib/store/prismaClient"; 

const getUserFromCredentials = async(credentials: Record<"username" | "password", string> | undefined)=>{ 
  const user = await prisma.user.findUnique({ 
    where: { email: credentials?.username}
  }); 
  if(!user){ 
    throw new Error("Unable to find user"); 
  }

  if(user.username !== credentials?.username){
    throw new Error("No user found")
  }
  return user; 
}

export default getUserFromCredentials; 