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
    const intro = section.querySelector<HTMLElement>("[data-proc-intro]");
    const stage = section.querySelector<HTMLElement>("[data-proc-stage]");
    const rail = section.querySelector<HTMLElement>("[data-proc-rail]");
    const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
    const glow = section.querySelector<HTMLElement>("[data-proc-glow]");
    const counter = section.querySelector<HTMLElement>("[data-proc-counter]");
    const dots = gsap.utils.toArray<HTMLElement>("[data-proc-dot]");
    const panels = gsap.utils.toArray<HTMLElement>("[data-proc-panel]");
    const marks = gsap.utils.toArray<HTMLElement>("[data-proc-mark]");
    const labels = gsap.utils.toArray<HTMLElement>("[data-proc-label]");

    if (reduce) {
      section.style.height = "auto";
      if (intro) {
        gsap.set(intro, {
          opacity: 1,
          position: "relative",
          inset: "auto",
          paddingBlock: "5rem 2rem",
        });
      }
      if (stage) {
        gsap.set(stage, {
          opacity: 1,
          position: "relative",
          inset: "auto",
          paddingBottom: "5rem",
        });
      }
      if (rail) gsap.set(rail, { opacity: 1 });
      if (fill) gsap.set(fill, { scaleY: 1, transformOrigin: "top center" });
      if (glow) gsap.set(glow, { opacity: 0.35 });
      if (counter) gsap.set(counter, { opacity: 0 });
      gsap.set(dots, { opacity: 1, scale: 1 });
      gsap.set(marks, { opacity: 0 });
      gsap.set(labels, { opacity: 0 });
      const stack = section.querySelector<HTMLElement>("[data-proc-stack]");
      if (stack) {
        gsap.set(stack, {
          display: "flex",
          flexDirection: "column",
          gap: "4.5rem",
          minHeight: 0,
        });
      }
      panels.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0, position: "relative", inset: "auto" });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 1, scale: 1, y: 0 });
      gsap.set(stage, { opacity: 0 });
      gsap.set(rail, { opacity: 0, x: -12 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(glow, { opacity: 0, scale: 0.85 });
      gsap.set(counter, { opacity: 0 });
      gsap.set(dots, { opacity: 0.22, scale: 0.75 });
      gsap.set(panels, { opacity: 0, y: 36 });
      gsap.set(marks, { opacity: 0, scale: 0.92, x: 40 });
      gsap.set(labels, { opacity: 0, y: -6 });

      // No GSAP pin — sticky panel + scrub only.
      // pinType:transform was leaving a multi-viewport void on desktop
      // after Crew/Services pins (wrong translateY ~5×vh).
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      tl.to({}, { duration: 0.35 });
      tl.to(intro, { opacity: 0, scale: 0.96, y: -14, duration: 0.35 });

      tl.to(stage, { opacity: 1, duration: 0.12 }, "-=0.12");
      tl.to(rail, { opacity: 1, x: 0, duration: 0.32 }, "<");
      tl.to(glow, { opacity: 0.55, scale: 1, duration: 0.4 }, "<");
      tl.to(counter, { opacity: 1, duration: 0.2 }, "<0.04");
      tl.to(labels[0], { opacity: 1, y: 0, duration: 0.28 }, "<");
      tl.to(panels[0], { opacity: 1, y: 0, duration: 0.4 }, "<");
      tl.to(marks[0], { opacity: 0.12, scale: 1, x: 0, duration: 0.4 }, "<");
      tl.to(dots[0], { opacity: 1, scale: 1, duration: 0.25 }, "<");
      tl.to(fill, { scaleY: 1 / steps.length, duration: 0.32 }, "<");

      tl.to({}, { duration: 0.55 });

      for (let i = 1; i < steps.length; i++) {
        const progress = (i + 1) / steps.length;

        tl.to(panels[i - 1], { opacity: 0, y: -24, duration: 0.34 }, ">");
        tl.to(
          marks[i - 1],
          { opacity: 0, x: -24, scale: 0.96, duration: 0.3 },
          "<",
        );
        tl.to(labels[i - 1], { opacity: 0, y: 6, duration: 0.24 }, "<");
        tl.to(panels[i], { opacity: 1, y: 0, duration: 0.38 }, "<0.05");
        tl.to(marks[i], { opacity: 0.12, scale: 1, x: 0, duration: 0.38 }, "<");
        tl.to(labels[i], { opacity: 1, y: 0, duration: 0.28 }, "<");
        tl.to(fill, { scaleY: progress, duration: 0.38 }, "<");
        tl.to(
          glow,
          {
            opacity: 0.4 + i * 0.08,
            x: i % 2 === 0 ? 40 : -20,
            y: i * 12,
            duration: 0.38,
          },
          "<",
        );

        dots.forEach((dot, di) => {
          tl.to(
            dot,
            {
              opacity: di === i ? 1 : di < i ? 0.5 : 0.22,
              scale: di === i ? 1 : di < i ? 0.9 : 0.75,
              duration: 0.3,
            },
            "<",
          );
        });

        tl.to({}, { duration: 0.6 });
      }

      tl.to({}, { duration: 0.35 });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proces"
      ref={sectionRef}
      className="relative z-10 h-[420vh] bg-graphite md:h-[400vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          data-proc-glow
          aria-hidden
          className="pointer-events-none absolute top-[18%] right-[-8%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.16),transparent_62%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-20%] left-[-15%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.06),transparent_70%)] blur-3xl"
        />

        <div
          data-proc-intro
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-start px-6 pt-28 text-center md:pt-32"
        >
          <p className="eyebrow mb-5">Proces</p>
          <h2 className="display text-[clamp(2.4rem,1.3rem+4.5vw,5.5rem)] leading-[1.02] text-off-white">
            <span className="block">Od briefu</span>
            <span className="mt-1 block text-lime">do live.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
            Cztery etapy. Zero zgadywania.
          </p>
        </div>

        <div data-proc-stage className="absolute inset-0 z-20 flex flex-col">
          <div className="section-pad relative z-20 flex items-start justify-between pt-24 md:pt-28">
            <p className="eyebrow">Proces</p>
            <div
              data-proc-counter
              className="relative h-4 min-w-[10rem] text-right md:min-w-[12rem]"
            >
              {steps.map((step) => (
                <p
                  key={`label-${step.n}`}
                  data-proc-label
                  className="absolute inset-0 font-[family-name:var(--font-display)] text-[11px] font-bold tracking-[0.22em] text-white/40 uppercase md:text-xs"
                >
                  {step.n}
                  <span className="mx-2 text-lime/50">—</span>
                  {step.title}
                </p>
              ))}
            </div>
          </div>

          <div className="section-pad relative flex flex-1 items-center pb-16 md:pb-20">
            <div className="relative mx-auto flex w-full max-w-7xl items-center gap-6 md:gap-10 lg:gap-14">
              <div
                data-proc-rail
                aria-hidden
                className="relative h-[min(46vh,19rem)] w-9 shrink-0 md:h-[min(52vh,22rem)] md:w-11"
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.1]" />
                <div
                  data-proc-fill
                  className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-lime shadow-[0_0_12px_rgba(215,255,50,0.55)]"
                />
                <div className="relative z-10 flex h-full flex-col justify-between py-0.5">
                  {steps.map((step, i) => (
                    <span
                      key={step.n}
                      data-proc-dot
                      className="relative flex size-3.5 items-center justify-center md:size-4"
                    >
                      <span className="absolute inset-0 rounded-full border border-lime/40 bg-graphite shadow-[0_0_0_4px_rgba(5,6,7,0.85)]" />
                      <span className="relative size-1.5 rounded-full bg-lime md:size-2" />
                      <span className="absolute -right-7 hidden font-[family-name:var(--font-display)] text-[9px] font-bold tracking-[0.14em] text-white/25 md:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[18rem] flex-1 overflow-hidden md:min-h-[20rem]">
                {steps.map((step) => (
                  <span
                    key={`mark-${step.n}`}
                    data-proc-mark
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -bottom-8 select-none font-[family-name:var(--font-display)] text-[clamp(7rem,22vw,14rem)] leading-none font-extrabold tracking-[-0.06em] text-white/[0.04] md:-right-4 md:-bottom-12"
                  >
                    {step.n}
                  </span>
                ))}

                <div
                  data-proc-stack
                  className="relative z-10 min-h-[18rem] md:min-h-[20rem]"
                >
                  {steps.map((step) => (
                    <article
                      key={step.n}
                      data-proc-panel
                      className="absolute inset-0 flex flex-col justify-center will-change-transform"
                    >
                      <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-lime/75 uppercase md:mb-5">
                        {step.hint}
                      </p>
                      <h3 className="display text-[clamp(2.4rem,1.4rem+3.5vw,4.5rem)] leading-[1.02] text-off-white">
                        {step.title}
                      </h3>
                      <div className="mt-5 h-px w-16 origin-left bg-gradient-to-r from-lime/70 to-transparent md:mt-6" />
                      <p className="mt-5 max-w-lg text-[clamp(1rem,0.9rem+0.8vw,1.2rem)] leading-relaxed text-white/55 md:mt-6">
                        {step.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
