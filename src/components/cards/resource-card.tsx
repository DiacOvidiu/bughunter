import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function ResourceCard({
  href,
  title,
  description,
  label,
}: {
  href: string;
  title: string;
  description: string;
  label: string;
}) {
  return (
    <Link href={href} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border shadow-(--shadow) transition-all duration-300 group-hover:bg-card-2 group-hover:ring-border-2 group-hover:shadow-(--shadow-glow) group-hover:-translate-y-1">
        <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600/22 to-primary-2/12 ring-1 ring-primary/20">
          <BookOpen className="size-5 text-primary" aria-hidden />
        </div>
        <Badge className="mt-4 self-start" tone="primary">
          {label}
        </Badge>
        <h3 className="mt-3 flex-1 font-bold leading-snug tracking-tight">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {description}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary/70 transition-colors group-hover:text-primary">
          Vezi resursa
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
