"use client";

import { Reveal } from "./fx/Reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Landingi i wizytówki",
    description:
      "Sekcje, które tłumaczą ofertę i prowadzą do CTA. Szybko, czytelnie, z mocnym first viewport.",
    className: "md:col-span-2",
    icon: "01",
  },
  {
    title: "Sklepy i aplikacje",
    description:
      "Katalogi, panele, flow zakupowe — budowane pod realne użycie.",
    className: "md:col-span-1",
    icon: "02",
  },
  {
    title: "Redesign",
    description: "Odświeżamy stare strony: wygląd, speed, SEO, mobile.",
    className: "md:col-span-1",
    icon: "03",
  },
  {
    title: "Opieka po starcie",
    description:
      "Iteracje, nowe sekcje, monitoring. Zostajemy w projekcie, kiedy trzeba.",
    className: "md:col-span-2",
    icon: "04",
  },
];

export function Services() {
  return (
    <section id="uslugi" className="relative border-t border-white/6 bg-graphite">
      <div className="section-pad mx-auto max-w-6xl py-20 md:py-28">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
              Usługi
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
              Bento oferty.
              <span className="block text-off-white/45">Zero zbędnych warstw.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-off-white/55 md:text-base">
            Wybierz zakres — my składamy produkt, który da się utrzymać i skalować.
          </p>
        </Reveal>

        <BentoGrid className="max-w-none md:auto-rows-[14rem]">
          {services.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className={cn(item.className, "h-full")}>
              <BentoGridItem
                className="h-full border-white/10 bg-graphite-light/70 shadow-none hover:shadow-[0_0_40px_rgba(215,255,50,0.08)] dark:bg-graphite-light/70"
                title={
                  <span className="font-[family-name:var(--font-display)] text-xl text-off-white md:text-2xl">
                    {item.title}
                  </span>
                }
                description={
                  <span className="text-sm leading-relaxed text-off-white/60 md:text-base">
                    {item.description}
                  </span>
                }
                icon={
                  <span className="font-[family-name:var(--font-display)] text-sm font-bold text-lime">
                    {item.icon}
                  </span>
                }
                header={
                  <div className="flex h-16 w-full rounded-lg bg-gradient-to-br from-lime/15 via-transparent to-white/5" />
                }
              />
            </Reveal>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
