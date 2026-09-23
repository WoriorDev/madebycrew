"use client";

import { motion, useReducedMotion } from "motion/react";
import { BrandBanner } from "./Brand";
import { MagneticButton } from "./fx/MagneticButton";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative z-10 min-h-[100svh]">
      <div className="section-pad mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end pb-24 pt-32 md:justify-center md:pb-28 md:pt-36">
        <div className="max-w-5xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow">Creative web studio · PL</span>
            <span className="hidden h-px w-10 bg-lime/50 sm:block" />
            <span className="text-[11px] tracking-[0.18em] text-white/40 uppercase">
              Design · Code · Ship
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <BrandBanner
              className="h-[clamp(3.25rem,8.5vw,5.25rem)] w-auto max-w-[min(100%,32rem)]"
              priority
            />
          </motion.div>

          <h1 className="display overflow-hidden text-[clamp(3.25rem,12vw,8rem)] text-off-white">
            <motion.span
              className="block"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Strony,
            </motion.span>
            <motion.span
              className="block text-lime"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.22, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              które czuć.
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
          >
            Dwuosobowy crew. Landingi, sklepy i aplikacje z mocnym first
            viewportem, ruchem i realnym efektem biznesowym.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton
              href="#kontakt"
              className="rounded-full bg-lime px-8 py-4 text-sm font-bold text-graphite shadow-[0_0_60px_rgba(215,255,50,0.32)] md:text-base"
            >
              Odpalmy projekt
            </MagneticButton>
            <MagneticButton
              href="#realizacje"
              strength={16}
              className="rounded-full border border-white/18 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-md hover:border-lime/55 hover:text-lime md:text-base"
            >
              Realizacje
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-16 flex items-end justify-between gap-6 md:mt-20"
        >
          <p className="max-w-xs text-[11px] leading-relaxed tracking-[0.14em] text-white/35 uppercase">
            Scroll — w tle buduje się prawdziwa strona: nav, hero, karty, mobile
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] text-lime/70 uppercase">
              Scroll
            </span>
            <motion.span
              className="h-10 w-px origin-top bg-lime"
              animate={reduce ? undefined : { scaleY: [0.35, 1, 0.35], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
