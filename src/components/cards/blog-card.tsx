import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function BlogCard({
  href,
  title,
  description,
  categoryLabel,
  readingTime,
  dateLabel,
}: {
  href: string;
  title: string;
  description: string;
  categoryLabel: string;
  readingTime: string;
  dateLabel: string;
}) {
  return (
    <Link href={href} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-(--shadow) transition-all duration-300 group-hover:bg-card-2 group-hover:ring-border-2 group-hover:shadow-(--shadow-glow) group-hover:-translate-y-1">
        {/* Colour accent top bar */}
        <div className="h-0.5 bg-linear-to-r from-primary via-primary-2/80 to-transparent" />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">{categoryLabel}</Badge>
            <span className="flex items-center gap-1.5 text-xs text-muted-2">
              <Clock className="size-3" aria-hidden />
              {readingTime}
            </span>
            <span className="text-xs text-muted-2">{dateLabel}</span>
          </div>

          <h3 className="mt-3 flex-1 text-base font-bold leading-snug tracking-tight">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary/70 transition-colors group-hover:text-primary">
            Citește articolul
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
