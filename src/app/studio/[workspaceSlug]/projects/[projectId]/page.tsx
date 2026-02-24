import { eq, and, count } from "drizzle-orm";
import { resolveWorkspace } from "@/lib/auth";
import { getProjectById } from "@/lib/db/queries/projects";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { tasks, messages, conversations } from "../../../../../../drizzle/schema";
import Link from "next/link";

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  completed: "bg-blue-500/20 text-blue-400",
  archived: "bg-gray-500/20 text-gray-400",
};

export default async function ProjectDetailPage({
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

  const [taskCount] = await db
    .select({ value: count() })
    .from(tasks)
    .where(eq(tasks.projectId, projectId));

  const [convCount] = await db
    .select({ value: count() })
    .from(conversations)
    .where(eq(conversations.projectId, projectId));

  const basePath = `/studio/${workspaceSlug}/projects/${projectId}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
            {project.name}
          </h1>
          {project.description && (
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              {project.description}
            </p>
          )}
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status] ?? statusColors.archived}`}
        >
          {project.status}
        </span>
      </div>

      {/* Quick nav cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href={`${basePath}/chat`}
          className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/30"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Chat</p>
          <p className="mt-1 text-2xl font-semibold text-[hsl(var(--foreground))]">
            {convCount.value}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            conversaciones
          </p>
        </Link>

        <Link
          href={`${basePath}/tasks`}
          className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/30"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Tareas</p>
          <p className="mt-1 text-2xl font-semibold text-[hsl(var(--foreground))]">
            {taskCount.value}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            tareas
          </p>
        </Link>

        <Link
          href={`${basePath}/files`}
          className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/30"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Archivos
          </p>
          <p className="mt-1 text-2xl font-semibold text-[hsl(var(--foreground))]">
            0
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            archivos
          </p>
        </Link>
      </div>
    </div>
  );
}
