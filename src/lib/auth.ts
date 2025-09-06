// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/store/prisma";
import { compare } from "bcrypt";
import { UserSchema } from "@/zod"; 
import { date, z } from "zod";
import { UNABLE_TO_FIND_POSTINSTALL_TRIGGER_JSON_SCHEMA_ERROR } from "@prisma/client/scripts/postinstall.js";

type UserType = z.infer<typeof UserSchema>;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), 
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, name: true, role: true, passwordHash: true, admin: { select: { permissions: true } } },
        });
        if (!user?.passwordHash) return null;

        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok){
          const previousFailedLogins =  await prisma.failedLogin.findFirst({ 
            where: {userId: user.id}, 
          })
          await prisma.failedLogin.upsert({
            where: { id: previousFailedLogins?.id}, 
            update: { loginAttempts: {increment: 1}}, 
            create: { 
              userId: user.id, 
              failedLogin: true, 
              loginAttempts: 1 
            }
          })
          return null; 
        }

        // ✅ validate with Zod schema
        const parsed = UserSchema.safeParse(user);
        if (!parsed.success) {
          console.error("User validation failed:", parsed.error.format());
          return null;
        }

        const validUser: UserType = parsed.data;

        return {
          id: validUser.id,
          name: validUser.name,
          email: validUser.email,
          role: validUser.role,
          admin: user.admin,
          permissions: user.admin?.permissions ?? []
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.role = user.role ?? "ADMIN";
        token.email = user.email;
        // Check perms 
        if ("ADMIN" in user) {
            token.permissions = (user as { admin?: { permissions: string[] } }).admin?.permissions ?? [];
        } 
        let verificationToken; 

        // Check for Current verificationToken 
        if(token.verificationToken){ 
          const storedVerificationToken = await prisma.verificationToken.findFirst({ 
            where: {identifier: user.id}
          }); 
          const isSession = await prisma.session.findFirst({ 
            where: { userId: user.id}
          }); 

          if(storedVerificationToken?.token !== token.verificationToken && isSession){
            await prisma.session.deleteMany({ // Clean up Sessions  
              where: {userId: user.id}
            })  
            
            delete token.verificationToken; 
            token.isInvalid = true;

            return token; 
          }else if(storedVerificationToken?.token !== verificationToken){ 
            // Delete token in database and in user 
            await prisma.verificationToken.delete({ 
              where: { id: storedVerificationToken.id }
            })
            delete token.verificationToken; 
            token.isInvalid = true; 
            return token; 
          }

          // Beyound this point verification token is valid  
          if(!isSession){ 
            // No current session but valid verification token 
            await prisma.verificationToken.deleteMany({ 
              where: { identifier: user.id }
            }); 

            delete token.verificationToken;
            token.isInvalid = true;  
            return token; 
          }
        }else if(!token.verificationToken && user){ 
          // First time login 
          await prisma.session.deleteMany({ // Clean up previous sessions  
            where: { userId: user.id }
          })
          verificationToken = crypto.randomUUID(); 
          await prisma.verificationToken.create({ 
            data: { 
              identifier: user.id,
              token: verificationToken, 
              expires: new Date(Date.now() + 1000 * 60 * 60 ) // 1 hour 
            }
          })
          token.verificationToken = verificationToken; 
        }
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as { role?: string }).role = token.role as string; 
      if(token.isInvalid && session.user){ 
        session.user.name = null;  
        session.user.email = null;  
      }
      return session;
    },
  },

  events: {
    async session ({token}){ 
      const userId = token.id as string;
      // Delete expired sessions  
      await prisma.session.deleteMany({ 
        where: { 
          userId,
           expires: { lt: new Date() },
        }
      })
      // Only keep 1 session at at time 
      await prisma.session.deleteMany({ 
        where: { userId }
      })

      const sessionToken = crypto.randomUUID(); 
      await prisma.session.create({ 
        data: { 
          sessionToken, 
          userId: token.id as string,
          lastLoginDate: new Date().toISOString().split("T")[0],
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        }
      })
      
    }, 
    async signOut({ token }){ 
      await prisma.session.deleteMany({ 
        where: {userId: token.id as string}
      })
      
      await prisma.verificationToken.deleteMany({ 
        where: {identifier: token.id as string}
      })
    }
  },

  pages: { signIn: "/login" },
};
