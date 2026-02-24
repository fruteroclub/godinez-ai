import { eq, desc } from "drizzle-orm";
import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { db } from "@/lib/db";
import { agentLogs } from "../../../../../drizzle/schema";

const { activity } = content.studio;

const levelColors: Record<string, string> = {
  debug: "text-gray-400",
  info: "text-blue-400",
  warn: "text-yellow-400",
  error: "text-red-400",
};

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const logs = await db.query.agentLogs.findMany({
    where: eq(agentLogs.workspaceId, workspace.id),
    orderBy: [desc(agentLogs.createdAt)],
    limit: 50,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {activity.title}
      </h1>

      {logs.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <p className="text-[hsl(var(--muted-foreground))]">
            {activity.empty}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3"
            >
              <span
                className={`mt-0.5 text-xs font-mono font-medium uppercase ${levelColors[log.level] ?? "text-gray-400"}`}
              >
                {log.level}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {log.event}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {new Date(log.createdAt).toLocaleString("es-MX")}
                  </span>
                </div>
                {log.message && (
                  <p className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))] truncate">
                    {log.message}
                  </p>
                )}
              </div>
              {log.durationMs && (
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {log.durationMs}ms
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
