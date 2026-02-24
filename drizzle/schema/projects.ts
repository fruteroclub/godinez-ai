import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./utils";
import { workspaces } from "./workspaces";

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "completed",
  "archived",
]);

export const projects = pgTable("projects", {
  ...id,
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: projectStatusEnum("status").notNull().default("active"),
  ...timestamps,
});
