import { pgEnum, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { id, createdAt } from "./utils";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const memberRoleEnum = pgEnum("member_role", [
  "owner",
  "admin",
  "member",
  "viewer",
]);

export const workspaceMembers = pgTable(
  "workspace_members",
  {
    ...id,
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    role: memberRoleEnum("role").notNull().default("member"),
    ...createdAt,
  },
  (t) => [unique().on(t.workspaceId, t.userId)]
);
