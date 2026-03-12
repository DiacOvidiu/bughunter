export type ResourceCategory =
  | "Junior QA"
  | "QA Manual"
  | "Testare Automată"
  | "API Testing"
  | "Performance Testing"
  | "Mobile Testing"
  | "Security Testing"
  | "Test Strategy"
  | "Career în QA"
  | "Tooling";

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  href: string;
  label: string;
};

export const resources: Resource[] = [
  {
    id: "roadmap-junior",
    title: "Roadmap: de la zero la primul job",
    description: "Traseu realist pe competențe și practică, cu milestone-uri clare.",
    category: "Junior QA",
    href: "/resurse#roadmap",
    label: "Junior QA",
  },
  {
    id: "checklist-api",
    title: "Checklist: ce verifici în API-uri",
    description: "Contract, auth, negative testing, rate limit, observabilitate și erori.",
    category: "API Testing",
    href: "/resurse#api",
    label: "API Testing",
  },
  {
    id: "template-strategy",
    title: "Template: strategie pe risc",
    description: "Un model scurt, clar și aplicabil pentru echipe moderne.",
    category: "Test Strategy",
    href: "/resurse#strategie",
    label: "Test Strategy",
  },
  {
    id: "tooling-api-postman",
    title: "Tooling: Postman + colecții mentenabile",
    description: "Naming, environments, negative tests și bune practici pentru echipă.",
    category: "Tooling",
    href: "/blog/cele-mai-utile-tool-uri-pentru-testare-api",
    label: "Tooling",
  },
  {
    id: "career-first-job",
    title: "Primul job: checklist de pregătire",
    description: "Portofoliu, CV, interviu: pași practici pentru România.",
    category: "Career în QA",
    href: "/blog/cum-sa-te-pregatesti-pentru-primul-job-de-tester",
    label: "Career",
  },
  {
    id: "web-testing-guide",
    title: "Ghid: testare web modernă",
    description: "Risc, observabilitate, API checks și automation stabil.",
    category: "QA Manual",
    href: "/blog/ghid-de-testare-pentru-aplicatii-web-moderne",
    label: "Web testing",
  },
];

export function getResourcesByCategory() {
  const map = new Map<ResourceCategory, Resource[]>();
  for (const r of resources) {
    const list = map.get(r.category) ?? [];
    list.push(r);
    map.set(r.category, list);
  }
  return map;
}

