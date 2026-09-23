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

    const ctx = gsap.context(() => {
      const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-proc-dot]");

      if (fill) {
        gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      }
      gsap.set(dots, { opacity: 0.3, scale: 0.85 });

      const intro = section.querySelector<HTMLElement>("[data-proc-intro]");
      if (intro) {
        gsap.fromTo(
          intro.querySelectorAll("[data-proc-intro-el]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top 80%",
              end: "top 35%",
              scrub: 0.8,
            },
          },
        );
      }

      const stepEls = gsap.utils.toArray<HTMLElement>("[data-proc-step]");

      stepEls.forEach((step, i) => {
        const bits = step.querySelectorAll("[data-proc-bit]");
        gsap.set(bits, { opacity: 0, y: 28 });

        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
          onUpdate: (self) => {
            if (self.isActive) activate(i);
          },
        });

        gsap.to(bits, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            end: "top 35%",
            scrub: 0.85,
          },
        });
      });

      function activate(index: number) {
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            opacity: i === index ? 1 : 0.3,
            scale: i === index ? 1 : 0.85,
            duration: 0.25,
            overwrite: "auto",
          });
        });
        if (fill) {
          gsap.to(fill, {
            scaleY: (index + 1) / steps.length,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      }
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section id="proces" ref={sectionRef} className="relative z-10">
      {/* Intro: jeden ekran, wyśrodkowany */}
      <div
        data-proc-intro
        className="section-pad flex h-[100svh] flex-col items-center justify-center text-center"
      >
        <p data-proc-intro-el className="eyebrow mb-4">
          Proces
        </p>
        <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] text-off-white">
          <span data-proc-intro-el className="block">
            Od briefu
          </span>
          <span data-proc-intro-el className="mt-1 block text-lime">
            do live.
          </span>
        </h2>
        <p
          data-proc-intro-el
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base"
        >
          Cztery etapy. Zero zgadywania. Scrolluj dalej.
        </p>
      </div>

      {/* Kroki: każdy pełny ekran = efekt „przeskoku” bez pin/spacerów */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-[max(1rem,calc((100%-80rem)/2+1.5rem))] z-20 hidden w-10 lg:block"
        >
          <div className="sticky top-0 flex h-[100svh] items-center justify-center">
            <div className="relative flex h-[min(48vh,20rem)] w-10 items-stretch justify-center">
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
          </div>
        </div>

        {steps.map((step) => (
          <article
            key={step.n}
            data-proc-step
            className="section-pad flex h-[100svh] items-center"
          >
            <div className="mx-auto w-full max-w-7xl lg:pl-20">
              <p
                data-proc-bit
                className="display text-[clamp(4.5rem,14vw,9rem)] leading-none tracking-[-0.04em] text-lime/90"
              >
                {step.n}
              </p>
              <div
                data-proc-bit
                className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2 md:mt-6"
              >
                <h3 className="display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] text-off-white">
                  {step.title}
                </h3>
                <p className="pb-1 text-[11px] tracking-[0.18em] text-lime/70 uppercase">
                  {step.hint}
                </p>
              </div>
              <p
                data-proc-bit
                className="mt-5 max-w-xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/55 md:mt-6"
              >
                {step.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
