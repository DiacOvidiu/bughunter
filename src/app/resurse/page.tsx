import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ClipboardList,
  Compass,
  Eye,
  KeyRound,
  LayoutGrid,
  LineChart,
  RefreshCw,
  Shield,
  Wrench,
  Zap,
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
  title: `Resurse QA — ${siteConfig.name}`,
  description:
    "Resurse BugHunter pentru QA: roadmap junior, checklist-uri, toolkits pentru API testing, automation și test strategy. Conținut în română.",
  path: "/resurse",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          path: "/resurse",
          title: `Resurse QA — ${siteConfig.name}`,
          description: metadata.description as string,
        })}
      />
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Acasă", path: "/" },
          { name: "Resurse", path: "/resurse" },
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
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-(--shadow)">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-2 animate-glow" />
              Resurse
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Toolkits și ghiduri pentru QA modern
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Resurse curate, gândite pentru practică. Dacă vrei recomandări
                personalizate, intră pe Discord și spune ce urmărești.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                >
                  Cere o recomandare pe Discord
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/blog" variant="secondary" size="lg">
                  Citește articole
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {[
                  { href: "#roadmap", label: "Roadmap junior" },
                  { href: "#api", label: "API checklist" },
                  { href: "#strategie", label: "Test strategy" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-full bg-card px-4 py-2 text-xs font-semibold text-foreground/85 ring-1 ring-border hover:bg-card-2"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="gradient-border rounded-2xl">
              <Card variant="glow" className="p-7">
                <div className="text-sm font-bold tracking-tight">
                  Cum folosești pagina asta
                </div>
                <div className="mt-4 grid gap-3 text-sm text-muted">
                  {[
                    "Alege o secțiune și aplică checklist-ul pe un proiect real",
                    "Notează ce lipsește: date, log-uri, observabilitate, criterii",
                    "Cere feedback pe Discord cu context și ce ai încercat",
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
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="mt-6 w-full justify-center"
                >
                  Intră pe Discord
                </ButtonLink>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Roadmap */}
      <Section tone="subtle" className="scroll-mt-24" id="roadmap">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Roadmap"
            title="Junior QA: traseu realist (0 → primul job)"
            description="Un plan orientat pe competențe și practică, nu pe liste infinite de tool-uri."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {[
              {
                num: "01",
                Icon: Compass,
                color: "text-indigo-400 bg-indigo-500/15",
                title: "Fundamente",
                text: "QA mindset, tipuri de testare, risc, bug reporting, criterii de acceptare, exploratory testing.",
              },
              {
                num: "02",
                Icon: ClipboardList,
                color: "text-violet-400 bg-violet-500/15",
                title: "Practică",
                text: "Proiect demo, charters, test cases când e cazul, test data, rapoarte, comunicare cu dev/PO.",
              },
              {
                num: "03",
                Icon: Bookmark,
                color: "text-cyan-400 bg-cyan-500/15",
                title: "Angajare",
                text: "CV + portofoliu, povești de impact, întrebări de interviu, înțelegerea rolului și așteptărilor.",
              },
            ].map((b) => (
              <Card key={b.title} className="p-7">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`grid size-9 shrink-0 place-items-center rounded-xl ${b.color}`}
                  >
                    <b.Icon className="size-4" aria-hidden />
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-2">
                    {b.num}
                  </span>
                </div>
                <div className="mt-4 text-lg font-semibold tracking-tight">
                  {b.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {b.text}
                </div>
              </Card>
            ))}
          </div>
          <Card className="mt-3 p-7">
            <div className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <ArrowRight className="size-4" aria-hidden />
              </div>
              <div className="text-sm font-semibold tracking-tight">
                Next step
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Intră pe Discord și scrie: nivelul tău, ce ai învățat până acum și
              ce obiectiv ai în următoarele 30 de zile. Îți dăm un plan compact
              și resursele potrivite.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={siteConfig.discordInviteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Intră pe Discord
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>

      {/* API Testing */}
      <Section className="scroll-mt-24" id="api">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="API Testing"
            title="Checklist: ce verifici într-un API (practic)"
            description="O listă scurtă care acoperă calitatea reală: contract, auth, edge cases, observabilitate."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: LayoutGrid,
                color: "text-indigo-400 bg-indigo-500/15",
                title: "Contract și validări",
                text: "Schema, tipuri, required/optional, valori default, backward compatibility.",
              },
              {
                Icon: KeyRound,
                color: "text-violet-400 bg-violet-500/15",
                title: "Auth și permisiuni",
                text: "Token expirare, refresh, scopes/roles, authorization checks pe fiecare endpoint.",
              },
              {
                Icon: Shield,
                color: "text-rose-400 bg-rose-500/15",
                title: "Negative testing",
                text: "Input invalid, boundary values, rate limit, idempotency, retries.",
              },
              {
                Icon: CheckCircle2,
                color: "text-emerald-400 bg-emerald-500/15",
                title: "Erori și mesaje",
                text: "Status codes corecte, body consistent, error codes, traceability.",
              },
              {
                Icon: Zap,
                color: "text-amber-400 bg-amber-500/15",
                title: "Performance & reliability",
                text: "Time-to-first-byte, p95/p99, timeouts, backpressure, degradare controlată.",
              },
              {
                Icon: Eye,
                color: "text-cyan-400 bg-cyan-500/15",
                title: "Observabilitate",
                text: "Log-uri, correlation id, metrics, tracing, audit pentru acțiuni sensibile.",
              },
            ].map((i) => (
              <Card key={i.title} className="p-6">
                <div
                  className={`grid size-8 place-items-center rounded-lg ${i.color}`}
                >
                  <i.Icon className="size-4" aria-hidden />
                </div>
                <div className="mt-3 text-sm font-semibold tracking-tight">
                  {i.title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted">
                  {i.text}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Test Strategy */}
      <Section tone="subtle" className="scroll-mt-24" id="strategie">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Test Strategy"
            title="Template: strategie pe risc (care chiar ajută)"
            description="Când strategia e scurtă, clară și conectată la risc, devine un instrument de echipă."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "01",
                Icon: Compass,
                color: "text-indigo-400 bg-indigo-500/15",
                title: "Context",
                text: "Ce produs, ce utilizatori, ce release, ce ipoteze.",
              },
              {
                num: "02",
                Icon: Shield,
                color: "text-rose-400 bg-rose-500/15",
                title: "Riscuri",
                text: "Ce poate strica business-ul? Ce e greu de detectat? Ce e costisitor?",
              },
              {
                num: "03",
                Icon: Wrench,
                color: "text-violet-400 bg-violet-500/15",
                title: "Abordare",
                text: "Ce testăm, cum, unde, cu ce date și ce instrumente.",
              },
              {
                num: "04",
                Icon: LayoutGrid,
                color: "text-cyan-400 bg-cyan-500/15",
                title: "Coverage",
                text: "Model de acoperire: features × platforme × riscuri.",
              },
              {
                num: "05",
                Icon: RefreshCw,
                color: "text-emerald-400 bg-emerald-500/15",
                title: "Feedback loops",
                text: "Când aflăm că e ok? Build, PR checks, staging, prod.",
              },
              {
                num: "06",
                Icon: LineChart,
                color: "text-amber-400 bg-amber-500/15",
                title: "Metrici",
                text: "Leading vs lagging. Semnale care contează, nu vanity numbers.",
              },
            ].map((i) => (
              <Card key={i.title} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`grid size-8 place-items-center rounded-lg ${i.color}`}
                  >
                    <i.Icon className="size-4" aria-hidden />
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-2">
                    {i.num}
                  </span>
                </div>
                <div className="mt-3 text-sm font-semibold tracking-tight">
                  {i.title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted">
                  {i.text}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <DiscordCTABlock
        title="Vrei o resursă pentru un caz specific?"
        description="Spune pe Discord ce proiect ai, ce nivel ești și ce vrei să obții. Îți recomandăm resurse și un plan scurt."
      />
    </>
  );
}
