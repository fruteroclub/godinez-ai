"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { workspaces, workspaceMembers } from "../../../drizzle/schema";
import { getUserByClerkId } from "@/lib/db/queries/users";
import { getMemberRole } from "@/lib/db/queries/workspaces";
import { eq } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function ensureUniqueSlug(
  baseSlug: string,
  excludeId?: string
): Promise<string> {
  let slug = baseSlug;
  let attempt = 0;

  while (true) {
    const existing = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, slug),
    });
    if (!existing || existing.id === excludeId) return slug;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }
}

export async function createWorkspace(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const name = (formData.get("name") as string)?.trim();
  if (!name || name.length < 2) {
    throw new Error("Workspace name must be at least 2 characters");
  }

  const user = await getUserByClerkId(clerkId);
  if (!user)
    throw new Error("User not found. Please try signing out and back in.");

  const slug = await ensureUniqueSlug(slugify(name));

  const [workspace] = await db
    .insert(workspaces)
    .values({
      name,
      slug,
      ownerId: user.id,
      tier: "becario",
      status: "active",
    })
    .returning();

  await db.insert(workspaceMembers).values({
    workspaceId: workspace.id,
    userId: user.id,
    role: "owner",
  });

  redirect(`/studio/${workspace.slug}`);
}

export async function updateWorkspace(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const name = (formData.get("name") as string)?.trim();

  if (!name || name.length < 2) {
    throw new Error("Workspace name must be at least 2 characters");
  }

  const role = await getMemberRole(workspaceId, user.id);
  if (!role || !["owner", "admin"].includes(role)) {
    throw new Error("Only owners and admins can update workspace settings");
  }

  const newSlug = await ensureUniqueSlug(slugify(name), workspaceId);

  await db
    .update(workspaces)
    .set({ name, slug: newSlug, updatedAt: new Date() })
    .where(eq(workspaces.id, workspaceId));

  if (newSlug !== workspaceSlug) {
    redirect(`/studio/${newSlug}/settings`);
  }

  revalidatePath(`/studio/${workspaceSlug}/settings`);
}

export async function deleteWorkspace(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;

  const role = await getMemberRole(workspaceId, user.id);
  if (role !== "owner") {
    throw new Error("Only the workspace owner can delete it");
  }

  // Delete members first (FK constraint), then workspace
  await db
    .delete(workspaceMembers)
    .where(eq(workspaceMembers.workspaceId, workspaceId));
  await db.delete(workspaces).where(eq(workspaces.id, workspaceId));

  redirect("/studio");
}
