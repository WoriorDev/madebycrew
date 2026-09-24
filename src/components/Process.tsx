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
    hint: "Rozmowa na start",
  },
  {
    n: "02",
    title: "Ustalenie warunków",
    text: "Termin, wycena i zasady współpracy. Wiesz dokładnie, co wchodzi w zakres i jak wygląda dalsza droga.",
    hint: "Jasne zasady, zero niedomówień",
  },
  {
    n: "03",
    title: "Rozpoczęcie prac",
    text: "Kick-off, struktura i kierunek wizualny. Ruszamy z projektem dopiero gdy oboje wiemy, dokąd idziemy.",
    hint: "Start po akceptacji",
  },
  {
    n: "04",
    title: "Realizacja i poprawki",
    text: "Budujemy stronę warstwa po warstwie. Dostajesz wgląd w postęp i wprowadzamy poprawki na bieżąco.",
    hint: "Widzisz, jak rośnie",
  },
  {
    n: "05",
    title: "Poprawki końcowe",
    text: "Dopieszczamy detale: copy, spacing, motion, mobile. Domknięcie przed testami, nie po wdrożeniu.",
    hint: "Ostatnie szlify",
  },
  {
    n: "06",
    title: "Testy i wdrożenie",
    text: "Sprawdzamy urządzenia, szybkość i formularze. Potem publikacja na live bez chaosu.",
    hint: "Bez niespodzianek na produkcji",
  },
  {
    n: "07",
    title: "Gotowe do użytkowania",
    text: "Handover, dostęp i krótkie intro. Strona u Ciebie, z opcją opieki albo czystego oddania projektu.",
    hint: "Twój produkt, Twój rytm",
  },
];

