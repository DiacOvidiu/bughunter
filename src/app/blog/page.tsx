import { ArrowRight, Tag } from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { BlogCard } from "@/components/cards/blog-card";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { JsonLdScript } from "@/components/seo/jsonld";
import { getAllBlogPosts, blogCategories } from "@/lib/content/blog";
import { formatDateShort } from "@/lib/format";
import { blogCollectionJsonLd, breadcrumbListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Blog QA — ${siteConfig.name}`,
  description:
    "Articole BugHunter despre QA Manual, Automation, API testing, performance, security și carieră în QA. Conținut în română, optimizat SEO.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <>
      <JsonLdScript data={blogCollectionJsonLd()} />
      <JsonLdScript
        data={webPageJsonLd({
          path: "/blog",
          title: `Blog QA — ${siteConfig.name}`,
          description: metadata.description as string,
        })}
      />
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Acasă", path: "/" },
          { name: "Articole", path: "/blog" },
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
              Blog / Articole
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Conținut pentru QA Testing și Quality Engineering
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Articole structurate, cu exemple, FAQ și CTA spre Discord.
                Scris pentru România, optimizat SEO.
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
                <ButtonLink href="/resurse" variant="secondary" size="lg">
                  Vezi resurse
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {blogCategories.map((c) => (
                  <Badge key={c} tone="neutral" className="gap-2">
                    <Tag className="size-3.5" aria-hidden />
                    {c}
                  </Badge>
                ))}
              </div>
            </div>

            {featured ? (
              <div className="gradient-border rounded-2xl">
                <div className="rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
                  <div className="inline-flex items-center gap-2 rounded-full bg-card-2 px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-border">
                    <Tag className="size-3.5 text-primary/80" aria-hidden />
                    Recomandat
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-2">
                    <span className="rounded-full bg-background-2 px-2.5 py-1 ring-1 ring-border">
                      {featured.category}
                    </span>
                    <span>{featured.readingTimeText}</span>
                    <span>•</span>
                    <span>{formatDateShort(featured.date)}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {featured.description}
                  </p>
                  <ButtonLink
                    href={`/blog/${featured.slug}`}
                    className="mt-6 w-full justify-center"
                  >
                    Citește articolul
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
          <SectionHeader
            eyebrow="Articole"
            title="Ultimele articole"
            description="Scrise pentru practică: exemple, checklist-uri, strategii și carieră."
          />
          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {rest.map((p) => (
              <BlogCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.description}
                categoryLabel={p.category}
                readingTime={p.readingTimeText}
                dateLabel={formatDateShort(p.date)}
              />
            ))}
          </div>
        </Container>
      </Section>

      <DiscordCTABlock
        title="Vrei să propui un articol?"
        description="Intră pe Discord și spune tema, publicul țintă și ce problemă rezolvă. Îți dăm feedback pe structură și SEO."
      />
    </>
  );
}
