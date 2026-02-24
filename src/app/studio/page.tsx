import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { content } from "@/lib/content";
import { getUserByClerkId } from "@/lib/db/queries/users";
import { getWorkspacesByUserId } from "@/lib/db/queries/workspaces";
import { createWorkspace } from "@/lib/actions/workspaces";

const { workspaceSelector, onboarding } = content.studio;

export default async function StudioPage() {
  const { userId: clerkId } = await auth.protect();

  const user = await getUserByClerkId(clerkId);

  if (!user) {
    // User signed in via Clerk but hasn't been synced to Postgres yet.
    // This can happen if the webhook hasn't fired yet.
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))]">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-magenta border-t-transparent" />
          <p className="text-[hsl(var(--muted-foreground))]">
            Configurando tu cuenta...
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]/60">
            Recarga la página en unos segundos
          </p>
        </div>
      </div>
    );
  }

  const userWorkspaces = await getWorkspacesByUserId(user.id);

  // Auto-redirect if user has exactly one workspace
  if (userWorkspaces.length === 1) {
    redirect(`/studio/${userWorkspaces[0].slug}`);
  }

  // Multiple workspaces — show selector
  if (userWorkspaces.length > 1) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))]">
        <div className="mx-auto w-full max-w-md space-y-6 px-4">
          <h1 className="text-center text-2xl font-semibold text-[hsl(var(--foreground))]">
            {workspaceSelector.title}
          </h1>
          <div className="space-y-2">
            {userWorkspaces.map((ws) => (
              <a
                key={ws.id}
                href={`/studio/${ws.slug}`}
                className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors hover:border-magenta/50"
              >
                <span className="font-medium text-[hsl(var(--foreground))]">
                  {ws.name}
                </span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {ws.tier}
                </span>
              </a>
            ))}
          </div>
          <CreateWorkspaceForm />
        </div>
      </div>
    );
  }

  // No workspaces — show create form
  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))]">
      <div className="mx-auto w-full max-w-md space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
            {onboarding.title}
          </h1>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            {workspaceSelector.empty}
          </p>
        </div>
        <CreateWorkspaceForm />
      </div>
    </div>
  );
}

function CreateWorkspaceForm() {
  return (
    <form action={createWorkspace} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[hsl(var(--foreground))]/80 mb-1.5"
        >
          {onboarding.nameLabel}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={60}
          placeholder={onboarding.namePlaceholder}
          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-magenta px-4 py-2.5 text-sm font-medium text-white hover:bg-magenta-dark transition-colors"
      >
        {onboarding.submit}
      </button>
    </form>
  );
}
