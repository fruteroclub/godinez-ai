import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getFilesByWorkspaceId } from "@/lib/db/queries/files";
import FileList from "@/components/studio/file-list";

const { files: filesContent } = content.studio;

export default async function FilesPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const files = await getFilesByWorkspaceId(workspace.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {filesContent.title}
      </h1>

      <FileList
        files={files.map((f) => ({
          ...f,
          createdAt: f.createdAt.toISOString(),
        }))}
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        emptyMessage={filesContent.empty}
      />
    </div>
  );
}
