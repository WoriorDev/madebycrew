"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", title: "Brief", text: "Cel, odbiorca, deadline, budżet. Bez zgadywania." },
  { n: "02", title: "Kierunek", text: "Mood, struktura, copy. Widzisz to przed kodem." },
  { n: "03", title: "Build", text: "Motion, performance, mobile-first. Czysty front." },
  { n: "04", title: "Launch", text: "Live, poprawki, handover. Potem rozwój razem." },
];

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proces" className="relative z-10 overflow-hidden">
      <div className="section-pad mx-auto max-w-7xl py-16 md:py-24">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-5">Proces</p>
          <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)] text-off-white">
            Od briefu
            <span className="block text-lime">do live.</span>
          </h2>
        </Reveal>
        <div className="mt-8 hidden h-1 overflow-hidden rounded-full bg-white/10 lg:block">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 rounded-full bg-lime"
          />
        </div>
      </div>

      <div className="lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-4 px-[clamp(1.25rem,5vw,4rem)] pb-20 lg:w-max lg:flex-row lg:items-center lg:gap-6 lg:px-[10vw] lg:pb-0"
        >
          {steps.map((step, i) => (
            <article
              key={step.n}
              className="panel relative min-h-[16rem] w-full shrink-0 overflow-hidden rounded-[2rem] p-8 lg:h-[26rem] lg:w-[32rem]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(215,255,50,0.12),transparent_45%)]" />
              <div className="relative flex h-full flex-col">
                <p className="display text-lime">{step.n}</p>
                <h3 className="display mt-10 text-4xl text-off-white md:text-6xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-white/55">
                  {step.text}
                </p>
                <div className="mt-auto pt-10">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-lime"
                      style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
