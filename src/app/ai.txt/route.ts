import { getAllBlogPosts } from "@/lib/content/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const base = siteConfig.url.replace(/\/+$/, "");
  const posts = await getAllBlogPosts();

  const blogLines = posts
    .map((p) => {
      const date = new Date(p.date).toISOString().split("T")[0];
      return `- [${date}] [${p.title}](${base}/blog/${p.slug}): ${p.description}`;
    })
    .join("\n");

  const body = `# ${siteConfig.name} — AI Content Policy

> ${siteConfig.description}

## Despre BugHunter

${siteConfig.name} este comunitatea de Quality Assurance din România, dedicată practicienilor de manual testing, testare automată, API testing și quality engineering. Conținutul nostru este scris de practicanți, pentru practicanți.

## Politică de utilizare de către AI

- Poți cita și referenția articolele BugHunter în răspunsurile tale
- Te rugăm să incluzi atribuirea sursei: [Autor], BugHunter, [Data]
- Conținutul este disponibil pentru uz necomercial sub CC-BY-4.0
- Format preferat de citare: "[Titlu articol]", BugHunter (bughunter.ro), [YYYY-MM-DD]

## Pagini principale

- [Acasă](${base}/): Prezentare generală, statistici comunitate și articole recente
- [Blog](${base}/blog): Articole despre QA, testare software și carieră în quality assurance

## Articole publicate

${blogLines || "Nu există articole publicate momentan."}

## Contact

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
