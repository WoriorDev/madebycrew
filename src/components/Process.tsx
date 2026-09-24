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

function splitWords(text: string) {
  return text.split(" ").filter(Boolean);
}

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
      const glow = section.querySelector<HTMLElement>("[data-proc-glow]");
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-proc-step]");

      gsap.set(headBits, { opacity: 0, y: 36, filter: "blur(6px)" });
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      if (glow) gsap.set(glow, { opacity: 0.2, scale: 0.85 });

      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector("[data-proc-header]"),
          start: "top 80%",
          end: "top 38%",
          scrub: 1,
        },
      });

      headTl.to(
        headBits,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.55,
          ease: "none",
        },
        0,
      );
      if (glow) {
        headTl.to(
          glow,
          { opacity: 1, scale: 1, duration: 0.7, ease: "none" },
          0.1,
        );
      }

      if (fill && track) {
        gsap.to(fill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 60%",
            end: "bottom 35%",
            scrub: 0.85,
          },
        });
      }

      stepEls.forEach((step, i) => {
        const num = step.querySelector("[data-proc-num]");
        const hint = step.querySelector("[data-proc-hint]");
        const titleWords = step.querySelectorAll("[data-proc-title-word]");
        const text = step.querySelector("[data-proc-text]");
        const rule = step.querySelector("[data-proc-rule]");
        const ghost = step.querySelector("[data-proc-ghost]");
        const dot = step.querySelector("[data-proc-dot]");
        const ring = step.querySelector("[data-proc-ring]");
        const article = step.querySelector("[data-proc-article]");

        gsap.set(num, { opacity: 0, y: 20, scale: 0.85 });
        gsap.set(hint, { opacity: 0, x: -12 });
        gsap.set(titleWords, { opacity: 0, y: 26 });
        gsap.set(text, { opacity: 0, y: 18 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(ghost, { opacity: 0, x: 40 });
        gsap.set(dot, { scale: 0.55, opacity: 0.25 });
        gsap.set(ring, { scale: 0.4, opacity: 0 });
        gsap.set(article, { opacity: 0.35 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            end: "top 36%",
            scrub: 1.05,
          },
        });

        tl.to(dot, { scale: 1, opacity: 1, duration: 0.35, ease: "none" }, 0);
        tl.to(
          ring,
          { scale: 1.8, opacity: 0.55, duration: 0.45, ease: "none" },
          0,
        );
        tl.to(ring, { scale: 2.4, opacity: 0, duration: 0.5, ease: "none" }, 0.35);
        tl.to(num, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "none" }, 0.05);
        tl.to(hint, { opacity: 1, x: 0, duration: 0.35, ease: "none" }, 0.12);
        tl.to(
          titleWords,
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.45,
            ease: "none",
          },
          0.18,
        );
        tl.to(rule, { scaleX: 1, duration: 0.4, ease: "none" }, 0.32);
        tl.to(text, { opacity: 1, y: 0, duration: 0.45, ease: "none" }, 0.38);
        tl.to(ghost, { opacity: 0.06, x: 0, duration: 0.55, ease: "none" }, 0.2);
        tl.to(article, { opacity: 1, duration: 0.4, ease: "none" }, 0.1);

        // Aktywny krok: lekko podświetlony, gdy jest w centrum
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => {
            gsap.to(article, { opacity: 1, duration: 0.35, overwrite: "auto" });
            gsap.to(dot, {
              scale: 1.15,
              duration: 0.3,
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to(article, { opacity: 1, duration: 0.35, overwrite: "auto" });
            gsap.to(dot, { scale: 1.15, duration: 0.3, overwrite: "auto" });
          },
          onLeave: () => {
            if (i < stepEls.length - 1) {
              gsap.to(article, { opacity: 0.55, duration: 0.4, overwrite: "auto" });
              gsap.to(dot, { scale: 1, duration: 0.25, overwrite: "auto" });
            }
          },
          onLeaveBack: () => {
            gsap.to(article, { opacity: 0.45, duration: 0.35, overwrite: "auto" });
            gsap.to(dot, { scale: 0.85, opacity: 0.45, duration: 0.25, overwrite: "auto" });
          },
        });
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
        data-proc-glow
        aria-hidden
        className="pointer-events-none absolute top-[10%] left-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.12),transparent_64%)] blur-3xl"
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

        <div data-proc-track className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-white/10 md:left-[1.35rem]"
          >
            <div
              data-proc-fill
              className="absolute inset-x-0 top-0 h-full origin-top bg-lime shadow-[0_0_16px_rgba(215,255,50,0.5)]"
            />
          </div>

          <ol className="relative flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => (
              <li
                key={step.n}
                data-proc-step
                className="relative grid grid-cols-[2.5rem_1fr] gap-5 md:grid-cols-[3rem_1fr] md:gap-8"
              >
                <div className="relative flex justify-center pt-2">
                  <span className="relative z-10 flex size-3 items-center justify-center md:size-3.5">
                    <span
                      data-proc-ring
                      aria-hidden
                      className="absolute size-3 rounded-full bg-lime/30 md:size-3.5"
                    />
                    <span
                      data-proc-dot
                      className="relative flex size-3 items-center justify-center md:size-3.5"
                    >
                      <span className="absolute inset-0 rounded-full border border-lime/55 bg-graphite shadow-[0_0_0_5px_rgba(5,6,7,0.95)]" />
                      <span className="relative size-1.5 rounded-full bg-lime md:size-[7px]" />
                    </span>
                  </span>
                </div>

                <article
                  data-proc-article
                  className="relative min-w-0 overflow-hidden pb-1"
                >
                  <span
                    data-proc-ghost
                    aria-hidden
                    className="pointer-events-none absolute -top-6 -right-2 select-none font-[family-name:var(--font-display)] text-[clamp(5rem,16vw,9rem)] leading-none font-extrabold tracking-[-0.06em] text-white md:-top-8 md:-right-4"
                  >
                    {step.n}
                  </span>

                  <div className="relative z-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      data-proc-num
                      className="display text-sm text-lime md:text-base"
                    >
                      {step.n}
                    </span>
                    <span
                      data-proc-hint
                      className="text-[10px] tracking-[0.18em] text-white/35 uppercase md:text-[11px]"
                    >
                      {step.hint}
                    </span>
                  </div>

                  <h3 className="display relative z-10 mt-2 text-[clamp(1.65rem,1rem+2vw,2.75rem)] leading-[1.05] text-off-white">
                    {splitWords(step.title).map((word, wi) => (
                      <span key={`${step.n}-w-${wi}`}>
                        <span
                          data-proc-title-word
                          className="inline-block will-change-transform"
                        >
                          {word}
                        </span>
                        {wi < splitWords(step.title).length - 1 ? " " : ""}
                      </span>
                    ))}
                  </h3>

                  <div
                    data-proc-rule
                    aria-hidden
                    className="relative z-10 mt-4 h-px w-14 bg-gradient-to-r from-lime/80 to-transparent md:mt-5"
                  />

                  <p
                    data-proc-text
                    className="relative z-10 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/50 md:mt-4 md:text-base"
                  >
                    {step.text}
                  </p>

                  {i < steps.length - 1 && (
                    <div
                      aria-hidden
                      className="mt-12 h-px w-10 bg-gradient-to-r from-white/12 to-transparent md:mt-14"
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
