import { NextResponse } from "next/server";
import { prisma } from "@/lib/store/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // grab [id]

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const currentSession = await prisma.session.findFirst({ where: { userId: id } });

  if (!currentSession) {
    return NextResponse.json({ error: "Unable to find Session" }, { status: 404 });
  }

  return NextResponse.json({ message: "Successfully found session", currentSession });
}
