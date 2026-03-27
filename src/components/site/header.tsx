"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bug, Newspaper } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/blog", label: "Articole", icon: Newspaper },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-xl px-2 py-1.5 font-bold tracking-tight transition-all hover:bg-card-2"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-[0_0_16px_rgba(99,102,241,0.55)]">
            <Bug className="size-4 text-white" aria-hidden />
          </span>
          <span className="text-sm">{siteConfig.name}</span>
          <span className="hidden text-xs font-normal text-muted-2 sm:inline">
            QA · România
          </span>
        </Link>

        {/* Nav + CTA — always visible, no dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <nav className="flex items-center" aria-label="Principal">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all sm:px-3.5",
                    active
                      ? "bg-card-2 text-foreground ring-1 ring-border"
                      : "text-muted hover:bg-card-2 hover:text-foreground",
                  )}
                >
                  <item.icon className="size-3.5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-border/60" aria-hidden />

          <ButtonLink
            href={siteConfig.discordInviteUrl}
            target="_blank"
            rel="noreferrer"
            size="sm"
          >
            <span className="sm:hidden">Discord</span>
            <span className="hidden sm:inline">Intră pe Discord</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
