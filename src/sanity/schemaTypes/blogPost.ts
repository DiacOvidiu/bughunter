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
  fields: [
    defineField({
      name: "isPublished",
      title: "Publicat pe site",
      type: "boolean",
      description: "Bifează pentru a face articolul vizibil pe www.bughunter.ro/blog",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Titlu SEO (opțional)",
      description: "Dacă e gol, se folosește titlul articolului.",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descriere (meta description)",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "date",
      title: "Data publicării",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: categories.map((c) => ({ title: c, value: c })),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Etichete",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Nume", type: "string" }),
        defineField({ name: "role", title: "Rol", type: "string" }),
      ],
    }),
    defineField({
      name: "internalLinks",
      title: "Linkuri interne (Vezi și)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Text link", type: "string" }),
            defineField({ name: "href", title: "URL (ex: /blog/slug)", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Întrebare", type: "string" }),
            defineField({ name: "answer", title: "Răspuns", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Conținut articol",
      type: "blockContent",
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
