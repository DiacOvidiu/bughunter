import type React from "react";

import { cn } from "@/lib/cn";

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:scroll-mt-24 prose-headings:tracking-tight",
        "prose-a:text-foreground prose-a:decoration-primary/40 hover:prose-a:decoration-primary",
        "prose-strong:text-foreground",
        "prose-code:text-foreground prose-code:bg-card-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
        "prose-pre:bg-card prose-pre:ring-1 prose-pre:ring-border prose-pre:shadow-(--shadow)",
        "prose-hr:border-border",
        "prose-blockquote:border-border prose-blockquote:text-muted",
        "prose-ul:text-muted prose-ol:text-muted prose-p:text-muted",
        className,
      )}
      {...props}
    />
  );
}
