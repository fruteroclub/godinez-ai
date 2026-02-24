import { content } from "@/lib/content";

const { team } = content.studio;

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {team.title}
        </h1>
        <button className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors">
          {team.invite}
        </button>
      </div>
      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Miembros del equipo aparecerán aquí
        </p>
      </div>
    </div>
  );
}
