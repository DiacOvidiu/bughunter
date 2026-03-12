import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function EventCard({
  href,
  title,
  description,
  dateLabel,
  location,
  status,
}: {
  href: string;
  title: string;
  description: string;
  dateLabel: string;
  location: string;
  status: "upcoming" | "past";
}) {
  return (
    <Link href={href} className="group block">
      <div className="flex h-full items-start gap-4 rounded-2xl bg-card p-5 ring-1 ring-border shadow-(--shadow) transition-all duration-300 group-hover:bg-card-2 group-hover:ring-border-2 group-hover:shadow-(--shadow-glow) group-hover:-translate-y-0.5">
        {/* Calendar icon block */}
        <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary-2/12 p-3 ring-1 ring-primary/20 min-w-[56px]">
          <CalendarDays className="size-5 text-primary" aria-hidden />
          <span className="mt-1 text-center text-[10px] font-semibold leading-tight text-muted-2">
            {dateLabel}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={status === "upcoming" ? "success" : "neutral"}>
              {status === "upcoming" ? "Urmează" : "Trecut"}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-muted-2">
              <MapPin className="size-3" aria-hidden />
              {location}
            </span>
          </div>
          <h3 className="mt-2 font-bold leading-snug tracking-tight">
            {title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>

        <ArrowRight
          className="mt-1 size-4 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </div>
    </Link>
  );
}
