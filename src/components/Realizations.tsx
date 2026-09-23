"use client";

import { Reveal } from "./fx/Reveal";

export function Realizations() {
  return (
    <section id="realizacje" className="relative z-10 py-24 md:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col gap-5 text-center md:mb-20">
          <p className="eyebrow">Realizacje</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.5rem,7vw,4.8rem)] text-off-white">
            Duże kadry.
            <span className="block text-white/30">Wasze projekty tu.</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-white/45">
            Bez fake case’ów. Screeny + nazwy → pełne podglądy w tych ramach.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {["01", "02"].map((id, i) => (
            <Reveal key={id} delay={i * 0.08}>
              <article className="wire-card group overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(215,255,50,0.12),transparent_50%)]" />
                  <div className="absolute inset-6 rounded-xl border border-dashed border-white/12 md:inset-8" />
                  <div className="absolute inset-x-12 top-16 space-y-2 opacity-30 md:inset-x-16">
                    <div className="h-1.5 w-2/3 rounded-full bg-white/50" />
                    <div className="h-1.5 w-1/2 rounded-full bg-lime/60" />
                  </div>
                  <span className="absolute right-5 bottom-5 rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[10px] tracking-[0.16em] text-white/45 uppercase backdrop-blur-md">
                    Waiting assets
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="display text-sm text-lime">{id}</p>
                    <h3 className="display mt-1 text-2xl text-off-white">
                      Slot projektu
                    </h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
