"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { workspaceMembers, users } from "../../../drizzle/schema";
import { getUserByClerkId } from "@/lib/db/queries/users";
import { getMemberRole } from "@/lib/db/queries/workspaces";
import { eq, and } from "drizzle-orm";

export async function inviteMember(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const currentUser = await getUserByClerkId(clerkId);
  if (!currentUser) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const role = (formData.get("role") as string) || "member";

  if (!email) throw new Error("Email is required");

  // Only owners and admins can invite
  const currentRole = await getMemberRole(workspaceId, currentUser.id);
  if (!currentRole || !["owner", "admin"].includes(currentRole)) {
    throw new Error("Only owners and admins can invite members");
  }

  // Find user by email
  const invitee = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!invitee) {
    throw new Error(
      "Usuario no encontrado. Deben crear una cuenta primero."
    );
  }

  // Check if already a member
  const existing = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.workspaceId, workspaceId),
      eq(workspaceMembers.userId, invitee.id)
    ),
  });
  if (existing) throw new Error("Este usuario ya es miembro del equipo.");

  await db.insert(workspaceMembers).values({
    workspaceId,
    userId: invitee.id,
    role: role as "owner" | "admin" | "member" | "viewer",
  });

  revalidatePath(`/studio/${workspaceSlug}/team`);
}

export async function removeMember(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const currentUser = await getUserByClerkId(clerkId);
  if (!currentUser) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const memberId = formData.get("memberId") as string;

  // Only owners can remove members
  const currentRole = await getMemberRole(workspaceId, currentUser.id);
  if (currentRole !== "owner") {
    throw new Error("Only the workspace owner can remove members");
  }

  // Can't remove yourself as owner
  const memberToRemove = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.id, memberId),
      eq(workspaceMembers.workspaceId, workspaceId)
    ),
  });
  if (!memberToRemove) throw new Error("Member not found");
  if (memberToRemove.role === "owner") {
    throw new Error("Cannot remove the workspace owner");
  }

  await db
    .delete(workspaceMembers)
    .where(
      and(
        eq(workspaceMembers.id, memberId),
        eq(workspaceMembers.workspaceId, workspaceId)
      )
    );

  revalidatePath(`/studio/${workspaceSlug}/team`);
}

export async function updateMemberRole(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const currentUser = await getUserByClerkId(clerkId);
  if (!currentUser) throw new Error("User not found");

  const workspaceId = formData.get("workspaceId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const memberId = formData.get("memberId") as string;
  const newRole = formData.get("role") as string;

  // Only owners can change roles
  const currentRole = await getMemberRole(workspaceId, currentUser.id);
  if (currentRole !== "owner") {
    throw new Error("Only the workspace owner can change roles");
  }

  // Can't change owner role
  const member = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.id, memberId),
      eq(workspaceMembers.workspaceId, workspaceId)
    ),
  });
  if (!member) throw new Error("Member not found");
  if (member.role === "owner") {
    throw new Error("Cannot change the owner's role");
  }

  await db
    .update(workspaceMembers)
    .set({ role: newRole as "admin" | "member" | "viewer" })
    .where(
      and(
        eq(workspaceMembers.id, memberId),
        eq(workspaceMembers.workspaceId, workspaceId)
      )
    );

  revalidatePath(`/studio/${workspaceSlug}/team`);
}
