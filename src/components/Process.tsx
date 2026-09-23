"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Brief",
    text: "Cel, odbiorca, konkurencja, deadline. Szybko ustalamy zakres i priorytety.",
  },
  {
    title: "Projekt",
    text: "Kierunek wizualny, struktura i copy. Widzisz kierunek zanim zacznie się kod.",
  },
  {
    title: "Kod",
    text: "Czysta implementacja, mobile-first, wydajność. Bez zbędnych warstw.",
  },
  {
    title: "Start",
    text: "Wdrożenie, poprawki, szkolenie z edycji. Potem możesz iść dalej z nami lub sam.",
  },
];

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const line = track.querySelector<HTMLElement>("[data-process-line]");
    if (!line) return;

    const tween = gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="proces"
      className="relative overflow-hidden border-t border-white/6 bg-graphite-light"
    >
      <div className="noise opacity-[0.03]" />
      <div className="section-pad relative mx-auto max-w-6xl py-20 md:py-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
              Proces
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
              Od rozmowy do live
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-off-white/60 md:text-base">
            Prosty flow, jasne etapy, zero zgadywania po drodze.
          </p>
        </Reveal>

        <div ref={trackRef} className="relative mt-14">
          <div className="absolute top-0 right-0 left-0 hidden h-px bg-white/10 lg:block" />
          <div
            data-process-line
            className="absolute top-0 left-0 hidden h-px w-full origin-left scale-x-0 bg-lime lg:block"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1}>
                <li className="relative pt-2">
                  <div className="mb-5 h-px w-12 bg-lime lg:hidden" />
                  <div className="absolute -top-[5px] left-0 hidden size-2.5 rounded-full bg-lime shadow-[0_0_12px_rgba(215,255,50,0.7)] lg:block" />
                  <p className="text-xs font-semibold tracking-[0.2em] text-off-white/40 uppercase">
                    Krok {index + 1}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-off-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-off-white/65">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
