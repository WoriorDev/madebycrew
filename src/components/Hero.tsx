"use client";

import { motion, useReducedMotion } from "motion/react";
import { MagneticButton } from "./fx/MagneticButton";

const chips = [
  { t: "Design", d: "Kierunek i UX" },
  { t: "Build", d: "Kod + motion" },
  { t: "Launch", d: "Live i opieka" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <div className="section-pad relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-28 pb-16 text-center md:pt-32 md:pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow mb-6"
        >
          Creative web studio · PL
        </motion.p>

        <h1 className="display max-w-4xl text-[clamp(3rem,10vw,6.5rem)] text-off-white">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Strony,
          </motion.span>
          <motion.span
            className="block text-lime"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            które czuć.
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-7 max-w-lg text-base leading-relaxed text-white/55 md:text-lg"
        >
          Landingi, sklepy i aplikacje z mocnym first viewportem i ruchem —
          budowane przez dwuosobowy crew.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            href="#kontakt"
            className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-graphite shadow-[0_0_40px_rgba(215,255,50,0.3)]"
          >
            Start projektu
          </MagneticButton>
          <MagneticButton
            href="#uslugi"
            strength={14}
            className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:border-lime/50 hover:text-lime"
          >
            Zobacz ofertę
          </MagneticButton>
        </motion.div>

        {/* wireframe chips — bottom of hero like TDA cards */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-16 grid w-full max-w-3xl gap-3 sm:grid-cols-3"
        >
          {chips.map((chip) => (
            <div
              key={chip.t}
              className="wire-card px-4 py-4 text-left"
            >
              <p className="display text-lg text-off-white">{chip.t}</p>
              <p className="mt-1 text-xs text-white/45">{chip.d}</p>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#uslugi"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-col items-center gap-2 text-[10px] tracking-[0.22em] text-white/35 uppercase"
        >
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-lime to-transparent" />
        </motion.a>
      </div>
    </section>
  );
}
