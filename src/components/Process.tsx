"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Brief",
    text: "Cel, odbiorca, deadline, budżet. Ustawiamy priorytety zanim ruszy design.",
  },
  {
    title: "Kierunek",
    text: "Mood, struktura, copy. Widzisz kierunek zanim zacznie się kod.",
  },
  {
    title: "Build",
    text: "Motion, Lenis, czysty front. Mobile-first i szybkie ładowanie.",
  },
  {
    title: "Launch",
    text: "Wdrożenie, poprawki, handover. Potem rozwój albo samodzielnie.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const total = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -Math.max(total, 0),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(total, window.innerHeight)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proces"
      className="relative overflow-hidden border-t border-white/6 bg-graphite-light"
    >
      <div className="noise opacity-[0.03]" />
      <div className="section-pad relative mx-auto max-w-6xl py-16 md:py-20">
        <Reveal className="mb-10 max-w-2xl lg:mb-0">
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
            Proces
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
            Scroll story od briefu do live
          </h2>
          <p className="mt-4 text-sm text-off-white/55 md:text-base lg:hidden">
            Przesuń w dół — kolejne etapy wjeżdżają w bok.
          </p>
        </Reveal>
      </div>

      <div className="lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-5 px-[clamp(1.25rem,4vw,3.5rem)] pb-20 lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:px-[12vw] lg:pb-0"
        >
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative min-h-[16rem] w-full shrink-0 rounded-3xl border border-white/10 bg-graphite/70 p-8 backdrop-blur-md lg:h-[22rem] lg:w-[28rem]"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-lime uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold text-off-white">
                {step.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-off-white/65">
                {step.text}
              </p>
              <div className="absolute right-8 bottom-8 h-px w-16 bg-lime" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
