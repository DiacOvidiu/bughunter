import Link from "next/link";

import { cn } from "@/lib/cn";

export type Breadcrumb = {
  href: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const hideOnMobile = isLast && items.length > 2;
          return (
            <li
              key={item.href}
              className={cn(
                "flex items-center gap-2",
                hideOnMobile && "hidden sm:flex",
              )}
            >
              {idx > 0 ? (
                <span aria-hidden className="text-muted-2">
                  /
                </span>
              ) : null}
              <Link className="hover:text-foreground" href={item.href}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
