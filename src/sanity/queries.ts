import { client } from "./client";
import type { PortableTextBlock } from "@portabletext/react";

import type { BlogCategory, BlogPostListItem, SanityBlogPost } from "@/lib/content/blog";

export async function fetchAllBlogPosts(): Promise<BlogPostListItem[]> {
  const posts = await client.fetch<SanityBlogPost[]>(
    `*[_type == "blogPost" && isPublished == true] | order(date desc) {
      "slug": slug.current,
      title,
      seoTitle,
      description,
      date,
      category,
      "tags": coalesce(tags, []),
      body
    }`
  );

  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    seoTitle: p.seoTitle ?? p.title,
    description: p.description,
    date: p.date,
    category: p.category as BlogCategory,
    tags: p.tags ?? [],
    readingTimeText: calcReadingTime(p.body ?? []),
  }));
}

export async function fetchBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return client.fetch<SanityBlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
      "slug": slug.current,
      title,
      seoTitle,
      description,
      date,
      category,
      "tags": coalesce(tags, []),
      author,
      "internalLinks": coalesce(internalLinks, []),
      "faq": coalesce(faq, []),
      body
    }`,
    { slug }
  );
}

function calcReadingTime(body: PortableTextBlock[]): string {
  const text = body
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .flatMap((b) => b.children.map((c: any) => c.text ?? ""))
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}
