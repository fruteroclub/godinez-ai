import { resolveWorkspace } from "@/lib/auth";
import { getProjectById } from "@/lib/db/queries/projects";
import {
  getConversationsByProjectId,
  getConversationById,
} from "@/lib/db/queries/conversations";
import { createConversation } from "@/lib/actions/chat";
import { notFound } from "next/navigation";
import Link from "next/link";
import ChatView from "@/components/studio/chat-view";
import { content } from "@/lib/content";

const { chat } = content.studio;

export default async function ProjectChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceSlug: string; projectId: string }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { workspaceSlug, projectId } = await params;
  const { c: activeConversationId } = await searchParams;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const project = await getProjectById(projectId);
  if (!project || project.workspaceId !== workspace.id) {
    notFound();
  }

  const conversations = await getConversationsByProjectId(projectId);

  // If a conversation is selected via query param, show it
  if (activeConversationId) {
    const conversation = await getConversationById(activeConversationId);
    if (conversation && conversation.projectId === projectId) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/studio/${workspaceSlug}/projects/${projectId}/chat`}
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              ← Conversaciones
            </Link>
            <span className="text-sm text-[hsl(var(--foreground))] font-medium">
              {conversation.title}
            </span>
          </div>
          <ChatView
            conversationId={conversation.id}
            workspaceId={workspace.id}
          />
        </div>
      );
    }
  }

  // Show conversation list
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          {chat.title} — {project.name}
        </h2>
        <form action={createConversation}>
          <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
          <input type="hidden" name="projectId" value={projectId} />
          <button
            type="submit"
            className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
          >
            {chat.newConversation}
          </button>
        </form>
      </div>

      {conversations.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <p className="text-[hsl(var(--muted-foreground))]">
            Inicia una conversación sobre este proyecto
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/studio/${workspaceSlug}/projects/${projectId}/chat?c=${conv.id}`}
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/30"
            >
              <p className="font-medium text-[hsl(var(--foreground))]">
                {conv.title ?? "Conversación"}
              </p>
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
