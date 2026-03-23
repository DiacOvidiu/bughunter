import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    foundingDate: "2022",
    areaServed: { "@type": "Country", name: "România" },
    knowsAbout: [
      "QA Testing",
      "Software Testing",
      "Test Automation",
      "Quality Engineering",
      "Manual Testing",
      "API Testing",
      "Performance Testing",
      "Mobile Testing",
      "Security Testing",
    ],
    sameAs: [
      siteConfig.discordInviteUrl,
      siteConfig.socials.linkedin,
      siteConfig.socials.github,
      siteConfig.socials.youtube,
    ].filter(Boolean),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ro-RO",
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
  speakableCssSelectors,
}: {
  path: string;
  title: string;
  description: string;
  speakableCssSelectors?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name: title,
    url: absoluteUrl(path),
    description,
    inLanguage: "ro-RO",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
    },
    ...(speakableCssSelectors?.length
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: speakableCssSelectors,
          },
        }
      : {}),
  };
}

export function breadcrumbListJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function blogPostingJsonLd({
  path,
  title,
  description,
  datePublished,
  authorName,
  tags,
  category,
  wordCount,
}: {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  authorName: string;
  tags?: string[];
  category?: string;
  wordCount?: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    inLanguage: "ro-RO",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
    },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: `Blog — ${siteConfig.name}`,
      url: absoluteUrl("/blog"),
    },
    ...(tags?.length ? { keywords: tags.join(", ") } : {}),
    ...(category ? { articleSection: category } : {}),
    ...(wordCount ? { wordCount } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".prose > p"],
    },
  };
}

export function blogCollectionJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `Blog — ${siteConfig.name}`,
    url: absoluteUrl("/blog"),
    description: "Articole despre QA Manual, Testare Automată, API Testing, Quality Engineering și carieră în testare software.",
    inLanguage: "ro-RO",
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
    },
  };
}
