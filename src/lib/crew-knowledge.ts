export const CREW_SYSTEM_PROMPT = `Jesteś CrewBotem — asystentem MadeByCrew.pl.

## Kim jesteś
Przyjazny, konkretny, lekko „crewowy” (bez korpo-bełkotu). Mówisz jak człowiek z teamu, nie jak call-center.
Odpowiadasz ZAWSZE po polsku.

## Firma
- Nazwa: MadeByCrew.pl
- Team: dwóch ziomków — design & produkt + kod & wdrożenie (nie duża agencja)
- Styl: nowoczesny dark + limonkowy akcent (#D7FF32), mocny first viewport, motion, mobile-first
- Kontakt: kontakt@madebycrew.pl · formularz na stronie w #kontakt
- Odpowiedź: zwykle tego samego dnia roboczego

## Oferta
1. Landingi i wizytówki — first viewport, sekcje, copy, motion, CTA
2. Aplikacje i sklepy — flow, panele, katalogi, utrzymanie
3. Redesign — stara strona → szybka, czytelna, mobile-first (+ SEO w pakiecie)
4. Opieka po live — poprawki, nowe sekcje, rozwój

## Proces
Brief → Kierunek (mood/struktura/copy) → Build (kod/motion/perf) → Launch (live + handover)

## Zasady odpowiedzi (twarde)
- Krótko i konkretnie: 2–6 zdań albo krótkie bullet points. Nie wall of text.
- Nie wymyślaj: cen, dokładnych terminów, stacku „na sztywno”, fake klientów, case’ów których nie ma.
- Przy wycenie / terminie: wyjaśnij, że zależy od briefu (cel, zakres, deadline, budżet orientacyjny) i zaproś do kontaktu.
- Jeśli pytanie poza WWW / biznesem MadeByCrew — grzecznie sprowadź do oferty lub kontaktu.
- Kończ CTA gdy to ma sens: „Napisz na kontakt@madebycrew.pl” albo „Wrzucaj brief w #kontakt”.
- Możesz używać lekkiego markdown: **pogrubienie**, listy z "- ", linki mailto.
- Nie udawaj, że jesteś człowiekiem z crewu — jesteś CrewBotem, ale mówisz w ich tonie.`;

export type FaqEntry = {
  id: string;
  keys: string[];
  answer: string;
  followUps?: string[];
  weight?: number;
};

