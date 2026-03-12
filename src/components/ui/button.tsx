import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-indigo-600 to-violet-600 text-white " +
    "shadow-[0_0_20px_rgba(99,102,241,0.45),0_2px_12px_rgba(0,0,0,0.4)] " +
    "hover:from-indigo-500 hover:to-violet-500 " +
    "hover:shadow-[0_0_36px_rgba(99,102,241,0.65),0_2px_16px_rgba(0,0,0,0.4)] " +
    "hover:scale-[1.03] active:scale-[0.97]",
  secondary:
    "bg-card-2 text-foreground ring-1 ring-border " +
    "hover:bg-card-hover hover:ring-border-2 " +
    "hover:scale-[1.02] active:scale-[0.97]",
  ghost:
    "text-muted hover:text-foreground hover:bg-card-2 " +
    "ring-1 ring-transparent hover:ring-border",
  outline:
    "bg-transparent text-foreground ring-1 ring-border-2 " +
    "hover:bg-card hover:ring-primary/40 " +
    "hover:scale-[1.02] active:scale-[0.97]",
};

const sizes: Record<Size, string> = {
  sm: "h-9  px-4  text-sm",
  md: "h-11 px-5  text-sm",
  lg: "h-13 px-7  text-base",
};

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "className"
> & {
  className?: string;
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
