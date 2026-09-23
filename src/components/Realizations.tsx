"use client";

import { motion } from "motion/react";
import { Reveal } from "./fx/Reveal";

/** Portfolio slots — no fake clients until real assets arrive. */
export function Realizations() {
  return (
    <section id="realizacje" className="relative z-10 py-24 md:py-40">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5">Realizacje</p>
            <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)] text-off-white">
              Duże kadry.
              <span className="block text-white/38">Wasze projekty tu.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50 md:pb-2 md:text-base">
            Nie doklejamy fake case’ów. Jak wrzucisz screeny + nazwy — wstawimy
            pełne podglądy desktop/mobile.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {[
            { id: "01", need: "Desktop + mobile screen, tytuł, 2 zdania, URL" },
            { id: "02", need: "Desktop + mobile screen, tytuł, 2 zdania, URL" },
          ].map((slot, i) => (
            <Reveal key={slot.id} delay={i * 0.08}>
              <article className="panel group relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem]">
                <div className="relative aspect-[16/11] overflow-hidden border-b border-white/8 bg-[#0c0f14]">
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(215,255,50,0.16),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.08),transparent_38%)]" />
                  <div className="absolute inset-x-6 top-6 bottom-10 rounded-xl border border-dashed border-white/18 md:inset-x-8 md:top-8 md:bottom-12" />
                  <motion.div
                    className="absolute inset-x-10 top-14 h-2 origin-left rounded-full bg-lime/70 md:inset-x-14"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-x-10 top-20 space-y-2 opacity-40 md:inset-x-14">
                    <div className="h-2 w-3/4 rounded bg-white/30" />
                    <div className="h-2 w-1/2 rounded bg-white/20" />
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <div className="aspect-video rounded-lg bg-white/8" />
                      <div className="aspect-video rounded-lg bg-white/8" />
                      <div className="aspect-video rounded-lg bg-lime/15" />
                    </div>
                  </div>
                  <div className="absolute right-6 bottom-6 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] tracking-[0.18em] text-white/50 uppercase backdrop-blur-md">
                    Waiting assets
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <p className="display text-sm text-lime">{slot.id}</p>
                    <h3 className="display mt-2 text-3xl text-off-white md:text-4xl">
                      Slot projektu
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-white/48">
                      Brakuje: {slot.need}
                    </p>
                  </div>
                  <span className="hidden text-[10px] tracking-[0.2em] text-white/30 uppercase sm:block">
                    Case frame
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
