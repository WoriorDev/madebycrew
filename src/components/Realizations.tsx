"use client";

import { Reveal } from "./fx/Reveal";
import { GlowCard } from "./fx/GlowCard";

/**
 * Sekcja realizacji — bez wymyślonych case studies.
 * Brakujące zasoby: screeny, nazwy projektów, linki live, krótkie opisy.
 */
export function Realizations() {
  return (
    <section
      id="realizacje"
      className="relative border-t border-white/6 bg-graphite"
    >
      <div className="section-pad mx-auto max-w-6xl py-20 md:py-28">
        <Reveal className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
            Realizacje
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
            Duże podglądy.
            <span className="block text-off-white/45">Gotowe na Wasze case’y.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-off-white/60 md:text-lg">
            Struktura portfolio jest podpięta (#realizacje). Nie dodaję fikcyjnych
            klientów — tu wstawimy prawdziwe screeny i opisy, jak tylko je
            dostaniemy.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2].map((slot) => (
            <Reveal key={slot} delay={slot * 0.08}>
              <GlowCard className="min-h-[18rem] overflow-hidden p-0 md:min-h-[22rem]">
                <div className="relative flex h-full min-h-[18rem] flex-col justify-between bg-gradient-to-br from-graphite-light via-graphite to-graphite p-6 md:min-h-[22rem] md:p-8">
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-8 rounded-2xl border border-dashed border-white/15" />
                    <div className="absolute inset-x-16 top-1/3 h-px bg-white/10" />
                    <div className="absolute inset-y-16 left-1/3 w-px bg-white/10" />
                  </div>
                  <p className="relative z-10 text-xs font-semibold tracking-[0.18em] text-lime uppercase">
                    Slot 0{slot}
                  </p>
                  <div className="relative z-10">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-off-white">
                      Brak materiału
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-off-white/55">
                      Potrzebne: tytuł, 1–2 zdania, screen desktop + mobile, opcjonalnie
                      URL live.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
