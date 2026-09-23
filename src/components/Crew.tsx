"use client";

import { Reveal } from "./fx/Reveal";
import { TiltCard } from "./fx/TiltCard";

const people = [
  {
    n: "01",
    role: "Design & produkt",
    focus: "Kierunek wizualny, UX, struktura oferty, storytelling.",
  },
  {
    n: "02",
    role: "Kod & wdrożenie",
    focus: "Front, motion, performance, hosting, start na produkcji.",
  },
];

export function Crew() {
  return (
    <section id="crew" className="relative z-10 py-24 md:py-40">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">Crew</p>
            <h2 className="display text-[clamp(2.8rem,9vw,6rem)] text-off-white">
              Dwóch ziomków.
              <span className="block text-lime">Jeden standard.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/58 md:text-lg">
              Mały team, pełny ownership. Design, kod i komunikacja w jednym
              miejscu — bez korpo-Slacka.
            </p>
            <div className="mt-10 h-px w-24 bg-lime" />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {people.map((p, i) => (
              <Reveal key={p.n} delay={0.08 + i * 0.08}>
                <TiltCard>
                  <div className="panel relative min-h-[17rem] overflow-hidden rounded-[2rem] p-7">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(215,255,50,0.14),transparent_50%)]" />
                    <div className="relative">
                      <p className="display text-sm text-lime">{p.n}</p>
                      <h3 className="display mt-12 text-2xl text-off-white md:text-3xl">
                        {p.role}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">
                        {p.focus}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
