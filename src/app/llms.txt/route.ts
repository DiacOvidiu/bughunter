import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllEvents } from "@/content/events";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const base = siteConfig.url.replace(/\/+$/, "");
  const posts = await getAllBlogPosts();
  const events = getAllEvents();

  const blogLines = posts
    .map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const eventLines = events
    .map((e) => `- [${e.title}](${base}/evenimente/${e.slug}): ${e.excerpt}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} este comunitatea de Quality Assurance din România, dedicată practicienilor de manual testing, testare automată, API testing și quality engineering. Oferim conținut educațional, evenimente, resurse și o comunitate activă pe Discord.

## Pagini principale

- [Acasă](${base}/): Prezentare generală, statistici comunitate, articole și evenimente recente
- [Despre](${base}/despre): Misiunea, valorile și povestea comunității BugHunter
- [Blog](${base}/blog): Articole despre QA, testare software și carieră în quality assurance
- [Evenimente](${base}/evenimente): Meetup-uri, workshop-uri și sesiuni live pentru QA engineers
- [Resurse](${base}/resurse): Colecție de instrumente, ghiduri și materiale de învățare pentru QA
- [Contact](${base}/contact): Parteneriate, speakeri și contact direct

## Articole recente

${blogLines}

## Evenimente

${eventLines}

## Informații de contact

- Email: ${siteConfig.email}
- Discord: ${siteConfig.discordInviteUrl}
- LinkedIn: ${siteConfig.socials.linkedin}
- GitHub: ${siteConfig.socials.github}
- YouTube: ${siteConfig.socials.youtube}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
