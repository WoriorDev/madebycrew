"use client";

import { motion } from "motion/react";
import { Reveal } from "./fx/Reveal";

const services = [
  {
    n: "01",
    title: "Landingi",
    text: "First viewport, który sprzedaje. Sekcje, copy, motion, CTA.",
    span: "md:col-span-2",
  },
  {
    n: "02",
    title: "Aplikacje & sklepy",
    text: "Flow, panele, katalogi. Budujemy pod użycie i utrzymanie.",
    span: "md:col-span-1",
  },
  {
    n: "03",
    title: "Redesign",
    text: "Stara strona → szybka, czytelna, mobile-first. SEO w pakiecie.",
    span: "md:col-span-1",
  },
  {
    n: "04",
    title: "Opieka",
    text: "Po live zostajemy: poprawki, nowe sekcje, rozwój produktu.",
    span: "md:col-span-2",
  },
];

export function Services() {
  return (
    <section id="uslugi" className="relative z-10 py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-3xl md:mb-16">
          <p className="eyebrow mb-4">Usługi</p>
          <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)] text-off-white">
            Co robimy
            <span className="block text-lime">naprawdę dobrze.</span>
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06} className={item.span}>
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="glass-card group relative h-full overflow-hidden p-6 md:p-8"
              >
                <div className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-lime/10 blur-3xl transition group-hover:bg-lime/20" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="display text-sm text-lime">{item.n}</span>
                    <span className="h-px w-12 bg-gradient-to-r from-lime/80 to-transparent" />
                  </div>
                  <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] text-off-white transition group-hover:text-lime">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
