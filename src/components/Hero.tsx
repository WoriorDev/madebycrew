"use client";

import { motion, useReducedMotion } from "motion/react";
import { MagneticButton } from "./fx/MagneticButton";

const steps = ["Pomysł", "Projekt", "Gotowa strona"];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col justify-start overflow-x-clip"
    >
      <div className="section-pad relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pt-28 pb-14 text-center sm:pt-32 md:pt-[min(18vh,7.5rem)] md:pb-20">
        <h1 className="display max-w-4xl text-[clamp(2.15rem,1.15rem+4.2vw,5.5rem)] text-off-white">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Nie znikaj
          </motion.span>
          <motion.span
            className="block text-lime"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            wśród innych.
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
        >
          Tworzymy strony i sklepy internetowe dla firm, które mają coś do
          pokazania. Od pierwszego pomysłu po ostatni detal.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            href="#kontakt"
            className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-graphite shadow-[0_0_28px_rgba(215,255,50,0.2)]"
          >
            Zróbmy Twoją stronę
          </MagneticButton>
          <MagneticButton
            href="#projekty"
            strength={14}
            className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:border-lime/50 hover:text-lime"
          >
            Zobacz nasze projekty
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm tracking-[0.04em] text-white/45"
        >
          {steps.map((step, i) => (
            <span key={step} className="inline-flex items-center gap-3">
              {i > 0 && (
                <span className="text-lime/50" aria-hidden>
                  →
                </span>
              )}
              <span className={i === steps.length - 1 ? "text-off-white" : ""}>
                {step}
              </span>
            </span>
          ))}
        </motion.div>

        <motion.a
          href="#uslugi"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="group mt-24 mb-2 flex flex-col items-center gap-3 md:mt-28"
          aria-label="Przewiń dalej"
        >
          <span className="text-[10px] font-medium tracking-[0.28em] text-white/30 uppercase transition group-hover:text-white/55">
            Scroll
          </span>
          <span className="relative flex h-11 w-6 items-start justify-center rounded-full border border-white/18 bg-white/[0.03] pt-1.5 backdrop-blur-sm transition group-hover:border-lime/40">
            <motion.span
              className="size-1 rounded-full bg-lime"
              animate={
                reduce
                  ? undefined
                  : { y: [0, 14, 0], opacity: [1, 0.35, 1] }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
