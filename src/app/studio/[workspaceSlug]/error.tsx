"use client";

export default function StudioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-96 flex-col items-center justify-center space-y-4">
      <div className="rounded-full bg-red-500/10 p-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-red-400"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <h2 className="text-lg font-medium text-[hsl(var(--foreground))]">
        Algo salió mal
      </h2>
      <p className="max-w-md text-center text-sm text-[hsl(var(--muted-foreground))]">
        {error.message || "Ocurrió un error inesperado. Intenta de nuevo."}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}
