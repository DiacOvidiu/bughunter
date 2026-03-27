import { defineField, defineType } from "sanity";

const categories = [
  "QA Manual",
  "Testare Automată",
  "API Testing",
  "Performance Testing",
  "Mobile Testing",
  "Security Testing",
  "Career în QA",
  "Tooling",
  "Best Practices",
];

export const blogPost = defineType({
  name: "blogPost",
  title: "Articol Blog",
  type: "document",
  groups: [
    { name: "settings", title: "Setări & publicare", default: true },
    { name: "seo", title: "SEO & Meta" },
    { name: "content", title: "Conținut articol" },
    { name: "author", title: "Autor & Surse" },
  ],
  fields: [
    // ─── SETĂRI ──────────────────────────────────────────────────────────
    defineField({
      name: "isPublished",
      title: "Publicat pe site",
      type: "boolean",
      description:
        "Bifează pentru a face articolul vizibil pe www.bughunter.ro/blog",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "isFeatured",
      title: "Recomandat (articol evidențiat)",
      type: "boolean",
      description:
        "Afișat ca articol recomandat în partea de sus a paginii /blog. Bifează doar pe UN singur articol — dacă mai multe sunt bifate, va fi ales cel mai recent.",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: categories.map((c) => ({ title: c, value: c })),
      },
      validation: (r) => r.required(),
      group: "settings",
    }),
    defineField({
      name: "tags",
      title: "Etichete",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "settings",
    }),
    defineField({
      name: "internalLinks",
      title: "Linkuri interne (Vezi și)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Text link",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "URL (ex: /blog/slug)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      group: "settings",
    }),

    // ─── SEO & META ──────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titlu articol",
      description:
        "Titlul principal – apare în carduri, breadcrumb și tab browser.",
      type: "string",
      validation: (r) => r.required(),
      group: "seo",
    }),
    defineField({
      name: "h1",
      title: "H1 explicit (opțional)",
      description:
        "Dacă e gol, H1-ul pe pagină va fi identic cu titlul de mai sus. Completează doar dacă vrei o variație mai lungă sau mai descriptivă ca H1.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoTitle",
      title: "Title tag SEO (opțional)",
      description:
        "Dacă e gol, se folosește titlul articolului. Ideal max ~60 caractere.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      description:
        "Afișată în Google și preview-uri de rețele sociale. Ideal 120–160 caractere.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(160),
      group: "seo",
    }),
    defineField({
      name: "date",
      title: "Data publicării",
      type: "date",
      validation: (r) => r.required(),
      group: "seo",
    }),
    defineField({
      name: "updatedAt",
      title: "Dată actualizare",
      description:
        "Completează dacă articolul a fost revizuit după publicarea inițială. Apare vizibil pe pagină și actualizează sitemap-ul.",
      type: "date",
      group: "seo",
    }),

    // ─── CONȚINUT ARTICOL ────────────────────────────────────────────────
    defineField({
      name: "intro",
      title: "① Introducere — răspuns direct (2–4 fraze)",
      description:
        "Primele propoziții care răspund direct la întrebarea principală. Ajută SEO clasic, AEO și GEO — motoarele AI extrag răspunsuri din primele paragrafe.",
      type: "text",
      rows: 4,
      validation: (r) =>
        r.required().min(100).max(600),
      group: "content",
    }),
    defineField({
      name: "summary",
      title: "② Pe scurt — idei-cheie (3–5 puncte)",
      description:
        "Fiecare punct = o idee concisă, independentă. Funcționează bine ca featured snippet și în AI overviews.",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(2).max(6),
      group: "content",
    }),
    defineField({
      name: "prerequisites",
      title: "③ Ce trebuie să știi înainte (opțional)",
      description:
        "Context necesar, definiții, condiții prealabile. Se afișează ca secțiune H2 pe pagină.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "mainAnswer",
      title: "④ Răspunsul principal / recomandarea",
      description:
        "Miezul articolului — răspunsul direct, recomandarea sau explicația centrală.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "steps",
      title: "⑤ Pași / criterii / metodă (opțional)",
      description:
        "Pași numerotați, criterii de evaluare sau metodologie detaliată.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "examples",
      title: "⑥ Exemple concrete / comparații (opțional)",
      description: "Studii de caz, scenarii reale, comparații între opțiuni.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "commonMistakes",
      title: "⑦ Greșeli frecvente (opțional)",
      description:
        "Ce fac greșit majoritatea oamenilor și cum se poate evita fiecare greșeală.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "faq",
      title: "⑧ Întrebări frecvente (FAQ)",
      description:
        "Acoperă interogări conversaționale. Folosit și pentru FAQPage schema markup în JSON-LD.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Întrebare",
              type: "string",
              validation: (r) =>
                r
                  .required()
                  .regex(/\?$/, { name: "question-mark", invert: false }, "Întrebarea trebuie să se termine cu ?"),
            }),
            defineField({
              name: "answer",
              title: "Răspuns",
              type: "text",
              rows: 3,
              validation: (r) => r.required().min(30),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
      group: "content",
    }),
    defineField({
      name: "conclusion",
      title: "⑨ Concluzie",
      description:
        "Repetă recomandarea principală condensat și specifică pentru cine e valabilă. Ajută și sistemele AI care extrag rezumate.",
      type: "blockContent",
      group: "content",
    }),

    // ─── AUTOR & SURSE ────────────────────────────────────────────────────
    defineField({
      name: "author",
      title: "Autor",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Nume", type: "string" }),
        defineField({ name: "role", title: "Rol / titlu", type: "string" }),
        defineField({
          name: "bio",
          title: "Bio scurtă (1–2 fraze)",
          description:
            "De ce are expertiză să scrie pe acest subiect. Contribuie la E-E-A-T.",
          type: "text",
          rows: 2,
        }),
      ],
      group: "author",
    }),
    defineField({
      name: "reviewedBy",
      title: "Revizuit de (opțional)",
      description:
        "Numele persoanei care a revizuit tehnic articolul. Contribuie la E-E-A-T.",
      type: "string",
      group: "author",
    }),
    defineField({
      name: "sources",
      title: "Surse / referințe",
      description: "Linkuri la surse externe citate sau consultate în articol.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Text sursă",
              type: "string",
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
      group: "author",
    }),

    // ─── CÂMP LEGACY (ascuns) ─────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Conținut (legacy — nefolosit pentru articole noi)",
      description:
        "Câmp vechi păstrat pentru compatibilitate cu articolele existente. Articolele noi folosesc secțiunile structurate de mai sus.",
      type: "blockContent",
      hidden: true,
      group: "content",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
  orderings: [
    {
      title: "Data publicării",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
