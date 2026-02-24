import { eq, desc, isNull } from "drizzle-orm";
import { db } from "..";
import { files } from "../../../../drizzle/schema";

export async function getFilesByWorkspaceId(workspaceId: string) {
  return db.query.files.findMany({
    where: eq(files.workspaceId, workspaceId),
    orderBy: [desc(files.createdAt)],
  });
}

export async function getFilesByProjectId(projectId: string) {
  return db.query.files.findMany({
    where: eq(files.projectId, projectId),
    orderBy: [desc(files.createdAt)],
  });
}
