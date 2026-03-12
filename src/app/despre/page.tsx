import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  GitMerge,
  GraduationCap,
  Lightbulb,
  Share2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLdScript } from "@/components/seo/jsonld";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Despre comunitate — ${siteConfig.name}`,
  description:
    "Povestea, misiunea și valorile BugHunter. Pentru cine este comunitatea și cum contribuie la ecosistemul QA din România.",
  path: "/despre",
});

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          path: "/despre",
          title: `Despre comunitate — ${siteConfig.name}`,
          description: metadata.description as string,
        })}
      />
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Acasă", path: "/" },
          { name: "Despre", path: "/despre" },
        ])}
      />

      {/* Hero + quick stats */}
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
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-(--shadow)">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-2 animate-glow" />
              Despre comunitate
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                BugHunter există pentru a ridica standardul QA în România
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Nu construim doar un server de Discord. Construim un loc unde
                practici, întrebi și contribui fără zgomot și fără gatekeeping.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                >
                  Intră pe Discord
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/comunitate" variant="secondary" size="lg">
                  Cum funcționează
                </ButtonLink>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: "250+", label: "Membri activi" },
                  { value: "2022", label: "Fondată în" },
                  { value: "20+", label: "Canale Discord" },
                  { value: "~2 / lună", label: "Sesiuni live" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-card p-5 text-center ring-1 ring-border shadow-(--shadow)"
                  >
                    <div className="text-2xl font-black tracking-tight text-gradient">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gradient-border rounded-2xl">
              <Card variant="glow" className="p-7">
                <div className="text-sm font-bold tracking-tight">
                  Ce vei găsi aici
                </div>
                <div className="mt-4 grid gap-3 text-sm text-muted">
                  {[
                    "Standarde: bug reports clare, criterii, trade-offs",
                    "Învățare: workshop-uri, Q&A, exemple și resurse",
                    "Networking: oameni din QA, SDET, QE și leadership",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-primary-2"
                        aria-hidden
                      />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <ButtonLink
                  href="/evenimente"
                  variant="secondary"
                  className="mt-6 w-full justify-center"
                >
                  Vezi evenimentele
                </ButtonLink>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Story / Mission / Impact */}
      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="Fundament"
            title="De ce există BugHunter"
            description="Trei piloni care definesc identitatea comunității."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {[
              {
                num: "01",
                Icon: BookOpen,
                color: "text-indigo-400 bg-indigo-500/15",
                title: "Poveste",
                text: "BugHunter a pornit dintr-o problemă simplă: QA-ul se învață greu când ești singur. În proiecte reale ai risc, deadline și mult context. Comunitatea completează golul: feedback, exemple, claritate și oameni care au trecut prin aceleași situații.",
              },
              {
                num: "02",
                Icon: Target,
                color: "text-violet-400 bg-violet-500/15",
                title: "Misiune",
                text: "Să facem QA-ul mai matur: de la „executăm test case-uri” la quality engineering, sisteme, risc, observabilitate și colaborare. BugHunter e un accelerator de învățare și un hub de networking pentru oamenii de calitate.",
              },
              {
                num: "03",
                Icon: TrendingUp,
                color: "text-cyan-400 bg-cyan-500/15",
                title: "Impact",
                text: "Pe termen lung, vrem ca BugHunter să fie referința pentru QA Testing în România: conținut editorial premium, evenimente utile, resurse curate și o comunitate care produce profesioniști mai buni.",
              },
            ].map((c) => (
              <Card key={c.title} className="p-7">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`grid size-9 shrink-0 place-items-center rounded-xl ${c.color}`}
                  >
                    <c.Icon className="size-4" aria-hidden />
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-2">
                    {c.num}
                  </span>
                </div>
                <div className="mt-4 text-lg font-semibold tracking-tight">
                  {c.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.text}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Valori"
            title="Principii care țin comunitatea sănătoasă"
            description="Sunt reguli de produs, nu doar de moderare."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: CheckCircle2,
                color: "text-emerald-400 bg-emerald-500/15",
                title: "Claritate",
                text: "Întrebări cu context. Răspunsuri cu exemple. Criterii de calitate explicite.",
              },
              {
                Icon: Users,
                color: "text-indigo-400 bg-indigo-500/15",
                title: "Respect",
                text: "Zero gatekeeping. Zero toxicitate. Feedback direct, dar empatic.",
              },
              {
                Icon: Code2,
                color: "text-violet-400 bg-violet-500/15",
                title: "Practică",
                text: "Mai puține opinii, mai multe demonstrații: reproducere, ipoteze, instrumente.",
              },
              {
                Icon: Lightbulb,
                color: "text-amber-400 bg-amber-500/15",
                title: "Curiozitate",
                text: "Învățare continuă, inclusiv din greșeli. QA e despre descoperire, nu despre vină.",
              },
              {
                Icon: GitMerge,
                color: "text-cyan-400 bg-cyan-500/15",
                title: "Calitate ca sistem",
                text: "Nu doar testare. Observabilitate, procese, risc, colaborare și ownership.",
              },
              {
                Icon: Share2,
                color: "text-pink-400 bg-pink-500/15",
                title: "Contribuție",
                text: "Articole, sesiuni, resurse, review-uri. Comunitatea crește când oamenii dau mai departe.",
              },
            ].map((v) => (
              <Card key={v.title} className="p-6">
                <div
                  className={`grid size-8 place-items-center rounded-lg ${v.color}`}
                >
                  <v.Icon className="size-4" aria-hidden />
                </div>
                <div className="mt-3 text-sm font-semibold tracking-tight">
                  {v.title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted">
                  {v.text}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* For who */}
      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="Pentru cine"
            title="De la primul pas în QA până la leadership"
            description="BugHunter e gândit pentru roluri și niveluri diferite, cu un numitor comun: dorința de a lucra bine."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {[
              {
                badge: "Junior",
                badgeColor:
                  "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25",
                Icon: GraduationCap,
                iconBg: "bg-emerald-500/15 text-emerald-400",
                title: "Junior / Career switch",
                text: "Onboarding, roadmap, practică ghidată, feedback pe portofoliu și interviuri.",
                channels: ["#onboarding", "#qa-manual-problems", "#interviu"],
              },
              {
                badge: "Mid",
                badgeColor:
                  "bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/25",
                Icon: Code2,
                iconBg: "bg-indigo-500/15 text-indigo-400",
                title: "Mid / Senior",
                text: "Discuții avansate: strategie, arhitectură de test, pipeline-uri, observabilitate, quality coaching.",
                channels: [
                  "#qa-automation-problems",
                  "#ai-enthusiasm",
                  "#notes-resources",
                ],
              },
              {
                badge: "Lead",
                badgeColor:
                  "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/25",
                Icon: Target,
                iconBg: "bg-violet-500/15 text-violet-400",
                title: "Leads / Managers",
                text: "Calitate ca sistem: metrici, proces, standarde, org design, cultură și influență.",
                channels: ["#jobs", "#notes-resources", "#about-me"],
              },
            ].map((p) => (
              <Card key={p.title} className="p-7">
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`grid size-9 place-items-center rounded-xl ${p.iconBg}`}
                  >
                    <p.Icon className="size-4" aria-hidden />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.badgeColor}`}
                  >
                    {p.badge}
                  </span>
                </div>
                <div className="mt-4 text-lg font-semibold tracking-tight">
                  {p.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {p.text}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.channels.map((ch) => (
                    <span
                      key={ch}
                      className="rounded-lg bg-card-2 px-2 py-0.5 text-xs text-muted-2 ring-1 ring-border"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <DiscordCTABlock
        title="Alătură-te celor 250+ membri activi"
        description="Indiferent de nivel — junior, mid sau lead — găsești oameni care înțeleg contextul tău și pot ajuta."
      />
    </>
  );
}
