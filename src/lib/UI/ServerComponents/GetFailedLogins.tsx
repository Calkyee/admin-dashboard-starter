'use server';
import { prisma } from "@/lib/store/prisma";

const GetFailedLogins = async()=>{
  const failedLogins = await prisma.failedLogin.findMany({});
  return failedLogins;
}

export default GetFailedLogins;