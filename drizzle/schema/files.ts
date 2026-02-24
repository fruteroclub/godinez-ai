import {
  integer,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { id, createdAt } from "./utils";
import { workspaces } from "./workspaces";
import { projects } from "./projects";
import { users } from "./users";
import { agents } from "./agents";
import { messages } from "./messages";

export const files = pgTable("files", {
  ...id,
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id),
  projectId: uuid("project_id").references(() => projects.id),
  storageKey: text("storage_key").notNull(),
  url: text("url").notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 255 }),
  sizeBytes: integer("size_bytes"),
  uploadedByUserId: uuid("uploaded_by_user_id").references(() => users.id),
  uploadedByAgentId: uuid("uploaded_by_agent_id").references(() => agents.id),
  messageId: uuid("message_id").references(() => messages.id),
  ...createdAt,
});
