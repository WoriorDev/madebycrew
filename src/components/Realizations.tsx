"use client";

import { motion } from "motion/react";
import { Reveal } from "./fx/Reveal";

export function Realizations() {
  return (
    <section id="realizacje" className="relative z-10 py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Realizacje</p>
            <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)] text-off-white">
              Duże kadry.
              <span className="block text-white/35">Wasze projekty tu.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50 md:pb-1">
            Bez fake case’ów. Jak wrzucisz screeny + nazwy — wstawimy pełne
            podglądy w tych ramach.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {["01", "02"].map((id, i) => (
            <Reveal key={id} delay={i * 0.08}>
              <article className="glass-card group overflow-hidden">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(215,255,50,0.18),transparent_45%),linear-gradient(160deg,rgba(255,255,255,0.04),transparent)]" />
                  <motion.div
                    className="absolute inset-6 rounded-2xl border border-dashed border-white/15 md:inset-8"
                    whileHover={{ borderColor: "rgba(215,255,50,0.35)" }}
                  />
                  <div className="absolute inset-x-10 top-14 space-y-2 opacity-35 md:inset-x-14">
                    <div className="h-2 w-2/3 rounded-full bg-white/40" />
                    <div className="h-2 w-1/2 rounded-full bg-lime/50" />
                    <div className="mt-8 grid grid-cols-3 gap-2">
                      <div className="aspect-video rounded-lg bg-white/10" />
                      <div className="aspect-video rounded-lg bg-white/10" />
                      <div className="aspect-video rounded-lg bg-lime/20" />
                    </div>
                  </div>
                  <span className="absolute right-5 bottom-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] tracking-[0.16em] text-white/50 uppercase backdrop-blur-md">
                    Waiting assets
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-6 md:p-7">
                  <div>
                    <p className="display text-sm text-lime">{id}</p>
                    <h3 className="display mt-1 text-2xl text-off-white md:text-3xl">
                      Slot projektu
                    </h3>
                  </div>
                  <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase">
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
