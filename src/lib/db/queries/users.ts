import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../../../../drizzle/schema";

export async function getUserByClerkId(clerkId: string) {
  return db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}
