// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "root@admin.com";
  const password = "rootpassword";
  const hashedPassword = await hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Root user already exists.");
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: "Root Admin",
      role: "ADMIN",
      passwordHash: hashedPassword,   // 👈 store hash directly on User
      admin: {
        create: {
          permissions: ["READ", "WRITE", "DELETE", "UPDATE"],
        },
      },
    },
  });

  console.log("✅ Root user created:", user.email);
}

main()
  .catch(e => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
