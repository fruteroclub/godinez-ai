import { content } from "@/lib/content";
import { resolveWorkspace } from "@/lib/auth";
import { getProjectsByWorkspaceId } from "@/lib/db/queries/projects";
import { createProject } from "@/lib/actions/projects";
import Link from "next/link";

const { projects: projectsContent } = content.studio;

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  completed: "bg-blue-500/20 text-blue-400",
  archived: "bg-gray-500/20 text-gray-400",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { workspace } = await resolveWorkspace(workspaceSlug);

  const projects = await getProjectsByWorkspaceId(workspace.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          {projectsContent.title}
        </h1>
      </div>

      {/* Create project form */}
      <form
        action={createProject}
        className="flex gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
      >
        <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
        <input
          type="text"
          name="name"
          required
          minLength={2}
          placeholder="Nombre del proyecto"
          className="flex-1 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20"
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción (opcional)"
          className="flex-1 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20"
        />
        <button
          type="submit"
          className="rounded-md bg-magenta px-4 py-2 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
        >
          {projectsContent.create}
        </button>
      </form>

      {/* Project list */}
      {projects.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <p className="text-[hsl(var(--muted-foreground))]">
            {projectsContent.empty}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/studio/${workspaceSlug}/projects/${project.id}`}
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/30"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[hsl(var(--foreground))]">
                  {project.name}
                </p>
                {project.description && (
                  <p className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))] truncate">
                    {project.description}
                  </p>
                )}
              </div>
              <span
                className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status] ?? statusColors.archived}`}
              >
                {project.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
