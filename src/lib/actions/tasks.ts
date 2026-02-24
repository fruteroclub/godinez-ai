"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { tasks } from "../../../drizzle/schema";
import { getUserByClerkId } from "@/lib/db/queries/users";
import { isWorkspaceMember } from "@/lib/db/queries/workspaces";
import { eq } from "drizzle-orm";

export async function createTask(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;
  const projectId = (formData.get("projectId") as string) || null;
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const priority = (formData.get("priority") as string) || "medium";
  const workspaceSlug = formData.get("workspaceSlug") as string;

  if (!title) throw new Error("Title is required");

  const isMember = await isWorkspaceMember(workspaceId, user.id);
  if (!isMember) throw new Error("Not a member");

  await db.insert(tasks).values({
    workspaceId,
    projectId,
    title,
    description,
    priority: priority as "low" | "medium" | "high" | "urgent",
    status: "pending",
    createdByUserId: user.id,
  });

  if (projectId) {
    revalidatePath(`/studio/${workspaceSlug}/projects/${projectId}/tasks`);
  } else {
    revalidatePath(`/studio/${workspaceSlug}/tasks`);
  }
}

export async function updateTaskStatus(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const taskId = formData.get("taskId") as string;
  const status = formData.get("status") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  });
  if (!task) throw new Error("Task not found");

  const isMember = await isWorkspaceMember(task.workspaceId, user.id);
  if (!isMember) throw new Error("Not a member");

  const updates: Record<string, unknown> = {
    status,
    updatedAt: new Date(),
  };

  if (status === "completed") {
    updates.completedAt = new Date();
  }

  await db.update(tasks).set(updates).where(eq(tasks.id, taskId));

  revalidatePath(`/studio/${workspaceSlug}/tasks`);
  if (task.projectId) {
    revalidatePath(
      `/studio/${workspaceSlug}/projects/${task.projectId}/tasks`
    );
  }
}
