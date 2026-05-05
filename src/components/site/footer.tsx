import Link from "next/link";
import { Bug, MessageSquare } from "lucide-react";

import { Container } from "@/components/layout/container";
import { FooterNavLink } from "@/components/site/footer-nav-link";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const links = [{ href: "/blog", label: "Articole" }];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-background-2 py-16">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
        {/* Brand */}
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-xl font-bold tracking-tight transition-opacity hover:opacity-90"
            aria-label={`${siteConfig.name} — Acasă`}
          >
            <span className="grid size-8 place-items-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-[0_0_14px_rgba(99,102,241,0.5)]">
              <Bug className="size-4 text-white" aria-hidden />
            </span>
            {siteConfig.name}
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Comunitate de testeri din România — manual testing, automation, API
            și performance. Discuții tehnice, resurse practice și suport pentru
            creștere reală în carieră.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ButtonLink
              href={siteConfig.discordInviteUrl}
              target="_blank"
              rel="noreferrer"
              size="sm"
            >
              <MessageSquare className="size-3.5" aria-hidden />
              Intră pe Discord
            </ButtonLink>
          </div>
        </div>

        {/* Nav */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/70">
            Navigație
          </p>
          <ul className="mt-5 grid gap-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <FooterNavLink
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {l.label}
                </FooterNavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <div className="mt-5 flex flex-wrap gap-2"></div>
          <div className="mt-8 text-xs leading-relaxed text-muted-2">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}
              <br />
              Toate drepturile rezervate.
            </p>
           <p className="mt-2">
  Dezvoltat de{" "}
  <a
    href="https://www.diacovidiu.ro"
    target="_blank"
    rel="noopener noreferrer"
    className="underline transition-colors hover:text-muted"
  >
    Diac Ovidiu
  </a>
</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
