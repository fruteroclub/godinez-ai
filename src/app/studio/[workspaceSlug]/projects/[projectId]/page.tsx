export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        Proyecto
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
          <h2 className="font-medium text-[hsl(var(--foreground))]">
            Descripción
          </h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Sin descripción aún
          </p>
        </div>
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
          <h2 className="font-medium text-[hsl(var(--foreground))]">
            Actividad reciente
          </h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Sin actividad
          </p>
        </div>
      </div>
    </div>
  );
}
