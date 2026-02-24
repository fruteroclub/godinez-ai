"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    crumbs.push({ label, href: currentPath });
  }

  return crumbs;
}

export default function TopBar() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="flex h-14 items-center border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] px-6">
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-[hsl(var(--muted-foreground))]">/</span>
            )}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-[hsl(var(--foreground))] font-medium">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}
