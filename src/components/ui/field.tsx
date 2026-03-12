import * as React from "react";

import { cn } from "@/lib/cn";

const base =
  "w-full rounded-xl bg-card ring-1 ring-border px-4 py-3 text-sm text-foreground placeholder:text-muted-2 shadow-(--shadow) transition-all duration-200 focus-visible:ring-border-2 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(139,92,246,0.2)]";

export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return <input className={cn(base, "h-11", props.className)} {...props} />;
}

export function Textarea(props: React.ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(base, "min-h-28 resize-y", props.className)} {...props} />;
}
