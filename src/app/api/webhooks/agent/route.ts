import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages, conversations } from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.AGENT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    conversationId,
    workspaceId,
    agentId,
    content,
    metadata,
  } = body;

  if (!conversationId || !workspaceId || !agentId || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const [message] = await db
    .insert(messages)
    .values({
      conversationId,
      workspaceId,
      role: "agent",
      content,
      agentId,
      metadata: metadata ?? null,
    })
    .returning();

  await db
    .update(conversations)
    .set({ lastMessageAt: new Date() })
    .where(eq(conversations.id, conversationId));

  return NextResponse.json({ messageId: message.id });
}
