import { ArrowRight, Handshake, Mail, Mic2 } from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { Container } from "@/components/layout/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { JsonLdScript } from "@/components/seo/jsonld";
import {
  breadcrumbListJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Contact & Parteneriate — ${siteConfig.name}`,
  description:
    "Contactează BugHunter pentru parteneriate, speaker invitations și colaborări. Formular + CTA puternic spre Discord.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ trimis?: string }> | { trimis?: string };
}) {
  const resolved = await Promise.resolve(searchParams);
  const status = resolved?.trimis;
  return (
    <>
      <JsonLdScript data={organizationJsonLd()} />
      <JsonLdScript
        data={webPageJsonLd({
          path: "/contact",
          title: `Contact & Parteneriate — ${siteConfig.name}`,
          description: metadata.description as string,
        })}
      />
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Acasă", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20 lg:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-[260px] -top-[220px] h-[720px] w-[720px] rounded-full bg-indigo-600/12 blur-[120px] animate-float" />
          <div className="absolute -right-[220px] -top-[160px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[110px] animate-float-alt" />
          <div
            className="absolute bottom-[-160px] left-[35%] h-[560px] w-[560px] rounded-full bg-violet-600/10 blur-[110px] animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dots opacity-45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,transparent_52%,var(--background)_100%)]"
        />

        <Container className="relative max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-(--shadow)">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-2 animate-glow" />
                  Contact / Parteneriate
                </span>
              </div>
              <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Hai să construim ceva util pentru QA în România
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Parteneriate, speaker invitations, workshop-uri și colaborări editoriale. Trimite un mesaj sau intră pe Discord.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  {
                    title: "Parteneriate",
                    Icon: Handshake,
                    color: "text-indigo-400 bg-indigo-500/15",
                    text: "Sponsorizări pentru evenimente, colaborări cu companii, programe de învățare.",
                  },
                  {
                    title: "Speakers & workshop-uri",
                    Icon: Mic2,
                    color: "text-violet-400 bg-violet-500/15",
                    text: "Invitații la evenimente, sesiuni live, AMA și workshop-uri hands-on.",
                  },
                  {
                    title: "Contact direct",
                    Icon: Mail,
                    color: "text-cyan-400 bg-cyan-500/15",
                    text: `Email: ${siteConfig.email}`,
                  },
                ].map((i) => (
                  <div
                    key={i.title}
                    className="flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-border shadow-(--shadow)"
                  >
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-xl ${i.color}`}
                    >
                      <i.Icon className="size-4" aria-hidden />
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-tight">
                        {i.title}
                      </div>
                      <div className="mt-1 text-sm leading-relaxed text-muted">
                        {i.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Intră pe Discord
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${siteConfig.email}`}
                  variant="secondary"
                >
                  Scrie pe email
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
              {status === "ok" ? (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 p-5 text-sm text-foreground ring-1 ring-emerald-500/25">
                  Mesaj trimis. Revenim cât de repede putem. Pentru urgențe, cel
                  mai rapid e pe Discord.
                </div>
              ) : null}
              {status === "invalid" ? (
                <div className="mb-6 rounded-2xl bg-rose-500/10 p-5 text-sm text-foreground ring-1 ring-rose-500/25">
                  Verifică datele din formular și încearcă din nou. Mesajul
                  trebuie să aibă minim 10 caractere.
                </div>
              ) : null}
              <div className="text-sm font-semibold tracking-tight">
                Trimite un mesaj
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Formularul e pregătit pentru integrare cu un provider (Resend,
                SendGrid, etc.). În modul demo, mesajul primește răspuns
                automat.
              </p>
              <form
                action="/api/contact"
                method="post"
                className="mt-6 grid gap-4"
              >
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nume
                  </label>
                  <Input id="name" name="name" autoComplete="name" required />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="email@exemplu.ro"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="topic"
                    className="text-sm font-medium text-foreground"
                  >
                    Subiect
                  </label>
                  <Input
                    id="topic"
                    name="topic"
                    required
                    placeholder="Parteneriat / speaker / colaborare"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Mesaj
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Scrie câteva detalii relevante."
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="sm:ml-auto">
                    Trimite mesajul
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
                <p className="text-xs text-muted-2">
                  Dacă e urgent, cel mai rapid e pe Discord. Pentru colaborări,
                  descrie scopul și ce propui concret.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <DiscordCTABlock
        title="Cel mai rapid răspuns: Discord"
        description="Pentru întrebări de QA, feedback sau orientare, Discord-ul e canalul principal. Intră și deschide un thread."
      />
    </>
  );
}
