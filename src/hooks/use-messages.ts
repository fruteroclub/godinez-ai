"use client";

import { useQuery } from "@tanstack/react-query";

interface Message {
  id: string;
  conversationId: string;
  workspaceId: string;
  role: "user" | "agent" | "system";
  content: string;
  userId: string | null;
  agentId: string | null;
  metadata: unknown;
  fileId: string | null;
  createdAt: string;
}

export function useMessages(conversationId: string) {
  return useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const res = await fetch(
        `/api/studio/conversations/${conversationId}/messages`
      );
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      return data.messages;
    },
    refetchInterval: 1000,
  });
}
