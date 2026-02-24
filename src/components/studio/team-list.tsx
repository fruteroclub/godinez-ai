"use client";

import { content } from "@/lib/content";
import { inviteMember, removeMember, updateMemberRole } from "@/lib/actions/team";
import { useState } from "react";

const { team: teamContent } = content.studio;

const roleLabels: Record<string, string> = {
  owner: teamContent.roleOwner,
  admin: teamContent.roleAdmin,
  member: teamContent.roleMember,
  viewer: teamContent.roleViewer,
};

interface Member {
  id: string;
  role: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
  };
}

export default function TeamList({
  members,
  workspaceId,
  workspaceSlug,
  currentUserRole,
}: {
  members: Member[];
  workspaceId: string;
  workspaceSlug: string;
  currentUserRole: string | null;
}) {
  const [showInvite, setShowInvite] = useState(false);
  const canManage = currentUserRole === "owner" || currentUserRole === "admin";
  const isOwner = currentUserRole === "owner";

  return (
    <div className="space-y-4">
      {/* Invite button + form */}
      {canManage && (
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
          {showInvite ? (
            <form action={inviteMember} className="space-y-3">
              <input type="hidden" name="workspaceId" value={workspaceId} />
              <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="usuario@ejemplo.com"
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                    Rol
                  </label>
                  <select
                    name="role"
                    defaultValue="member"
                    className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))]"
                  >
                    <option value="admin">{teamContent.roleAdmin}</option>
                    <option value="member">{teamContent.roleMember}</option>
                    <option value="viewer">{teamContent.roleViewer}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
                >
                  {teamContent.invite}
                </button>
                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowInvite(true)}
              className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
            >
              + {teamContent.invite}
            </button>
          )}
        </div>
      )}

      {/* Member list */}
      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-sm font-medium text-[hsl(var(--foreground))]">
                {(member.user.name?.[0] ?? member.user.email[0]).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                  {member.user.name ?? member.user.email}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                  {member.user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Role selector (owner can change roles of non-owners) */}
              {isOwner && member.role !== "owner" ? (
                <form action={updateMemberRole}>
                  <input type="hidden" name="workspaceId" value={workspaceId} />
                  <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
                  <input type="hidden" name="memberId" value={member.id} />
                  <select
                    name="role"
                    defaultValue={member.role}
                    onChange={(e) => e.target.form?.requestSubmit()}
                    className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-2 py-1 text-xs text-[hsl(var(--foreground))]"
                  >
                    <option value="admin">{teamContent.roleAdmin}</option>
                    <option value="member">{teamContent.roleMember}</option>
                    <option value="viewer">{teamContent.roleViewer}</option>
                  </select>
                </form>
              ) : (
                <span className="rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-xs font-medium text-[hsl(var(--foreground))]">
                  {roleLabels[member.role] ?? member.role}
                </span>
              )}

              {/* Remove button (owner can remove non-owners) */}
              {isOwner && member.role !== "owner" && (
                <form action={removeMember}>
                  <input type="hidden" name="workspaceId" value={workspaceId} />
                  <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
                  <input type="hidden" name="memberId" value={member.id} />
                  <button
                    type="submit"
                    className="rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Quitar
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
