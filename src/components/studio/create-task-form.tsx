import { createTask } from "@/lib/actions/tasks";

export default function CreateTaskForm({
  workspaceId,
  workspaceSlug,
  projectId,
}: {
  workspaceId: string;
  workspaceSlug: string;
  projectId?: string;
}) {
  return (
    <form
      action={createTask}
      className="flex flex-wrap gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
    >
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      {projectId && (
        <input type="hidden" name="projectId" value={projectId} />
      )}
      <input
        type="text"
        name="title"
        required
        placeholder="Nombre de la tarea"
        className="min-w-[200px] flex-1 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20"
      />
      <select
        name="priority"
        defaultValue="medium"
        className="rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20"
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
        <option value="urgent">Urgente</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
      >
        Crear tarea
      </button>
    </form>
  );
}
