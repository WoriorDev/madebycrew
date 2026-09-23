"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-page scroll film — physical website UI assembles as you scroll.
 */
export function ScrollFilm({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pieces = piecesRef.current;
    const desktop = desktopRef.current;
    const mobile = mobileRef.current;
    const cursor = cursorRef.current;
    const bar = barRef.current;
    const caption = captionRef.current;
    const glow = glowRef.current;
    if (!root || !pieces || !desktop || !mobile || !cursor || !bar) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(desktop, { opacity: 0.4, clearProps: "transform" });
      gsap.set([mobile, pieces], { opacity: 0 });
      return;
    }

    const kids = gsap.utils.toArray<HTMLElement>(pieces.children);

    gsap.set(kids, {
      opacity: 0,
      y: () => gsap.utils.random(100, 220),
      x: () => gsap.utils.random(-160, 160),
      rotate: () => gsap.utils.random(-22, 22),
      scale: 0.8,
    });
    gsap.set(desktop, { opacity: 0, scale: 0.78, y: 80 });
    gsap.set(mobile, { opacity: 0, y: 140, scale: 0.85, x: 50 });
    gsap.set(cursor, { opacity: 0, x: -50, y: 50 });
    gsap.set(bar, { scaleX: 0 });
    if (caption) gsap.set(caption, { opacity: 0, y: 12 });
    if (glow) gsap.set(glow, { opacity: 0.35 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      kids,
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        stagger: 0.035,
        ease: "none",
        duration: 0.16,
      },
      0,
    );

    if (caption) {
      tl.to(caption, { opacity: 1, y: 0, duration: 0.08 }, 0.06);
    }
    if (glow) {
      tl.to(glow, { opacity: 0.85, duration: 0.2 }, 0.1);
    }

    tl.to(kids, { opacity: 0, scale: 0.88, duration: 0.1, ease: "none" }, 0.17)
      .to(
        desktop,
        { opacity: 1, scale: 1, y: 0, duration: 0.15, ease: "none" },
        0.18,
      )
      .to(cursor, { opacity: 1, x: 0, y: 0, duration: 0.08 }, 0.26)
      .to(bar, { scaleX: 0.42, duration: 0.12, ease: "none" }, 0.28)
      .to(
        desktop,
        { scale: 0.82, x: "-14%", opacity: 0.88, duration: 0.13, ease: "none" },
        0.38,
      )
      .to(
        mobile,
        { opacity: 1, y: 0, scale: 1, x: 0, duration: 0.13, ease: "none" },
        0.4,
      )
      .to(bar, { scaleX: 0.68, duration: 0.1, ease: "none" }, 0.44)
      .to(cursor, { x: 110, y: -36, duration: 0.1, ease: "none" }, 0.46)
      .to(
        desktop.querySelectorAll("[data-card]"),
        { y: -18, stagger: 0.035, duration: 0.12, ease: "none" },
        0.54,
      )
      .to(bar, { scaleX: 0.86, duration: 0.1, ease: "none" }, 0.58)
      .to(cursor, { x: 40, y: 20, duration: 0.1, ease: "none" }, 0.62)
      .to(
        [desktop, mobile, cursor],
        { opacity: 0.28, y: -48, duration: 0.16, ease: "none" },
        0.76,
      )
      .to(bar, { scaleX: 1, duration: 0.12, ease: "none" }, 0.8);

    if (caption) {
      tl.to(caption, { opacity: 0.25, duration: 0.1 }, 0.82);
    }
    if (glow) {
      tl.to(glow, { opacity: 0.25, duration: 0.12 }, 0.78);
    }

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", onRefresh);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("load", onRefresh);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070809]",
        className,
      )}
    >
      <div
        ref={glowRef}
        className="absolute -top-1/4 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.18),transparent_60%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(215,255,50,0.1),transparent_42%),radial-gradient(ellipse_at_85%_75%,rgba(215,255,50,0.07),transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,248,250,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(247,248,250,0.55) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 60% 40%, black 5%, transparent 72%)",
        }}
      />
      <div className="film-noise absolute inset-0 opacity-[0.35]" />

      <p
        ref={captionRef}
        className="absolute top-[14%] left-[5%] hidden font-[family-name:var(--font-display)] text-[11px] font-bold tracking-[0.32em] text-lime uppercase md:block"
      >
        Scroll film · UI w ruchu
      </p>

      <div ref={piecesRef} className="absolute inset-0">
        <Piece className="top-[18%] left-[8%] h-12 w-44 md:left-[12%] md:h-14 md:w-52" label="Nav" />
        <Piece className="top-[32%] left-[18%] h-20 w-36 md:left-[26%] md:h-28 md:w-44" label="Hero" lime />
        <Piece className="top-[22%] right-[10%] h-28 w-48 md:right-[16%] md:h-36 md:w-60" label="Card" />
        <Piece className="bottom-[30%] left-[12%] h-9 w-32 md:left-[16%] md:h-11 md:w-40" label="CTA" lime />
        <Piece className="right-[14%] bottom-[22%] h-16 w-24 md:right-[20%] md:h-24 md:w-32" label="Media" />
        <Piece className="top-[14%] left-[36%] h-7 w-52 md:left-[40%] md:h-9 md:w-72" label="Headline" />
        <Piece className="top-[46%] right-[28%] hidden size-16 rounded-full md:block" label="" lime />
        <Piece className="bottom-[18%] left-[40%] h-14 w-40 md:left-[44%]" label="Footer" />
      </div>

      {/* desktop mock — visible earlier / stronger */}
      <div
        ref={desktopRef}
        className="absolute top-[48%] left-1/2 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/14 bg-[#10141a]/92 shadow-[0_60px_140px_rgba(0,0,0,0.65)] backdrop-blur-md md:top-1/2 md:left-[7%] md:w-[min(58vw,740px)] md:translate-x-0 lg:left-[8%]"
      >
        <div className="flex h-10 items-center gap-2 border-b border-white/8 px-4">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex h-6 flex-1 items-center rounded-full bg-white/5 px-3 text-[10px] text-white/40">
            madebycrew.pl / live
          </div>
        </div>
        <div className="grid h-[min(42vh,340px)] grid-cols-12 gap-3 p-3 md:h-[min(52vh,400px)] md:gap-3 md:p-4">
          <div className="col-span-12 flex h-11 items-center justify-between rounded-xl bg-white/[0.05] px-4">
            <span className="h-3 w-24 rounded bg-lime/55" />
            <span className="flex items-center gap-2">
              <span className="hidden h-2 w-10 rounded bg-white/25 sm:block" />
              <span className="hidden h-2 w-10 rounded bg-white/25 sm:block" />
              <span className="h-6 w-16 rounded-full bg-lime/45" />
            </span>
          </div>
          <div className="col-span-7 space-y-2.5 rounded-xl bg-white/[0.035] p-3 md:p-4">
            <div className="h-3.5 w-[85%] rounded bg-white/30 md:h-4" />
            <div className="h-3.5 w-[55%] rounded bg-lime/40 md:h-4" />
            <div className="h-2.5 w-full rounded bg-white/12" />
            <div className="h-2.5 w-[78%] rounded bg-white/12" />
            <div className="mt-3 h-8 w-28 rounded-full bg-lime/50 md:h-9 md:w-32" />
          </div>
          <div className="col-span-5 grid gap-2.5">
            <div data-card className="rounded-xl bg-gradient-to-br from-lime/25 to-white/5 p-2.5 md:p-3">
              <div className="mb-2 h-12 rounded-lg bg-white/12 md:h-16" />
              <div className="h-2 w-2/3 rounded bg-white/30" />
            </div>
            <div data-card className="rounded-xl bg-white/[0.05] p-2.5 md:p-3">
              <div className="mb-2 h-12 rounded-lg bg-white/10 md:h-16" />
              <div className="h-2 w-1/2 rounded bg-white/22" />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={mobileRef}
        className="absolute top-[12%] right-[4%] hidden h-[min(58vh,460px)] w-[min(28vw,210px)] overflow-hidden rounded-[1.85rem] border border-white/16 bg-[#0c0e12] shadow-[0_50px_120px_rgba(0,0,0,0.6)] md:block lg:right-[9%] lg:w-[min(22vw,220px)]"
      >
        <div className="mx-auto mt-2.5 h-1.5 w-14 rounded-full bg-white/25" />
        <div className="mt-4 space-y-2.5 px-3">
          <div className="flex items-center justify-between">
            <span className="h-3 w-14 rounded bg-lime/55" />
            <span className="size-6 rounded-full bg-white/12" />
          </div>
          <div className="h-24 rounded-2xl bg-gradient-to-b from-lime/30 to-transparent" />
          <div className="h-2.5 w-4/5 rounded bg-white/28" />
          <div className="h-2.5 w-3/5 rounded bg-white/16" />
          <div className="h-9 rounded-full bg-lime/45" />
          <div className="h-16 rounded-xl bg-white/6" />
          <div className="h-16 rounded-xl bg-white/6" />
        </div>
      </div>

      <div
        ref={cursorRef}
        className="absolute top-[40%] left-[48%] hidden size-5 md:block"
      >
        <svg viewBox="0 0 24 24" className="size-5 drop-shadow-[0_0_12px_rgba(215,255,50,0.55)]">
          <path
            fill="#F7F8FA"
            d="M4 3l12.5 9.2-5.4 1.3 2.8 7.1-2.6 1-2.8-7.1L4 17.5V3z"
          />
          <path fill="#D7FF32" d="M4 3v14.5l4.5-3.8 2.8 7.1 1.3-.5-2.8-7.1L16.5 12.2 4 3z" opacity=".35" />
        </svg>
      </div>

      <div className="absolute right-5 bottom-6 left-5 flex items-center gap-3 md:right-10 md:bottom-8 md:left-10">
        <span className="hidden text-[10px] font-bold tracking-[0.2em] text-white/35 uppercase sm:inline">
          Film
        </span>
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-lime shadow-[0_0_16px_rgba(215,255,50,0.75)]"
          />
        </div>
        <span className="hidden text-[10px] font-bold tracking-[0.2em] text-lime/70 uppercase sm:inline">
          100%
        </span>
      </div>
    </div>
  );
}

function Piece({
  className,
  label,
  lime,
}: {
  className?: string;
  label: string;
  lime?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-2xl border border-white/14 bg-[#14181f]/88 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-md",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full items-end p-3 text-[10px] font-bold tracking-[0.18em] uppercase",
          lime
            ? "bg-gradient-to-br from-lime/40 via-lime/10 to-transparent text-lime"
            : "bg-gradient-to-br from-white/10 to-transparent text-white/45",
        )}
      >
        {label}
      </div>
    </div>
  );
}
