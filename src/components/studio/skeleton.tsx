function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[hsl(var(--muted))]/50 ${className}`}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Bone className="h-8 w-48" />
      <div className="space-y-4">
        <Bone className="h-24 w-full rounded-lg" />
        <Bone className="h-24 w-full rounded-lg" />
        <Bone className="h-24 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Bone className="h-8 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Bone className="h-28 rounded-lg" />
        <Bone className="h-28 rounded-lg" />
        <Bone className="h-28 rounded-lg" />
        <Bone className="h-28 rounded-lg" />
      </div>
      <Bone className="h-64 rounded-lg" />
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-6">
      <Bone className="h-8 w-32" />
      <div className="space-y-3">
        <Bone className="h-16 w-full rounded-lg" />
        <Bone className="h-16 w-full rounded-lg" />
        <Bone className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Bone className="h-8 w-32" />
        <Bone className="h-9 w-32 rounded-md" />
      </div>
      <div className="space-y-2">
        <Bone className="h-16 w-full rounded-lg" />
        <Bone className="h-16 w-full rounded-lg" />
        <Bone className="h-16 w-full rounded-lg" />
        <Bone className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function KanbanSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Bone className="h-8 w-32" />
        <Bone className="h-9 w-32 rounded-md" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3">
          <Bone className="h-6 w-24" />
          <Bone className="h-20 rounded-lg" />
          <Bone className="h-20 rounded-lg" />
        </div>
        <div className="space-y-3">
          <Bone className="h-6 w-24" />
          <Bone className="h-20 rounded-lg" />
        </div>
        <div className="space-y-3">
          <Bone className="h-6 w-24" />
          <Bone className="h-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
