"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedOrb } from "./fx/AnimatedOrb";
import { GridPattern } from "./fx/GridPattern";
import { MagneticButton } from "./fx/MagneticButton";
import { Spotlight } from "./fx/Spotlight";
import { TextReveal } from "./fx/TextReveal";
import { SplineOrb } from "./fx/SplineOrb";
import { Badge } from "@/components/ui/badge";
import { BrandBanner } from "./Brand";
import { motion } from "motion/react";

export function Hero() {
  return (
    <Spotlight className="relative min-h-[100svh] overflow-hidden bg-graphite">
      <section
        id="top"
        className="relative flex min-h-[100svh] items-end pb-16 pt-36 md:items-center md:pb-24 md:pt-40"
      >
        <GridPattern />
        <BackgroundBeams className="opacity-70" />
        <div className="noise" />
        <AnimatedOrb className="right-[-4%] opacity-90" />
        <SplineOrb />

        <div className="section-pad relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="flex flex-col items-start gap-6 md:gap-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="rounded-full border border-lime/35 bg-lime/10 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-lime uppercase">
                Studio · Design · Code
              </Badge>
            </motion.div>

            <div className="animate-mark">
              <BrandBanner
                className="h-[clamp(4.5rem,11vw,7rem)] w-auto max-w-[min(100%,40rem)]"
                priority
              />
            </div>

            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,4.6rem)] font-extrabold leading-[0.98] tracking-tight text-off-white">
              <TextReveal text="Budujemy strony," />
              <span className="mt-1 block text-lime">
                <TextReveal text="które sprzedają." delay={0.28} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="max-w-xl text-base leading-relaxed text-off-white/70 md:text-lg"
            >
              Dwuosobowy crew. Pełny stack od briefu do live. Landingi, sklepy i
              aplikacje z animacją, szybkością i charakterem — bez korpo-bełkotu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="#kontakt"
                className="rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-graphite shadow-[0_0_40px_rgba(215,255,50,0.28)] md:text-base"
              >
                Porozmawiajmy o projekcie
              </MagneticButton>
              <MagneticButton
                href="#uslugi"
                strength={16}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-off-white backdrop-blur-md transition hover:border-lime/50 hover:text-lime md:text-base"
              >
                Zobacz możliwości
              </MagneticButton>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="mt-4 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"
            >
              {[
                { k: "2", v: "osoby w crew" },
                { k: "A→Z", v: "od briefu do live" },
                { k: "PL", v: "szybki kontakt" },
              ].map((item) => (
                <div key={item.v}>
                  <dt className="font-[family-name:var(--font-display)] text-xl font-bold text-lime md:text-2xl">
                    {item.k}
                  </dt>
                  <dd className="mt-1 text-xs text-off-white/50">{item.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="relative hidden min-h-[22rem] lg:block"
          >
            <div className="absolute inset-6 rounded-[2rem] border border-lime/20 bg-gradient-to-br from-lime/10 via-transparent to-white/5" />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-graphite-light/40 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-lime uppercase">
                Stack doświadczenia
              </p>
              <ul className="space-y-3 font-[family-name:var(--font-display)] text-2xl font-bold text-off-white">
                {["Motion UI", "Scroll stories", "3D accents", "Fast ship"].map(
                  (line) => (
                    <li key={line} className="border-b border-white/10 pb-3">
                      {line}
                    </li>
                  ),
                )}
              </ul>
              <p className="text-sm text-off-white/55">
                Narzędzia, które właśnie napędzają tę stronę.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Spotlight>
  );
}
