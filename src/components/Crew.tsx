"use client";

import { GlowCard } from "./fx/GlowCard";
import { Reveal } from "./fx/Reveal";
import { TiltCard } from "./fx/TiltCard";

const people = [
  {
    role: "Design & produkt",
    focus: "Kierunek wizualny, UX, struktura oferty, storytelling marki.",
    tag: "01",
  },
  {
    role: "Kod & wdrożenie",
    focus: "Front-end, motion, performance, hosting i start na produkcji.",
    tag: "02",
  },
];

export function Crew() {
  return (
    <section id="crew" className="relative border-t border-white/6 bg-graphite">
      <div className="section-pad mx-auto max-w-6xl py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
              Crew
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
              Mały team.
              <span className="block text-lime">Duży ownership.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-off-white/65 md:text-lg">
              Nie jesteśmy agencją z dwudziestoma kontami na Slacku. Jesteśmy
              dwuosobowym crewem, który bierze projekt od A do Z — design, kod,
              komunikację i wdrożenie.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {people.map((person, index) => (
              <Reveal key={person.role} delay={0.1 + index * 0.1}>
                <TiltCard>
                  <GlowCard className="min-h-[15rem] border-lime/15 bg-gradient-to-b from-graphite-light to-graphite">
                    <p className="text-xs font-semibold tracking-[0.18em] text-lime">
                      {person.tag}
                    </p>
                    <h3 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-bold text-off-white">
                      {person.role}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-off-white/60">
                      {person.focus}
                    </p>
                  </GlowCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
