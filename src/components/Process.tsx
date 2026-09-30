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

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const runway = section.querySelector<HTMLElement>("[data-proc-runway]");
    const n = steps.length;

    if (reduce) {
      setActive(n - 1);
      if (fill) gsap.set(fill, { scaleY: 1, transformOrigin: "top center" });
      return;
    }

    const ctx = gsap.context(() => {
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      if (!runway) return;

      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.85,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (fill) gsap.set(fill, { scaleY: p });
          const idx = Math.min(n - 1, Math.floor(p * n + 0.001));
          setActive(idx);
        },
        onRefresh: (self) => {
          const p = self.progress;
          if (fill) gsap.set(fill, { scaleY: p });
          setActive(Math.min(n - 1, Math.floor(p * n + 0.001)));
        },
      });
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
          height: `calc(var(--proc-vh-per-step, 0.55) * ${steps.length} * 100vh)`,
        }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-background">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[12%] left-1/2 h-[36vmax] w-[36vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.09),transparent_65%)] blur-3xl"
          />

          <div
            className="section-pad relative mx-auto flex w-full max-w-5xl flex-1 flex-col"
            style={{
              paddingTop: "var(--space-header)",
              paddingBottom: "var(--space-panel-y)",
            }}
          >
            <header className="mx-auto mb-6 max-w-2xl shrink-0 text-center md:mb-8">
              <p className="eyebrow mb-2 md:mb-3">Proces</p>
              <h2 className="display type-display leading-[1.02] text-off-white">
                <span className="inline">Od briefu </span>
                <span className="text-lime">do live.</span>
              </h2>
            </header>

            <div className="relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 items-center gap-6 md:gap-10 lg:gap-14">
              {/* Left progress rail — like page scroll indicator */}
              <aside
                aria-hidden
                className="relative flex h-[min(52vh,22rem)] w-8 shrink-0 flex-col items-center md:h-[min(56vh,26rem)] md:w-10"
              >
                <div className="relative h-full w-px">
                  <div
                    className="absolute inset-0 opacity-40"
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
                      <li
                        key={step.n}
                        className="relative flex justify-center"
                      >
                        <span
                          className={cn(
                            "size-2.5 rounded-full border transition duration-400 md:size-3",
                            i < active
                              ? "border-lime/50 bg-lime/70"
                              : i === active
                                ? "border-lime bg-lime shadow-[0_0_14px_3px_rgba(215,255,50,0.75)]"
                                : "border-white/25 bg-[#0a0c10]",
                          )}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>

              {/* Single active card */}
              <div className="relative min-h-0 flex-1">
                {steps.map((step, i) => {
                  const Icon = step.Icon;
                  const on = i === active;
                  return (
                    <article
                      key={step.n}
                      aria-hidden={!on}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-center transition duration-500 ease-out",
                        on
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-3 opacity-0",
                      )}
                    >
                      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-6 py-7 md:rounded-[2.25rem] md:px-10 md:py-10">
                        <div className="flex items-center gap-4 md:gap-5">
                          <div
                            className={cn(
                              "flex size-14 shrink-0 items-center justify-center rounded-[1.2rem] border md:size-16 md:rounded-[1.4rem]",
                              "border-lime/40 bg-[#2a2a2a] shadow-[0_0_28px_rgba(215,255,50,0.14)]",
                            )}
                          >
                            <Icon
                              stroke={1.5}
                              className="size-7 text-lime md:size-8"
                            />
                          </div>
                          <span className="display text-[clamp(2rem,5vw,3.25rem)] leading-none tracking-[-0.04em] text-lime">
                            {step.n}
                          </span>
                        </div>
                        <h3 className="display mt-5 text-[clamp(1.45rem,3.5vw,2.25rem)] leading-[1.1] text-off-white md:mt-6">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 md:mt-4 md:text-base">
                          {step.text}
                        </p>
                        <p className="mt-6 text-[11px] font-medium tracking-[0.16em] text-white/30 uppercase">
                          Etap {i + 1} / {steps.length}
                        </p>
                      </div>
                    </article>
                  );
                })}
                {/* Spacer so absolute cards have height */}
                <div className="invisible flex flex-col justify-center" aria-hidden>
                  <div className="rounded-[1.75rem] px-6 py-7 md:rounded-[2.25rem] md:px-10 md:py-10">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="size-14 md:size-16" />
                      <span className="display text-[clamp(2rem,5vw,3.25rem)] leading-none">
                        00
                      </span>
                    </div>
                    <h3 className="display mt-5 text-[clamp(1.45rem,3.5vw,2.25rem)] leading-[1.1] md:mt-6">
                      {steps[0].title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm md:mt-4 md:text-base">
                      {steps[0].text}
                    </p>
                    <p className="mt-6 text-[11px]">Etap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
