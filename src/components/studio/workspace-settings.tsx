"use client";

import { content } from "@/lib/content";
import { updateWorkspace, deleteWorkspace } from "@/lib/actions/workspaces";
import { useState } from "react";

const { settings } = content.studio;

export default function WorkspaceSettings({
  workspace,
  workspaceSlug,
  currentUserRole,
}: {
  workspace: {
    id: string;
    name: string;
    slug: string;
    tier: string;
    status: string;
  };
  workspaceSlug: string;
  currentUserRole: string | null;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const canEdit = currentUserRole === "owner" || currentUserRole === "admin";
  const isOwner = currentUserRole === "owner";

  const tierLabels: Record<string, string> = {
    becario: "Becario",
    asistente: "Asistente",
    agente: "Agente",
  };

  return (
    <div className="space-y-6">
      {/* General settings */}
      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <h2 className="font-medium text-[hsl(var(--foreground))]">
          {settings.general}
        </h2>

        <form action={updateWorkspace} className="mt-4 space-y-4">
          <input type="hidden" name="workspaceId" value={workspace.id} />
          <input type="hidden" name="workspaceSlug" value={workspaceSlug} />

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              defaultValue={workspace.name}
              disabled={!canEdit}
              className="w-full max-w-md rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
              URL
            </label>
            <p className="text-sm text-[hsl(var(--foreground))]">
              /studio/{workspace.slug}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Se actualiza automáticamente al cambiar el nombre
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
              Plan
            </label>
            <span className="inline-block rounded-full bg-magenta/10 px-3 py-1 text-sm font-medium text-magenta">
              {tierLabels[workspace.tier] ?? workspace.tier}
            </span>
          </div>

          {canEdit && (
            <button
              type="submit"
              className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
            >
              Guardar cambios
            </button>
          )}
        </form>
      </div>

      {/* Danger zone */}
      {isOwner && (
        <div className="rounded-lg border border-red-500/20 bg-[hsl(var(--card))] p-6">
          <h2 className="font-medium text-red-400">{settings.danger}</h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Eliminar permanentemente este espacio de trabajo, todos sus
            proyectos, tareas, archivos y conversaciones.
          </p>

          {confirmDelete ? (
            <form action={deleteWorkspace} className="mt-4 space-y-3">
              <input type="hidden" name="workspaceId" value={workspace.id} />
              <p className="text-sm text-red-400">
                Escribe <strong>{workspace.slug}</strong> para confirmar:
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder={workspace.slug}
                  className="w-full max-w-xs rounded-md border border-red-500/30 bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))]"
                />
                <button
                  type="submit"
                  disabled={deleteInput !== workspace.slug}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmDelete(false);
                    setDeleteInput("");
                  }}
                  className="rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="mt-4 rounded-md border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Eliminar espacio de trabajo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
