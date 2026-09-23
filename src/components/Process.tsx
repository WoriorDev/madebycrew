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
        { y: 80, opacity: 0.3, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stack,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        },
      );
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proces" className="relative z-10 py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-3xl md:mb-16">
          <p className="eyebrow mb-4">Proces</p>
          <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)] text-off-white">
            Od briefu
            <span className="block text-lime">do live.</span>
          </h2>
        </Reveal>

        <div ref={stackRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.n}
              data-step
              className="glass-card relative min-h-[15rem] overflow-hidden p-6 md:min-h-[18rem] md:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(215,255,50,0.12),transparent_50%)]" />
              <div className="relative flex h-full flex-col">
                <p className="display text-sm text-lime">{step.n}</p>
                <h3 className="display mt-8 text-3xl text-off-white md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {step.text}
                </p>
                <div className="mt-auto pt-8">
                  <div className="h-1 w-14 rounded-full bg-lime" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