/** Udział scrolla: intro → kroki → lekkie outro */
const INTRO = 0.12;
const OUTRO = 0.06;
const STEPS_SPAN = 1 - INTRO - OUTRO;

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(-2);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const runway = section.querySelector<HTMLElement>("[data-proc-runway]");
    const sticky = section.querySelector<HTMLElement>("[data-proc-sticky]");
    const intro = section.querySelector<HTMLElement>("[data-proc-intro]");
    const stage = section.querySelector<HTMLElement>("[data-proc-stage]");
    const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
    const glow = section.querySelector<HTMLElement>("[data-proc-glow]");
    const counter = section.querySelector<HTMLElement>("[data-proc-counter]");
    const panels = gsap.utils.toArray<HTMLElement>("[data-proc-panel]");
    const dots = gsap.utils.toArray<HTMLElement>("[data-proc-dot]");
    const marks = gsap.utils.toArray<HTMLElement>("[data-proc-mark]");
    const labels = gsap.utils.toArray<HTMLElement>("[data-proc-label]");
    const staticList = section.querySelector<HTMLElement>("[data-proc-static]");

    if (!runway || !sticky || !intro || !stage) return;

    const setRunwayHeight = () => {
      // intro + ~0.9 ekranu na krok + outro
      const vh = window.innerHeight;
      runway.style.height = `${vh * (1.1 + steps.length * 0.9 + 0.35)}px`;
    };

    if (reduce) {
      sticky.style.display = "none";
      runway.style.height = "auto";
      if (staticList) staticList.style.display = "block";
      return;
    }

    if (staticList) staticList.style.display = "none";
    setRunwayHeight();

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 1, y: 0, scale: 1 });
      gsap.set(stage, { opacity: 0 });
      gsap.set(counter, { opacity: 0 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(glow, { opacity: 0.08 });
      gsap.set(panels, { opacity: 0, y: 28 });
      gsap.set(marks, { opacity: 0, x: 24 });
      gsap.set(labels, { opacity: 0, y: 8 });
      gsap.set(dots, { opacity: 0.25, scale: 0.8 });

      const showStep = (index: number) => {
        if (index === activeRef.current) return;
        activeRef.current = index;

        panels.forEach((panel, i) => {
          const on = i === index;
          gsap.to(panel, {
            opacity: on ? 1 : 0,
            y: on ? 0 : i < index ? -20 : 20,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        marks.forEach((mark, i) => {
          gsap.to(mark, {
            opacity: i === index ? 0.07 : 0,
            x: i === index ? 0 : 24,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        labels.forEach((label, i) => {
          gsap.to(label, {
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : 8,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        dots.forEach((dot, i) => {
          gsap.to(dot, {
            opacity: i === index ? 1 : i < index ? 0.55 : 0.25,
            scale: i === index ? 1 : 0.8,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        if (fill) {
          gsap.to(fill, {
            scaleY: (index + 1) / steps.length,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: setRunwayHeight,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < INTRO) {
            const t = p / INTRO;
            gsap.set(intro, {
              opacity: 1 - t,
              y: -32 * t,
              scale: 1 - t * 0.04,
            });
            gsap.set(stage, { opacity: Math.max(0, (t - 0.45) / 0.55) });
            gsap.set(counter, { opacity: Math.max(0, (t - 0.55) / 0.45) });
            gsap.set(glow, { opacity: 0.08 + t * 0.4 });

            if (t < 0.6) {
              if (activeRef.current !== -1) {
                activeRef.current = -1;
                gsap.set(panels, { opacity: 0, y: 28 });
                gsap.set(marks, { opacity: 0, x: 24 });
                gsap.set(labels, { opacity: 0, y: 8 });
                gsap.set(dots, { opacity: 0.25, scale: 0.8 });
                if (fill) gsap.set(fill, { scaleY: 0 });
              }
            } else {
              showStep(0);
            }
            return;
          }

          gsap.set(intro, { opacity: 0, y: -32, scale: 0.96 });
          gsap.set(stage, { opacity: 1 });
          gsap.set(counter, { opacity: 1 });
          gsap.set(glow, { opacity: 0.48 });

          if (p >= 1 - OUTRO) {
            showStep(steps.length - 1);
            return;
          }

          const t = (p - INTRO) / STEPS_SPAN;
          const index = Math.min(
            steps.length - 1,
            Math.max(0, Math.floor(t * steps.length)),
          );
          showStep(index);
        },
      });
    }, section);

    const refresh = () => {
      setRunwayHeight();
      ScrollTrigger.refresh();
    };

    requestAnimationFrame(() => requestAnimationFrame(refresh));
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section id="proces" ref={sectionRef} className="relative z-10 bg-graphite">
      <div data-proc-runway className="relative">
        <div
          data-proc-sticky
          className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-graphite"
        >
          <div
            data-proc-glow
            aria-hidden
            className="pointer-events-none absolute top-[20%] right-[-10%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.15),transparent_64%)] blur-3xl"
          />

          {/* Intro: wyśrodkowany */}
          <div
            data-proc-intro
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="eyebrow mb-4">Proces</p>
            <h2 className="display text-[clamp(2.5rem,7.5vw,5.25rem)] leading-[0.98] text-off-white">
              Od briefu
              <span className="mt-1 block text-lime">do live.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
              Siedem etapów. Zero zgadywania. Scrolluj, a przejdziesz całą drogę.
            </p>
          </div>

          {/* Scene: zamiana kroków */}
          <div
            data-proc-stage
            className="absolute inset-0 z-20 flex flex-col opacity-0"
          >
            <div className="section-pad flex items-center justify-between pt-24 md:pt-28">
              <p className="eyebrow">Proces</p>
              <div
                data-proc-counter
                className="relative h-4 min-w-[10rem] text-right opacity-0 md:min-w-[13rem]"
              >
                {steps.map((step) => (
                  <p
                    key={`label-${step.n}`}
                    data-proc-label
                    className="absolute inset-0 text-[11px] font-bold tracking-[0.16em] text-white/40 uppercase md:text-xs"
                  >
                    <span className="text-lime">{step.n}</span>
                    <span className="mx-2 text-white/25">·</span>
                    {step.title}
                  </p>
                ))}
              </div>
            </div>

            <div className="section-pad relative flex flex-1 items-center pb-14 md:pb-20">
              <div className="relative mx-auto flex w-full max-w-7xl items-center gap-6 md:gap-10 lg:gap-14">
                <div
                  aria-hidden
                  className="relative h-[min(50vh,21rem)] w-9 shrink-0 md:h-[min(56vh,24rem)] md:w-10"
                >
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
                  <div
                    data-proc-fill
                    className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-lime shadow-[0_0_12px_rgba(215,255,50,0.5)]"
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between py-0.5">
                    {steps.map((step) => (
                      <span
                        key={step.n}
                        data-proc-dot
                        className="relative flex size-3 items-center justify-center"
                      >
                        <span className="absolute inset-0 rounded-full border border-lime/40 bg-graphite" />
                        <span className="relative size-1.5 rounded-full bg-lime" />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[17rem] flex-1 overflow-hidden md:min-h-[20rem]">
                  {steps.map((step) => (
                    <span
                      key={`mark-${step.n}`}
                      data-proc-mark
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -bottom-6 select-none font-[family-name:var(--font-display)] text-[clamp(6.5rem,20vw,13rem)] leading-none font-extrabold tracking-[-0.06em] text-white/[0.045] md:-right-4 md:-bottom-10"
                    >
                      {step.n}
                    </span>
                  ))}

                  {steps.map((step) => (
                    <article
                      key={step.n}
                      data-proc-panel
                      className="absolute inset-0 flex flex-col justify-center opacity-0"
                    >
                      <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-lime/75 uppercase">
                        {step.hint}
                      </p>
                      <h3 className="display max-w-3xl text-[clamp(1.9rem,1.1rem+2.8vw,3.75rem)] leading-[1.05] text-balance text-off-white">
                        {step.title}
                      </h3>
                      <div className="mt-5 h-px w-14 bg-gradient-to-r from-lime/70 to-transparent" />
                      <p className="mt-5 max-w-lg text-[clamp(0.98rem,0.9rem+0.6vw,1.15rem)] leading-relaxed text-white/55">
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

      {/* Fallback bez animacji */}
      <div
        data-proc-static
        className="section-pad mx-auto hidden max-w-7xl py-24 md:py-32"
      >
        <p className="eyebrow mb-4 text-center">Proces</p>
        <h2 className="display mb-14 text-center text-[clamp(2.4rem,6vw,4.5rem)] text-off-white">
          Od briefu
          <span className="mt-1 block text-lime">do live.</span>
        </h2>
        <ol className="flex flex-col gap-12 border-l border-lime/30 pl-6 md:gap-14 md:pl-8">
          {steps.map((step) => (
            <li key={step.n} className="relative">
              <span className="absolute top-2 -left-[1.7rem] size-2.5 rounded-full bg-lime md:-left-[2.15rem]" />
              <p className="text-[11px] tracking-[0.18em] text-lime/70 uppercase">
                {step.n} · {step.hint}
              </p>
              <h3 className="display mt-2 text-3xl text-off-white md:text-4xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
