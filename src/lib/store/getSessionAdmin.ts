import type { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

async function getSessionAdmin(session: Session) {
  if (!session?.user?.email) return null;

  return await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { admin: true },
  });
}


export default getSessionAdmin;  