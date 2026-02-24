import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import {
  getWorkspaceMembers,
  getMemberRole,
} from "@/lib/db/queries/workspaces";
import TeamList from "@/components/studio/team-list";

const { team } = content.studio;

export default async function TeamPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { user, workspace } = await resolveWorkspace(workspaceSlug);

  const members = await getWorkspaceMembers(workspace.id);
  const currentUserRole = await getMemberRole(workspace.id, user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {team.title}
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {members.length} {members.length === 1 ? "miembro" : "miembros"}
        </p>
      </div>

      <TeamList
        members={members.map((m) => ({
          id: m.id,
          role: m.role,
          createdAt: m.createdAt.toISOString(),
          user: {
            id: m.user.id,
            email: m.user.email,
            name: m.user.name,
            avatarUrl: m.user.avatarUrl,
          },
        }))}
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}
