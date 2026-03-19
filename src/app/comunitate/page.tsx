import {
  ArrowRight,
  Hash,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { FaqAccordion } from "@/components/blocks/faq";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLdScript } from "@/components/seo/jsonld";
import {
  breadcrumbListJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Discord — ${siteConfig.name}`,
  description:
    "Intră pe Discord-ul BugHunter: canale QA, networking, mentorat, job talk, evenimente și resurse. CTA clar: alătură-te comunității.",
  path: "/comunitate",
});

const channels = [
  {
    name: "onboarding",
    desc: "Primul pas: roluri, reguli, cum pui întrebări bune.",
  },
  {
    name: "notes-resources",
    desc: "Resurse curate: articole, tool-uri, templates, cheat sheets.",
  },
  {
    name: "qa-manual-problems",
    desc: "Bug reporting, exploratory, test design — cazuri reale.",
  },
  {
    name: "qa-automation-problems",
    desc: "Playwright/Cypress/Selenium — CI/CD, flaky, debugging.",
  },
  {
    name: "interviu",
    desc: "Întrebări și situații de interviu QA, pregătire colaborativă.",
  },
  {
    name: "jobs",
    desc: "Oportunități și discuții despre roluri și piață.",
  },
];

const rules = [
  {
    title: "Respect față de toți membrii",
    text: "Toți sunt tratați cu respect, indiferent de rol sau nivel de experiență. Fără ierarhii artificiale.",
    icon: Users,
  },
  {
    title: "Fără spam",
    text: "Evită mesajele repetate în rafală sau mesajele nesolicitate private. Păstrează conversațiile curate.",
    icon: Sparkles,
  },
  {
    title: "Rămâi pe subiect",
    text: "Discuțiile trebuie să fie relevante pentru QA și subiecte adiacente, în canalul potrivit.",
    icon: ShieldCheck,
  },
  {
    title: "Fără auto-promovare",
    text: "Nu promova propriile produse sau servicii fără permisiunea moderatorilor.",
    icon: MessageSquare,
  },
];

const faq = [
  {
    question: "Ce trebuie să fac imediat după ce intru?",
    answer:
      "Intră în #onboarding, alege rolurile, citește regulile și postează o scurtă prezentare în #general. Apoi poți deschide un thread cu prima întrebare în canalul potrivit.",
  },
  {
    question: "Există mentorat?",
    answer:
      "Da: feedback pe portofoliu, ajutor cu CV-ul, direcții clare de învățare și sesiuni tematice. Nu promitem mentorat individual pentru toți, dar ajutor real găsești.",
  },
  {
    question: "Ce face BugHunter diferit față de alte comunități?",
    answer:
      "Punem accent pe structură și calitate: canale clare, reguli, resurse curate, evenimente și răspunsuri orientate pe exemple și context.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          path: "/comunitate",
          title: `Discord — ${siteConfig.name}`,
          description: metadata.description as string,
        })}
      />
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Acasă", path: "/" },
          { name: "Discord", path: "/comunitate" },
        ])}
      />
      <JsonLdScript data={faqPageJsonLd(faq)} />
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
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-(--shadow)">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-2 animate-glow" />
                  Comunitate / Discord
                </span>
              </div>
              <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Discord-ul este produsul principal BugHunter
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Fondată în octombrie 2022, BugHunter numără acum 250+ membri
                activi. Conversații, feedback, networking și sesiuni live pe
                canalul vocal LOUNGE o dată la două săptămâni.
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
                <ButtonLink href="/evenimente" variant="secondary" size="lg">
                  Vezi evenimente
                </ButtonLink>
              </div>
              <div className="mt-10 grid gap-3 lg:grid-cols-3">
                {[
                  {
                    title: "Întrebări tehnice",
                    text: "Manual, automation, ISTQB, AI tools. Probleme reale, soluții din practică.",
                  },
                  {
                    title: "Carieră în QA",
                    text: "Interviuri, salarii, CV, jobs. Discuții sincere despre piața din România.",
                  },
                  {
                    title: "Sesiuni LOUNGE live",
                    text: "O dată la 2 săptămâni pe canalul vocal — interviuri, salarii, best practices, situații reale.",
                  },
                ].map((b) => (
                  <Card key={b.title} className="p-7">
                    <div className="text-sm font-semibold tracking-tight">
                      {b.title}
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-muted">
                      {b.text}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    Canale esențiale
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-muted">
                    Restul le găsești direct pe Discord (ISTQB, AI tools, etc.).
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl bg-card-2 p-4 ring-1 ring-border transition-colors hover:bg-card-hover"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                      <Hash className="size-4 text-muted" aria-hidden />
                      {c.name}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-muted">
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
              <ButtonLink
                href={siteConfig.discordInviteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full justify-center"
              >
                Vezi toate canalele pe Discord
                <MessageSquare className="size-4" aria-hidden />
              </ButtonLink>
            </Card>
          </div>
        </Container>
      </section>

      <Section tone="subtle">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Cum funcționează"
            title="Cum funcționează, pas cu pas"
            description="Dacă pui întrebarea cu context, primești un răspuns util. E simplu, dar face toată diferența."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Onboarding",
                text: "Roluri + reguli + cum pui întrebări.",
              },
              {
                step: "02",
                title: "Context",
                text: "Așteptat vs obținut, pași, date relevante.",
              },
              {
                step: "03",
                title: "Feedback",
                text: "Primești idei, întrebări și alternative.",
              },
              {
                step: "04",
                title: "Rămâne",
                text: "Concluzia nu se pierde — devine resursă, articol sau referință pentru alții.",
              },
            ].map((s) => (
              <Card key={s.step} className="p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">
                  {s.step}
                </div>
                <div className="mt-2 text-lg font-semibold tracking-tight">
                  {s.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {s.text}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Reguli"
            title="Calitate și siguranță"
            description="Comunitatea e un spațiu public. Protejăm oamenii și proiectele."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rules.map((r) => (
              <Card key={r.title} className="p-7">
                <r.icon className="size-4 text-muted" aria-hidden />
                <div className="mt-3 text-sm font-semibold tracking-tight">
                  {r.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {r.text}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <DiscordCTABlock
        title="Intră pe Discord și pune prima întrebare cu context"
        description="Dacă ai un bug, o dilemă de strategie sau vrei să te apuci de automation, începe aici. Comunitatea te ajută să alegi pasul următor."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="FAQ"
                title="Întrebări frecvente despre Discord"
                description="Intri, te orientezi, pui prima întrebare. Atât."
              />
              <div className="mt-8">
                <FaqAccordion items={faq} />
              </div>
            </div>
            <Card className="p-7">
              <div className="text-sm font-semibold tracking-tight">
                Checklist pentru o întrebare bună
              </div>
              <ul className="mt-4 grid gap-3 text-sm text-muted">
                {[
                  "Ce încerci să obții (scop)?",
                  "Ce ai încercat deja?",
                  "Care sunt pașii de reproducere?",
                  "Ce era așteptat vs ce ai obținut?",
                  "Ce mediu folosești (browser, OS, tool, versiuni)?",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span
                      className="mt-2 size-1.5 rounded-full bg-primary-2"
                      aria-hidden
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={siteConfig.discordInviteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full justify-center"
              >
                Intră pe Discord
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
