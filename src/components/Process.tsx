"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconClipboardList,
  IconFileCheck,
  IconRocket,
  IconCode,
  IconAdjustments,
  IconCloudUpload,
  IconCircleCheck,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const steps: {
  n: string;
  title: string;
  text: string;
  Icon: Icon;
}[] = [
  {
    n: "01",
    title: "Brief",
    text: "Cel, odbiorca, deadline i budżet. Układamy zakres zanim ruszy design albo kod.",
    Icon: IconClipboardList,
  },
  {
    n: "02",
    title: "Ustalenie warunków",
    text: "Termin, wycena i zasady współpracy. Wiesz dokładnie, co wchodzi w zakres.",
    Icon: IconFileCheck,
  },
  {
    n: "03",
    title: "Rozpoczęcie prac",
    text: "Kick-off, struktura i kierunek wizualny. Ruszamy dopiero gdy obie strony wiedzą dokąd idziemy.",
    Icon: IconRocket,
  },
  {
    n: "04",
    title: "Realizacja i poprawki",
    text: "Budujemy warstwa po warstwie. Dostajesz wgląd w postęp i poprawki na bieżąco.",
    Icon: IconCode,
  },
  {
    n: "05",
    title: "Poprawki końcowe",
    text: "Dopieszczamy detale: copy, spacing, motion, mobile. Domknięcie przed testami.",
    Icon: IconAdjustments,
  },
  {
    n: "06",
    title: "Testy i wdrożenie",
    text: "Sprawdzamy urządzenia, szybkość i formularze. Potem publikacja na live bez chaosu.",
    Icon: IconCloudUpload,
  },
  {
    n: "07",
    title: "Gotowe do użytkowania",
    text: "Handover, dostęp i krótkie intro. Strona u Ciebie — z opieką albo czystym oddaniem.",
    Icon: IconCircleCheck,
  },
];

