"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Pionowy wskaźnik scrolla w stylu TDA — linia + % po lewej */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const fill = fillRef.current;
    const thumb = thumbRef.current;
    if (!fill) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: reduce ? true : 0.35,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(fill, { scaleY: p });
        if (thumb) gsap.set(thumb, { top: `${p * 100}%` });
        setPct(Math.round(p * 100));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-4 z-[70] hidden h-[42vh] -translate-y-1/2 flex-col items-center md:left-6 lg:flex"
    >
      <div className="relative h-full w-px">
        {/* dashed track */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(247,248,250,0.45) 0 4px, transparent 4px 10px)",
          }}
        />
        {/* solid fill */}
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-lime"
          style={{ boxShadow: "0 0 12px rgba(215,255,50,0.55)" }}
        />
        {/* thumb */}
        <div
          ref={thumbRef}
          className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime"
          style={{
            boxShadow: "0 0 14px 3px rgba(215,255,50,0.75)",
            top: "0%",
          }}
        />
      </div>
      <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-white/45 tabular-nums">
        {String(pct).padStart(2, "0")}%
      </p>
    </div>
  );
}
