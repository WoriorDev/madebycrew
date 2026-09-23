"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Pionowy wskaźnik scrolla — linia + kropka (bez %) */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!fill || !thumb || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (raw: number) => {
      // twardsze dociąganie do 0/1 na krańcach
      let p = raw;
      if (p < 0.01) p = 0;
      if (p > 0.985) p = 1;

      gsap.set(fill, { scaleY: p });

      const travel = Math.max(0, track.offsetHeight - thumb.offsetHeight);
      gsap.set(thumb, { y: travel * p, top: 0 });
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      scrub: reduce ? true : 0.2,
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => apply(self.progress),
    });

    // Lenis / layout: dociśnij stan po resize i na końcu
    const onResize = () => apply(st.progress);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => apply(st.progress));

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-4 z-[70] hidden h-[42vh] -translate-y-1/2 md:left-6 lg:block"
    >
      <div ref={trackRef} className="relative h-full w-px">
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
        <div
          ref={thumbRef}
          className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-lime"
          style={{
            boxShadow: "0 0 14px 3px rgba(215,255,50,0.75)",
          }}
        />
      </div>
    </div>
  );
}
