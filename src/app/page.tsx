import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { FaqAccordion } from "@/components/blocks/faq";
import { NewsletterForm } from "@/components/blocks/newsletter";
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
                title="Întrebări frecvente despre Discord"
                description="Intri, te orientezi, pui prima întrebare. Atât."
              />
              <div className="mt-8">
                <FaqAccordion items={faq} />
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="Următorul pas"
                title="Checklist pentru o întrebare bună"
                description="Dacă pui întrebarea cu context, primești un răspuns util mai repede."
              />
              <Card variant="glow" className="mt-8 p-7">
                <ul className="grid gap-3 text-sm text-muted">
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
          </div>
        </Container>
      </Section>
    </>
  );
}
