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
      const head = section.querySelectorAll("[data-proc-head]");
      gsap.fromTo(
        head,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: section.querySelector("[data-proc-header]"),
            start: "top 75%",
            end: "top 40%",
            scrub: 0.9,
          },
        },
      );

      const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
      const track = section.querySelector<HTMLElement>("[data-proc-track]");
      if (fill && track) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: track,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.85,
            },
          },
        );
      }

      section.querySelectorAll<HTMLElement>("[data-proc-step]").forEach((step, i) => {
        const num = step.querySelector("[data-proc-num]");
        const body = step.querySelectorAll("[data-proc-body]");
        const dot = section.querySelectorAll("[data-proc-dot]")[i];

        gsap.set([num, body], { opacity: 0, y: 24 });
        if (dot) gsap.set(dot, { scale: 0.75, opacity: 0.35 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 72%",
            end: "top 28%",
            scrub: 0.95,
          },
        });

        tl.to(num, { opacity: 1, y: 0, duration: 0.45, ease: "none" }, 0);
        tl.to(
          body,
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "none" },
          0.12,
        );
        if (dot) {
          tl.to(dot, { scale: 1, opacity: 1, duration: 0.35, ease: "none" }, 0);
        }
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proces"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28"
    >
      <div className="section-pad mx-auto max-w-7xl">
        <div data-proc-header className="mb-14 max-w-3xl md:mb-20">
          <p data-proc-head className="eyebrow mb-4">
            Proces
          </p>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-off-white">
            <span data-proc-head className="block">
              Od briefu
            </span>
            <span data-proc-head className="mt-1 block text-lime">
              do live.
            </span>
          </h2>
          <p
            data-proc-head
            className="mt-5 max-w-md text-sm leading-relaxed text-white/45 md:text-base"
          >
            Cztery etapy. Zero zgadywania. Od rozmowy do startu, z pełnym
            ownershipem po drodze.
          </p>
        </div>

        <div
          data-proc-track
          className="relative grid gap-0 lg:grid-cols-[5rem_1fr]"
        >
          {/* Rail */}
          <div className="relative hidden lg:block" aria-hidden>
            <div className="sticky top-[30vh] flex h-[min(50vh,22rem)] justify-center">
              <div className="relative flex h-full w-10 items-stretch justify-center">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
                <div
                  data-proc-fill
                  className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-lime will-change-transform"
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

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <article
                key={step.n}
                data-proc-step
                className={`relative flex min-h-[70vh] flex-col justify-center border-white/8 py-14 md:min-h-[75vh] md:py-16 ${
                  i < steps.length - 1 ? "border-b" : ""
                }`}
              >
                <p
                  data-proc-num
                  className="display text-[clamp(4rem,12vw,8rem)] leading-none tracking-[-0.04em] text-lime/90"
                >
                  {step.n}
                </p>
                <div
                  data-proc-body
                  className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2 md:mt-5"
                >
                  <h3 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] text-off-white">
                    {step.title}
                  </h3>
                  <p className="pb-1 text-[11px] tracking-[0.18em] text-lime/70 uppercase">
                    {step.hint}
                  </p>
                </div>
                <p
                  data-proc-body
                  className="mt-5 max-w-xl text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-white/55"
                >
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
