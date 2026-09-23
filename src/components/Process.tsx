"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", title: "Brief", text: "Cel, odbiorca, deadline, budżet. Bez zgadywania." },
  { n: "02", title: "Kierunek", text: "Mood, struktura, copy. Widzisz to przed kodem." },
  { n: "03", title: "Build", text: "Motion, performance, mobile-first. Czysty front." },
  { n: "04", title: "Launch", text: "Live, poprawki, handover. Potem rozwój razem." },
];

export function Process() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = stack.querySelectorAll<HTMLElement>("[data-step]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: stack,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.7,
          },
        },
      );
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proces" className="relative z-10 py-24 md:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="eyebrow mb-4">Proces</p>
          <h2 className="display text-[clamp(2.5rem,7vw,4.8rem)] text-off-white">
            Od briefu
            <span className="block text-lime">do live.</span>
          </h2>
        </Reveal>

        <div ref={stackRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.n}
              data-step
              className="wire-card relative min-h-[14rem] p-6 md:min-h-[16rem]"
            >
              <p className="display text-sm text-lime">{step.n}</p>
              <h3 className="display mt-8 text-3xl text-off-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{step.text}</p>
              <div className="absolute right-6 bottom-6 h-px w-10 bg-lime/70" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
