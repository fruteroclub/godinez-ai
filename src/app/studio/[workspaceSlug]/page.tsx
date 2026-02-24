import { eq, and, count } from "drizzle-orm";
import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, tasks, messages, agents } from "../../../../drizzle/schema";
import { getAgentById } from "@/lib/db/queries/agents";

const { dashboard } = content.studio;

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const [projectCount] = await db
    .select({ value: count() })
    .from(projects)
    .where(
      and(eq(projects.workspaceId, workspace.id), eq(projects.status, "active"))
    );

  const [taskCount] = await db
    .select({ value: count() })
    .from(tasks)
    .where(
      and(
        eq(tasks.workspaceId, workspace.id),
        eq(tasks.status, "pending")
      )
    );

  const [messageCount] = await db
    .select({ value: count() })
    .from(messages)
    .where(eq(messages.workspaceId, workspace.id));

  const agent = workspace.agentId
    ? await getAgentById(workspace.agentId)
    : null;

  const agentStatusLabel = agent
    ? agent.status === "active"
      ? "Activo"
      : agent.status
    : "Sin asignar";

  const stats = [
    { label: dashboard.activeProjects, value: String(projectCount.value) },
    { label: dashboard.pendingTasks, value: String(taskCount.value) },
    { label: dashboard.recentMessages, value: String(messageCount.value) },
    { label: dashboard.agentStatus, value: agentStatusLabel },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {dashboard.title}
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          {dashboard.welcome}, {workspace.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
          >
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[hsl(var(--foreground))]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {agent && (
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-lg">
              🤖
            </div>
            <div>
              <p className="font-medium text-[hsl(var(--foreground))]">
                {agent.name}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {agent.template} · {agentStatusLabel}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
