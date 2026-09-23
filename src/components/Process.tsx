"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Brief",
    text: "Cel, odbiorca, deadline i budżet. Układamy zakres zanim ruszy design albo kod.",
    hint: "Rozmowa, nie formularz na 40 pól",
  },
  {
    n: "02",
    title: "Kierunek",
    text: "Mood, struktura i copy. Widzisz kierunek wizualny zanim napiszemy pierwszą linijkę.",
    hint: "Zatwierdzasz zanim budujemy",
  },
  {
    n: "03",
    title: "Build",
    text: "Motion, performance i mobile-first. Czysty front, bez zbędnych warstw i korpo-processu.",
    hint: "Jeden team, pełny ownership",
  },
  {
    n: "04",
    title: "Launch",
    text: "Live, poprawki i handover. Potem zostajemy na opiekę albo oddajemy projekt czysto.",
    hint: "Start to nie koniec",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const intro = section.querySelector<HTMLElement>("[data-proc-intro]");
    const stage = section.querySelector<HTMLElement>("[data-proc-stage]");
    const panels = gsap.utils.toArray<HTMLElement>("[data-proc-panel]");
    const dots = gsap.utils.toArray<HTMLElement>("[data-proc-dot]");
    const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
    const glow = section.querySelector<HTMLElement>("[data-proc-glow]");
    const runway = section.querySelector<HTMLElement>("[data-proc-runway]");

    if (!runway || !intro || !stage) return;

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 1, y: 0 });
      gsap.set(stage, { opacity: 0 });
      gsap.set(panels, { opacity: 0, y: 20 });
      gsap.set(dots, { opacity: 0.28, scale: 0.85 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      if (glow) gsap.set(glow, { opacity: 0.1 });

      let active = -2;

      const showStep = (index: number) => {
        if (index === active) return;
        active = index;

        panels.forEach((panel, i) => {
          const on = i === index;
          gsap.to(panel, {
            opacity: on ? 1 : 0,
            y: on ? 0 : i < index ? -14 : 14,
            duration: 0.32,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        dots.forEach((dot, i) => {
          gsap.to(dot, {
            opacity: i === index ? 1 : 0.28,
            scale: i === index ? 1 : 0.85,
            duration: 0.28,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        if (fill) {
          gsap.to(fill, {
            scaleY: (index + 1) / steps.length,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      // Bez GSAP pin: sticky + wysoki runway (działa z Lenisem)
      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const introEnd = 0.16;
          const outroStart = 0.92;

          if (p < introEnd) {
            const t = p / introEnd;
            gsap.set(intro, { opacity: 1 - t, y: -28 * t });
            gsap.set(stage, { opacity: Math.max(0, (t - 0.4) / 0.6) });
            if (glow) gsap.set(glow, { opacity: 0.1 + t * 0.35 });

            if (t < 0.55) {
              if (active !== -1) {
                active = -1;
                gsap.set(panels, { opacity: 0, y: 20 });
                gsap.set(dots, { opacity: 0.28, scale: 0.85 });
                if (fill) gsap.set(fill, { scaleY: 0 });
              }
            } else {
              showStep(0);
            }
            return;
          }

          gsap.set(intro, { opacity: 0, y: -28 });
          gsap.set(stage, { opacity: 1 });
          if (glow) gsap.set(glow, { opacity: 0.45 });

          if (p >= outroStart) {
            showStep(steps.length - 1);
            return;
          }

          const t = (p - introEnd) / (outroStart - introEnd);
          const index = Math.min(
            steps.length - 1,
            Math.max(0, Math.floor(t * steps.length)),
          );
          showStep(index);
        },
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section id="proces" ref={sectionRef} className="relative z-10">
      {/* Runway = wysokość scrolla; sticky trzyma kadr w viewportcie */}
      <div
        data-proc-runway
        className="relative"
        style={{ height: `${steps.length * 100 + 70}vh` }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div
            data-proc-glow
            className="pointer-events-none absolute top-1/2 left-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.14),transparent_64%)] blur-3xl"
          />

          <div
            data-proc-intro
            className="section-pad absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
          >
            <p className="eyebrow mb-4">Proces</p>
            <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] text-off-white">
              Od briefu
              <span className="mt-1 block text-lime">do live.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
              Cztery etapy. Zero zgadywania. Scrolluj, a przeskoczysz całą drogę.
            </p>
          </div>

          <div
            data-proc-stage
            className="section-pad absolute inset-0 z-10 flex items-center opacity-0"
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
              <div
                className="relative mx-auto flex h-[min(48vh,20rem)] w-10 shrink-0 items-stretch justify-center lg:mx-0"
                aria-hidden
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
                <div
                  data-proc-fill
                  className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-lime"
                />
                <div className="relative z-10 flex h-full flex-col justify-between py-0.5">
                  {steps.map((step) => (
                    <span
                      key={step.n}
                      data-proc-dot
                      className="relative flex size-3 items-center justify-center"
                    >
                      <span className="absolute size-3 rounded-full border border-lime/45 bg-graphite" />
                      <span className="relative size-1.5 rounded-full bg-lime" />
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[18rem] w-full md:min-h-[22rem]">
                {steps.map((step) => (
                  <article
                    key={step.n}
                    data-proc-panel
                    className="absolute inset-0 flex flex-col justify-center opacity-0"
                  >
                    <p className="display text-[clamp(4.5rem,14vw,9rem)] leading-none tracking-[-0.04em] text-lime/90">
                      {step.n}
                    </p>
                    <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2 md:mt-6">
                      <h3 className="display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] text-off-white">
                        {step.title}
                      </h3>
                      <p className="pb-1 text-[11px] tracking-[0.18em] text-lime/70 uppercase">
                        {step.hint}
                      </p>
                    </div>
                    <p className="mt-5 max-w-xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/55 md:mt-6">
                      {step.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
