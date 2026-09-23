"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    n: "01",
    title: "Landingi",
    text: "First viewport, który sprzedaje. Sekcje, copy, motion, CTA — bez szumu.",
    bar: 92,
  },
  {
    n: "02",
    title: "Aplikacje & sklepy",
    text: "Flow, panele, katalogi. Budujemy pod użycie i utrzymanie.",
    bar: 84,
  },
  {
    n: "03",
    title: "Redesign",
    text: "Stara strona → szybka, czytelna, mobile-first. SEO w pakiecie.",
    bar: 88,
  },
  {
    n: "04",
    title: "Opieka",
    text: "Po live zostajemy: poprawki, nowe sekcje, rozwój produktu.",
    bar: 96,
  },
];

export function Services() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const bars = list.querySelectorAll<HTMLElement>("[data-focus]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      bars.forEach((bar) => {
        const value = Number(bar.dataset.focus || 0);
        bar.style.width = `${value}%`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      bars.forEach((bar) => {
        const value = Number(bar.dataset.focus || 0);
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${value}%`,
            ease: "power2.out",
            duration: 1.15,
            scrollTrigger: {
              trigger: bar,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="uslugi" className="relative z-10 py-24 md:py-40">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-4xl md:mb-24">
          <p className="eyebrow mb-5">Usługi</p>
          <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)] text-off-white">
            Co robimy
            <span className="block text-lime">naprawdę dobrze.</span>
          </h2>
        </Reveal>

        <ul ref={listRef} className="flex flex-col gap-3 md:gap-4">
          {services.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.05}>
              <li className="panel group overflow-hidden rounded-[1.6rem] transition duration-500 hover:border-lime/35 md:rounded-[1.85rem]">
                <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8 lg:p-9">
                  <div className="max-w-2xl">
                    <div className="mb-4 flex items-baseline gap-4">
                      <span className="display text-sm text-lime">{item.n}</span>
                      <h3 className="display text-[clamp(1.85rem,4vw,3.25rem)] text-off-white transition group-hover:text-lime">
                        {item.title}
                      </h3>
                    </div>
                    <p className="max-w-xl text-base leading-relaxed text-white/58 md:text-lg">
                      {item.text}
                    </p>
                  </div>
                  <div className="w-full shrink-0 md:max-w-[14rem]">
                    <div className="mb-2 flex justify-between text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                      <span>Fokus</span>
                      <span className="text-lime">{item.bar}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        data-focus={item.bar}
                        className="h-full w-0 rounded-full bg-lime shadow-[0_0_18px_rgba(215,255,50,0.45)]"
                      />
                    </div>
                  </div>
                </div>
                <div className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-lime via-lime/40 to-transparent transition duration-700 group-hover:scale-x-100" />
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
