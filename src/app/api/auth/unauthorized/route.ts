import { NextResponse } from "next/server";
// Return JSON from /api/auth/unauthorized
export async function GET() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
