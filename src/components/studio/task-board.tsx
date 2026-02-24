"use client";

import { updateTaskStatus } from "@/lib/actions/tasks";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  createdAt: string;
}

const columns = [
  { key: "pending", label: "Pendiente", color: "border-yellow-500/30" },
  { key: "in_progress", label: "En progreso", color: "border-blue-500/30" },
  { key: "completed", label: "Completada", color: "border-green-500/30" },
] as const;

const priorityColors: Record<string, string> = {
  low: "bg-gray-500/20 text-gray-400",
  medium: "bg-blue-500/20 text-blue-400",
  high: "bg-orange-500/20 text-orange-400",
  urgent: "bg-red-500/20 text-red-400",
};

const nextStatus: Record<string, string> = {
  pending: "in_progress",
  in_progress: "completed",
  completed: "pending",
};

export default function TaskBoard({
  tasks,
  workspaceSlug,
}: {
  tasks: Task[];
  workspaceSlug: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.key);
        return (
          <div
            key={col.key}
            className={`rounded-lg border ${col.color} bg-[hsl(var(--card))] p-4`}
          >
            <h3 className="mb-3 text-sm font-medium text-[hsl(var(--muted-foreground))]">
              {col.label}{" "}
              <span className="text-xs">({colTasks.length})</span>
            </h3>

            <div className="space-y-2">
              {colTasks.length === 0 ? (
                <div className="flex h-20 items-center justify-center rounded border border-dashed border-[hsl(var(--border))]">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Sin tareas
                  </p>
                </div>
              ) : (
                colTasks.map((task) => (
                  <form key={task.id} action={updateTaskStatus}>
                    <input type="hidden" name="taskId" value={task.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={nextStatus[task.status] ?? "pending"}
                    />
                    <input
                      type="hidden"
                      name="workspaceSlug"
                      value={workspaceSlug}
                    />
                    <button
                      type="submit"
                      className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3 text-left transition-colors hover:border-magenta/30"
                    >
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[task.priority] ?? priorityColors.medium}`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                          click para mover →
                        </span>
                      </div>
                    </button>
                  </form>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
