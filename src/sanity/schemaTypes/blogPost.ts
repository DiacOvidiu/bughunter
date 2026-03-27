import { defineField, defineType } from "sanity";
import { PublishToggle } from "../components/PublishToggle";
import { TooltipField } from "../components/TooltipField";

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
    { name: "basic", title: "De baza", default: true },
    { name: "content", title: "Continut" },
    { name: "extras", title: "Extras" },
    { name: "author", title: "Autor" },
  ],

  fieldsets: [
    {
      name: "optional_sections",
      title: "Sectiuni optionale — expandeaza daca vrei sa adaugi",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ══════════════════════════════════════════════════════════════════════
    // TAB 1 — DE BAZA
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "isPublished",
      title: "Publicat pe site",
      type: "boolean",
      description:
        "Cand e activ, articolul apare pe www.bughunter.ro/blog si poate fi gasit de Google. Lasa dezactivat cat timp lucrezi la el — activeaza doar cand e gata de publicat.",
      initialValue: false,
      group: "basic",
      components: { input: PublishToggle, field: TooltipField },
    }),
    defineField({
      name: "title",
      title: "Titlu articol",
      description:
        "Titlul principal al articolului — apare in carduri, in tab-ul browserului si in Google. Scrie clar si specific ce va afla cititorul. Exemplu bun: 'Cum scrii un test automat in Selenium pas cu pas'. Evita titluri vagi gen 'Ghid QA' sau 'Testare'.",
      type: "string",
      validation: (r) => r.required(),
      group: "basic",
      components: { field: TooltipField },
    }),
    defineField({
      name: "slug",
      title: "Adresa URL",
      description:
        "Adresa paginii pe site, ex: /blog/cum-scrii-test-selenium. Se completeaza automat din titlu — dupa ce ai scris titlul, apasa butonul 'Generate'. Nu modifica manual daca nu e strict necesar.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      group: "basic",
      components: { field: TooltipField },
    }),
    defineField({
      name: "category",
      title: "Categorie",
      description:
        "Alege categoria care descrie cel mai bine subiectul articolului. Categoria apare in filtrele de pe pagina /blog si ajuta cititorii sa gaseasca articole similare. Daca articolul acopera mai multe subiecte, alege categoria dominanta.",
      type: "string",
      options: {
        list: categories.map((c) => ({ title: c, value: c })),
      },
      validation: (r) => r.required(),
      group: "basic",
      components: { field: TooltipField },
    }),
    defineField({
      name: "date",
      title: "Data publicarii",
      description:
        "Data la care articolul va fi sau a fost publicat. Apare vizibil pe pagina langa autor si influenteaza ordinea in lista de articole (cel mai recent primul). Foloseste data reala de publicare, nu data la care ai inceput sa scrii.",
      type: "date",
      validation: (r) => r.required(),
      group: "basic",
      components: { field: TooltipField },
    }),
    defineField({
      name: "description",
      title: "Descriere scurta",
      description:
        "Textul care apare sub titlu in rezultatele Google si la share pe Facebook/LinkedIn. Ideal 120-160 caractere. Raspunde la: 'despre ce e articolul si ce castiga cititorul daca il citeste?'. Exemplu: 'Afla cum sa scrii primul tau test automatizat in Selenium, cu exemple de cod si greseli de evitat pentru incepatori in QA.' Nu repeta titlul mot-a-mot.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(160),
      group: "basic",
      components: { field: TooltipField },
    }),

    // ══════════════════════════════════════════════════════════════════════
    // TAB 2 — CONTINUT
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "intro",
      title: "Introducere",
      description:
        "2-4 propozitii care raspund direct la subiectul articolului — apare imediat sub titlu. Scrie ca si cum cineva te-a intrebat despre subiect si tu raspunzi direct, fara introduceri lungi. Exemplu: 'QA Manual inseamna testarea manuala a aplicatiilor fara a folosi cod sau unelte de automatizare. Este punctul de start recomandat pentru oricine intra in domeniul QA.' Minim 100, maxim 600 caractere.",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(100).max(600),
      group: "content",
      components: { field: TooltipField },
    }),
    defineField({
      name: "mainAnswer",
      title: "Continut principal",
      description:
        "Miezul articolului — explicatia, recomandarea sau ghidul detaliat. Foloseste titluri H2/H3 pentru a structura sectiunile, paragrafe scurte (2-4 propozitii fiecare) si liste acolo unde enumeri pasi sau optiuni. Scrie pentru un cititor care citeste rapid — paragrafele lungi fara structura sunt greu de parcurs.",
      type: "blockContent",
      group: "content",
      components: { field: TooltipField },
    }),

    // ── Sectiuni optionale (colapsate) ────────────────────────────────────
    defineField({
      name: "summary",
      title: "Idei cheie (rezumat scurt)",
      description:
        "3-5 puncte concise cu cele mai importante idei din articol — apare ca o caseta vizuala inainte de continut. Fiecare punct trebuie sa fie o idee completa si de sine statatoare. Exemplu: 'QA Manual nu necesita cunostinte de programare pentru inceput' sau 'Cel mai folosit tool de management al testelor este TestRail'.",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(2).max(6),
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),
    defineField({
      name: "prerequisites",
      title: "Ce trebuie sa stii inainte",
      description:
        "Context necesar sau definitii pe care cititorul ar trebui sa le cunoasca inainte de a citi articolul. Foloseste aceasta sectiune daca articolul presupune cunostinte prealabile. Exemplu: pentru un articol despre Selenium, prerequisites ar fi: ce este un browser, ce este un test functional, ce este HTML/CSS de baza.",
      type: "blockContent",
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),
    defineField({
      name: "steps",
      title: "Pasi / metoda",
      description:
        "Pasi numerotati, criterii de evaluare sau metodologie detaliata. Foloseste aceasta sectiune cand articolul explica un proces pas cu pas. Fiecare pas trebuie sa fie o actiune concreta. Exemplu: 'Pasul 1: Instaleaza Java Development Kit (JDK) de pe site-ul oficial Oracle.'",
      type: "blockContent",
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),
    defineField({
      name: "examples",
      title: "Exemple concrete",
      description:
        "Studii de caz, scenarii reale sau comparatii intre optiuni. Exemplele fac continutul mai usor de inteles si de retinut. Incearca sa folosesti exemple din lumea reala, nu abstracte. Exemplu: 'Intr-un proiect e-commerce, testezi ca butonul Adauga in cos functioneaza corect pe Chrome, Firefox si Safari.'",
      type: "blockContent",
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),
    defineField({
      name: "commonMistakes",
      title: "Greseli frecvente",
      description:
        "Ce fac gresit majoritatea oamenilor si cum se evita fiecare greseala. Aceasta sectiune este valoroasa pentru cititori pentru ca ii ajuta sa nu repete aceleasi greseli. Structureaza fiecare greseala ca: 'Greseala: [ce se face gresit]. De ce e problema: [explicatie]. Solutia: [ce sa faci in schimb].'",
      type: "blockContent",
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),
    defineField({
      name: "faq",
      title: "Intrebari frecvente (FAQ)",
      description:
        "Intrebari pe care le pun cititorii despre acest subiect — cu raspunsuri scurte si clare. Gandeste-te ce ar intreba cineva dupa ce citeste articolul sau ce intrebari apar frecvent pe forumuri/Google despre subiect. Intrebarile TREBUIE sa se termine cu '?'.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Intrebare",
              description: "Trebuie sa se termine cu '?'. Exemplu: 'Cat timp dureaza sa inveti QA Manual?'",
              type: "string",
              validation: (r) =>
                r.required().regex(/\?$/, "Intrebarea trebuie sa se termine cu ?"),
              components: { field: TooltipField },
            }),
            defineField({
              name: "answer",
              title: "Raspuns",
              description: "Raspuns direct, 2-4 propozitii. Nu incepe cu 'Buna intrebare!' sau alte introduceri inutile — raspunde direct.",
              type: "text",
              rows: 3,
              validation: (r) => r.required().min(30),
              components: { field: TooltipField },
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),
    defineField({
      name: "conclusion",
      title: "Concluzie",
      description:
        "Rezumat scurt al recomandarii principale si pentru cine e valabila — 2-4 propozitii. Nu introduce informatii noi in concluzie. Exemplu: 'QA Manual este punctul ideal de start pentru oricine vrea o cariera in testare software. Cu 3-6 luni de practica constanta, poti aplica la primul job entry-level in QA.'",
      type: "blockContent",
      group: "content",
      fieldset: "optional_sections",
      components: { field: TooltipField },
    }),

    // ── Legacy (ascuns, compatibilitate) ──────────────────────────────────
    defineField({
      name: "body",
      title: "Continut vechi (nefolosit pentru articole noi)",
      type: "blockContent",
      hidden: true,
      group: "content",
    }),

    // ══════════════════════════════════════════════════════════════════════
    // TAB 3 — EXTRAS (tot optional)
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "isFeatured",
      title: "Articol recomandat",
      description:
        "Afisat evidentiat in fruntea paginii /blog. Bifeaza pe un singur articol — daca mai multe sunt bifate, va fi ales cel mai recent.",
      type: "boolean",
      initialValue: false,
      group: "extras",
      components: { field: TooltipField },
    }),
    defineField({
      name: "tags",
      title: "Etichete",
      description:
        "Cuvinte cheie suplimentare asociate articolului. Adauga termeni tehnici specifici care nu sunt deja inclusi in categorie. Exemplu pentru un articol despre Selenium: 'selenium', 'webdriver', 'java', 'automatizare'. Scrie eticheta si apasa Enter.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "extras",
      components: { field: TooltipField },
    }),
    defineField({
      name: "internalLinks",
      title: "Linkuri interne (Vezi si)",
      description:
        "Articole similare recomandate cititorului la finalul articolului. Adauga 2-4 articole relevante din acelasi domeniu. Textul linkului trebuie sa descrie clar despre ce e articolul destinatie, nu 'Click aici' sau 'Afla mai mult'.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Text link",
              description: "Titlul articolului destinatie sau o variatie descriptiva. Exemplu: 'Cum sa instalezi Selenium WebDriver in Java'",
              type: "string",
              components: { field: TooltipField },
            }),
            defineField({
              name: "href",
              title: "URL",
              description: "Adresa relativa a articolului. Exemplu: /blog/instalare-selenium-webdriver-java",
              type: "string",
              components: { field: TooltipField },
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
      group: "extras",
      components: { field: TooltipField },
    }),
    defineField({
      name: "h1",
      title: "Titlu H1 personalizat",
      description:
        "LASA GOL in mod normal — se foloseste automat titlul articolului. Completeaza doar daca vrei un titlu diferit afisat pe pagina fata de cel din carduri/Google. Util cand titlul SEO optim difera de titlul vizual ideal.",
      type: "string",
      group: "extras",
      components: { field: TooltipField },
    }),
    defineField({
      name: "seoTitle",
      title: "Titlu tab browser (SEO)",
      description:
        "LASA GOL in mod normal — se foloseste automat titlul articolului. Completeaza doar daca vrei un titlu diferit in tab-ul browserului si in Google. Maxim 60 caractere. Util daca titlul articolului e mai lung de 60 de caractere.",
      type: "string",
      group: "extras",
      components: { field: TooltipField },
    }),
    defineField({
      name: "updatedAt",
      title: "Data actualizare",
      description:
        "Completeaza daca ai revizuit sau actualizat articolul dupa publicarea initiala. Apare pe pagina langa data publicarii si actualizeaza sitemap-ul pentru Google. Nu completa pentru modificari minore de formatare.",
      type: "date",
      group: "extras",
      components: { field: TooltipField },
    }),

    // ══════════════════════════════════════════════════════════════════════
    // TAB 4 — AUTOR
    // ══════════════════════════════════════════════════════════════════════
    defineField({
      name: "author",
      title: "Autor",
      type: "object",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "name",
          title: "Nume",
          description: "Numele complet al autorului, ex: 'Andrei Popescu'.",
          type: "string",
          components: { field: TooltipField },
        }),
        defineField({
          name: "role",
          title: "Functie / titlu",
          description: "Titlul profesional al autorului, ex: 'Senior QA Engineer' sau 'QA Lead la Altex Romania'.",
          type: "string",
          components: { field: TooltipField },
        }),
        defineField({
          name: "bio",
          title: "Bio scurta",
          description:
            "1-2 fraze despre de ce are expertiza sa scrie pe acest subiect. Mentioneaza ani de experienta si domeniu. Exemplu: '7 ani experienta in QA automatizat, specializat in Selenium si Cypress. A lucrat pe proiecte e-commerce si banking pentru clienti din UK si Germania.'",
          type: "text",
          rows: 2,
          components: { field: TooltipField },
        }),
      ],
      group: "author",
    }),
    defineField({
      name: "reviewedBy",
      title: "Revizuit de (optional)",
      description:
        "Numele persoanei care a verificat tehnic corectitudinea articolului, ex: 'Maria Ionescu, QA Manager'. Lasa gol daca articolul nu a fost revizuit de altcineva.",
      type: "string",
      group: "author",
      components: { field: TooltipField },
    }),
    defineField({
      name: "sources",
      title: "Surse / referinte (optional)",
      description:
        "Linkuri la surse externe consultate sau citate in articol — documentatie oficiala, studii, articole de referinta. Adauga o denumire descriptiva si URL-ul complet. Exemplu: denumire 'Documentatie oficiala Selenium', URL 'https://www.selenium.dev/documentation/'.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Denumire sursa",
              description: "Numele descriptiv al sursei, ex: 'Documentatie oficiala Selenium WebDriver'.",
              type: "string",
              components: { field: TooltipField },
            }),
            defineField({
              name: "url",
              title: "URL",
              description: "Adresa completa, ex: https://www.selenium.dev/documentation/",
              type: "url",
              components: { field: TooltipField },
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
      group: "author",
      components: { field: TooltipField },
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "date" },
  },
  orderings: [
    {
      title: "Data publicarii",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
