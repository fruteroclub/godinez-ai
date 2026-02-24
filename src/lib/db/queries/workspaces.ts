import { eq, and } from "drizzle-orm";
import { db } from "..";
import { workspaces, workspaceMembers } from "../../../../drizzle/schema";

export async function getWorkspacesByUserId(userId: string) {
  const members = await db.query.workspaceMembers.findMany({
    where: eq(workspaceMembers.userId, userId),
  });

  if (members.length === 0) return [];

  const workspaceIds = members.map((m) => m.workspaceId);
  return db.query.workspaces.findMany({
    where: (w, { inArray }) => inArray(w.id, workspaceIds),
  });
}

export async function getWorkspaceBySlug(slug: string) {
  return db.query.workspaces.findFirst({
    where: eq(workspaces.slug, slug),
  });
}

export async function isWorkspaceMember(workspaceId: string, userId: string) {
  const member = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.workspaceId, workspaceId),
      eq(workspaceMembers.userId, userId)
    ),
  });
  return !!member;
}
