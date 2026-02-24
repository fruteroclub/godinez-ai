import { content } from "@/lib/content";

const { tasks } = content.studio;

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {tasks.title}
        </h1>
        <button className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors">
          {tasks.create}
        </button>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[tasks.statusPending, tasks.statusInProgress, tasks.statusCompleted].map(
          (status) => (
            <div
              key={status}
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
            >
              <h3 className="mb-3 text-sm font-medium text-[hsl(var(--muted-foreground))]">
                {status}
              </h3>
              <div className="flex h-32 items-center justify-center rounded border border-dashed border-[hsl(var(--border))]">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {tasks.empty}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
