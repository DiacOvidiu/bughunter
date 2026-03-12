import * as React from "react";

import { cn } from "@/lib/cn";

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> & {
  tone?: "neutral" | "primary" | "success";
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-card-2 text-muted ring-1 ring-border",
  primary: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30",
  success: "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
