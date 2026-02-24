import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "./utils";
import { workspaces } from "./workspaces";
import { projects } from "./projects";
import { agents } from "./agents";
import { users } from "./users";

export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "in_progress",
  "completed",
  "failed",
  "cancelled",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const tasks = pgTable("tasks", {
  ...id,
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id),
  projectId: uuid("project_id").references(() => projects.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("pending"),
  priority: taskPriorityEnum("priority").notNull().default("medium"),
  assignedAgentId: uuid("assigned_agent_id").references(() => agents.id),
  createdByUserId: uuid("created_by_user_id").references(() => users.id),
  dueAt: timestamp("due_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  ...timestamps,
});
