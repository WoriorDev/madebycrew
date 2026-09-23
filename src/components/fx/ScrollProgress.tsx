"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Górny pasek postępu scrolla — cienki track + limonkowy fill ze świecącą końcówką */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const tip = tipRef.current;
    if (!fill) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tween = gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.35,
          onUpdate: (self) => {
            if (!tip) return;
            const p = self.progress;
            gsap.set(tip, {
              left: `${p * 100}%`,
              opacity: p > 0.01 && p < 0.995 ? 1 : 0,
            });
          },
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]"
    >
      {/* delikatny track */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04]" />

      {/* fill */}
      <div
        ref={fillRef}
        className="absolute inset-y-0 left-0 w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(215,255,50,0.35) 0%, #D7FF32 55%, #f0ff9a 100%)",
          boxShadow:
            "0 0 12px rgba(215,255,50,0.55), 0 0 28px rgba(215,255,50,0.25)",
        }}
      />

      {/* świecąca końcówka */}
      <div
        ref={tipRef}
        className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-off-white opacity-0"
        style={{
          boxShadow:
            "0 0 10px 3px rgba(215,255,50,0.85), 0 0 22px 6px rgba(215,255,50,0.35)",
        }}
      />
    </div>
  );
}
