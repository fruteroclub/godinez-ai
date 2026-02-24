import { uploadFile } from "@/lib/actions/files";

interface FileItem {
  id: string;
  filename: string;
  mimeType: string | null;
  sizeBytes: number | null;
  url: string;
  createdAt: string;
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileList({
  files,
  workspaceId,
  workspaceSlug,
  projectId,
  emptyMessage,
}: {
  files: FileItem[];
  workspaceId: string;
  workspaceSlug: string;
  projectId?: string;
  emptyMessage: string;
}) {
  return (
    <div className="space-y-4">
      {/* Upload form */}
      <form
        action={uploadFile}
        className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
      >
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
        {projectId && (
          <input type="hidden" name="projectId" value={projectId} />
        )}
        <input
          type="file"
          name="file"
          required
          className="flex-1 text-sm text-[hsl(var(--muted-foreground))] file:mr-3 file:rounded-md file:border-0 file:bg-magenta file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-magenta-dark file:transition-colors file:cursor-pointer"
        />
        <button
          type="submit"
          className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
        >
          Subir
        </button>
      </form>

      {/* File list */}
      {files.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <p className="text-[hsl(var(--muted-foreground))]">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <a
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 transition-colors hover:border-magenta/30"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                  {file.filename}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {file.mimeType ?? "archivo"} · {formatBytes(file.sizeBytes)}
                </p>
              </div>
              <span className="ml-3 text-xs text-[hsl(var(--muted-foreground))]">
                {new Date(file.createdAt).toLocaleDateString("es-MX")}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
