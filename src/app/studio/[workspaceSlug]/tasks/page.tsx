import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getTasksByWorkspaceId } from "@/lib/db/queries/tasks";
import TaskBoard from "@/components/studio/task-board";
import CreateTaskForm from "@/components/studio/create-task-form";

const { tasks: tasksContent } = content.studio;

export default async function TasksPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const tasks = await getTasksByWorkspaceId(workspace.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {tasksContent.title}
      </h1>

      <CreateTaskForm
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
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
