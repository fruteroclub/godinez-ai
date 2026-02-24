import { index, jsonb, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, createdAt } from "./utils";
import { conversations } from "./conversations";
import { workspaces } from "./workspaces";
import { users } from "./users";
import { agents } from "./agents";

export const messageRoleEnum = pgEnum("message_role", [
  "user",
  "agent",
  "system",
]);

export const messages = pgTable(
  "messages",
  {
    ...id,
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id),
    role: messageRoleEnum("role").notNull(),
    content: text("content").notNull(),
    userId: uuid("user_id").references(() => users.id),
    agentId: uuid("agent_id").references(() => agents.id),
    metadata: jsonb("metadata").$type<{
      model?: string;
      tokensIn?: number;
      tokensOut?: number;
      latencyMs?: number;
      toolCalls?: string[];
    }>(),
    fileId: uuid("file_id"),
    ...createdAt,
  },
  (t) => [index("messages_conversation_created_idx").on(t.conversationId, t.createdAt)]
);
