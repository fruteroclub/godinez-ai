import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./utils";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  ...id,
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").notNull().default("user"),
  ...timestamps,
});
