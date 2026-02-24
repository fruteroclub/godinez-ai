import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "../../../../../../../drizzle/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const result = await db.query.messages.findMany({
    where: eq(messages.conversationId, id),
    orderBy: [asc(messages.createdAt)],
  });

  return NextResponse.json({ messages: result });
}
