import {
  ArrowRight,
  BookOpen,
  Bug,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  MessagesSquare,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { FaqAccordion } from "@/components/blocks/faq";
import { NewsletterForm } from "@/components/blocks/newsletter";
import { StatsGrid } from "@/components/blocks/stats";
import { TestimonialsGrid } from "@/components/blocks/testimonials";
import { BlogCard } from "@/components/cards/blog-card";
import { EventCard } from "@/components/cards/event-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLdScript } from "@/components/seo/jsonld";
import { getAllEvents, getEventStatus } from "@/content/events";
import { resources } from "@/content/resources";
import { getAllBlogPosts } from "@/lib/content/blog";
import { formatDateShort, formatMonthYear } from "@/lib/format";
import {
  faqPageJsonLd,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Comunitatea QA din România`,
  description:
    "BugHunter este comunitatea QA din România (Discord-first) pentru manual testing, automation și quality engineering. Resurse, articole și evenimente.",
  path: "/",
});

const stats = [
  {
    label: "Membri în comunitate",
    value: "250+",
    hint: "Din octombrie 2022, creștem constant",
  },
  {
    label: "Sesiuni live / lună",
    value: "~2",
    hint: "Pe canalul vocal LOUNGE, o dată la 2 săptămâni",
  },
  {
    label: "Canale active",
    value: "20+",
    hint: "manual, automation, interviu, jobs, istqb, AI",
  },
  {
    label: "Comunitate activă din",
    value: "2022",
    hint: "Fondată în octombrie 2022",
  },
];

const testimonials = [
  {
    quote:
      "Am primit feedback pe CV și mi-am îmbunătățit portofoliul. Diferența s-a simțit la interviuri.",
    name: "Andreea M.",
    role: "QA Engineer (mid), București",
  },
  {
    quote:
      "Canalele pe API testing și test strategy sunt aur. Oameni care răspund cu exemple, nu cu păreri.",
    name: "Radu P.",
    role: "SDET, Cluj-Napoca",
  },
  {
    quote:
      "Pentru juniori e cel mai bun loc să întrebi fără frică, dar și fără să primești răspunsuri superficiale.",
    name: "Mihai D.",
    role: "Junior QA, Iași",
  },
];

const faq = [
  {
    question: "Este BugHunter doar pentru testare manuală?",
    answer:
      "Nu. Comunitatea e deschisă pentru testare manuală, automatizare, API, performance, security, quality engineering și roluri adiacente. Structura pe canale te ajută să găsești rapid subiectele relevante.",
  },
  {
    question: "Pot intra dacă sunt la început și nu am job în QA?",
    answer:
      "Da. Avem onboarding, resurse, întrebări ghidate și sesiuni care te ajută să construiești bazele: mindset, practică, tool-uri, portofoliu, interviuri.",
  },
  {
    question: "Cum sunt moderate discuțiile?",
    answer:
      "Punem accent pe respect, claritate și calitate. Întrebările bune sunt încurajate, iar spam-ul și toxicitatea sunt oprite rapid prin reguli și moderare activă.",
  },
  {
    question: "Ce tip de evenimente organizați?",
    answer:
      "Meetup-uri, workshop-uri practice, sesiuni live pe Discord, Q&A cu invitați și prezentări scurte pe subiecte concrete (API, automation, strategie de testare, performanță).",
  },
];

/* ── colour tokens for bento cards ── */
const bentoCards = [
  {
    icon: Bug,
    title: "#qa-manual-problems",
    desc: "Rapoarte de bug, exploratory testing, test cases. Postezi o problemă reală, primești feedback real.",
    accent: "from-orange-500/20 via-red-500/10 to-transparent",
    iconBg: "from-orange-600/30 to-red-600/20",
  },
  {
    icon: Terminal,
    title: "#qa-automation-problems",
    desc: "Playwright, Cypress, Selenium. Probleme de scripting, CI/CD, teste instabile — cu soluții din cod real.",
    accent: "from-indigo-500/20 via-violet-500/10 to-transparent",
    iconBg: "from-indigo-600/30 to-violet-600/20",
  },
  {
    icon: GraduationCap,
    title: "#istqb & #ai-enthusiasm",
    desc: "Pregătire pentru certificare ISTQB și AI tools în testare: Copilot, ChatGPT, agenți de test.",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    iconBg: "from-cyan-600/30 to-blue-600/20",
  },
  {
    icon: Sparkles,
    title: "#interviu, #jobs & #linkedin",
    desc: "Simulări de interviuri, feedback pe CV, oportunități de job și conexiuni profesionale reale.",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "from-emerald-600/30 to-teal-600/20",
  },
];

export default async function HomePage() {
  const events = getAllEvents();
  const highlightedEvents = events.slice(0, 3).map((e) => ({
    slug: e.slug,
    title: e.title,
    description: e.excerpt,
    dateLabel: formatMonthYear(e.startDate),
    location: e.locationLabel,
    status: getEventStatus(e),
  }));

  const posts = (await getAllBlogPosts()).slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    readingTime: p.readingTimeText,
    dateLabel: formatDateShort(p.date),
  }));

  const highlightedResources = resources.slice(0, 3);

  return (
    <>
      <JsonLdScript data={organizationJsonLd()} />
      <JsonLdScript data={websiteJsonLd()} />
      <JsonLdScript
        data={webPageJsonLd({
          path: "/",
          title: `${siteConfig.name} — Comunitatea QA din România`,
          description:
            "BugHunter este comunitatea QA din România (Discord-first) pentru manual testing, automation și quality engineering.",
        })}
      />
      <JsonLdScript data={faqPageJsonLd(faq)} />

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20 lg:pt-28">
        {/* Animated orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-[300px] -top-[200px] h-[800px] w-[800px] rounded-full bg-indigo-600/14 blur-[120px] animate-float" />
          <div className="absolute -right-[200px] -top-[150px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[100px] animate-float-alt" />
          <div
            className="absolute bottom-[-100px] left-[40%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[90px] animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Dot grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dots opacity-50"
        />

        {/* Radial vignette so content pops */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,transparent_50%,var(--background)_100%)]"
        />

        <Container className="relative max-w-7xl">
          {/* Top pill badge */}
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-(--shadow)">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-2 animate-glow" />
              QA Community · România · Discord-first
              <ChevronRight className="size-3.5 text-muted-2" aria-hidden />
            </span>
          </div>

          <div className="mt-8 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            {/* Left – copy */}
            <div>
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-gradient block">BugHunter</span>
                <span className="mt-1 block leading-tight text-foreground">
                  Comunitatea QA
                </span>
                <span className="block leading-tight text-muted">
                  din România
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
                Un spațiu pentru ingineri în testare și toți cei care se ocupă
                cu calitatea software-ului. Discuții tehnice cu context, resurse
                curate și conexiuni reale din industrie.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                >
                  Intră pe Discord
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/despre" variant="secondary" size="lg">
                  Cum funcționează
                </ButtonLink>
              </div>

              {/* Inline stats row */}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/40 pt-8">
                {[
                  { value: "250+", label: "Membri" },
                  { value: "20+", label: "Canale" },
                  { value: "~2 / lună", label: "Sesiuni live" },
                  { value: "2022", label: "Fondată" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-gradient-warm">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-muted-2">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Discord preview card */}
            <div className="gradient-border rounded-2xl">
              <Card variant="glow" className="p-7">
                <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                  <span className="grid size-6 place-items-center rounded-lg bg-linear-to-br from-indigo-600 to-violet-600 text-[10px] text-white">
                    #
                  </span>
                  Pe Discord găsești:
                </div>
                <ul className="mt-5 grid gap-3.5 text-sm text-muted">
                  {[
                    "#qa-manual-problems și #qa-automation-problems — ajutor tehnic real",
                    "#interviu și #jobs — pregătire pentru interviuri și oportunități de angajare",
                    "#istqb și #ai-enthusiasm — certificări și AI în testare",
                    "#success-stories, #bughunting și #meme-land — povești din meserie și umor de QA",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-primary-2"
                        aria-hidden
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-background-2 p-4 ring-1 ring-border">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary/80">
                    <Zap className="size-3" aria-hidden />
                    Primii pași
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Intri, alegi rolurile, citești regulile, pui prima întrebare
                    cu context. Primești răspunsuri mai bune, mai repede.
                  </p>
                </div>

                <ButtonLink
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full justify-center"
                >
                  Alătură-te comunității
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          BENTO — What you learn here
      ═══════════════════════════════════════════════ */}
      <Section tone="subtle">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Ce înveți"
            title="Tot ce contează în QA, într-un singur loc"
            description="Canale organizate pe discipline. Nu cauți prin zeci de mesaje — găsești direct ce îți trebuie."
          />

          {/* 4 carduri egale */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bentoCards.map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border shadow-(--shadow) transition-all duration-300 hover:bg-card-2 hover:ring-border-2 hover:shadow-(--shadow-glow) hover:-translate-y-1"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br ${card.accent} opacity-60 transition-opacity group-hover:opacity-90`}
                />
                <div className="relative">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl bg-linear-to-br ${card.iconBg} ring-1 ring-white/10`}
                  >
                    <card.icon className="size-5 text-white/90" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-sm font-bold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA full-width orizontal */}
          <div className="mt-4 relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-700 via-violet-700 to-indigo-900 p-7 ring-1 ring-indigo-500/40 shadow-(--shadow-glow)">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <Users className="size-6 text-white/90" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Comunitate activă din 2022</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    250+ membri, sesiuni live pe LOUNGE la 2 săptămâni, zero toxicitate.
                    Intri, te prezinți, pui prima întrebare — comunitatea răspunde.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <ButtonLink
                  href={siteConfig.discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-indigo-700 hover:bg-white/90 ring-white/30"
                  variant="secondary"
                >
                  Alătură-te acum
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════ */}
      <Section>
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Credibilitate"
            title="Calitate înainte de zgomot"
            description="Am construit BugHunter ca un produs: structură clară, onboarding, reguli, conținut util."
          />
          <div className="mt-10">
            <StatsGrid stats={stats} />
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          WHY — 3-column feature cards
      ═══════════════════════════════════════════════ */}
      <Section tone="subtle">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="De ce BugHunter"
            title="Pentru că QA în 2026 înseamnă skill + comunitate"
            description="Acces la exemple, feedback și oameni cu experiență — înveți mai repede, eviți capcanele clasice."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessagesSquare,
                num: "01",
                title: "Întrebări bune, răspunsuri bune",
                text: "Punem accent pe context, reproducere, criterii de acceptare și trade-offs, nu pe scurtături.",
                color: "from-indigo-600/25 to-violet-600/15",
              },
              {
                icon: BookOpen,
                num: "02",
                title: "Cunoștințe care se transmit",
                text: "Sesiuni scurte, workshop-uri și subiecte care rămân de referință. Ce e util nu se pierde în scroll.",
                color: "from-cyan-600/25 to-blue-600/15",
              },
              {
                icon: Compass,
                num: "03",
                title: "Carieră: junior → senior",
                text: "Roadmap-uri, portofoliu, interviuri și creștere pe competențe: tehnic, comunicare și gândire sistemică.",
                color: "from-violet-600/25 to-pink-600/15",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow) transition-all duration-300 hover:bg-card-2 hover:ring-border-2 hover:shadow-(--shadow-glow) hover:-translate-y-1"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-linear-to-br ${f.color} blur-2xl transition-opacity group-hover:opacity-150`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-card-2 ring-1 ring-border">
                      <f.icon className="size-5 text-primary" aria-hidden />
                    </div>
                    <span className="text-3xl font-black text-border-2/50 tabular-nums">
                      {f.num}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          DISCORD CTA
      ═══════════════════════════════════════════════ */}
      <DiscordCTABlock />

      {/* ═══════════════════════════════════════════════
          EVENTS + NEWSLETTER — side by side
      ═══════════════════════════════════════════════ */}
      <Section tone="subtle">
        <Container className="max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Evenimente"
                title="Învățare + networking, fără formalități"
                description="Meetup-uri, workshop-uri și sesiuni live gândite pentru practică. Biletele și detaliile sunt mereu clare."
              />
              <div className="mt-8 grid gap-3">
                {highlightedEvents.map((e) => (
                  <EventCard
                    key={e.slug}
                    href={`/evenimente/${e.slug}`}
                    title={e.title}
                    description={e.description}
                    dateLabel={e.dateLabel}
                    location={e.location}
                    status={e.status}
                  />
                ))}
              </div>
              <div className="mt-6">
                <ButtonLink href="/evenimente" variant="secondary">
                  Toate evenimentele
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="Newsletter"
                title="Noutăți utile, nu spam"
                description="Anunțăm evenimentele, articolele și resursele noi — ca să nu ratezi ce merită citit."
              />
              <div className="mt-8">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════════ */}
      <Section>
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Articole"
            title="Articole despre QA scrise pentru practică"
            description="Nu teorie generală — subiecte concrete, cu exemple din proiecte reale și link spre comunitate."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.description}
                categoryLabel={p.category}
                readingTime={p.readingTime}
                dateLabel={p.dateLabel}
              />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/blog" variant="secondary">
              Toate articolele
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          RESOURCES
      ═══════════════════════════════════════════════ */}
      <Section tone="subtle">
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Resurse"
            title="Ghiduri și resurse practice pentru testare"
            description="Începe cu un roadmap clar sau aprofundează: API testing, performance, mobile, security, strategie."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlightedResources.map((r) => (
              <ResourceCard
                key={r.id}
                href={r.href}
                label={r.label}
                title={r.title}
                description={r.description}
              />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/resurse" variant="secondary">
              Toate resursele
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <Section>
        <Container className="max-w-7xl">
          <SectionHeader
            eyebrow="Ce spun membrii"
            title="O comunitate care îți respectă timpul"
            description="Oameni care răspund cu exemple, nu cu opinii. Asta face diferența."
            align="center"
          />
          <div className="mt-12">
            <TestimonialsGrid items={testimonials} />
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          FAQ + FINAL CTA
      ═══════════════════════════════════════════════ */}
      <Section tone="subtle">
        <Container className="max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="FAQ"
                title="Întrebări frecvente"
                description="Răspunsuri la ce te-ar putea opri înainte să intri."
              />
              <div className="mt-8">
                <FaqAccordion items={faq} />
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="Următorul pas"
                title="Intră și prezintă-te în 60 de secunde"
                description="Spune cu ce te ocupi, ce vrei să înveți și la ce proiect lucrezi."
              />
              <Card variant="glow" className="mt-8 p-7">
                <p className="text-sm font-bold tracking-tight">
                  Mesaj recomandat
                </p>
                <div className="mt-3 rounded-xl bg-background-2 p-4 font-mono text-sm leading-relaxed text-muted ring-1 ring-border">
                  Salut! Sunt [nume], [nivel], lucrez cu [stack].{" "}
                  <br className="hidden sm:block" />
                  Vreau să învăț [topic] și am o întrebare despre [context].{" "}
                  Mulțumesc!
                </div>
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
          </div>
        </Container>
      </Section>
    </>
  );
}
