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
    <section id="uslugi" className="relative z-10 overflow-hidden py-20 md:py-28">
      {/* soft background grid + blooms like the pin */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,248,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(247,248,250,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[30%] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.16),transparent_65%)] blur-3xl"
      />

      <div className="section-pad relative mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="eyebrow mb-4">Oferta</p>
          <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)] text-off-white">
            Pakiety pod
            <span className="block text-lime">Twój zakres.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
            Bez sztywnego cennika z półki — wybierasz kierunek, my wyceniamy po
            briefie. Zero fake’owych gwiazdek i „od 999 zł”.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className={cn(
                  "glass-card relative flex h-full flex-col overflow-hidden p-6 md:p-7",
                  pkg.popular &&
                    "border-lime/35 shadow-[0_0_60px_rgba(215,255,50,0.12)]",
                )}
              >
                {pkg.popular && (
                  <span className="absolute top-5 right-5 rounded-full bg-lime px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-graphite uppercase">
                    Popular
                  </span>
                )}

                <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <PackageIcon id={pkg.id} />
                </div>

                <h3 className="display text-2xl text-off-white md:text-3xl">
                  {pkg.name}
                </h3>
                <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-white/50">
                  {pkg.blurb}
                </p>

                <div className="mt-6">
                  <p className="display text-[1.65rem] text-off-white md:text-3xl">
                    {pkg.price}
                  </p>
                  <p className="mt-1 text-xs text-white/40">{pkg.priceNote}</p>
                </div>

                <a
                  href="#kontakt"
                  className={cn(
                    "mt-6 inline-flex h-12 items-center justify-center rounded-full text-sm font-bold transition",
                    pkg.popular
                      ? "bg-lime text-graphite shadow-[0_0_30px_rgba(215,255,50,0.28)] hover:brightness-110"
                      : "border border-white/12 bg-white/[0.04] text-off-white hover:border-lime/40 hover:text-lime",
                  )}
                >
                  {pkg.cta}
                </a>

                <ul className="mt-7 flex flex-col gap-3 border-t border-white/8 pt-6">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-white/65"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                          pkg.popular ? "bg-lime/20 text-lime" : "bg-white/10 text-white/70",
                        )}
                        aria-hidden
                      >
                        <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                          <path
                            d="M2.5 6.2L4.8 8.5L9.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/40">
            Nie wiesz, który pakiet? Napisz na{" "}
            <a
              href="mailto:kontakt@madebycrew.pl"
              className="text-lime underline decoration-lime/40 underline-offset-2"
            >
              kontakt@madebycrew.pl
            </a>{" "}
            — dobierzemy scope pod cel.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PackageIcon({ id }: { id: string }) {
  if (id === "growth") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 text-lime" fill="none" aria-hidden>
        <path
          d="M4 16l5-5 3 3 7-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7h5v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "custom") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 text-white/80" fill="none" aria-hidden>
        <path
          d="M12 3l2.2 4.5L19 8.2l-3.5 3.4.8 4.9L12 14.2 7.7 16.5l.8-4.9L5 8.2l4.8-.7L12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-white/80" fill="none" aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
