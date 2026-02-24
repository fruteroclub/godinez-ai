import { content } from "@/lib/content";

const { chat } = content.studio;

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {chat.title}
        </h1>
        <button className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors">
          {chat.newConversation}
        </button>
      </div>
      <div className="flex h-[calc(100vh-16rem)] items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <p className="text-[hsl(var(--muted-foreground))]">
          Selecciona o inicia una conversación
        </p>
      </div>
    </div>
  );
}
