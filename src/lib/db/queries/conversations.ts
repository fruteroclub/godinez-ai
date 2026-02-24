import { eq, and, desc, asc, isNull } from "drizzle-orm";
import { db } from "..";
import { conversations, messages } from "../../../../drizzle/schema";

export async function getConversationsByWorkspaceId(workspaceId: string) {
  return db.query.conversations.findMany({
    where: and(
      eq(conversations.workspaceId, workspaceId),
      isNull(conversations.projectId)
    ),
    orderBy: [desc(conversations.lastMessageAt)],
  });
}

export async function getConversationsByProjectId(projectId: string) {
  return db.query.conversations.findMany({
    where: eq(conversations.projectId, projectId),
    orderBy: [desc(conversations.lastMessageAt)],
  });
}

export async function getConversationById(id: string) {
  return db.query.conversations.findFirst({
    where: eq(conversations.id, id),
  });
}

export async function getMessagesByConversationId(conversationId: string) {
  return db.query.messages.findMany({
    where: eq(messages.conversationId, conversationId),
    orderBy: [asc(messages.createdAt)],
  });
}
