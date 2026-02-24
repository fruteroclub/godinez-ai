export default function ProjectChatPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-center text-[hsl(var(--muted-foreground))]">
          Chat del proyecto
        </p>
      </div>
      <div className="border-t border-[hsl(var(--border))] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-4 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
          />
          <button className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
