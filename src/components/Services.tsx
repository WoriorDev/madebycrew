const services = [
  {
    title: "Landingi i wizytówki",
    text: "Szybkie, czytelne strony, które tłumaczą ofertę i prowadzą do kontaktu lub sprzedaży.",
  },
  {
    title: "Sklepy i aplikacje",
    text: "Od prostych katalogów po bardziej złożone panele — zawsze z myślą o użytkowaniu i utrzymaniu.",
  },
  {
    title: "Redesign i modernizacja",
    text: "Odświeżamy stare strony: wygląd, szybkość, SEO i mobile — bez zaczynania wszystkiego od zera.",
  },
  {
    title: "Opieka po starcie",
    text: "Poprawki, nowe sekcje, monitoring i rozwój. Zostajemy w projekcie, kiedy trzeba.",
  },
];

export function Services() {
  return (
    <section id="uslugi" className="relative border-t border-white/6 bg-graphite">
      <div className="section-pad mx-auto max-w-6xl py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
            Usługi
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
            Co robimy dobrze
          </h2>
          <p className="mt-4 text-base leading-relaxed text-off-white/65 md:text-lg">
            Pełny zakres od briefu do wdrożenia. Ty mówisz, czego potrzebuje
            biznes — my budujemy to w sieci.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {services.map((item, index) => (
            <li key={item.title} className="relative">
              <span className="mb-3 block font-[family-name:var(--font-display)] text-sm font-bold text-lime">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-off-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-off-white/65 md:text-base">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
