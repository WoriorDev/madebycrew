"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Landing studia",
    type: "Strona www",
    year: "2026",
    stack: ["Next.js", "Motion", "GSAP"],
    src: "/brand/case-01-desktop.png",
    blurb:
      "Szybka, czytelna strona pod studio kreatywne: ciemny klimat, mocny brand i animacje, które nie spowalniają.",
  },
  {
    id: "02",
    title: "Strona immersive",
    type: "Web experience",
    year: "2026",
    stack: ["Next.js", "3D", "UI"],
    src: "/brand/case-02-desktop.png",
    blurb:
      "Bardziej filmowy layout z głębią i ruchem, pod marki, które mają wyróżnić się już na pierwszym ekranie.",
  },
];

function splitWords(text: string) {
  return text.split(" ").filter(Boolean);
}

export function Realizations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const headWords = section.querySelectorAll("[data-proj-head-word]");
      const introWords = section.querySelectorAll("[data-proj-intro-word]");
      const eyebrow = section.querySelector("[data-proj-eyebrow]");

      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.set(headWords, { opacity: 0, y: 28 });
      gsap.set(introWords, { opacity: 0, y: 14 });

      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector("[data-proj-header]"),
          start: "top 72%",
          end: "top 32%",
          scrub: 1,
        },
      });

      headTl.to(eyebrow, { opacity: 1, y: 0, duration: 0.35, ease: "none" });
      headTl.to(
        headWords,
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: "none",
        },
        "-=0.1",
      );
      headTl.to(
        introWords,
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: "none",
        },
        "-=0.15",
      );

      section.querySelectorAll<HTMLElement>("[data-proj-item]").forEach((item) => {
        const media = item.querySelector("[data-proj-media]");
        const img = item.querySelector("[data-proj-img]");
        const num = item.querySelector("[data-proj-num]");
        const meta = item.querySelectorAll("[data-proj-meta]");
        const titleWords = item.querySelectorAll("[data-proj-title-word]");
        const stack = item.querySelectorAll("[data-proj-stack]");
        const blurbWords = item.querySelectorAll("[data-proj-blurb-word]");

        gsap.set(media, { clipPath: "inset(12% 8% 12% 8% round 1rem)", opacity: 0.55 });
        gsap.set(img, { scale: 1.12 });
        gsap.set(num, { opacity: 0, y: 24 });
        gsap.set(meta, { opacity: 0, y: 12 });
        gsap.set(titleWords, { opacity: 0, y: 22 });
        gsap.set(stack, { opacity: 0, y: 10 });
        gsap.set(blurbWords, { opacity: 0, y: 12 });

        // Animacja startuje dopiero gdy media jest dobrze w kadrze,
        // a tekst dopina się po otwarciu zdjęcia (dłuższy scrub = spokojniej).
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: media ?? item,
            start: "top 62%",
            end: "top 8%",
            scrub: 1.25,
          },
        });

        tl.to(
          media,
          {
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          0,
        );
        tl.to(img, { scale: 1, duration: 1.15, ease: "none" }, 0);
        tl.to(num, { opacity: 1, y: 0, duration: 0.45, ease: "none" }, 0.35);
        tl.to(
          meta,
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: "none" },
          0.48,
        );
        tl.to(
          titleWords,
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: "none",
          },
          0.55,
        );
        tl.to(
          stack,
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "none" },
          0.68,
        );
        tl.to(
          blurbWords,
          {
            opacity: 1,
            y: 0,
            stagger: 0.035,
            duration: 0.6,
            ease: "none",
          },
          0.78,
        );
      });

      const footer = section.querySelector("[data-proj-footer]");
      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top 88%",
              end: "top 55%",
              scrub: 0.7,
            },
          },
        );
      }
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  const headLines = [
    { text: "Nasze projekty.", lime: false },
    { text: "Tak pracujemy.", lime: true },
  ];

  const intro =
    "Przykłady stylu i poziomu, na jakim budujemy strony, od briefu do wersji gotowej do startu.";

  return (
    <section
      id="projekty"
      ref={sectionRef}
      className="relative z-10 py-24 md:py-32"
    >
      <div className="section-pad mx-auto max-w-7xl">
        <div data-proj-header className="mb-14 max-w-4xl md:mb-20">
          <p data-proj-eyebrow className="eyebrow mb-4">
            Projekty
          </p>
          <h2 className="display text-[clamp(1.85rem,1rem+3vw,4.25rem)] text-off-white">
            {headLines.map((line) => (
              <span
                key={line.text}
                className={`mt-1 block first:mt-0 ${line.lime ? "text-lime" : ""}`}
              >
                {splitWords(line.text).map((word, i) => (
                  <span key={`${line.text}-${i}`}>
                    <span
                      data-proj-head-word
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </span>
                    {i < splitWords(line.text).length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-lg text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed text-white/45">
            {splitWords(intro).map((word, i) => (
              <span key={`intro-${i}`}>
                <span
                  data-proj-intro-word
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
                {i < splitWords(intro).length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((item, i) => (
            <article key={item.id} data-proj-item className="group">
              <div
                data-proj-media
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 will-change-transform"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/10]">
                  <div
                    data-proj-img
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover object-center"
                      priority={i === 0}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                  <p
                    data-proj-num
                    className="display absolute top-5 left-5 text-4xl text-lime/90 md:top-8 md:left-8 md:text-6xl"
                  >
                    {item.id}
                  </p>

                  <div className="absolute right-5 bottom-5 left-5 flex flex-wrap items-end justify-between gap-4 md:right-8 md:bottom-8 md:left-8">
                    <div>
                      <p className="text-[11px] tracking-[0.18em] text-white/50 uppercase">
                        <span data-proj-meta>{item.type}</span>
                        <span className="mx-2 text-lime/50">·</span>
                        <span data-proj-meta>{item.year}</span>
                      </p>
                      <h3 className="display mt-2 text-[clamp(1.6rem,3.5vw,2.75rem)] text-off-white">
                        {splitWords(item.title).map((word, wi) => (
                          <span key={`${item.id}-t-${wi}`}>
                            <span
                              data-proj-title-word
                              className="inline-block will-change-transform"
                            >
                              {word}
                            </span>
                            {wi < splitWords(item.title).length - 1 ? " " : ""}
                          </span>
                        ))}
                      </h3>
                    </div>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1">
                      {item.stack.map((s) => (
                        <li
                          key={s}
                          data-proj-stack
                          className="text-[11px] tracking-[0.14em] text-lime/80 uppercase"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 md:mt-6 md:text-[0.95rem]">
                {splitWords(item.blurb).map((word, wi) => (
                  <span key={`${item.id}-b-${wi}`}>
                    <span
                      data-proj-blurb-word
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </span>
                    {wi < splitWords(item.blurb).length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>

        <div
          data-proj-footer
          className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-10 md:mt-20 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-md text-sm text-white/40">
            Masz pomysł na stronę? Napisz, a dopasujemy kierunek do Twojej marki
            i powiemy wprost, co da się zrobić.
          </p>
          <a
            href="#kontakt"
            className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/[0.06] px-6 text-[13px] font-semibold text-off-white transition hover:border-lime/45 hover:text-lime"
          >
            Porozmawiajmy o projekcie
          </a>
        </div>
      </div>
    </section>
  );
}
