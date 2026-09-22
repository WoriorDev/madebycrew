export function Crew() {
  return (
    <section id="crew" className="border-t border-white/6 bg-graphite">
      <div className="section-pad mx-auto max-w-6xl py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
              Crew
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
              Dwóch ziomków.
              <span className="block text-lime">Jeden standard.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-off-white/65 md:text-lg">
              Nie jesteśmy agencją z dwudziestoma kontami na Slacku. Jesteśmy
              małym teamem, który bierze odpowiedzialność za projekt od A do Z —
              design, front, wdrożenie i komunikację.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-off-white/65 md:text-lg">
              Pracujemy blisko klienta, mówimy wprost i dostarczamy rzeczy,
              które da się utrzymać.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                role: "Design & produkt",
                focus: "Kierunek wizualny, UX, struktura oferty",
              },
              {
                role: "Kod & wdrożenie",
                focus: "Front-end, wydajność, hosting, start",
              },
            ].map((person) => (
              <div
                key={person.role}
                className="border-l-2 border-lime bg-graphite-light/70 px-5 py-6"
              >
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-off-white">
                  {person.role}
                </p>
                <p className="mt-2 text-sm text-off-white/60">{person.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
