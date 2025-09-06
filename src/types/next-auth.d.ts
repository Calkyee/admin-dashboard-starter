import NextAuth, { DefaultSession, DefaultUser} from "next-auth";

declare module 'next-auth' { 
  interface Session { 
    user: { 
      id: string; 
      role?:  string; 
      permissions?: string[] 
    } & DefaultSession['user']
  } 
  interface User extends DefaultUser {
    id: string; 
    role?: string; 
    permissions: string[] 
  }

  interface jwt { 
    id: string; 
    role?: string; 
    permissions?: string[]; 
    verificationToken: string; 
    isInvalid?: boolean; 
  }
}