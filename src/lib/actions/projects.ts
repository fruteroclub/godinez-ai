"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { projects } from "../../../drizzle/schema";
import { getUserByClerkId } from "@/lib/db/queries/users";
import { getWorkspaceBySlug, isWorkspaceMember } from "@/lib/db/queries/workspaces";

export async function createProject(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const workspaceSlug = formData.get("workspaceSlug") as string;
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;

  if (!name || name.length < 2) {
    throw new Error("Project name must be at least 2 characters");
  }

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) throw new Error("Workspace not found");

  const isMember = await isWorkspaceMember(workspace.id, user.id);
  if (!isMember) throw new Error("Not a member of this workspace");

  const [project] = await db
    .insert(projects)
    .values({
      workspaceId: workspace.id,
      name,
      description,
      status: "active",
    })
    .returning();

  redirect(`/studio/${workspaceSlug}/projects/${project.id}`);
}
