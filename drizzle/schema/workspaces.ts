import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./utils";
import { users } from "./users";
import { agents } from "./agents";

export const workspaceTierEnum = pgEnum("workspace_tier", [
  "becario",
  "asistente",
  "agente",
]);

export const workspaceStatusEnum = pgEnum("workspace_status", [
  "active",
  "suspended",
  "provisioning",
]);

export const workspaces = pgTable("workspaces", {
  ...id,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  agentId: uuid("agent_id").references(() => agents.id),
  tier: workspaceTierEnum("tier").notNull().default("becario"),
  status: workspaceStatusEnum("status").notNull().default("provisioning"),
  ...timestamps,
});
