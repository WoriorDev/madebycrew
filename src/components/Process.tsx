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
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intro = section.querySelector<HTMLElement>("[data-proc-intro]");
    const stage = section.querySelector<HTMLElement>("[data-proc-stage]");
    const progress = section.querySelector<HTMLElement>("[data-proc-progress]");
    const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
    const panels = gsap.utils.toArray<HTMLElement>("[data-proc-panel]");
    const dots = gsap.utils.toArray<HTMLElement>("[data-proc-dot]");
    const glow = section.querySelector<HTMLElement>("[data-proc-glow]");
    const staticList = section.querySelector<HTMLElement>("[data-proc-static]");

    if (reduce) {
      gsap.set([intro, stage, progress, glow].filter(Boolean), { clearProps: "all" });
      gsap.set(intro, { display: "none" });
      gsap.set(stage, { display: "none" });
      gsap.set(staticList, { display: "block" });
      return;
    }

    gsap.set(staticList, { display: "none" });

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 1, y: 0 });
      gsap.set(stage, { opacity: 0, y: 40 });
      gsap.set(progress, { opacity: 0 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(panels, { opacity: 0, y: 32 });
      gsap.set(dots, { opacity: 0.25, scale: 0.85 });
      if (glow) gsap.set(glow, { opacity: 0.12 });

      const introPx = () => window.innerHeight * 0.6;
      const stepPx = () => window.innerHeight * 1.15;
      const outroPx = () => window.innerHeight * 0.4;
      const totalPx = () => introPx() + steps.length * stepPx() + outroPx();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalPx()}`,
          pin: pin,
          pinType: "transform",
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const iDur = introPx() / totalPx();
      const sDur = stepPx() / totalPx();
      const oDur = outroPx() / totalPx();

      tl.to(intro, { opacity: 0, y: -32, duration: iDur * 0.5 }, 0);
      tl.to(stage, { opacity: 1, y: 0, duration: iDur * 0.55 }, iDur * 0.3);
      tl.to(progress, { opacity: 1, duration: iDur * 0.4 }, iDur * 0.35);
      if (glow) {
        tl.to(glow, { opacity: 0.5, duration: iDur * 0.5 }, iDur * 0.3);
      }

      let t = iDur;

      panels.forEach((panel, idx) => {
        const enter = sDur * 0.22;
        const hold = sDur * 0.56;
        const leave = sDur * 0.22;

        tl.to(panel, { opacity: 1, y: 0, duration: enter }, t);
        tl.to(dots[idx], { opacity: 1, scale: 1, duration: enter }, t);
        tl.to(fill, { scaleY: (idx + 1) / steps.length, duration: sDur }, t);
        if (glow) {
          tl.to(
            glow,
            {
              opacity: 0.32 + (idx / Math.max(1, steps.length - 1)) * 0.38,
              duration: sDur,
            },
            t,
          );
        }

        tl.to({}, { duration: hold }, t + enter);

        if (idx < panels.length - 1) {
          tl.to(panel, { opacity: 0, y: -24, duration: leave }, t + enter + hold);
          tl.to(
            dots[idx],
            { opacity: 0.3, scale: 0.9, duration: leave },
            t + enter + hold,
          );
        }

        t += sDur;
      });

      tl.to({}, { duration: oDur }, t);
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section id="proces" ref={sectionRef} className="relative z-10">
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      >
        <div
          data-proc-glow
          className="pointer-events-none absolute top-1/2 left-[42%] h-[58vmax] w-[58vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.15),transparent_64%)] blur-3xl"
        />

        <div
          data-proc-intro
          className="section-pad absolute inset-x-0 top-1/2 z-20 mx-auto max-w-7xl -translate-y-1/2 text-center will-change-transform"
        >
          <p className="eyebrow mb-4">Proces</p>
          <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] text-off-white">
            Od briefu
            <span className="mt-1 block text-lime">do live.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
            Cztery etapy. Zero zgadywania. Scrolluj, a przejdziesz całą drogę.
          </p>
        </div>

        <div
          data-proc-stage
          className="section-pad relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center py-20 opacity-0 will-change-transform md:py-24"
        >
          <div className="grid w-full items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
            <div
              data-proc-progress
              className="relative mx-auto flex h-[min(52vh,22rem)] w-10 shrink-0 items-stretch justify-center opacity-0 lg:mx-0"
            >
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
              <div
                data-proc-fill
                className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-lime will-change-transform"
              />
              <div className="relative z-10 flex flex-col justify-between py-0.5">
                {steps.map((step) => (
                  <span
                    key={step.n}
                    data-proc-dot
                    className="relative flex size-3 items-center justify-center"
                    aria-hidden
                  >
                    <span className="absolute size-3 rounded-full border border-lime/45 bg-graphite" />
                    <span className="relative size-1.5 rounded-full bg-lime" />
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[19rem] w-full md:min-h-[24rem]">
              {steps.map((step) => (
                <article
                  key={step.n}
                  data-proc-panel
                  className="absolute inset-0 flex flex-col justify-center opacity-0 will-change-transform"
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

        {/* Static fallback (reduced motion / no JS animation) */}
        <div data-proc-static className="section-pad mx-auto hidden w-full max-w-7xl py-24 md:py-32">
          <p className="eyebrow mb-4">Proces</p>
          <h2 className="display mb-12 text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.95] text-off-white md:mb-16">
            Od briefu
            <span className="mt-1 block text-lime">do live.</span>
          </h2>
          <ol className="flex flex-col gap-10 border-l border-lime/30 pl-6 md:gap-14 md:pl-8">
            {steps.map((step) => (
              <li key={step.n} className="relative">
                <span className="absolute top-2 -left-[1.7rem] size-2.5 rounded-full bg-lime md:-left-[2.15rem]" />
                <p className="display text-sm text-lime">{step.n}</p>
                <h3 className="display mt-2 text-3xl text-off-white md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-1 text-[11px] tracking-[0.16em] text-lime/65 uppercase">
                  {step.hint}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="pointer-events-none absolute right-6 bottom-6 hidden text-[10px] tracking-[0.2em] text-white/25 uppercase md:right-10 md:bottom-8 md:block">
          Scroll · proces
        </p>
      </div>
    </section>
  );
}
