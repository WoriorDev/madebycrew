"use client";

import { GlowCard } from "./fx/GlowCard";
import { Reveal } from "./fx/Reveal";
import { Separator } from "@/components/ui/separator";

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
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
            Usługi
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
            Co robimy dobrze
          </h2>
          <p className="mt-4 text-base leading-relaxed text-off-white/65 md:text-lg">
            Pełny zakres od briefu do wdrożenia. Ty mówisz, czego potrzebuje
            biznes — my budujemy to w sieci.
          </p>
        </Reveal>

        <Separator className="my-10 bg-white/8" />

        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <li>
                <GlowCard className="h-full min-h-[11rem]">
                  <span className="mb-3 block font-[family-name:var(--font-display)] text-sm font-bold text-lime">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-off-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-off-white/65 md:text-base">
                    {item.text}
                  </p>
                </GlowCard>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
