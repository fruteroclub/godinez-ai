import { eq, and } from "drizzle-orm";
import { db } from "..";
import {
  workspaces,
  workspaceMembers,
  users,
} from "../../../../drizzle/schema";

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

export async function getWorkspaceMembers(workspaceId: string) {
  const members = await db.query.workspaceMembers.findMany({
    where: eq(workspaceMembers.workspaceId, workspaceId),
  });

  if (members.length === 0) return [];

  const userIds = members.map((m) => m.userId);
  const memberUsers = await db.query.users.findMany({
    where: (u, { inArray }) => inArray(u.id, userIds),
  });

  const userMap = new Map(memberUsers.map((u) => [u.id, u]));

  return members.map((m) => ({
    ...m,
    user: userMap.get(m.userId)!,
  }));
}

export async function getMemberRole(workspaceId: string, userId: string) {
  const member = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.workspaceId, workspaceId),
      eq(workspaceMembers.userId, userId)
    ),
  });
  return member?.role ?? null;
}