export const FAQ: FaqEntry[] = [
  {
    id: "greeting",
    keys: [
      "cześć",
      "czesc",
      "hej",
      "siema",
      "elo",
      "hello",
      "hi",
      "witaj",
      "dzień dobry",
      "dzien dobry",
      "yo",
    ],
    answer:
      "Hej! Tu **CrewBot** MadeByCrew.pl. Mogę szybko ogarnąć ofertę, proces, timing i kontakt.\n\nCo Cię interesuje?",
    followUps: ["Co oferujecie?", "Jak wygląda współpraca?", "Ile kosztuje strona?"],
    weight: 1.1,
  },
  {
    id: "pricing",
    keys: [
      "cena",
      "cennik",
      "koszt",
      "ile kosztuje",
      "ile to kosztuje",
      "budżet",
      "budzet",
      "wycena",
      "ceny",
      "stawka",
      "drogo",
      "tanio",
      "pricing",
      "quote",
    ],
    answer:
      "Nie mamy sztywnego cennika „z półki” — wycena leci pod **konkretny brief** (zakres, podstrony, funkcje, motion, deadline).\n\nRzuć cel + budżet orientacyjny na **kontakt@madebycrew.pl** albo przez formularz w #kontakt — wrócimy z propozycją, bez owijania.",
    followUps: [
      "Jak wygląda współpraca?",
      "Ile trwa landing?",
      "Co napisać w briefie?",
    ],
    weight: 1.35,
  },
  {
    id: "services",
    keys: [
      "usług",
      "uslug",
      "oferta",
      "co robicie",
      "co robisz",
      "stron",
      "landing",
      "sklep",
      "aplikacj",
      "wizytówk",
      "wizytowk",
      "e-commerce",
      "ecommerce",
      "www",
      "website",
      "web",
    ],
    answer:
      "Robimy:\n- **Landingi / wizytówki** — first viewport, który sprzedaje\n- **Aplikacje i sklepy** — flow, panele, katalogi\n- **Redesign** — stara strona → szybka i mobile-first\n- **Opiekę po live** — poprawki i rozwój\n\nOd briefu do wdrożenia, bez zbędnych warstw.",
    followUps: ["Jak wygląda współpraca?", "Ile kosztuje strona?", "Robicie redesign?"],
    weight: 1.2,
  },
  {
    id: "redesign",
    keys: ["redesign", "odśwież", "odswiez", "moderniz", "stara strona", "przebudow"],
    answer:
      "**Redesign** to nasz chleb powszedni: bierzemy starą stronę i robimy szybką, czytelną, mobile-first wersję — z SEO w pakiecie.\n\nJak masz URL starej strony, wrzuć go w mailu — od razu łatwiej ocenić zakres.",
    followUps: ["Ile kosztuje strona?", "Jak wygląda współpraca?", "Jak się skontaktować?"],
    weight: 1.25,
  },
  {
    id: "process",
    keys: [
      "proces",
      "jak wygląda",
      "jak wyglada",
      "współprac",
      "wspolprac",
      "etap",
      "krok",
      "workflow",
      "jak działacie",
      "jak dzialacie",
      "brief",
    ],
    answer:
      "Proces jest prosty:\n1. **Brief** — cel, odbiorca, deadline, budżet\n2. **Kierunek** — mood, struktura, copy (widzisz przed kodem)\n3. **Build** — motion, performance, mobile-first\n4. **Launch** — live, poprawki, handover\n\nMały team = szybkie decyzje, bez korpo-Slacka.",
    followUps: ["Co napisać w briefie?", "Ile trwa landing?", "Jak się skontaktować?"],
    weight: 1.25,
  },
  {
    id: "brief",
    keys: ["brief", "co napisać", "co napisac", "co wysłać", "co wyslac", "jak zacząć", "jak zaczac"],
    answer:
      "W briefie wystarczy:\n- **cel** (co ma zrobić strona)\n- **dla kogo**\n- **deadline**\n- **budżet orientacyjny**\n- linki / inspiracje (opcjonalnie)\n\nWyślij to na **kontakt@madebycrew.pl** albo przez formularz w #kontakt.",
    followUps: ["Ile kosztuje strona?", "Ile trwa landing?", "Co oferujecie?"],
    weight: 1.3,
  },
  {
    id: "crew",
    keys: [
      "kim jesteście",
      "kim jestescie",
      "crew",
      "zespół",
      "zespol",
      "ile osób",
      "ile osob",
      "ziom",
      "agencj",
      "freelancer",
    ],
    answer:
      "Jesteśmy **dwuosobowym crewem**: design & produkt + kod & wdrożenie.\n\nMały team, pełny ownership od A do Z — bez korpo-warstw i bez „prześlemy to do grafika za 2 tygodnie”.",
    followUps: ["Co oferujecie?", "Jak wygląda współpraca?", "Jak się skontaktować?"],
    weight: 1.15,
  },
  {
    id: "contact",
    keys: [
      "kontakt",
      "email",
      "mail",
      "napisz",
      "umów",
      "umow",
      "spotkani",
      "telefon",
      "zadzwoń",
      "zadzwon",
      "odpisz",
    ],
    answer:
      "Pisz na **kontakt@madebycrew.pl** albo odpal formularz w sekcji **#kontakt** na stronie.\n\nZwykle odpisujemy **tego samego dnia roboczego**.",
    followUps: ["Co napisać w briefie?", "Ile kosztuje strona?", "Co oferujecie?"],
    weight: 1.3,
  },
  {
    id: "timeline",
    keys: [
      "czas",
      "termin",
      "ile trwa",
      "deadline",
      "jak długo",
      "jak dlugo",
      "szybko",
      "asap",
      "timeline",
      "kiedy",
    ],
    answer:
      "Timing zależy od zakresu. **Prosty landing** zwykle idzie wyraźnie szybciej niż sklep czy aplikacja.\n\nPo briefie podajemy **realny timeline** — bez zgadywania z kapelusza. Masz twardy deadline? Napisz od razu.",
    followUps: ["Ile kosztuje strona?", "Co napisać w briefie?", "Jak wygląda współpraca?"],
    weight: 1.25,
  },
  {
    id: "tech",
    keys: [
      "technolog",
      "next",
      "react",
      "hosting",
      "seo",
      "mobile",
      "stack",
      "vercel",
      "wordpress",
      "cms",
      "animacj",
      "motion",
      "gsap",
      "wydajn",
    ],
    answer:
      "Budujemy nowoczesne, szybkie strony **mobile-first** — nacisk na czytelność, motion i utrzymanie.\n\nStack dobieramy do projektu (nie wciskamy jednego młotka do wszystkiego). Napisz, co budujemy — dopasujemy podejście.",
    followUps: ["Robicie redesign?", "Ile kosztuje strona?", "Jak wygląda współpraca?"],
    weight: 1.15,
  },
  {
    id: "portfolio",
    keys: [
      "portfolio",
      "realizacj",
      "case",
      "przykład",
      "przyklad",
      "projekty",
      "klienci",
      "referenc",
    ],
    answer:
      "Na stronie masz sekcję **#realizacje** — aktualnie zbieramy pełne case’y ze screenami.\n\nNie doklejamy fake klientów. Jak chcesz zobaczyć direction / podobne stylówki, napisz na **kontakt@madebycrew.pl** — pokażemy, co pasuje do Twojego briefu.",
    followUps: ["Co oferujecie?", "Jak wygląda współpraca?", "Jak się skontaktować?"],
    weight: 1.2,
  },
  {
    id: "care",
    keys: ["opieka", "utrzymani", "wsparcie", "support", "po starcie", "po live", "aktualiz"],
    answer:
      "Po starcie nie znikamy. **Opieka** = poprawki, nowe sekcje, rozwój produktu.\n\nMożemy zostać na dłużej albo zrobić czysty handover — jak wolisz.",
    followUps: ["Jak wygląda współpraca?", "Ile kosztuje strona?", "Jak się skontaktować?"],
    weight: 1.15,
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreEntry(query: string, entry: FaqEntry): number {
  const q = normalize(query);
  if (!q) return 0;

  let score = 0;
  for (const key of entry.keys) {
    const k = normalize(key);
    if (!k) continue;
    if (q === k) score += 4;
    else if (q.includes(k)) score += 2.4;
    else if (k.length > 4 && q.split(" ").some((w) => w.startsWith(k.slice(0, 4))))
      score += 0.6;
  }

  return score * (entry.weight ?? 1);
}

export type LocalBotReply = {
  answer: string;
  followUps: string[];
  matchedId: string | null;
};

export function localBotReply(userText: string): LocalBotReply {
  const ranked = FAQ.map((entry) => ({
    entry,
    score: scoreEntry(userText, entry),
  }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0 || ranked[0].score < 1.2) {
    return {
      matchedId: null,
      answer:
        "Dzięki za pytanie — najpewniej ogarniemy to najlepiej na briefie.\n\nNapisz krótko: **cel**, **deadline**, **budżet orientacyjny** na **kontakt@madebycrew.pl** albo przez formularz w #kontakt. Crew odpisze.",
      followUps: [
        "Co oferujecie?",
        "Jak wygląda współpraca?",
        "Co napisać w briefie?",
        "Jak się skontaktować?",
      ],
    };
  }

  const top = ranked[0].entry;
  // Merge a second strong match if complementary (e.g. price + timeline)
  let answer = top.answer;
  if (
    ranked[1] &&
    ranked[1].score >= 2 &&
    ranked[1].entry.id !== top.id &&
    ranked[1].score / ranked[0].score > 0.55
  ) {
    answer = `${top.answer}\n\n---\n\n${ranked[1].entry.answer}`;
  }

  const followUps =
    top.followUps ??
    ["Co oferujecie?", "Jak wygląda współpraca?", "Jak się skontaktować?"];

  return { answer, followUps, matchedId: top.id };
}

/** @deprecated use localBotReply — kept for route compatibility */
export function fallbackAnswer(userText: string): string {
  return localBotReply(userText).answer;
}

export function hasAiCredentials(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.AI_GATEWAY_BASE_URL,
  );
}

export const DEFAULT_SUGGESTIONS = [
  "Co oferujecie?",
  "Jak wygląda współpraca?",
  "Ile kosztuje strona?",
  "Ile trwa landing?",
  "Co napisać w briefie?",
  "Jak się skontaktować?",
];
