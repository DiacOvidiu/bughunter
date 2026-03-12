import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-(--shadow) transition-all duration-300 hover:ring-border-2 open:ring-border-2 open:shadow-(--shadow-glow)"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 select-none">
            <span className="text-sm font-bold tracking-tight">
              {item.question}
            </span>
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full bg-card-2 ring-1 ring-border",
                "transition-all duration-300 group-open:bg-primary/15 group-open:ring-primary/35",
              )}
            >
              <ChevronDown
                className="size-3.5 text-muted-2 transition-transform duration-300 group-open:rotate-180 group-open:text-primary"
                aria-hidden
              />
            </span>
          </summary>
          <div className="border-t border-border/50 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
