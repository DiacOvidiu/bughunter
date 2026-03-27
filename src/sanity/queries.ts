import { client } from "./client";

import type { BlogCategory, BlogPostListItem, SanityBlogPost } from "@/lib/content/blog";

export async function fetchAllBlogPosts(): Promise<BlogPostListItem[]> {
  const posts = await client.fetch<
    Array<{
      slug: string;
      title: string;
      seoTitle?: string;
      description: string;
      date: string;
      updatedAt?: string;
      _updatedAt: string;
      category: string;
      tags?: string[];
      intro?: string;
      summary?: string[];
      isFeatured?: boolean;
    }>
  >(
    `*[_type == "blogPost" && isPublished == true && !(_id in path("drafts.**"))] | order(date desc) {
      "slug": slug.current,
      title,
      seoTitle,
      description,
      date,
      updatedAt,
      _updatedAt,
      category,
      "tags": coalesce(tags, []),
      intro,
      "summary": coalesce(summary, []),
      isFeatured
    }`
  );

  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    seoTitle: p.seoTitle ?? p.title,
    description: p.description,
    date: p.date,
    updatedAt: p.updatedAt ?? p._updatedAt,
    category: p.category as BlogCategory,
    tags: p.tags ?? [],
    readingTimeText: estimateReadingTime(p.intro, p.summary),
    isFeatured: p.isFeatured ?? false,
  }));
}

export async function fetchBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return client.fetch<SanityBlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug && isPublished == true && !(_id in path("drafts.**"))][0] {
      "slug": slug.current,
      title,
      h1,
      seoTitle,
      description,
      date,
      updatedAt,
      category,
      "tags": coalesce(tags, []),
      author,
      reviewedBy,
      "internalLinks": coalesce(internalLinks, []),
      "sources": coalesce(sources, []),
      "faq": coalesce(faq, []),
      intro,
      "summary": coalesce(summary, []),
      prerequisites,
      mainAnswer,
      steps,
      examples,
      commonMistakes,
      conclusion,
      body
    }`,
    { slug }
  );
}

/** Rough reading time estimate for list items (intro + summary ≈ 15–20% of article). */
function estimateReadingTime(intro?: string, summary?: string[]): string {
  let words = 0;
  if (intro) words += intro.trim().split(/\s+/).filter(Boolean).length;
  if (summary) words += summary.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const estimated = words > 0 ? words * 6 : 300;
  return `${Math.max(2, Math.round(estimated / 200))} min`;
}
