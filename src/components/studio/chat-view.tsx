"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useMessages } from "@/hooks/use-messages";
import { useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/lib/actions/chat";
import { content } from "@/lib/content";

const { chat } = content.studio;

interface ChatViewProps {
  conversationId: string;
  workspaceId: string;
}

export default function ChatView({
  conversationId,
  workspaceId,
}: ChatViewProps) {
  const { data: messages, isLoading } = useMessages(conversationId);
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    setInput("");

    const formData = new FormData();
    formData.set("conversationId", conversationId);
    formData.set("workspaceId", workspaceId);
    formData.set("content", value);

    startTransition(async () => {
      await sendMessage(formData);
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    });
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-magenta border-t-transparent" />
          </div>
        )}

        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-magenta text-white rounded-br-md"
                  : msg.role === "agent"
                    ? "bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-bl-md"
                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-xs italic"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {messages?.length === 0 && !isLoading && (
          <p className="text-center text-sm text-[hsl(var(--muted-foreground))] py-8">
            Envía un mensaje para empezar la conversación
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[hsl(var(--border))] p-4"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={chat.placeholder}
            disabled={isPending}
            className="flex-1 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-4 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors disabled:opacity-50"
          >
            {chat.send}
          </button>
        </div>
      </form>
    </div>
  );
}
