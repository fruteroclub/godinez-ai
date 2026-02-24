import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { workspaces, users, workspaceMembers } from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  if (!user) {
    return NextResponse.json({ workspaces: [] });
  }

  const members = await db.query.workspaceMembers.findMany({
    where: eq(workspaceMembers.userId, user.id),
  });

  if (members.length === 0) {
    return NextResponse.json({ workspaces: [] });
  }

  const workspaceIds = members.map((m) => m.workspaceId);
  const results = await db.query.workspaces.findMany({
    where: (w, { inArray }) => inArray(w.id, workspaceIds),
  });

  return NextResponse.json({ workspaces: results });
}
