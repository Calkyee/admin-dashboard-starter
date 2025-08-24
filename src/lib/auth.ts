// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/store/prisma";
import { compare } from "bcrypt";
import { UserSchema } from "@/zod"; 
import { z } from "zod";

type UserType = z.infer<typeof UserSchema>;

export const authOptions: NextAuthOptions = {
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
          select: { id: true, email: true, name: true, role: true, passwordHash: true },
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

        // only safe fields
        return {
          id: validUser.id,
          name: validUser.name,
          email: validUser.email,
          role: validUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as UserType).role ?? "ADMIN";
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
};
