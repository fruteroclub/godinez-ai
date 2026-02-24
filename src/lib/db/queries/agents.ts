import { eq } from "drizzle-orm";
import { db } from "..";
import { agents } from "../../../../drizzle/schema";

export async function getAgentById(id: string) {
  return db.query.agents.findFirst({
    where: eq(agents.id, id),
  });
}

export async function getAgentBySlug(slug: string) {
  return db.query.agents.findFirst({
    where: eq(agents.slug, slug),
  });
}

export async function getAllAgents() {
  return db.query.agents.findMany();
}
