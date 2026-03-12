import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLdScript } from "@/components/seo/jsonld";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllEvents, getEventBySlug, getEventStatus } from "@/content/events";
import { formatDateShort, formatMonthYear } from "@/lib/format";
import { breadcrumbListJsonLd, eventJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const event = getEventBySlug(resolved.slug);
  if (!event) {
    return buildMetadata({
      title: `Eveniment — ${siteConfig.name}`,
      description: siteConfig.description,
      path: "/evenimente",
    });
  }

  return buildMetadata({
    title: `${event.title} — ${siteConfig.name}`,
    description: event.excerpt,
    path: `/evenimente/${event.slug}`,
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await Promise.resolve(params);
  const event = getEventBySlug(resolved.slug);
  if (!event) return notFound();

  const status = getEventStatus(event);
  const path = `/evenimente/${event.slug}`;

  return (
    <>
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
          className="pointer-events-none absolute inset-0 bg-dots opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,transparent_52%,var(--background)_100%)]"
        />

        <Container className="relative max-w-7xl">
          <JsonLdScript
            data={webPageJsonLd({
              path,
              title: `${event.title} — ${siteConfig.name}`,
              description: event.excerpt,
            })}
          />
          <JsonLdScript
            data={breadcrumbListJsonLd([
              { name: "Acasă", path: "/" },
              { name: "Evenimente", path: "/evenimente" },
              { name: event.title, path },
            ])}
          />
          <JsonLdScript
            data={eventJsonLd({
              path,
              name: event.title,
              description: event.excerpt,
              startDate: event.startDate,
              endDate: event.endDate,
              locationName: event.locationLabel,
              locationAddress: event.city,
              eventAttendanceMode:
                event.city === "Online"
                  ? "https://schema.org/OnlineEventAttendanceMode"
                  : "https://schema.org/MixedEventAttendanceMode",
              eventStatus:
                status === "upcoming"
                  ? "https://schema.org/EventScheduled"
                  : "https://schema.org/EventCompleted",
            })}
          />

          <Breadcrumbs
            items={[
              { href: "/", label: "Acasă" },
              { href: "/evenimente", label: "Evenimente" },
              { href: path, label: event.title },
            ]}
          />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={status === "upcoming" ? "success" : "neutral"}>
                  {status === "upcoming" ? "Urmează" : "Trecut"}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-muted-2">
                  <CalendarDays className="size-3.5" aria-hidden />
                  {formatMonthYear(event.startDate)}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-2">
                  <MapPin className="size-3.5" aria-hidden />
                  {event.locationLabel}
                </div>
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {event.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {event.excerpt}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {status === "upcoming"
                    ? "Înscrie-te / intră pe Discord"
                    : "Vezi pe Discord"}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/evenimente" variant="secondary">
                  Înapoi la evenimente
                </ButtonLink>
              </div>

              <Card className="mt-10 p-7">
                <div className="text-sm font-semibold tracking-tight">
                  Agendă
                </div>
                <div className="mt-4 grid gap-3">
                  {event.agenda.map((a) => (
                    <div
                      key={`${a.time}-${a.title}`}
                      className="rounded-2xl bg-card-2 p-5 ring-1 ring-border"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold tracking-tight">
                          {a.title}
                        </div>
                        <div className="text-xs text-muted-2">{a.time}</div>
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-muted">
                        {a.description}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-3">
              <Card className="p-7">
                <div className="text-sm font-semibold tracking-tight">
                  Ce vei lua cu tine
                </div>
                <ul className="mt-4 grid gap-3 text-sm text-muted">
                  {event.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span
                        className="mt-2 size-1.5 rounded-full bg-primary-2"
                        aria-hidden
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-7">
                <div className="text-sm font-semibold tracking-tight">
                  Detalii
                </div>
                <div className="mt-3 text-sm text-muted">
                  {formatDateShort(event.startDate)} • {event.locationLabel}
                </div>
                {event.coverNote ? (
                  <div className="mt-4 rounded-2xl bg-card-2 p-5 text-sm text-muted ring-1 ring-border">
                    {event.coverNote}
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <DiscordCTABlock
        title="Vrei reminder și materiale?"
        description="Intră pe Discord și urmărește anunțurile. Pentru evenimentele trecute, găsești acolo link-uri și resurse."
      />
    </>
  );
}
