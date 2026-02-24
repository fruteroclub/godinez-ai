import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { id, createdAt } from "./utils";
import { workspaces } from "./workspaces";
import { agents } from "./agents";

export const logLevelEnum = pgEnum("log_level", [
  "debug",
  "info",
  "warn",
  "error",
]);

export const agentLogs = pgTable("agent_logs", {
  ...id,
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id),
  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id),
  level: logLevelEnum("level").notNull().default("info"),
  event: varchar("event", { length: 255 }).notNull(),
  message: text("message"),
  metadata: jsonb("metadata"),
  tokensUsed: integer("tokens_used"),
  durationMs: integer("duration_ms"),
  ...createdAt,
});
