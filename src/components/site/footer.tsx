import Link from "next/link";
import { Github, Linkedin, MessageSquare, Youtube } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/despre", label: "Despre" },
  { href: "/evenimente", label: "Evenimente" },
  { href: "/blog", label: "Articole" },
  { href: "/resurse", label: "Resurse" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-background-2 py-16">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 font-bold tracking-tight">
            <span className="grid size-8 place-items-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-[0_0_14px_rgba(99,102,241,0.5)] text-white text-xs font-bold">
              B
            </span>
            {siteConfig.name}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Comunitatea QA din România pentru practică reală, întrebări bune și
            creștere sănătoasă în carieră. Fără zgomot. Fără bariere inutile. Cu
            standarde.
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
            <ButtonLink href="/evenimente" variant="secondary" size="sm">
              Evenimente
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
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/70">
            Social
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink
              href={siteConfig.socials.linkedin}
              variant="secondary"
              size="sm"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="size-3.5" aria-hidden />
              LinkedIn
            </ButtonLink>
            <ButtonLink
              href={siteConfig.socials.github}
              variant="secondary"
              size="sm"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="size-3.5" aria-hidden />
              GitHub
            </ButtonLink>
            <ButtonLink
              href={siteConfig.socials.youtube}
              variant="secondary"
              size="sm"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="size-3.5" aria-hidden />
              YouTube
            </ButtonLink>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-muted-2">
            © {new Date().getFullYear()} {siteConfig.name}.
            <br />
            Toate drepturile rezervate.
            <br />
            Dezvoltat de{" "}
            <a
              href="https://www.diacovidiu.ro/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-muted transition-colors"
            >
              diacovidiu.ro
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
