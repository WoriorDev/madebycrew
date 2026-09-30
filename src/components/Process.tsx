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

type Phase = "pre" | "intro" | "header" | "steps";

const INTRO_END = 0.16;
const HEADER_END = 0.28;

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("pre");

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const runway = section.querySelector<HTMLElement>("[data-proc-runway]");
    const n = steps.length;

    const apply = (p: number, isActive: boolean) => {
      if (!isActive) {
        setPhase("pre");
        setActive(0);
        if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
        return;
      }

      if (p < INTRO_END) {
        setPhase("intro");
        setActive(0);
        if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
        return;
      }

      if (p < HEADER_END) {
        setPhase("header");
        setActive(0);
        if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
        return;
      }

      setPhase("steps");
      const t = (p - HEADER_END) / (1 - HEADER_END);
      const idx = Math.min(n - 1, Math.floor(t * n + 0.001));
      setActive(idx);
      if (fill) gsap.set(fill, { scaleY: t, transformOrigin: "top center" });
    };

    if (reduce) {
      setPhase("steps");
      setActive(n - 1);
      if (fill) gsap.set(fill, { scaleY: 1, transformOrigin: "top center" });
      return;
    }

    const ctx = gsap.context(() => {
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      apply(0, false);
      if (!runway) return;

      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.85,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress, self.isActive),
        onRefresh: (self) => apply(self.progress, self.isActive),
        onLeaveBack: () => apply(0, false),
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  const showIntro = phase === "pre" || phase === "intro";
  const showHeader = phase === "header" || phase === "steps";
  const showSteps = phase === "header" || phase === "steps";

  return (
    <section id="proces" ref={sectionRef} className="relative z-10">
      <div
        data-proc-runway
        className="relative"
        style={{
          height: `calc((var(--proc-intro-vh, 0.9) + var(--proc-vh-per-step, 0.5) * ${steps.length}) * 100vh)`,
        }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-transparent">
          {/* Centered intro title — like Crew "Chcesz wiedzieć coś o nas?" */}
          <div
            data-proc-intro
            className={cn(
              "pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 transition duration-500",
              showIntro ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="text-center">
              <p className="eyebrow mb-3 md:mb-4">Proces</p>
              <h2 className="display type-display leading-[1.05] text-off-white">
                <span className="block">Od briefu</span>
                <span className="mt-1 block text-lime">do live.</span>
              </h2>
            </div>
          </div>

          <div
            className={cn(
              "section-pad relative mx-auto flex w-full max-w-5xl flex-1 flex-col transition duration-500",
              showSteps ? "opacity-100" : "opacity-0",
            )}
            style={{
              paddingTop: "var(--space-header)",
              paddingBottom: "var(--space-panel-y)",
            }}
          >
            <header
              className={cn(
                "mx-auto mb-5 max-w-2xl shrink-0 text-center transition duration-500 md:mb-7",
                showHeader
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
            >
              <p className="eyebrow mb-2">Proces</p>
              <h2 className="display type-display leading-[1.02] text-off-white">
                <span className="inline">Od briefu </span>
                <span className="text-lime">do live.</span>
              </h2>
            </header>

            <div
              className={cn(
                "relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 items-center gap-6 transition duration-500 md:gap-10 lg:gap-12",
                phase === "steps"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
            >
              {/* Left rail */}
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

              {/* Stage content — no card chrome */}
              <div className="relative min-h-0 flex-1">
                {steps.map((step, i) => {
                  const Icon = step.Icon;
                  const on = i === active && phase === "steps";
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
