"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Soft lime atmosphere — Pinterest glass/dark app style, MadeByCrew colors */
export function Atmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const orbs = root.querySelectorAll<HTMLElement>("[data-orb]");
    const ctx = gsap.context(() => {
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -80 : 60,
          x: i % 2 === 0 ? 40 : -50,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050607]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(215,255,50,0.12),transparent_55%)]" />
      <div
        data-orb
        className="absolute top-[8%] left-[10%] size-[42vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.28),transparent_68%)] blur-3xl"
      />
      <div
        data-orb
        className="absolute top-[35%] right-[5%] size-[48vw] max-w-[620px] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.16),transparent_70%)] blur-3xl"
      />
      <div
        data-orb
        className="absolute bottom-[10%] left-[30%] size-[36vw] max-w-[420px] rounded-full bg-[radial-gradient(circle,rgba(247,248,250,0.08),transparent_70%)] blur-3xl"
      />
      <div className="film-noise absolute inset-0 opacity-25" />
    </div>
  );
}
