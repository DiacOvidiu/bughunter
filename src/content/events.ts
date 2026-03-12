export type EventType = "meetup" | "workshop" | "webinar" | "live";

export type Event = {
  slug: string;
  title: string;
  excerpt: string;
  type: EventType;
  city: string;
  locationLabel: string;
  startDate: string;
  endDate?: string;
  coverNote?: string;
  registrationUrl: string;
  agenda: Array<{ time: string; title: string; description: string }>;
  takeaways: string[];
};

export const events: Event[] = [
  {
    slug: "lounge-salarii-evaluari-2026-04",
    title: "LOUNGE Live — Salarii, evaluări și negociere în QA",
    excerpt:
      "Discuție deschisă pe canalul vocal: cum negociezi o mărire, cum te pregătești pentru evaluare și ce salarii sunt reale în QA România.",
    type: "live",
    city: "Online",
    locationLabel: "Canal vocal LOUNGE (Discord)",
    startDate: "2026-04-16T19:00:00+03:00",
    endDate: "2026-04-16T20:30:00+03:00",
    coverNote: "Intră pe Discord și join LOUNGE. Fără înregistrare necesară.",
    registrationUrl: "https://discord.gg/JHRa9eUqp5",
    agenda: [
      {
        time: "19:00",
        title: "Context & scurt intro",
        description: "Ce date avem din piață, cum comparăm corect salariile.",
      },
      {
        time: "19:15",
        title: "Evaluări și feedback",
        description: "Cum te pregătești, ce să documentezi, cum ceri mărire cu argumente.",
      },
      {
        time: "19:50",
        title: "Q&A deschis",
        description: "Situații reale din comunitate — anonimizate și discutate împreună.",
      },
    ],
    takeaways: [
      "cum compari ofertele corect (nu doar salariul brut)",
      "cum documentezi impactul muncii tale pentru evaluare",
      "ce să spui (și ce să nu spui) la negociere",
    ],
  },
  {
    slug: "lounge-intrebari-interviu-qa-2026-04",
    title: "LOUNGE Live — Cele mai frecvente întrebări de la interviuri QA",
    excerpt:
      "Pregătire practică: dezbatem întrebările clasice și mai puțin clasice de la interviuri, cu răspunsuri reale din experiența comunității.",
    type: "live",
    city: "Online",
    locationLabel: "Canal vocal LOUNGE (Discord)",
    startDate: "2026-04-02T19:00:00+03:00",
    endDate: "2026-04-02T20:30:00+03:00",
    coverNote: "Intră pe Discord și join LOUNGE. Sesiune informală, fără prezentări.",
    registrationUrl: "https://discord.gg/JHRa9eUqp5",
    agenda: [
      {
        time: "19:00",
        title: "Întrebări tehnice frecvente",
        description: "Bug lifecycle, test types, diferența manual/automation, API basics.",
      },
      {
        time: "19:30",
        title: "Întrebări comportamentale",
        description: "Cum răspunzi la STAR, situații dificile, colaborare cu developerii.",
      },
      {
        time: "20:00",
        title: "Mock Q&A",
        description: "Membrii pun întrebări, ceilalți răspund — feedback imediat.",
      },
    ],
    takeaways: [
      "răspunsuri structurate și credibile la întrebările tehnice clasice",
      "cum prezinți experiența de manual testing dacă vrei să treci pe automation",
      "ce caută recruitorii vs. ce caută tech leads",
    ],
  },
  {
    slug: "lounge-colegi-dificili-situatii-job-2026-03",
    title: "LOUNGE Live — Colegi dificili, concedieri și situații reale la job",
    excerpt:
      "Dezbatem situații reale: colegi toxici, evaluări nedrepte, concedieri și cum navighezi politica de birou ca QA.",
    type: "live",
    city: "Online",
    locationLabel: "Canal vocal LOUNGE (Discord)",
    startDate: "2026-03-19T19:00:00+02:00",
    endDate: "2026-03-19T20:30:00+02:00",
    coverNote: "Eveniment încheiat. Discuția continuă pe #general.",
    registrationUrl: "https://discord.gg/JHRa9eUqp5",
    agenda: [
      {
        time: "19:00",
        title: "Situații din comunitate",
        description: "Membrii prezintă (anonim) situații dificile din proiecte reale.",
      },
      {
        time: "19:30",
        title: "Strategii și perspective",
        description: "Ce poți face, ce nu poți face, cum te protejezi profesional.",
      },
      {
        time: "20:10",
        title: "Resurse & next steps",
        description: "Cărți, abordări și unde ceri ajutor în afara echipei.",
      },
    ],
    takeaways: [
      "cum identifici un mediu toxic din faza de interviu",
      "ce să faci când ești prins între deadline și calitate",
      "cum documentezi situațiile dificile ca să te protejezi",
    ],
  },
];

export function getAllEvents() {
  return [...events].sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug) ?? null;
}

export function getEventStatus(event: Event) {
  const now = Date.now();
  const end = event.endDate ?? event.startDate;
  return new Date(end).getTime() >= now ? ("upcoming" as const) : ("past" as const);
}
