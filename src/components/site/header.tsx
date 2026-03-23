"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bug,
  CalendarDays,
  Newspaper,
  Phone,
  Sparkles,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/despre", label: "Despre", icon: Sparkles },
  { href: "/evenimente", label: "Evenimente", icon: CalendarDays },
  { href: "/blog", label: "Articole", icon: Newspaper },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-2xl">
      {/* Thin gradient accent line at very top */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-xl px-2 py-1.5 font-bold tracking-tight transition-all hover:bg-card-2"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-[0_0_16px_rgba(99,102,241,0.55)]">
            <Bug className="size-4 text-white" aria-hidden />
          </span>
          <span className="text-sm">{siteConfig.name}</span>
          <span className="hidden text-xs font-normal text-muted-2 sm:inline">
            QA · România
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition-all hover:bg-card-2 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 sm:flex">
          <ButtonLink
            href={siteConfig.discordInviteUrl}
            target="_blank"
            rel="noreferrer"
            size="sm"
          >
            Intră pe Discord
          </ButtonLink>
        </div>

        {/* Mobile menu */}
        <div className="relative lg:hidden">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="cursor-pointer rounded-xl bg-card px-4 py-2 text-sm font-semibold ring-1 ring-border shadow-(--shadow) transition-colors hover:bg-card-2"
            aria-expanded={menuOpen}
            aria-label="Meniu navigare"
          >
            Meniu
          </button>
          {menuOpen && (
            <div
              className={cn(
                "absolute right-0 mt-3 w-[min(93vw,380px)] rounded-2xl bg-background-2 p-3",
                "ring-1 ring-border shadow-(--shadow)",
              )}
            >
              <div className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card-2"
                  >
                    <item.icon className="size-4 text-primary/70" aria-hidden />
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-border pt-3">
                  <ButtonLink
                    href={siteConfig.discordInviteUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="w-full justify-center"
                  >
                    Intră pe Discord
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
