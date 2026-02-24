import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getUserByClerkId } from "@/lib/db/queries/users";
import {
  getWorkspaceBySlug,
  isWorkspaceMember,
} from "@/lib/db/queries/workspaces";

export async function resolveWorkspace(workspaceSlug: string) {
  const { userId: clerkId } = await auth.protect();

  const user = await getUserByClerkId(clerkId);
  if (!user) notFound();

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) notFound();

  const isMember = await isWorkspaceMember(workspace.id, user.id);
  if (!isMember) notFound();

  return { user, workspace };
}
