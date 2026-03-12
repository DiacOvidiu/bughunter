import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";

import { slugify } from "@/lib/slug";

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
  "Evenimente BugHunter",
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
  author?: {
    name: string;
    role: string;
  };
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

const contentDir = path.join(process.cwd(), "src", "content", "blog");

async function readAllMdxFiles() {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => path.join(contentDir, e.name));
}

function parseToc(mdx: string) {
  const lines = mdx.split("\n");
  const items: Array<{ id: string; title: string; level: 2 | 3 }> = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const title = match[2].replace(/\s+#*$/, "").trim();
    const id = slugify(title);
    items.push({ id, title, level });
  }

  return items;
}

export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  const files = await readAllMdxFiles();
  const items = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as Partial<BlogPostFrontmatter>;

      const fileSlug = path.basename(filePath).replace(/\.mdx$/, "");
      const slug = typeof fm.title === "string" ? fileSlug : fileSlug;

      const rt = readingTime(parsed.content);

      return {
        slug,
        title: String(fm.title ?? fileSlug),
        seoTitle: String(fm.seoTitle ?? fm.title ?? fileSlug),
        description: String(fm.description ?? ""),
        date: String(fm.date ?? ""),
        category: (fm.category ?? "Best Practices") as BlogCategory,
        tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
        readingTimeText: `${Math.max(1, Math.round(rt.minutes))} min`,
      } satisfies BlogPostListItem;
    }),
  );

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<BlogPostFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className:
                  "ml-2 inline-flex opacity-0 group-hover:opacity-100 transition-opacity text-muted",
                ariaHidden: "true",
                tabIndex: -1,
              },
            },
          ],
        ],
      },
    },
  });

  const parsed = matter(raw);
  const rt = readingTime(parsed.content);
  const toc = parseToc(parsed.content);

  return {
    slug,
    content,
    toc,
    meta: {
      ...frontmatter,
      readingTimeText: `${Math.max(1, Math.round(rt.minutes))} min`,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      internalLinks: Array.isArray(frontmatter.internalLinks) ? frontmatter.internalLinks : [],
      faq: Array.isArray(frontmatter.faq) ? frontmatter.faq : [],
    },
  };
}

