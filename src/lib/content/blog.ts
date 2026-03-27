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
export type BlogSource = { label: string; url: string };

export type BlogPostListItem = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: string[];
  readingTimeText: string;
};

// Type returned by Sanity queries (used in queries.ts)
export type SanityBlogPost = {
  slug: string;
  title: string;
  h1?: string;
  seoTitle?: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  author?: { name: string; role: string; bio?: string };
  reviewedBy?: string;
  internalLinks?: Array<{ label: string; href: string }>;
  sources?: BlogSource[];
  faq?: BlogFaqItem[];
  // Structured content sections
  intro?: string;
  summary?: string[];
  prerequisites?: PortableTextBlock[];
  mainAnswer?: PortableTextBlock[];
  steps?: PortableTextBlock[];
  examples?: PortableTextBlock[];
  commonMistakes?: PortableTextBlock[];
  conclusion?: PortableTextBlock[];
  // Legacy
  body?: PortableTextBlock[];
};

export type TocItem = { id: string; title: string; level: 2 | 3 };

// Sections with their fixed headings and anchor IDs
export const ARTICLE_SECTIONS = [
  { key: "summary", id: "pe-scurt", title: "Pe scurt" },
  {
    key: "prerequisites",
    id: "ce-trebuie-sa-stii",
    title: "Ce trebuie să știi înainte",
  },
  { key: "mainAnswer", id: "raspunsul-principal", title: "Răspunsul principal" },
  { key: "steps", id: "pasi-criterii", title: "Pași / criterii / metodă" },
  { key: "examples", id: "exemple", title: "Exemple concrete" },
  { key: "commonMistakes", id: "greseli", title: "Greșeli frecvente" },
  { key: "faq", id: "faq", title: "Întrebări frecvente" },
  { key: "conclusion", id: "concluzie", title: "Concluzie" },
] as const;

function buildStructuredToc(post: SanityBlogPost): TocItem[] {
  return ARTICLE_SECTIONS.filter(({ key }) => {
    const val = post[key as keyof SanityBlogPost];
    if (Array.isArray(val)) return val.length > 0;
    return Boolean(val);
  }).map(({ id, title }) => ({ id, title, level: 2 as const }));
}

function parseTocFromBody(body: PortableTextBlock[]): TocItem[] {
  return body
    .filter(
      (b) => b._type === "block" && (b.style === "h2" || b.style === "h3")
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

function calcReadingTime(post: SanityBlogPost): string {
  let words = 0;

  if (post.intro)
    words += post.intro.trim().split(/\s+/).filter(Boolean).length;
  if (post.summary)
    words += post.summary.join(" ").trim().split(/\s+/).filter(Boolean).length;
  if (post.faq)
    words += post.faq
      .map((f) => `${f.question} ${f.answer}`)
      .join(" ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  const blocks: PortableTextBlock[] = [
    ...(post.prerequisites ?? []),
    ...(post.mainAnswer ?? []),
    ...(post.steps ?? []),
    ...(post.examples ?? []),
    ...(post.commonMistakes ?? []),
    ...(post.conclusion ?? []),
    ...(post.body ?? []),
  ];
  words += blocks
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .flatMap((b) =>
      ((b.children ?? []) as Array<{ text?: string }>).map((c) => c.text ?? "")
    )
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.round(words / 200))} min`;
}

export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  return fetchAllBlogPosts();
}

export async function getBlogPostBySlug(slug: string) {
  const post = await fetchBlogPostBySlug(slug);
  if (!post) return null;

  const hasStructured = !!(post.intro || post.mainAnswer?.length);
  const toc = hasStructured
    ? buildStructuredToc(post)
    : parseTocFromBody(post.body ?? []);

  return {
    slug: post.slug,
    // Structured sections
    intro: post.intro,
    summary: post.summary,
    prerequisites: post.prerequisites,
    mainAnswer: post.mainAnswer,
    steps: post.steps,
    examples: post.examples,
    commonMistakes: post.commonMistakes,
    conclusion: post.conclusion,
    // Legacy fallback
    body: post.body,
    toc,
    meta: {
      title: post.title,
      h1: post.h1 ?? post.title,
      seoTitle: post.seoTitle ?? post.title,
      description: post.description,
      date: post.date,
      updatedAt: post.updatedAt,
      category: post.category as BlogCategory,
      tags: post.tags ?? [],
      author: post.author,
      reviewedBy: post.reviewedBy,
      internalLinks: post.internalLinks ?? [],
      faq: post.faq ?? [],
      sources: post.sources ?? [],
      readingTimeText: calcReadingTime(post),
    },
  };
}
