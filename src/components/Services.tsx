"use client";

import { motion } from "motion/react";
import { Reveal } from "./fx/Reveal";
import { cn } from "@/lib/utils";

const packages = [
  {
    id: "starter",
    name: "Launch",
    blurb: "Dla startu i szybkiego landinga, który sprzedaje.",
    price: "Brief → wycena",
    priceNote: "zakres pod projekt",
    cta: "Zapytaj o Launch",
    popular: false,
    features: [
      "Landing / wizytówka",
      "Mocny first viewport",
      "Mobile-first + podstawowe SEO",
      "1–2 rundy poprawek",
      "Wdrożenie na produkcję",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "Pełniejsza strona z motion i redesignem pod konwersję.",
    price: "Brief → wycena",
    priceNote: "najczęściej wybierane",
    cta: "Zapytaj o Growth",
    popular: true,
    features: [
      "Wielosekcyjna strona / redesign",
      "Motion + glass UI",
      "Copy & struktura sprzedażowa",
      "SEO + performance",
      "Opieka startowa po live",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    blurb: "Sklepy, aplikacje i większe produkty webowe.",
    price: "Custom",
    priceNote: "pod scope",
    cta: "Napisz o Custom",
    popular: false,
    features: [
      "Aplikacja / sklep / panel",
      "Flow UX i komponenty",
      "Integracje pod brief",
      "Handover albo opieka długoterminowa",
      "Priorytetowy kontakt z crew",
    ],
  },
];

export function Services() {
  return (
    <section id="uslugi" className="relative z-10 overflow-hidden py-24 md:py-32">
      <div className="section-pad relative mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="eyebrow mb-4">Oferta</p>
          <h2 className="display text-[clamp(2.5rem,7vw,4.8rem)] text-off-white">
            Pakiety pod
            <span className="block text-lime">Twój zakres.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
            Bez sztywnego cennika — wybierasz kierunek, my wyceniamy po briefie.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className={cn(
                  "wire-card relative flex h-full flex-col overflow-hidden p-6 md:p-7",
                  pkg.popular && "border-lime/40 shadow-[0_0_50px_rgba(215,255,50,0.1)]",
                )}
              >
                {pkg.popular && (
                  <span className="absolute top-5 right-5 rounded-full bg-lime px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-graphite uppercase">
                    Popular
                  </span>
                )}

                <h3 className="display text-2xl text-off-white md:text-3xl">
                  {pkg.name}
                </h3>
                <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-white/45">
                  {pkg.blurb}
                </p>

                <div className="mt-6">
                  <p className="display text-[1.5rem] text-off-white md:text-2xl">
                    {pkg.price}
                  </p>
                  <p className="mt-1 text-xs text-white/35">{pkg.priceNote}</p>
                </div>

                <a
                  href="#kontakt"
                  className={cn(
                    "mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-bold transition",
                    pkg.popular
                      ? "bg-lime text-graphite hover:brightness-110"
                      : "border border-white/12 bg-white/[0.03] text-off-white hover:border-lime/40 hover:text-lime",
                  )}
                >
                  {pkg.cta}
                </a>

                <ul className="mt-7 flex flex-col gap-2.5 border-t border-white/8 pt-6">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-white/60"
                    >
                      <span
                        className={cn(
                          "mt-1 size-1.5 shrink-0 rounded-full",
                          pkg.popular ? "bg-lime" : "bg-white/35",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
