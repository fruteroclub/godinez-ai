import { eq, and, desc, isNull } from "drizzle-orm";
import { db } from "..";
import { tasks } from "../../../../drizzle/schema";

export async function getTasksByWorkspaceId(workspaceId: string) {
  return db.query.tasks.findMany({
    where: eq(tasks.workspaceId, workspaceId),
    orderBy: [desc(tasks.createdAt)],
  });
}

export async function getTasksByProjectId(projectId: string) {
  return db.query.tasks.findMany({
    where: eq(tasks.projectId, projectId),
    orderBy: [desc(tasks.createdAt)],
  });
}

export async function getWorkspaceLevelTasks(workspaceId: string) {
  return db.query.tasks.findMany({
    where: and(
      eq(tasks.workspaceId, workspaceId),
      isNull(tasks.projectId)
    ),
    orderBy: [desc(tasks.createdAt)],
  });
}

export async function getTaskById(id: string) {
  return db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  });
}
