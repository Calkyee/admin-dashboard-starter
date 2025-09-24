import { NextAuthOptions } from "next-auth"; 
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Prisma from "@/lib/store/prismaClient"; 

import CredentialsProvider from "next-auth/providers/credentials";

import getUserFromCredentials from "@/lib/store/getUserFromCredentials"; 

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(Prisma), 
  session: {
    strategy: "database"
  },
  providers: [ 
    CredentialsProvider({ 
      name: "Credentials", 
      credentials: { 
        username: {label: "Username", type: "text" }, 
        password: {label: "Password", type: "password"}
      }, 
      async authorize(credentials, req){
        const user = await getUserFromCredentials(credentials); 
        return null; 
      }
    })
  ]
}


export default authOptions; 