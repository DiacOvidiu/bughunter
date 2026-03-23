import { getAllBlogPosts } from "@/lib/content/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const base = siteConfig.url.replace(/\/+$/, "");
  const posts = await getAllBlogPosts();

  const blogLines = posts
    .map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} este comunitatea de Quality Assurance din România, dedicată practicienilor de manual testing, testare automată, API testing și quality engineering. Oferim conținut educațional și o comunitate activă pe Discord.

## Pagini principale

- [Acasă](${base}/): Prezentare generală, statistici comunitate și articole recente
- [Despre](${base}/despre): Misiunea, valorile și povestea comunității BugHunter
- [Blog](${base}/blog): Articole despre QA, testare software și carieră în quality assurance
- [Contact](${base}/contact): Parteneriate, speakeri și contact direct

## Articole recente

${blogLines}

## Informații de contact

- Email: ${siteConfig.email}
- Discord: ${siteConfig.discordInviteUrl}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
