import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
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
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: absoluteUrl(path),
    description,
    inLanguage: "ro-RO",
    isPartOf: { "@type": "WebSite", url: siteConfig.url, name: siteConfig.name },
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
}: {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  authorName: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function eventJsonLd({
  path,
  name,
  description,
  startDate,
  endDate,
  locationName,
  locationAddress,
  eventAttendanceMode = "https://schema.org/OnlineEventAttendanceMode",
  eventStatus = "https://schema.org/EventScheduled",
}: {
  path: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  locationAddress: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    endDate: endDate ?? startDate,
    url: absoluteUrl(path),
    eventAttendanceMode,
    eventStatus,
    location: {
      "@type": "Place",
      name: locationName,
      address: locationAddress,
    },
    organizer: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

