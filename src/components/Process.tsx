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

const headLines = [
  { text: "Od briefu", lime: false },
  { text: "do live.", lime: true },
];

const introCopy =
  "Siedem etapów. Jasna droga od pierwszej rozmowy do strony, z której korzystasz.";

function splitWords(text: string) {
  return text.split(" ").filter(Boolean);
}

function WriteWords({
  text,
  attr,
  className,
}: {
  text: string;
  attr: string;
  className?: string;
}) {
  const words = splitWords(text);
  return (
    <>
      {words.map((word, i) => (
        <span key={`${attr}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span
              {...{ [attr]: true }}
              className={`inline-block will-change-transform ${className ?? ""}`}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-proc-eyebrow]");
      const headWords = section.querySelectorAll("[data-proc-head-word]");
      const introWords = section.querySelectorAll("[data-proc-intro-word]");
      const caret = section.querySelector<HTMLElement>("[data-proc-caret]");
      const fill = section.querySelector<HTMLElement>("[data-proc-fill]");
      const track = section.querySelector<HTMLElement>("[data-proc-track]");
      const glow = section.querySelector<HTMLElement>("[data-proc-glow]");
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-proc-step]");

      gsap.set(eyebrow, { opacity: 0, y: 14 });
      gsap.set(headWords, { opacity: 0, y: "110%" });
      gsap.set(introWords, { opacity: 0, y: 16 });
      gsap.set(caret, { opacity: 0, scaleY: 0.4 });
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      if (glow) gsap.set(glow, { opacity: 0.15, scale: 0.9 });

      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector("[data-proc-header]"),
          start: "top 78%",
          end: "top 30%",
          scrub: 1.05,
        },
      });

      headTl.to(eyebrow, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 0);
      headTl.to(
        headWords,
        {
          opacity: 1,
          y: "0%",
          stagger: 0.07,
          duration: 0.55,
          ease: "none",
        },
        0.08,
      );
      headTl.to(
        introWords,
        {
          opacity: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.55,
          ease: "none",
        },
        0.28,
      );
      headTl.to(
        caret,
        { opacity: 1, scaleY: 1, duration: 0.25, ease: "none" },
        0.35,
      );
      headTl.to(caret, { opacity: 0, duration: 0.2, ease: "none" }, 0.85);
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
            start: "top 58%",
            end: "bottom 38%",
            scrub: 0.9,
          },
        });
      }

      // Mignięcie caret przy intro (pisanie)
      if (caret) {
        gsap.to(caret, {
          opacity: 0.15,
          repeat: -1,
          yoyo: true,
          duration: 0.45,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: section.querySelector("[data-proc-header]"),
            start: "top 70%",
            end: "top 25%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      stepEls.forEach((step, i) => {
        const num = step.querySelector("[data-proc-num]");
        const hintWords = step.querySelectorAll("[data-proc-hint-word]");
        const titleWords = step.querySelectorAll("[data-proc-title-word]");
        const textWords = step.querySelectorAll("[data-proc-text-word]");
        const rule = step.querySelector("[data-proc-rule]");
        const ghost = step.querySelector("[data-proc-ghost]");
        const dot = step.querySelector("[data-proc-dot]");
        const ring = step.querySelector("[data-proc-ring]");
        const stepCaret = step.querySelector("[data-proc-step-caret]");
        const article = step.querySelector("[data-proc-article]");

        gsap.set(num, { opacity: 0, y: 18, scale: 0.9 });
        gsap.set(hintWords, { opacity: 0, y: 10 });
        gsap.set(titleWords, { opacity: 0, y: "108%" });
        gsap.set(textWords, { opacity: 0, y: 14 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(ghost, { opacity: 0, x: 36 });
        gsap.set(dot, { scale: 0.5, opacity: 0.25 });
        gsap.set(ring, { scale: 0.35, opacity: 0 });
        gsap.set(stepCaret, { opacity: 0 });
        gsap.set(article, { opacity: 0.4 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 28%",
            scrub: 1.15,
          },
        });

        // Kropka + pulse
        tl.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: "none" }, 0);
        tl.to(
          ring,
          { scale: 1.7, opacity: 0.5, duration: 0.4, ease: "none" },
          0,
        );
        tl.to(ring, { scale: 2.3, opacity: 0, duration: 0.45, ease: "none" }, 0.32);

        // Numer + hint pisze się
        tl.to(num, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "none" }, 0.06);
        tl.to(
          hintWords,
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.35,
            ease: "none",
          },
          0.12,
        );

        // Tytuł: słowa wjeżdżają od dołu (pisanie)
        tl.to(
          titleWords,
          {
            opacity: 1,
            y: "0%",
            stagger: 0.075,
            duration: 0.5,
            ease: "none",
          },
          0.2,
        );

        tl.to(rule, { scaleX: 1, duration: 0.4, ease: "none" }, 0.38);
        tl.to(ghost, { opacity: 0.055, x: 0, duration: 0.55, ease: "none" }, 0.22);
        tl.to(article, { opacity: 1, duration: 0.35, ease: "none" }, 0.12);

        // Brzuch tekstu: word-write
        tl.to(stepCaret, { opacity: 1, duration: 0.15, ease: "none" }, 0.45);
        tl.to(
          textWords,
          {
            opacity: 1,
            y: 0,
            stagger: 0.028,
            duration: 0.55,
            ease: "none",
          },
          0.48,
        );
        tl.to(stepCaret, { opacity: 0, duration: 0.2, ease: "none" }, 0.92);

        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(article, { opacity: 1, duration: 0.3, overwrite: "auto" });
            gsap.to(dot, { scale: 1.2, duration: 0.25, overwrite: "auto" });
          },
          onEnterBack: () => {
            gsap.to(article, { opacity: 1, duration: 0.3, overwrite: "auto" });
            gsap.to(dot, { scale: 1.2, duration: 0.25, overwrite: "auto" });
          },
          onLeave: () => {
            if (i < stepEls.length - 1) {
              gsap.to(article, {
                opacity: 0.5,
                duration: 0.35,
                overwrite: "auto",
              });
              gsap.to(dot, { scale: 1, duration: 0.2, overwrite: "auto" });
            }
          },
          onLeaveBack: () => {
            gsap.to(article, {
              opacity: 0.4,
              duration: 0.3,
              overwrite: "auto",
            });
            gsap.to(dot, {
              scale: 0.8,
              opacity: 0.4,
              duration: 0.2,
              overwrite: "auto",
            });
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
          <p data-proc-eyebrow className="eyebrow mb-4">
            Proces
          </p>
          <h2 className="display text-[clamp(2.5rem,7vw,5rem)] text-off-white">
            {headLines.map((line) => (
              <span
                key={line.text}
                className={`mt-1 block first:mt-0 ${line.lime ? "text-lime" : ""}`}
              >
                {splitWords(line.text).map((word, i) => (
                  <span key={`${line.text}-${i}`}>
                    <span className="inline-block overflow-hidden align-bottom">
                      <span
                        data-proc-head-word
                        className="inline-block will-change-transform"
                      >
                        {word}
                      </span>
                    </span>
                    {i < splitWords(line.text).length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
            <WriteWords text={introCopy} attr="data-proc-intro-word" />
            <span
              data-proc-caret
              aria-hidden
              className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.12em] bg-lime align-baseline"
            />
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
                    <span className="text-[10px] tracking-[0.18em] text-white/35 uppercase md:text-[11px]">
                      <WriteWords text={step.hint} attr="data-proc-hint-word" />
                    </span>
                  </div>

                  <h3 className="display relative z-10 mt-2 text-[clamp(1.65rem,1rem+2vw,2.75rem)] leading-[1.05] text-off-white">
                    {splitWords(step.title).map((word, wi) => (
                      <span key={`${step.n}-t-${wi}`}>
                        <span className="inline-block overflow-hidden align-bottom">
                          <span
                            data-proc-title-word
                            className="inline-block will-change-transform"
                          >
                            {word}
                          </span>
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

                  <p className="relative z-10 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/50 md:mt-4 md:text-base">
                    <WriteWords text={step.text} attr="data-proc-text-word" />
                    <span
                      data-proc-step-caret
                      aria-hidden
                      className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-lime/80 align-baseline"
                    />
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
