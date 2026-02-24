import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getProjectById } from "@/lib/db/queries/projects";
import { getFilesByProjectId } from "@/lib/db/queries/files";
import { notFound } from "next/navigation";
import FileList from "@/components/studio/file-list";

const { files: filesContent } = content.studio;

export default async function ProjectFilesPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectId: string }>;
}) {
  const { workspaceSlug, projectId } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const project = await getProjectById(projectId);
  if (!project || project.workspaceId !== workspace.id) {
    notFound();
  }

  const files = await getFilesByProjectId(projectId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {filesContent.title} — {project.name}
      </h1>

      <FileList
        files={files.map((f) => ({
          ...f,
          createdAt: f.createdAt.toISOString(),
        }))}
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        projectId={projectId}
        emptyMessage={filesContent.empty}
      />
    </div>
  );
}
