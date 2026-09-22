const steps = [
  {
    title: "Brief",
    text: "Cel, odbiorca, konkurencja, deadline. Szybko ustalamy zakres i priorytety.",
  },
  {
    title: "Projekt",
    text: "Kierunek wizualny, struktura i copy. Widzisz kierunek zanim zacznie się kod.",
  },
  {
    title: "Kod",
    text: "Czysta implementacja, mobile-first, wydajność. Bez zbędnych warstw.",
  },
  {
    title: "Start",
    text: "Wdrożenie, poprawki, szkolenie z edycji. Potem możesz iść dalej z nami lub sam.",
  },
];

export function Process() {
  return (
    <section
      id="proces"
      className="relative overflow-hidden border-t border-white/6 bg-graphite-light"
    >
      <div className="noise opacity-[0.03]" />
      <div className="section-pad relative mx-auto max-w-6xl py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
              Proces
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
              Od rozmowy do live
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-off-white/60 md:text-base">
            Prosty flow, jasne etapy, zero zgadywania po drodze.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="mb-5 h-px w-12 bg-lime" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-off-white/40">
                Krok {index + 1}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-off-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-off-white/65">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
