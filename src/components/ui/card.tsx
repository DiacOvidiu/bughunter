import * as React from "react";

import { cn } from "@/lib/cn";

export type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "default" | "outline" | "glow" | "glass";
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        /* default – solid dark card, clearly visible on body bg */
        variant === "default" &&
          "bg-card ring-1 ring-border shadow-(--shadow) hover:bg-card-2 hover:ring-border-2 hover:shadow-(--shadow-glow)",
        /* outline – transparent with ring */
        variant === "outline" &&
          "bg-transparent ring-1 ring-border hover:ring-border-2",
        /* glow – solid + indigo glow shadow */
        variant === "glow" &&
          "bg-card ring-1 ring-primary/25 shadow-[0_0_32px_rgba(99,102,241,0.14)] hover:ring-primary/45 hover:shadow-[0_0_56px_rgba(99,102,241,0.24)]",
        /* glass – semi-transparent + heavy blur */
        variant === "glass" &&
          "bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-(--shadow) hover:bg-white/8 hover:ring-white/15",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle(props: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight", props.className)} {...props} />
  );
}

export function CardDescription(props: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted", props.className)} {...props} />
  );
}