/** Timeline fractions (scrubbed): hold → rise → steps */
const INTRO_END = 0.22;
const RISE_END = 0.34;

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const runway = section.querySelector<HTMLElement>("[data-proc-runway]");
    const head = section.querySelector<HTMLElement>("[data-proc-head]");
    const desc = section.querySelector<HTMLElement>("[data-proc-desc]");
    const titleEl = section.querySelector<HTMLElement>("[data-proc-title]");
    const stepsEl = section.querySelector<HTMLElement>("[data-proc-steps]");
    const n = steps.length;

    const headerTop = () => {
      // Leave room under fixed nav so eyebrow "Proces" stays visible
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--space-header")
        .trim();
      return `calc(${raw || "5.5rem"} + 0.35rem)`;
    };

    const lockLast = () => {
      setShowSteps(true);
      setActive(n - 1);
      if (fill) gsap.set(fill, { scaleY: 1, transformOrigin: "top center" });
      if (head) gsap.set(head, { top: headerTop(), yPercent: 0 });
      if (desc) gsap.set(desc, { opacity: 0, y: -10 });
      if (titleEl) gsap.set(titleEl, { scale: 0.82 });
      if (stepsEl) gsap.set(stepsEl, { autoAlpha: 1, y: 0 });
    };

    const resetIntro = () => {
      setShowSteps(false);
      setActive(0);
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      if (head) gsap.set(head, { top: "50%", yPercent: -50 });
      if (desc) gsap.set(desc, { opacity: 1, y: 0 });
      if (titleEl) gsap.set(titleEl, { scale: 1 });
      if (stepsEl) gsap.set(stepsEl, { autoAlpha: 0, y: 36 });
    };

    const syncSteps = (p: number) => {
      if (p < RISE_END) {
        setShowSteps(false);
        setActive(0);
        if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
        return;
      }
      setShowSteps(true);
      const t = (p - RISE_END) / (1 - RISE_END);
      const idx = Math.min(n - 1, Math.floor(t * n + 0.001));
      setActive(idx);
      if (fill) gsap.set(fill, { scaleY: t, transformOrigin: "top center" });
    };

    if (reduce) {
      lockLast();
      return;
    }

    if (!runway || !head || !desc || !stepsEl) return;

    const ctx = gsap.context(() => {
      resetIntro();

      const riseDur = RISE_END - INTRO_END;
      const stepsDur = 1 - RISE_END;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top+=8% top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!self.isActive) {
              if (self.progress >= 0.999) lockLast();
              else resetIntro();
              return;
            }
            syncSteps(self.progress);
          },
          onLeave: () => lockLast(),
          onLeaveBack: () => resetIntro(),
          onRefresh: (self) => {
            if (!self.isActive) {
              if (self.progress >= 0.999) lockLast();
              else resetIntro();
            } else {
              syncSteps(self.progress);
            }
          },
        },
      });

      // Hold title + desc centered
      tl.to({}, { duration: INTRO_END });

      // Smooth rise with scroll
      tl.to(
        head,
        {
          top: headerTop,
          yPercent: 0,
          duration: riseDur,
          ease: "none",
        },
        "rise",
      );
      tl.to(
        desc,
        { opacity: 0, y: -14, duration: riseDur, ease: "none" },
        "rise",
      );
      if (titleEl) {
        tl.to(
          titleEl,
          { scale: 0.82, duration: riseDur, ease: "none" },
          "rise",
        );
      }

      // Steps fade in as title settles
      tl.fromTo(
        stepsEl,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: Math.min(0.08, stepsDur * 0.2), ease: "none" },
        RISE_END,
      );

      // Remainder maps to step scrub (driven in onUpdate)
      tl.to({}, { duration: Math.max(0.01, stepsDur - 0.08) });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section id="proces" ref={sectionRef} className="relative z-10">
      <div
        data-proc-runway
        className="relative"
        style={{
          height: `calc((var(--proc-intro-vh, 1.1) + var(--proc-vh-per-step, 1.15) * ${steps.length}) * 100vh)`,
        }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-transparent">
          <div
            data-proc-head
            className="absolute inset-x-0 z-30 flex justify-center px-6 will-change-transform"
          >
            <div className="mx-auto max-w-2xl origin-top text-center">
              <p
                data-proc-eyebrow
                className="eyebrow mb-3 opacity-100 md:mb-4"
              >
                Proces
              </p>
              <h2
                data-proc-title
                className="display type-display origin-top leading-[1.05] text-off-white will-change-transform"
              >
                <span className="block">Od briefu</span>
                <span className="mt-1 block text-lime">do live.</span>
              </h2>
              <p
                data-proc-desc
                className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50 md:mt-5 md:text-base"
              >
                Siedem etapów od pierwszej rozmowy do działającej strony —
                bez niespodzianek po drodze.
              </p>
            </div>
          </div>

          <div
            data-proc-steps
            className="section-pad relative mx-auto flex w-full max-w-5xl flex-1 flex-col"
            style={{
              paddingTop: "calc(var(--space-header) + 7.25rem)",
              paddingBottom: "var(--space-panel-y)",
              visibility: "hidden",
            }}
          >
            <div className="relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 items-center gap-6 md:gap-10 lg:gap-12">
              <aside
                aria-hidden
                className="relative flex h-[min(48vh,20rem)] w-7 shrink-0 flex-col items-center md:h-[min(52vh,24rem)] md:w-9"
              >
                <div className="relative h-full w-px">
                  <div
                    className="absolute inset-0 opacity-35"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(247,248,250,0.45) 0 4px, transparent 4px 10px)",
                    }}
                  />
                  <div
                    ref={fillRef}
                    className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-lime"
                    style={{ boxShadow: "0 0 12px rgba(215,255,50,0.55)" }}
                  />
                  <ol className="absolute inset-0 flex flex-col justify-between">
                    {steps.map((step, i) => (
                      <li key={step.n} className="relative flex justify-center">
                        <span
                          className={cn(
                            "size-2 rounded-full border transition duration-400 md:size-2.5",
                            i < active
                              ? "border-lime/50 bg-lime/70"
                              : i === active
                                ? "border-lime bg-lime shadow-[0_0_14px_3px_rgba(215,255,50,0.75)]"
                                : "border-white/25 bg-transparent",
                          )}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>

              <div className="relative min-h-0 flex-1">
                {steps.map((step, i) => {
                  const Icon = step.Icon;
                  const on = i === active && showSteps;
                  return (
                    <article
                      key={step.n}
                      aria-hidden={!on}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-center transition duration-500 ease-out",
                        on
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-4 opacity-0",
                      )}
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-lime/35 bg-lime/[0.08] md:size-14">
                          <Icon
                            stroke={1.5}
                            className="size-6 text-lime md:size-7"
                          />
                        </div>
                        <span className="display text-[clamp(2.25rem,6vw,3.75rem)] leading-none tracking-[-0.045em] text-lime">
                          {step.n}
                        </span>
                      </div>
                      <h3 className="display mt-5 text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.08] text-off-white md:mt-6">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50 md:mt-4 md:text-[0.95rem]">
                        {step.text}
                      </p>
                      <p className="mt-5 text-[11px] font-medium tracking-[0.16em] text-white/28 uppercase">
                        Etap {i + 1} / {steps.length}
                      </p>
                    </article>
                  );
                })}
                <div className="invisible" aria-hidden>
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="size-12 md:size-14" />
                    <span className="display text-[clamp(2.25rem,6vw,3.75rem)] leading-none">
                      00
                    </span>
                  </div>
                  <h3 className="display mt-5 text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.08] md:mt-6">
                    {steps[0].title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm md:mt-4 md:text-[0.95rem]">
                    {steps[0].text}
                  </p>
                  <p className="mt-5 text-[11px]">Etap</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
