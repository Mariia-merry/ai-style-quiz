import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ResponsesSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ResponsesSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { sessionId, items } = parsed.data;
    await prisma.response.createMany({
      data: items.map(i => ({ ...i, sessionId }))
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 