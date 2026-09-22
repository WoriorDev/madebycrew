export const CREW_SYSTEM_PROMPT = `Jesteś asystentem MadeByCrew.pl — polskiego, dwuosobowego crewu od tworzenia stron internetowych.

O firmie:
- Nazwa: MadeByCrew.pl
- Kim jesteśmy: dwóch ziomków (design & produkt + kod & wdrożenie), nie duża agencja
- Co robimy: landingi i wizytówki, sklepy i aplikacje webowe, redesign/modernizacja, opieka po starcie
- Proces: Brief → Projekt → Kod → Start
- Styl: nowoczesny dark design, limonkowy akcent (#D7FF32), bez korpo-bełkotu
- Kontakt: kontakt@madebycrew.pl (formularz na stronie w sekcji Kontakt)

Zasady odpowiedzi:
- Odpowiadaj po polsku, krótko i konkretnie (2–5 zdań, chyba że użytkownik prosi o szczegóły)
- Bądź przyjazny, bezpośredni, lekko „crewowy”, ale profesjonalny
- Nie wymyślaj cen, terminów ani technologii, których nie znamy — jeśli nie wiesz, zaproś do kontaktu: kontakt@madebycrew.pl lub sekcja #kontakt
- Jeśli pytanie nie dotyczy stron/www/biznesu MadeByCrew, grzecznie sprowadź rozmowę do oferty lub kontaktu
- Zachęcaj do briefu: cel, deadline, budżet orientacyjny`;

type FaqEntry = {
  keys: string[];
  answer: string;
};

const FAQ: FaqEntry[] = [
  {
    keys: ["cześć", "czesc", "hej", "siema", "hello", "witaj", "dzień dobry", "dzien dobry"],
    answer:
      "Hej! Tu asystent MadeByCrew.pl. Pytaj o strony, landingi, redesign albo jak wygląda współpraca — chętnie pomogę.",
  },
  {
    keys: ["cena", "cennik", "koszt", "ile kosztuje", "budżet", "wycena"],
    answer:
      "Wycenę robimy pod konkretny brief — zależy od zakresu, liczby podstron i funkcji. Napisz na kontakt@madebycrew.pl albo przez formularz (#kontakt): cel, deadline i budżet orientacyjny, a wrócimy z propozycją.",
  },
  {
    keys: ["usług", "oferta", "co robicie", "stron", "landing", "sklep", "aplikacj"],
    answer:
      "Robimy landingi i wizytówki, sklepy oraz aplikacje webowe, redesign starych stron i opiekę po starcie. Pełny zakres od briefu do wdrożenia — bez zbędnych warstw.",
  },
  {
    keys: ["proces", "jak wygląda", "współprac", "wspolprac", "etap", "krok"],
    answer:
      "Proces jest prosty: Brief → Projekt → Kod → Start. Najpierw ustalamy cel i zakres, potem kierunek wizualny, potem czysty kod i wdrożenie.",
  },
  {
    keys: ["kim jesteście", "crew", "zespół", "zespol", "ile osób", "ziom"],
    answer:
      "Jesteśmy dwuosobowym crewem: design & produkt oraz kod & wdrożenie. Mały team, pełna odpowiedzialność od A do Z — bez korpo-Slacka.",
  },
  {
    keys: ["kontakt", "email", "mail", "napisz", "umów", "umow", "spotkani"],
    answer:
      "Napisz na kontakt@madebycrew.pl albo skorzystaj z formularza w sekcji Kontakt na stronie. Zwykle odpisujemy tego samego dnia roboczego.",
  },
  {
    keys: ["czas", "termin", "ile trwa", "deadline", "jak długo", "jak dlugo"],
    answer:
      "Czas zależy od zakresu. Prosty landing często idzie szybciej niż sklep czy aplikacja. Po briefie podajemy realny timeline — bez zgadywania.",
  },
  {
    keys: ["technolog", "next", "react", "hosting", "seo", "mobile"],
    answer:
      "Budujemy nowoczesne, szybkie strony mobile-first z naciskiem na czytelność i utrzymanie. Szczegóły stacku dobieramy do projektu — napisz, co budujemy, a dopasujemy podejście.",
  },
];

export function fallbackAnswer(userText: string): string {
  const normalized = userText.toLowerCase().trim();

  for (const entry of FAQ) {
    if (entry.keys.some((key) => normalized.includes(key))) {
      return entry.answer;
    }
  }

  return "Dzięki za pytanie! Najpewniej najlepiej ogarniemy to na briefie. Napisz krótko, czego potrzebujesz (cel, deadline, budżet) na kontakt@madebycrew.pl albo przez formularz w sekcji Kontakt — Crew Ci odpisze.";
}

export function hasAiCredentials(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.AI_GATEWAY_BASE_URL,
  );
}
