import Link from "next/link";

export default function WorkspaceNotFound() {
  return (
    <div className="flex h-96 flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium text-[hsl(var(--foreground))]">
        No encontrado
      </h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        El espacio de trabajo no existe o no tienes acceso.
      </p>
      <Link
        href="/studio"
        className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
      >
        Ir a Studio
      </Link>
    </div>
  );
}
