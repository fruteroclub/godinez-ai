import { content } from "@/lib/content";

const { settings } = content.studio;

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        {settings.title}
      </h1>

      <div className="space-y-4">
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h2 className="font-medium text-[hsl(var(--foreground))]">
            {settings.general}
          </h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Configuración general del espacio de trabajo
          </p>
        </div>

        <div className="rounded-lg border border-red-500/20 bg-[hsl(var(--card))] p-6">
          <h2 className="font-medium text-red-400">{settings.danger}</h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Acciones irreversibles para este espacio de trabajo
          </p>
        </div>
      </div>
    </div>
  );
}
