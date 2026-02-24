import StudioShell from "@/components/studio/studio-shell";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  return (
    <StudioShell workspaceSlug={workspaceSlug}>{children}</StudioShell>
  );
}
