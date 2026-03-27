import type { PortableTextBlock } from "@portabletext/react";

import { slugify } from "@/lib/slug";
import { fetchAllBlogPosts, fetchBlogPostBySlug } from "@/sanity/queries";

export const blogCategories = [
  "QA Manual",
  "Testare Automată",
  "API Testing",
  "Performance Testing",
  "Mobile Testing",
  "Security Testing",
  "Career în QA",
  "Tooling",
  "Best Practices",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogFaqItem = { question: string; answer: string };

export type BlogPostFrontmatter = {
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags?: string[];
  author?: { name: string; role: string };
  internalLinks?: Array<{ href: string; label: string }>;
  faq?: BlogFaqItem[];
};

export type BlogPostListItem = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  readingTimeText: string;
};

// Type returned by Sanity queries (used in queries.ts)
export type SanityBlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  author?: { name: string; role: string };
  internalLinks?: Array<{ label: string; href: string }>;
  faq?: BlogFaqItem[];
  body: PortableTextBlock[];
};

export type TocItem = { id: string; title: string; level: 2 | 3 };

function parseTocFromBody(body: PortableTextBlock[]): TocItem[] {
  return body
    .filter(
      (b) =>
        b._type === "block" &&
        (b.style === "h2" || b.style === "h3")
    )
    .map((b) => {
      const title = ((b.children ?? []) as Array<{ text?: string }>)
        .map((c) => c.text ?? "")
        .join("");
      return {
        id: slugify(title),
        title,
        level: (b.style === "h2" ? 2 : 3) as 2 | 3,
      };
    });
}

export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  return fetchAllBlogPosts();
}

export async function getBlogPostBySlug(slug: string) {
  const post = await fetchBlogPostBySlug(slug);
  if (!post) return null;

  const toc = parseTocFromBody(post.body ?? []);

  return {
    slug: post.slug,
    body: post.body ?? [],
    toc,
    meta: {
      title: post.title,
      seoTitle: post.seoTitle ?? post.title,
      description: post.description,
      date: post.date,
      category: post.category as BlogCategory,
      tags: post.tags ?? [],
      author: post.author,
      internalLinks: post.internalLinks ?? [],
      faq: post.faq ?? [],
      readingTimeText: calcReadingTime(post.body ?? []),
    },
  };
}

function calcReadingTime(body: PortableTextBlock[]): string {
  const text = body
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .flatMap((b) =>
      ((b.children ?? []) as Array<{ text?: string }>).map((c) => c.text ?? "")
    )
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}
