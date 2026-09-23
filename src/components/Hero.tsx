"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BrandBanner } from "./Brand";
import { MagneticButton } from "./fx/MagneticButton";
import { ShaderBackground } from "./fx/ShaderBackground";
import { SplineScene } from "./fx/SplineScene";
import { GridPattern } from "./fx/GridPattern";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const desktop = desktopRef.current;
      const mobile = mobileRef.current;
      const blocks = blocksRef.current;
      const label = labelRef.current;
      if (!root || !desktop || !mobile || !blocks) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(desktop, { opacity: 1, scale: 1, y: 0 });
        gsap.set(mobile, { opacity: 0 });
        gsap.set(blocks.children, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(desktop, { opacity: 0.35, scale: 0.92, y: 40 });
      gsap.set(mobile, { opacity: 0, y: 80, scale: 0.9 });
      gsap.set(blocks.children, { opacity: 0, y: 60, x: () => gsap.utils.random(-40, 40) });
      if (label) gsap.set(label, { opacity: 0.4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        blocks.children,
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.08,
          ease: "none",
          duration: 0.35,
        },
        0,
      )
        .to(
          desktop,
          { opacity: 1, scale: 1, y: 0, ease: "none", duration: 0.35 },
          0.05,
        );

      if (label) {
        tl.to(label, { opacity: 1, duration: 0.2 }, 0.25);
      }

      tl.to(
          desktop,
          { scale: 0.78, x: "-18%", opacity: 0.55, ease: "none", duration: 0.3 },
          0.45,
        )
        .to(
          mobile,
          { opacity: 1, y: 0, scale: 1, ease: "none", duration: 0.3 },
          0.48,
        )
        .to(
          [desktop, mobile],
          { y: -30, opacity: 0.25, ease: "none", duration: 0.25 },
          0.78,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="top" className="relative h-[280vh] bg-graphite">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <ShaderBackground />
        <GridPattern className="opacity-[0.12]" />
        <SplineScene />
        <div className="noise opacity-[0.035]" />

        {/* Scroll-driven assembly stage (decorative, aria-hidden) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-end pr-[4vw] pt-16 max-lg:hidden"
        >
          <div className="relative h-[min(62vh,34rem)] w-[min(52vw,40rem)]">
            <p
              ref={labelRef}
              className="absolute -top-8 left-0 text-xs font-semibold tracking-[0.2em] text-lime/80 uppercase"
            >
              Składanie projektu · scroll
            </p>

            {/* Desktop mock */}
            <div
              ref={desktopRef}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-graphite-light/80 shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-md"
            >
              <div className="flex h-9 items-center gap-2 border-b border-white/8 px-4">
                <span className="size-2 rounded-full bg-white/25" />
                <span className="size-2 rounded-full bg-white/25" />
                <span className="size-2 rounded-full bg-lime/70" />
                <span className="ml-3 h-4 flex-1 rounded-full bg-white/5" />
              </div>
              <div ref={blocksRef} className="grid h-[calc(100%-2.25rem)] grid-cols-12 gap-3 p-4">
                <div className="col-span-12 h-16 rounded-xl bg-gradient-to-r from-lime/25 to-transparent" />
                <div className="col-span-4 rounded-xl bg-white/8" />
                <div className="col-span-8 rounded-xl bg-white/5" />
                <div className="col-span-7 rounded-xl bg-white/6" />
                <div className="col-span-5 rounded-xl bg-lime/15" />
                <div className="col-span-12 h-10 rounded-xl bg-white/5" />
              </div>
            </div>

            {/* Mobile mock */}
            <div
              ref={mobileRef}
              className="absolute right-6 bottom-4 h-[72%] w-[38%] overflow-hidden rounded-[1.6rem] border border-white/15 bg-graphite shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
              <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-white/15" />
              <div className="mt-4 space-y-2 px-3">
                <div className="h-8 rounded-lg bg-lime/25" />
                <div className="h-24 rounded-lg bg-white/8" />
                <div className="h-12 rounded-lg bg-white/5" />
                <div className="h-12 rounded-lg bg-white/5" />
                <div className="h-9 rounded-full bg-lime/35" />
              </div>
            </div>
          </div>
        </div>

        {/* Readable HTML content */}
        <div className="section-pad relative z-20 mx-auto flex h-full max-w-6xl items-end pb-16 pt-32 md:items-center md:pb-24 md:pt-36">
          <div className="flex max-w-2xl flex-col items-start gap-6 md:gap-7">
            <Badge className="rounded-full border border-lime/35 bg-lime/10 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-lime uppercase">
              Studio · Design · Code
            </Badge>

            <div className="animate-mark">
              <BrandBanner
                className="h-[clamp(4.25rem,10vw,6.5rem)] w-auto max-w-[min(100%,38rem)]"
                priority
              />
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,6.5vw,4.4rem)] font-extrabold leading-[0.98] tracking-tight text-off-white">
              Budujemy strony,
              <span className="mt-1 block text-lime">które sprzedają.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-off-white/72 md:text-lg">
              Dwuosobowy crew. Pełny stack od briefu do live. Landingi, sklepy i
              aplikacje z animacją, szybkością i charakterem — bez korpo-bełkotu.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#kontakt"
                className="rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-graphite shadow-[0_0_40px_rgba(215,255,50,0.28)] md:text-base"
              >
                Porozmawiajmy o projekcie
              </MagneticButton>
              <MagneticButton
                href="#realizacje"
                strength={16}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-off-white backdrop-blur-md transition hover:border-lime/50 hover:text-lime md:text-base"
              >
                Zobacz realizacje
              </MagneticButton>
            </div>

            <p
              className={cn(
                "text-xs tracking-[0.14em] text-off-white/40 uppercase",
                "max-lg:hidden",
              )}
            >
              Przewiń — składanie desktop → mobile → portfolio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
