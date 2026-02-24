import { resolveWorkspace } from "@/lib/auth";
import { getConversationById } from "@/lib/db/queries/conversations";
import { notFound } from "next/navigation";
import ChatView from "@/components/studio/chat-view";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; conversationId: string }>;
}) {
  const { workspaceSlug, conversationId } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const conversation = await getConversationById(conversationId);
  if (!conversation || conversation.workspaceId !== workspace.id) {
    notFound();
  }

  return (
    <ChatView
      conversationId={conversation.id}
      workspaceId={workspace.id}
    />
  );
}
