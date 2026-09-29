"use client";

import { useEffect, useRef } from "react";
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

/** Scroll budget per step (vh). Sticky runway — no GSAP pin (avoids empty spacer after Oferty). */
const VH_PER_STEP = 0.65;

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

function StepMedia({
  n,
  Icon,
  flip,
}: {
  n: string;
  Icon: Icon;
  flip?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        flip ? "flex-row-reverse justify-start md:justify-start" : "justify-end",
      )}
    >
      <div
        className={cn(
          "relative flex size-16 shrink-0 items-center justify-center rounded-[1.35rem] border transition duration-500 md:size-20 md:rounded-[1.75rem]",
          "border-white/10 bg-white/[0.04]",
          "group-data-[active=true]:border-lime/40 group-data-[active=true]:bg-[#2a2a2a]",
          "group-data-[active=true]:shadow-[0_0_24px_rgba(215,255,50,0.12)]",
          "group-data-[done=true]:border-lime/20 group-data-[done=true]:bg-lime/[0.06]",
        )}
      >
        <Icon
          stroke={1.5}
          className={cn(
            "size-7 transition duration-500 md:size-8",
            "text-white/35",
            "group-data-[active=true]:text-lime",
            "group-data-[done=true]:text-lime/65",
          )}
        />
      </div>
      <span
        className={cn(
          "hidden size-8 items-center justify-center rounded-xl border text-[0.7rem] font-medium tracking-wide transition duration-500 md:flex",
          "border-white/10 bg-white/[0.06] text-white/40",
          "group-data-[active=true]:border-transparent group-data-[active=true]:bg-lime group-data-[active=true]:text-graphite",
          "group-data-[done=true]:border-lime/25 group-data-[done=true]:bg-lime/15 group-data-[done=true]:text-lime/80",
        )}
      >
        {n}
      </span>
    </div>
  );
}

function StepCopy({
  title,
  text,
  alignRight,
}: {
  title: string;
  text: string;
  alignRight?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-[20rem] transition duration-500",
        alignRight && "ml-auto text-right",
      )}
    >
      <h3
        className={cn(
          "text-[1.05rem] font-medium leading-snug tracking-[-0.02em] transition duration-500 md:text-[1.25rem]",
          "text-white/45 group-data-[active=true]:text-off-white",
          "group-data-[done=true]:text-white/70",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-1.5 text-sm leading-relaxed transition duration-500 md:mt-2",
          "text-white/25 group-data-[active=true]:text-white/50",
          "group-data-[done=true]:text-white/35",
        )}
      >
        {text}
      </p>
    </div>
  );
}

