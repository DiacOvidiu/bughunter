import { ArrowRight, CalendarDays } from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EventCard } from "@/components/cards/event-card";
import { ButtonLink } from "@/components/ui/button";
import { JsonLdScript } from "@/components/seo/jsonld";
import { getAllEvents, getEventStatus } from "@/content/events";
import { formatMonthYear } from "@/lib/format";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Evenimente QA — ${siteConfig.name}`,
  description:
    "Evenimente BugHunter: meetup-uri, workshop-uri și sesiuni live pe Discord pentru QA Testing. Urmărește evenimentele viitoare și cele trecute.",
  path: "/evenimente",
});

export default function EventsPage() {
  const all = getAllEvents();
  const upcoming = all.filter((e) => getEventStatus(e) === "upcoming");
  const past = all.filter((e) => getEventStatus(e) === "past");
  const featured = upcoming[0] ?? all[0];
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          path: "/evenimente",
          title: `Evenimente QA — ${siteConfig.name}`,
          description: metadata.description as string,
        })}
      />
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Acasă", path: "/" },
          { name: "Evenimente", path: "/evenimente" },
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
              Evenimente
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Workshop-uri, meetup-uri și sesiuni live
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Evenimente gândite pentru practică: exemple, exerciții, Q&A și
                networking. Fără fluff.
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
                <ButtonLink href="/blog" variant="secondary" size="lg">
                  Citește articole
                </ButtonLink>
              </div>
            </div>

            {featured ? (
              <div className="gradient-border rounded-2xl">
                <div className="rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
                  <div className="inline-flex items-center gap-2 rounded-full bg-card-2 px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-border">
                    <CalendarDays
                      className="size-3.5 text-primary/80"
                      aria-hidden
                    />
                    {getEventStatus(featured) === "upcoming"
                      ? "Următorul eveniment"
                      : "Recomandat"}
                  </div>
                  <div className="mt-4 text-xs text-muted-2">
                    {formatMonthYear(featured.startDate)} •{" "}
                    {featured.locationLabel}
                  </div>
                  <div className="mt-3 text-lg font-bold tracking-tight">
                    {featured.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-muted">
                    {featured.excerpt}
                  </div>
                  <ButtonLink
                    href={`/evenimente/${featured.slug}`}
                    className="mt-6 w-full justify-center"
                  >
                    Vezi detaliile
                    <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Section tone="subtle">
        <Container className="max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-card-2 px-3 py-1 text-xs font-medium text-foreground ring-1 ring-border">
                <CalendarDays className="size-3.5" aria-hidden />
                Upcoming
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Evenimente viitoare
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Te poți înscrie și intra pe Discord pentru reminder și
                materiale.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-3">
            {upcoming.map((e) => (
              <EventCard
                key={e.slug}
                href={`/evenimente/${e.slug}`}
                title={e.title}
                description={e.excerpt}
                dateLabel={formatMonthYear(e.startDate)}
                location={e.locationLabel}
                status="upcoming"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-7xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Evenimente trecute
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Le păstrăm ca referință: tematici, materiale și idei utile pentru
            QA.
          </p>
          <div className="mt-10 grid gap-3">
            {past.map((e) => (
              <EventCard
                key={e.slug}
                href={`/evenimente/${e.slug}`}
                title={e.title}
                description={e.excerpt}
                dateLabel={formatMonthYear(e.startDate)}
                location={e.locationLabel}
                status="past"
              />
            ))}
          </div>
        </Container>
      </Section>

      <DiscordCTABlock
        title="Vrei să propui un eveniment?"
        description="Intră pe Discord, spune tema, formatul (live/workshop), durata și ce va învăța concret lumea."
      />
    </>
  );
}
