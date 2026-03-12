import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Tag } from "lucide-react";

import { DiscordCTABlock } from "@/components/blocks/discord-cta";
import { FaqAccordion } from "@/components/blocks/faq";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { AuthorBlock } from "@/components/content/author-block";
import { Prose } from "@/components/content/prose";
import { JsonLdScript } from "@/components/seo/jsonld";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content/blog";
import { formatDateShort } from "@/lib/format";
import {
  blogPostingJsonLd,
  breadcrumbListJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  let post: Awaited<ReturnType<typeof getBlogPostBySlug>> | null = null;
  try {
    post = await getBlogPostBySlug(resolved.slug);
  } catch {
    post = null;
  }
  if (!post)
    return buildMetadata({
      title: `Articol — ${siteConfig.name}`,
      description: siteConfig.description,
      path: "/blog",
    });

  return buildMetadata({
    title: post.meta.seoTitle ?? `${post.meta.title} — ${siteConfig.name}`,
    description: post.meta.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await Promise.resolve(params);
  let post: Awaited<ReturnType<typeof getBlogPostBySlug>> | null = null;
  try {
    post = await getBlogPostBySlug(resolved.slug);
  } catch {
    post = null;
  }
  if (!post) return notFound();

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
              path: `/blog/${post.slug}`,
              title:
                post.meta.seoTitle ?? `${post.meta.title} — ${siteConfig.name}`,
              description: post.meta.description,
            })}
          />
          <JsonLdScript
            data={breadcrumbListJsonLd([
              { name: "Acasă", path: "/" },
              { name: "Articole", path: "/blog" },
              { name: post.meta.title, path: `/blog/${post.slug}` },
            ])}
          />
          <JsonLdScript
            data={blogPostingJsonLd({
              path: `/blog/${post.slug}`,
              title: post.meta.title,
              description: post.meta.description,
              datePublished: post.meta.date,
              authorName: post.meta.author?.name ?? siteConfig.name,
            })}
          />
          {post.meta.faq.length ? (
            <JsonLdScript data={faqPageJsonLd(post.meta.faq)} />
          ) : null}
          <Breadcrumbs
            items={[
              { href: "/", label: "Acasă" },
              { href: "/blog", label: "Articole" },
              { href: `/blog/${post.slug}`, label: post.meta.title },
            ]}
          />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="primary">
                  <Tag className="size-3.5" aria-hidden />
                  {post.meta.category}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-muted-2">
                  <Clock className="size-3.5" aria-hidden />
                  {post.meta.readingTimeText}
                </div>
                <div className="text-xs text-muted-2">
                  {formatDateShort(post.meta.date)}
                </div>
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {post.meta.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {post.meta.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/comunitate" variant="secondary">
                  Vezi Discord
                </ButtonLink>
                <ButtonLink href="/blog" variant="ghost">
                  Înapoi la articole
                </ButtonLink>
              </div>

              <Prose className="mt-10">{post.content}</Prose>

              {post.meta.internalLinks.length ? (
                <div className="mt-10 rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
                  <div className="text-sm font-semibold tracking-tight">
                    Vezi și
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm text-muted">
                    {post.meta.internalLinks.map((l) => (
                      <li key={l.href}>
                        <a className="hover:text-foreground" href={l.href}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="lg:sticky lg:top-24">
              {post.meta.author ? (
                <div className="mb-3">
                  <AuthorBlock
                    name={post.meta.author.name}
                    role={post.meta.author.role}
                  />
                </div>
              ) : null}
              {post.toc.length ? (
                <div className="rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
                  <div className="text-sm font-semibold tracking-tight">
                    Cuprins
                  </div>
                  <ol className="mt-4 grid gap-2 text-sm text-muted">
                    {post.toc.map((t) => (
                      <li
                        key={t.id}
                        className={t.level === 3 ? "pl-3" : undefined}
                      >
                        <a className="hover:text-foreground" href={`#${t.id}`}>
                          {t.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                  <ButtonLink
                    href="/comunitate"
                    className="mt-6 w-full justify-center"
                  >
                    Intră pe Discord
                    <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                </div>
              ) : null}

              {post.meta.faq.length ? (
                <div className="mt-3 rounded-2xl bg-card p-7 ring-1 ring-border shadow-(--shadow)">
                  <div className="text-sm font-semibold tracking-tight">
                    FAQ
                  </div>
                  <div className="mt-4">
                    <FaqAccordion items={post.meta.faq} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <DiscordCTABlock
        title="Vrei feedback pe cazul tău?"
        description="Intră pe Discord și postează contextul. Te ajutăm să structurezi întrebarea și să alegi următorul pas."
      />
    </>
  );
}
