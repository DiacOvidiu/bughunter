import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/+$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow AI/LLM crawlers for AI Overview and LLM indexing
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "CCBot",
          "Amazonbot",
          "Applebot-Extended",
          "YouBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
