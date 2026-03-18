import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export function absoluteUrl(pathname: string) {
  const base = siteConfig.url.replace(/\/+$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImagePath = "/opengraph-image",
  ogType = "website",
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  ogImagePath?: string;
  ogType?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const safeDescription =
    description.trim().length > 155
      ? `${description.trim().slice(0, 152).replace(/\s+\S*$/, "").trim()}…`
      : description.trim();
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(ogImagePath);

  return {
    title: { absolute: title },
    description: safeDescription,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description: safeDescription,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [ogImage],
    },
  };
}
