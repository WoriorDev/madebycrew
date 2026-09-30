"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = -88;

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Lenis + GSAP ticker + clean in-page anchor scrolling */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setReady(true);

      const onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const el = event.target;
        if (!(el instanceof Element)) return;
        const anchor = el.closest("a[href^='#']");
        if (!(anchor instanceof HTMLAnchorElement)) return;
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const section = document.getElementById(decodeURIComponent(href.slice(1)));
        if (!section) return;
        event.preventDefault();
        const top =
          section.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
        history.replaceState(null, "", href);
      };

      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: easeOutExpo,
      smoothWheel: true,
      touchMultiplier: 1.2,
      anchors: {
        offset: HEADER_OFFSET,
        duration: 1.25,
        easing: easeOutExpo,
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // Keep hash in sync after Lenis finishes an anchor jump
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const el = event.target;
      if (!(el instanceof Element)) return;
      const anchor = el.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.getElementById(decodeURIComponent(href.slice(1)))) return;
      // Lenis handles the scroll via `anchors`; sync URL after click
      window.setTimeout(() => {
        history.replaceState(null, "", href);
      }, 0);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div data-lenis-ready={ready ? "true" : "false"} className="contents">
      {children}
    </div>
  );
}
