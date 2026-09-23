"use client";

import { BrandBanner } from "./Brand";
import { AnimatedOrb } from "./fx/AnimatedOrb";
import { MagneticButton } from "./fx/MagneticButton";
import { Spotlight } from "./fx/Spotlight";
import { TextReveal } from "./fx/TextReveal";
import { SplineOrb } from "./fx/SplineOrb";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <Spotlight className="relative flex min-h-[100svh] items-end overflow-hidden bg-graphite pb-16 pt-32 md:items-center md:pb-24 md:pt-36">
      <section id="top" className="relative w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(215,255,50,0.1),transparent_45%)]" />
        <div className="noise" />
        <AnimatedOrb />
        <SplineOrb className="opacity-40" />

        <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-start gap-6 md:max-w-3xl md:gap-7">
            <Badge className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-lime uppercase">
              MadeByCrew · Web Studio
            </Badge>

            <div className="animate-mark">
              <BrandBanner
                className="h-[clamp(4.75rem,12vw,7.5rem)] w-auto max-w-[min(100%,44rem)]"
                priority
              />
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.1rem,6vw,3.8rem)] font-extrabold leading-[1.02] tracking-tight text-off-white">
              <TextReveal text="Strony, które" />
              <span className="mt-1 block text-lime">
                <TextReveal text="pracują na biznes." delay={0.25} />
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-off-white/72 md:text-lg">
              Jesteśmy dwuosobowym crewem od web developmentu. Projektujemy i
              kodujemy landingi, wizytówki i aplikacje — bez korpo-bełkotu, z
              naciskiem na efekt.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <MagneticButton
                href="#kontakt"
                className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-graphite shadow-[0_0_32px_rgba(215,255,50,0.25)] md:text-base"
              >
                Porozmawiajmy o projekcie
              </MagneticButton>
              <MagneticButton
                href="#uslugi"
                strength={18}
                className="rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-off-white backdrop-blur-sm transition hover:border-lime/60 hover:text-lime md:text-base"
              >
                Zobacz usługi
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}
