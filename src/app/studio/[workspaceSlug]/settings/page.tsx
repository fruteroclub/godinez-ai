import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getMemberRole } from "@/lib/db/queries/workspaces";
import WorkspaceSettings from "@/components/studio/workspace-settings";

const { settings } = content.studio;

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { user, workspace } = await resolveWorkspace(workspaceSlug);

  const currentUserRole = await getMemberRole(workspace.id, user.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {settings.title}
      </h1>

      <WorkspaceSettings
        workspace={{
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
          tier: workspace.tier,
          status: workspace.status,
        }}
        workspaceSlug={workspaceSlug}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}
