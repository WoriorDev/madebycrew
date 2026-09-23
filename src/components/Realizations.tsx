"use client";

import Image from "next/image";
import { Reveal } from "./fx/Reveal";

const projects = [
  {
    id: "01",
    title: "Dark studio frame",
    type: "Direction",
    year: "2026",
    stack: ["Next.js", "Motion", "GSAP"],
    src: "/brand/case-01-desktop.png",
    blurb:
      "Kierunek wizualny MadeByCrew — glass UI, lime accent, kosmiczne tło. Tak wygląda nasz standard.",
  },
  {
    id: "02",
    title: "Cinematic wire",
    type: "Concept",
    year: "2026",
    stack: ["3D", "Atmosphere", "UI"],
    src: "/brand/case-02-desktop.png",
    blurb:
      "Cinematic scene z wireframe’ami — depth, światło, motion. Preview stylu pod landingi i brand sites.",
  },
];

export function Realizations() {
  return (
    <section id="projekty" className="relative z-10 py-24 md:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl md:mb-20">
          <p className="eyebrow mb-4">Projekty</p>
          <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)] text-off-white">
            <span className="block whitespace-nowrap">Wybrane kadry.</span>
            <span className="mt-1 block whitespace-nowrap text-lime">
              Nasz standard.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed text-white/45">
            Direction z naszego procesu — wrzucasz brief, dostajesz ten poziom
            już od pierwszego kierunku.
          </p>
        </Reveal>

        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <article className="group">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <div className="relative aspect-[16/10] md:aspect-[21/10]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
                      priority={i === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

                    <p className="display absolute top-5 left-5 text-4xl text-lime/90 md:top-8 md:left-8 md:text-6xl">
                      {item.id}
                    </p>

                    <div className="absolute right-5 bottom-5 left-5 flex flex-wrap items-end justify-between gap-4 md:right-8 md:bottom-8 md:left-8">
                      <div>
                        <p className="text-[11px] tracking-[0.18em] text-white/50 uppercase">
                          {item.type}
                          <span className="mx-2 text-lime/50">·</span>
                          {item.year}
                        </p>
                        <h3 className="display mt-2 text-[clamp(1.6rem,3.5vw,2.75rem)] text-off-white">
                          {item.title}
                        </h3>
                      </div>
                      <ul className="flex flex-wrap gap-x-3 gap-y-1">
                        {item.stack.map((s) => (
                          <li
                            key={s}
                            className="text-[11px] tracking-[0.14em] text-lime/80 uppercase"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 md:mt-6 md:text-[0.95rem]">
                  {item.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm text-white/40">
            Masz brief? Pokażemy direction dopasowany do Ciebie — bez fake
            klientów i bez zgadywania.
          </p>
          <a
            href="#kontakt"
            className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/[0.06] px-6 text-[13px] font-semibold text-off-white transition hover:border-lime/45 hover:text-lime"
          >
            Porozmawiajmy o projekcie
          </a>
        </Reveal>
      </div>
    </section>
  );
}
