import Sidebar from "./sidebar";
import TopBar from "./topbar";

export default function StudioShell({
  workspaceSlug,
  children,
}: {
  workspaceSlug: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[hsl(var(--background))]">
      <Sidebar workspaceSlug={workspaceSlug} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
