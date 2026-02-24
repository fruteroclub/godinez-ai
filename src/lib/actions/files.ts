"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { db } from "@/lib/db";
import { files } from "../../../drizzle/schema";
import { getUserByClerkId } from "@/lib/db/queries/users";
import { isWorkspaceMember } from "@/lib/db/queries/workspaces";

export async function uploadFile(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;
  const projectId = (formData.get("projectId") as string) || null;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) throw new Error("No file provided");

  const isMember = await isWorkspaceMember(workspaceId, user.id);
  if (!isMember) throw new Error("Not a member");

  const blob = await put(`studio/${workspaceId}/${file.name}`, file, {
    access: "public",
  });

  await db.insert(files).values({
    workspaceId,
    projectId,
    storageKey: blob.pathname,
    url: blob.url,
    filename: file.name,
    mimeType: file.type || null,
    sizeBytes: file.size,
    uploadedByUserId: user.id,
  });

  if (projectId) {
    revalidatePath(`/studio/${workspaceSlug}/projects/${projectId}/files`);
  } else {
    revalidatePath(`/studio/${workspaceSlug}/files`);
  }
}
