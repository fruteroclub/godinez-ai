import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getAgentById } from "@/lib/db/queries/agents";

const { sidebar } = content.studio;

export default async function AgentPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const agent = workspace.agentId
    ? await getAgentById(workspace.agentId)
    : null;

  if (!agent) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {sidebar.agent}
        </h1>
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-2xl">
              🤖
            </div>
            <div>
              <h2 className="text-lg font-medium text-[hsl(var(--foreground))]">
                Sin agente asignado
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Tu agente aparecerá aquí cuando sea asignado por el equipo de
                Frutero
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const config = agent.config as {
    personality?: string;
    skills?: string[];
    channels?: string[];
  } | null;

  const statusColors: Record<string, string> = {
    active: "bg-green-500/20 text-green-400",
    paused: "bg-yellow-500/20 text-yellow-400",
    provisioning: "bg-blue-500/20 text-blue-400",
    error: "bg-red-500/20 text-red-400",
    archived: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {sidebar.agent}
      </h1>

      {/* Agent header */}
      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-2xl">
            🤖
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                {agent.name}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[agent.status] ?? statusColors.archived}`}
              >
                {agent.status}
              </span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Plantilla: {agent.template}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Personality */}
        {config?.personality && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
              Personalidad
            </h3>
            <p className="text-sm text-[hsl(var(--foreground))]">
              {config.personality}
            </p>
          </div>
        )}

        {/* Skills */}
        {config?.skills && config.skills.length > 0 && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
              Habilidades
            </h3>
            <div className="flex flex-wrap gap-2">
              {config.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-violet/10 px-3 py-1 text-xs text-violet-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Channels */}
        {config?.channels && config.channels.length > 0 && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
              Canales
            </h3>
            <div className="flex flex-wrap gap-2">
              {config.channels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full bg-magenta/10 px-3 py-1 text-xs text-magenta-light"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
