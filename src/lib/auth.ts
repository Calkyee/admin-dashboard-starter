// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/store/prisma";
import { compare } from "bcrypt";
import { UserSchema } from "@/zod"; 
import { z } from "zod";

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
        if (!ok) return null;

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
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as UserType).id; 
        token.role = (user as UserType).role ?? "ADMIN";
        token.email = user.email;
        if ("ADMIN" in user) {
          token.permissions = (user as { admin?: { permissions: string[] } }).admin?.permissions ?? [];
        }
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as { role?: string }).role = token.role as string; 
      return session;
    },
  },

  events: {
    async session ({session, token}){ 
      await prisma.session.deleteMany({ 
        where: { userId: token.id as string}
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
    }
  },

  pages: { signIn: "/login" },
};
