import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getConversationsByWorkspaceId } from "@/lib/db/queries/conversations";
import { createConversation } from "@/lib/actions/chat";
import Link from "next/link";

const { chat } = content.studio;

export default async function ChatPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const conversations = await getConversationsByWorkspaceId(workspace.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {chat.title}
        </h1>
        <form action={createConversation}>
          <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
          <button
            type="submit"
            className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
          >
            {chat.newConversation}
          </button>
        </form>
      </div>

      {conversations.length === 0 ? (
        <div className="flex h-[calc(100vh-16rem)] items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <p className="text-[hsl(var(--muted-foreground))]">
            Inicia una conversación con tu agente
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/studio/${workspaceSlug}/chat/${conv.id}`}
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/30"
            >
              <div>
                <p className="font-medium text-[hsl(var(--foreground))]">
                  {conv.title ?? "Conversación"}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {conv.channel}
                </p>
              </div>
              {conv.lastMessageAt && (
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {new Date(conv.lastMessageAt).toLocaleDateString("es-MX")}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
