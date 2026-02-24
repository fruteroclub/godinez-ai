import { content } from "@/lib/content";

const { tasks } = content.studio;

export default function ProjectTasksPage() {
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
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <p className="text-[hsl(var(--muted-foreground))]">{tasks.empty}</p>
      </div>
    </div>
  );
}
