import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getProjectById } from "@/lib/db/queries/projects";
import { getTasksByProjectId } from "@/lib/db/queries/tasks";
import { notFound } from "next/navigation";
import TaskBoard from "@/components/studio/task-board";
import CreateTaskForm from "@/components/studio/create-task-form";

const { tasks: tasksContent } = content.studio;

export default async function ProjectTasksPage({
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

  const tasks = await getTasksByProjectId(projectId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {tasksContent.title} — {project.name}
      </h1>

      <CreateTaskForm
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        projectId={projectId}
      />

      <TaskBoard
        tasks={tasks.map((t) => ({
          ...t,
          createdAt: t.createdAt.toISOString(),
        }))}
        workspaceSlug={workspaceSlug}
      />
    </div>
  );
}
