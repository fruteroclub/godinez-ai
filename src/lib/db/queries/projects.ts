import { eq, and, desc } from "drizzle-orm";
import { db } from "..";
import { projects } from "../../../../drizzle/schema";

export async function getProjectsByWorkspaceId(workspaceId: string) {
  return db.query.projects.findMany({
    where: eq(projects.workspaceId, workspaceId),
    orderBy: [desc(projects.updatedAt)],
  });
}

export async function getProjectById(id: string) {
  return db.query.projects.findFirst({
    where: eq(projects.id, id),
  });
}

export async function getActiveProjectsByWorkspaceId(workspaceId: string) {
  return db.query.projects.findMany({
    where: and(
      eq(projects.workspaceId, workspaceId),
      eq(projects.status, "active")
    ),
    orderBy: [desc(projects.updatedAt)],
  });
}
