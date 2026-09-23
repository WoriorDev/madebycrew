"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { BrandBanner } from "./Brand";
import { MagneticButton } from "./fx/MagneticButton";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative z-10 min-h-[100svh] overflow-hidden">
      {/* free-floating orb — no frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[12%] right-[8%] size-[min(60vw,480px)] rounded-full md:top-[18%] md:right-[12%] md:left-auto"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(215,255,50,0.75), rgba(215,255,50,0.12) 45%, transparent 70%)",
          filter: "blur(2px)",
        }}
        animate={
          reduce
            ? undefined
            : { y: [0, -18, 0], scale: [1, 1.04, 1], rotate: [0, 8, 0] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[30%] right-[22%] size-[min(28vw,200px)] rounded-full bg-white/10 blur-2xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-pad relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 pt-28 pb-16 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pt-32 md:pb-20">
        <div className="relative z-10 max-w-xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow mb-5"
          >
            Creative web studio · PL
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6"
          >
            <BrandBanner
              className="h-[clamp(2.5rem,6vw,3.75rem)] w-auto max-w-[min(100%,28rem)]"
              priority
            />
          </motion.div>

          <h1 className="display text-[clamp(2.8rem,8vw,5.5rem)] text-off-white">
            Strony,
            <span className="block text-lime">które czuć.</span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            Landingi, sklepy i aplikacje z mocnym first viewportem, glass UI i
            ruchem — budujemy dla biznesu, nie dla behansu.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton
              href="#kontakt"
              className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-graphite shadow-[0_0_40px_rgba(215,255,50,0.35)]"
            >
              Start projektu
            </MagneticButton>
            <MagneticButton
              href="#uslugi"
              strength={14}
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:border-lime/50 hover:text-lime"
            >
              Zobacz ofertę
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative mx-auto flex h-[min(62vh,520px)] w-full max-w-md items-center justify-center md:max-w-none">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="glass-card absolute top-[12%] left-0 z-20 hidden w-44 p-3 sm:block md:left-[-4%] lg:left-[2%]"
          >
            <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
              Live metric
            </p>
            <p className="display mt-2 text-3xl text-lime">+48%</p>
            <p className="mt-1 text-xs text-white/50">konwersja po redesignie*</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-lime"
                initial={{ width: "0%" }}
                animate={{ width: "78%" }}
                transition={{ delay: 0.8, duration: 1.1 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="glass-card absolute top-[6%] right-0 z-20 hidden w-40 p-3 sm:block md:right-[-2%] lg:right-[4%]"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/brand/mark.png"
                alt=""
                width={22}
                height={22}
                className="size-5 object-contain mix-blend-screen"
              />
              <span className="text-xs font-semibold text-white/80">Crew ping</span>
            </div>
            <p className="mt-2 text-xs leading-snug text-white/55">
              Brief przyjęty. Kierunek jutro.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 h-[min(56vh,460px)] w-[min(58%,240px)] overflow-hidden rounded-[2rem] border border-white/20 bg-[#0c0e12]/90 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="mx-auto mt-2.5 h-1.5 w-16 rounded-full bg-white/25" />
            <div className="space-y-3 p-4 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
                    Dashboard
                  </p>
                  <p className="display text-lg text-off-white">Project pulse</p>
                </div>
                <span className="flex size-8 items-center justify-center rounded-full bg-lime/20 text-xs font-bold text-lime">
                  89%
                </span>
              </div>

              <div className="relative mx-auto size-28">
                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#D7FF32"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={251}
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 251 * 0.11 }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="display text-2xl text-off-white">89</span>
                  <span className="text-[9px] text-white/40">ready</span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { l: "Landing", v: "92%" },
                  { l: "Motion", v: "86%" },
                  { l: "Mobile", v: "95%" },
                ].map((row) => (
                  <div
                    key={row.l}
                    className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2"
                  >
                    <span className="text-xs text-white/55">{row.l}</span>
                    <span className="text-xs font-bold text-lime">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="glass-card absolute bottom-[4%] left-1/2 z-20 w-[min(90%,280px)] -translate-x-1/2 p-3 sm:left-auto sm:right-0 sm:translate-x-0 md:right-[-4%] lg:right-[0%]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
                  Stack
                </p>
                <p className="mt-1 text-sm font-semibold text-off-white">
                  Design → Code → Live
                </p>
              </div>
              <span className="rounded-full bg-lime px-3 py-1 text-[10px] font-bold text-graphite">
                ON
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
