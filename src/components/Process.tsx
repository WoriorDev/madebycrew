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

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const headBits = section.querySelectorAll("[data-proc-head]");
      const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
      const track = section.querySelector<HTMLElement>("[data-proc-track]");
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-proc-step]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-proc-dot]");

      gsap.set(headBits, { opacity: 0, y: 28 });
      gsap.set(dots, { scale: 0.7, opacity: 0.3 });
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

      gsap.to(headBits, {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: section.querySelector("[data-proc-header]"),
          start: "top 78%",
          end: "top 42%",
          scrub: 0.9,
        },
      });

      if (fill && track) {
        gsap.to(fill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 55%",
            end: "bottom 45%",
            scrub: 0.8,
          },
        });
      }

      stepEls.forEach((step, i) => {
        const bits = step.querySelectorAll("[data-proc-bit]");
        gsap.set(bits, { opacity: 0, y: 32 });

        gsap.to(bits, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "top 78%",
            end: "top 42%",
            scrub: 0.95,
          },
        });

        if (dots[i]) {
          ScrollTrigger.create({
            trigger: step,
            start: "top 65%",
            end: "bottom 40%",
            onEnter: () =>
              gsap.to(dots[i], {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                overwrite: "auto",
              }),
            onEnterBack: () =>
              gsap.to(dots[i], {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                overwrite: "auto",
              }),
            onLeaveBack: () =>
              gsap.to(dots[i], {
                scale: 0.7,
                opacity: 0.3,
                duration: 0.25,
                overwrite: "auto",
              }),
          });
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
      className="relative z-10 overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12%] left-1/2 h-[42vmax] w-[42vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.1),transparent_65%)] blur-3xl"
      />

      <div className="section-pad relative mx-auto max-w-7xl">
        <header
          data-proc-header
          className="mx-auto mb-16 max-w-2xl text-center md:mb-24"
        >
          <p data-proc-head className="eyebrow mb-4">
            Proces
          </p>
          <h2 className="display text-[clamp(2.5rem,7vw,5rem)] text-off-white">
            <span data-proc-head className="block">
              Od briefu
            </span>
            <span data-proc-head className="mt-1 block text-lime">
              do live.
            </span>
          </h2>
          <p
            data-proc-head
            className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base"
          >
            Siedem etapów. Jasna droga od pierwszej rozmowy do strony, z której
            korzystasz.
          </p>
        </header>

        <div
          data-proc-track
          className="relative mx-auto max-w-3xl"
        >
          {/* Timeline rail */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-white/10 md:left-[1.35rem]"
          >
            <div
              data-proc-fill
              className="absolute inset-x-0 top-0 h-full origin-top bg-lime shadow-[0_0_14px_rgba(215,255,50,0.45)]"
            />
          </div>

          <ol className="relative flex flex-col gap-14 md:gap-20">
            {steps.map((step, i) => (
              <li
                key={step.n}
                data-proc-step
                className="relative grid grid-cols-[2.5rem_1fr] gap-5 md:grid-cols-[3rem_1fr] md:gap-8"
              >
                <div className="relative flex justify-center pt-1.5">
                  <span
                    data-proc-dot
                    className="relative z-10 flex size-3 items-center justify-center md:size-3.5"
                  >
                    <span className="absolute inset-0 rounded-full border border-lime/50 bg-graphite shadow-[0_0_0_5px_rgba(5,6,7,0.95)]" />
                    <span className="relative size-1.5 rounded-full bg-lime md:size-[7px]" />
                  </span>
                </div>

                <article className="min-w-0 pb-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      data-proc-bit
                      className="display text-sm text-lime md:text-base"
                    >
                      {step.n}
                    </span>
                    <span
                      data-proc-bit
                      className="text-[10px] tracking-[0.18em] text-white/35 uppercase md:text-[11px]"
                    >
                      {step.hint}
                    </span>
                  </div>

                  <h3
                    data-proc-bit
                    className="display mt-2 text-[clamp(1.65rem,1rem+2vw,2.75rem)] leading-[1.05] text-off-white"
                  >
                    {step.title}
                  </h3>

                  <p
                    data-proc-bit
                    className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/50 md:mt-4 md:text-base"
                  >
                    {step.text}
                  </p>

                  {i < steps.length - 1 && (
                    <div
                      data-proc-bit
                      aria-hidden
                      className="mt-10 h-px w-12 bg-gradient-to-r from-white/15 to-transparent md:mt-12"
                    />
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
