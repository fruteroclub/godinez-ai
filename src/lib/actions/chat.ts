"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { conversations, messages } from "../../../drizzle/schema";
import { getUserByClerkId } from "@/lib/db/queries/users";
import {
  getWorkspaceBySlug,
  isWorkspaceMember,
} from "@/lib/db/queries/workspaces";
import { eq } from "drizzle-orm";

export async function createConversation(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const workspaceSlug = formData.get("workspaceSlug") as string;
  const projectId = (formData.get("projectId") as string) || null;

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) throw new Error("Workspace not found");

  const isMember = await isWorkspaceMember(workspace.id, user.id);
  if (!isMember) throw new Error("Not a member");

  if (!workspace.agentId) {
    throw new Error("No agent assigned to this workspace");
  }

  const [conversation] = await db
    .insert(conversations)
    .values({
      workspaceId: workspace.id,
      projectId,
      agentId: workspace.agentId,
      title: "Nueva conversación",
      channel: "web",
    })
    .returning();

  if (projectId) {
    redirect(
      `/studio/${workspaceSlug}/projects/${projectId}/chat?c=${conversation.id}`
    );
  }
  redirect(`/studio/${workspaceSlug}/chat/${conversation.id}`);
}

export async function sendMessage(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const conversationId = formData.get("conversationId") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const content = (formData.get("content") as string)?.trim();

  if (!content) return;

  const isMember = await isWorkspaceMember(workspaceId, user.id);
  if (!isMember) throw new Error("Not a member");

  // Insert user message
  await db.insert(messages).values({
    conversationId,
    workspaceId,
    role: "user",
    content,
    userId: user.id,
  });

  // Update conversation lastMessageAt
  await db
    .update(conversations)
    .set({ lastMessageAt: new Date() })
    .where(eq(conversations.id, conversationId));

  // Stub agent auto-reply
  const conversation = await db.query.conversations.findFirst({
    where: eq(conversations.id, conversationId),
  });

  if (conversation?.agentId) {
    await db.insert(messages).values({
      conversationId,
      workspaceId,
      role: "agent",
      content: getStubReply(content),
      agentId: conversation.agentId,
      metadata: { model: "stub", latencyMs: 0 },
    });

    await db
      .update(conversations)
      .set({ lastMessageAt: new Date() })
      .where(eq(conversations.id, conversationId));
  }
}

function getStubReply(userMessage: string): string {
  const replies = [
    "Entendido, estoy trabajando en eso.",
    "Dame un momento para revisar esto.",
    "Listo, ya lo tengo en mi lista. ¿Algo más?",
    "Buena pregunta. Déjame investigar y te respondo.",
    "¡Claro! Ya estoy en eso.",
    "Recibido. Te aviso cuando tenga avances.",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
