import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";

import { slugify } from "@/lib/slug";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function headingId(value: any): string {
  return slugify(
    (value.children ?? []).map((c: { text?: string }) => c.text ?? "").join("")
  );
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => <h2 id={headingId(value)}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(value)}>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