function CenterDot() {
  return (
    <div className="relative z-10 flex justify-center">
      <span
        className={cn(
          "relative flex size-8 items-center justify-center rounded-lg border transition duration-500 md:size-9",
          "border-white/12 bg-[#141414]",
          "group-data-[active=true]:border-lime/50 group-data-[active=true]:bg-lime/10",
          "group-data-[done=true]:border-lime/30 group-data-[done=true]:bg-lime/[0.07]",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full transition duration-500 md:size-2.5",
            "scale-50 bg-white/25",
            "group-data-[active=true]:scale-100 group-data-[active=true]:bg-lime group-data-[active=true]:shadow-[0_0_10px_rgba(215,255,50,0.7)]",
            "group-data-[done=true]:scale-100 group-data-[done=true]:bg-lime/70",
          )}
        />
      </span>
    </div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const runway = section.querySelector<HTMLElement>("[data-proc-runway]");
    const rows = gsap.utils.toArray<HTMLElement>("[data-proc-row]", section);
    const fills = gsap.utils.toArray<HTMLElement>("[data-proc-fill]", section);
    const track = section.querySelector<HTMLElement>("[data-proc-track]");
    const stage = section.querySelector<HTMLElement>("[data-proc-stage]");
    const n = steps.length;

    let active = -1;
    const setActive = (index: number) => {
      const next = Math.max(0, Math.min(n - 1, index));
      if (next === active) return;
      active = next;
      rows.forEach((row, i) => {
        row.dataset.active = i === next ? "true" : "false";
        row.dataset.done = i < next ? "true" : "false";
      });
    };

    const maxTrackY = () => {
      if (!track || !stage) return 0;
      return Math.max(0, track.scrollHeight - stage.clientHeight);
    };

    const applyProgress = (p: number) => {
      const progress = Math.max(0, Math.min(1, p));
      if (fills.length) gsap.set(fills, { scaleY: progress, transformOrigin: "top center" });
      if (track) gsap.set(track, { y: -maxTrackY() * progress });
      const idx =
        progress < 0.05
          ? 0
          : Math.min(n - 1, Math.floor(((progress - 0.05) / 0.95) * n));
      setActive(idx);
    };

    if (reduce) {
      applyProgress(1);
      return;
    }

    const ctx = gsap.context(() => {
      applyProgress(0);

      if (!runway) return;

      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.85,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  const runwayVh = Math.round(VH_PER_STEP * steps.length * 100);

  return (
    <section id="proces" ref={sectionRef} className="relative z-10">
      {/* Tall runway + sticky stage = Oferty-like scroll budget, no GSAP pin-spacer */}
      <div
        data-proc-runway
        className="relative"
        style={{ height: `${runwayVh}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-background pt-24 pb-10 md:pt-28 md:pb-12">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[8%] left-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.1),transparent_65%)] blur-3xl"
          />

          <div className="section-pad relative mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <header
              data-proc-header
              className="mx-auto mb-6 max-w-2xl shrink-0 text-center md:mb-8"
            >
              <p className="eyebrow mb-3 md:mb-4">Proces</p>
              <h2 className="display text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.02] text-off-white">
                <span className="block">Od briefu</span>
                <span className="mt-1 block text-lime">do live.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
                Siedem etapów zaprojektowanych tak, żebyś zawsze wiedział, gdzie
                jesteśmy i co dzieje się dalej.
              </p>
            </header>

            <div
              data-proc-stage
              className="relative min-h-0 flex-1 overflow-hidden"
            >
              <div
                data-proc-track
                className="relative mx-auto max-w-[65rem] will-change-transform"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-10 bottom-10 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 md:block"
                >
                  <div
                    data-proc-fill
                    className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-lime via-lime to-lime/25 shadow-[0_0_14px_rgba(215,255,50,0.45)]"
                  />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-6 bottom-6 left-[1.15rem] w-px bg-white/10 md:hidden"
                >
                  <div
                    data-proc-fill
                    className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-lime via-lime to-lime/25 shadow-[0_0_14px_rgba(215,255,50,0.45)]"
                  />
                </div>

                <ol className="relative flex flex-col gap-3 md:gap-4">
                  {steps.map((step, i) => {
                    const contentRight = i % 2 === 0;
                    return (
                      <li
                        key={step.n}
                        data-proc-row
                        data-active={i === 0 ? "true" : "false"}
                        data-done="false"
                        className={cn(
                          "group relative rounded-[1.75rem] transition duration-500 md:rounded-[3rem]",
                          "bg-transparent",
                          "data-[active=true]:bg-white/[0.045]",
                          "data-[done=true]:bg-white/[0.02]",
                        )}
                      >
                        <div className="grid grid-cols-[2.75rem_1fr] items-center gap-3 px-2 py-3 md:hidden">
                          <CenterDot />
                          <div className="flex items-center gap-3 pr-2">
                            <div
                              className={cn(
                                "relative flex size-14 shrink-0 items-center justify-center rounded-[1.15rem] border transition duration-500",
                                "border-white/10 bg-white/[0.04]",
                                "group-data-[active=true]:border-lime/40 group-data-[active=true]:bg-[#2a2a2a]",
                                "group-data-[done=true]:border-lime/20 group-data-[done=true]:bg-lime/[0.06]",
                              )}
                            >
                              <step.Icon
                                stroke={1.5}
                                className={cn(
                                  "size-6 transition duration-500",
                                  "text-white/35",
                                  "group-data-[active=true]:text-lime",
                                  "group-data-[done=true]:text-lime/65",
                                )}
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-2">
                                <span
                                  className={cn(
                                    "text-[0.65rem] font-medium tracking-wide transition duration-500",
                                    "text-white/30 group-data-[active=true]:text-lime",
                                  )}
                                >
                                  {step.n}
                                </span>
                                <h3
                                  className={cn(
                                    "truncate text-[0.95rem] font-medium tracking-[-0.02em] transition duration-500",
                                    "text-white/50 group-data-[active=true]:text-off-white",
                                  )}
                                >
                                  {step.title}
                                </h3>
                              </div>
                              <p
                                className={cn(
                                  "mt-0.5 line-clamp-2 text-[0.8rem] leading-snug transition duration-500",
                                  "text-white/25 group-data-[active=true]:text-white/45",
                                )}
                              >
                                {step.text}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="hidden min-h-[8.5rem] grid-cols-[1fr_10rem_1fr] items-center px-6 py-4 md:grid lg:px-10">
                          <div>
                            {contentRight ? (
                              <StepMedia n={step.n} Icon={step.Icon} />
                            ) : (
                              <StepCopy
                                title={step.title}
                                text={step.text}
                                alignRight
                              />
                            )}
                          </div>
                          <CenterDot />
                          <div>
                            {contentRight ? (
                              <StepCopy title={step.title} text={step.text} />
                            ) : (
                              <StepMedia n={step.n} Icon={step.Icon} flip />
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
