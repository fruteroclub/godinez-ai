import { jsonb, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./utils";

export const agentTemplateEnum = pgEnum("agent_template", [
  "pmo",
  "cto",
  "influencer",
  "orchestrator",
  "custom",
]);

export const agentStatusEnum = pgEnum("agent_status", [
  "active",
  "paused",
  "provisioning",
  "error",
  "archived",
]);

export const agents = pgTable("agents", {
  ...id,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  template: agentTemplateEnum("template").notNull(),
  status: agentStatusEnum("status").notNull().default("provisioning"),
  config: jsonb("config").$type<{
    model?: string;
    channels?: string[];
    skills?: string[];
    personality?: string;
    systemPrompt?: string;
  }>(),
  burritoId: varchar("burrito_id", { length: 255 }),
  ...timestamps,
});
