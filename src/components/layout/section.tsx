import * as React from "react";

import { cn } from "@/lib/cn";

export type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "subtle" | "dark";
};

export function Section({ className, tone = "default", children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-10 sm:py-16 lg:py-24",
        /* Clear top-border separator between every section */
        "border-t border-border/30",
        /* Subtle – very slightly lighter background for alternation */
        tone === "subtle" && "bg-background-2",
        /* Dark – same as body but no gradient bleed */
        tone === "dark" && "bg-background",
        className,
      )}
      {...props}
    >
      {/* Ambient gradient for subtle sections */}
      {tone === "subtle" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_800px_380px_at_12%_50%,rgba(99,102,241,0.09),transparent_58%),radial-gradient(ellipse_600px_300px_at_88%_50%,rgba(34,211,238,0.06),transparent_58%)]"
        />
      )}
      <div className={cn(tone !== "default" && "relative")}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2.5">
          <span className="h-px w-5 bg-linear-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary/80">
            {eyebrow}
          </span>
          <span className="h-px w-5 bg-linear-to-l from-primary/60 to-transparent" />
        </div>
      )}
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
