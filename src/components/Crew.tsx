"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const story = [
  "Jesteśmy dwuosobowym crew programistów z doświadczeniem.",
  "Łączymy design i kod w jeden proces: od pierwszej rozmowy",
  "po landing, stronę firmową albo sklep, który faktycznie dowozi.",
  "Bez pośredników, bez zgadywania i bez oddawania projektu w próżnię.",
  "Pełny ownership od briefu do live, z motionem i performance’em",
  "takim, żebyście nie musieli wracać z poprawkami za rok.",
];

const stats = [
  { value: "4 000+", label: "Godzin pracy" },
  { value: "30+", label: "Skończonych prac" },
  { value: "100%", label: "Ownership" },
];

type TechNode = {
  name: string;
  src: string;
  role: string;
  ring: 1 | 2;
};

const technologies: TechNode[] = [
  { name: "Next.js", src: "/tech/nextjs.svg", role: "App & SSR", ring: 1 },
  { name: "React", src: "/tech/react.svg", role: "Interfejs", ring: 1 },
  { name: "TypeScript", src: "/tech/typescript.svg", role: "Typy", ring: 1 },
  { name: "Tailwind", src: "/tech/tailwind.svg", role: "Styling", ring: 1 },
  { name: "GSAP", src: "/tech/gsap.svg", role: "Scroll", ring: 1 },
  { name: "Motion", src: "/tech/motion.svg", role: "UI motion", ring: 1 },
  { name: "Node.js", src: "/tech/nodejs.svg", role: "API", ring: 1 },
  { name: "Vercel", src: "/tech/vercel.svg", role: "Hosting", ring: 1 },
  { name: "Vite", src: "/tech/vite.svg", role: "Build", ring: 2 },
  { name: "Prisma", src: "/tech/prisma.svg", role: "ORM", ring: 2 },
  { name: "PostgreSQL", src: "/tech/postgresql.svg", role: "Baza", ring: 2 },
  { name: "Supabase", src: "/tech/supabase.svg", role: "Backend", ring: 2 },
  { name: "Docker", src: "/tech/docker.svg", role: "Kontenery", ring: 2 },
  { name: "Figma", src: "/tech/figma.svg", role: "Design", ring: 2 },
  { name: "Cloudflare", src: "/tech/cloudflare.svg", role: "CDN", ring: 2 },
  { name: "Three.js", src: "/tech/threejs.svg", role: "3D", ring: 2 },
];

function polar(count: number, index: number, radius: number, offset = -90) {
  const angle = ((index / count) * 360 + offset) * (Math.PI / 180);
  return {
    angle,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

function pointOnRay(angle: number, radius: number) {
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

function TechNetwork() {
  const ring1 = technologies.filter((t) => t.ring === 1);
  const ring2 = technologies.filter((t) => t.ring === 2);

  const nodes = [
    ...ring1.map((t, i) => ({ ...t, ...polar(ring1.length, i, 29) })),
    ...ring2.map((t, i) => ({ ...t, ...polar(ring2.length, i, 43, -67.5) })),
  ];

  const HUB_R = 10;
  const ICON_CLEAR = 5.5;

  return (
    <div
      data-crew-tech
      className="relative mx-auto aspect-square w-full max-w-[min(88vw,520px)] md:max-w-[min(72vw,600px)] lg:max-w-[640px]"
    >
      <svg
        className="pointer-events-none absolute inset-0 z-[1] size-full overflow-visible"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <radialGradient id="crew-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D7FF32" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D7FF32" stopOpacity="0" />
          </radialGradient>
          {nodes.map((n) => {
            const from = pointOnRay(n.angle, HUB_R);
            const to = pointOnRay(
              n.angle,
              (n.ring === 1 ? 29 : 43) - ICON_CLEAR,
            );
            return (
              <linearGradient
                key={`grad-${n.name}`}
                id={`crew-line-${n.name}`}
                gradientUnits="userSpaceOnUse"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              >
                <stop offset="0%" stopColor="#D7FF32" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#D7FF32" stopOpacity="0.12" />
              </linearGradient>
            );
          })}
        </defs>

        <circle cx="50" cy="50" r="16" fill="url(#crew-hub-glow)" />
        <circle
          cx="50"
          cy="50"
          r="29"
          fill="none"
          stroke="rgba(215,255,50,0.12)"
          strokeWidth="0.15"
          strokeDasharray="1.2 1.4"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.12"
          strokeDasharray="0.8 1.6"
        />

        <g data-crew-tech-lines>
          {nodes.map((n) => {
            const nodeR = n.ring === 1 ? 29 : 43;
            const from = pointOnRay(n.angle, HUB_R);
            const to = pointOnRay(n.angle, nodeR - ICON_CLEAR);
            return (
              <line
                key={`line-${n.name}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={`url(#crew-line-${n.name})`}
                strokeWidth="0.22"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </svg>

      <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span
          aria-hidden
          className="absolute size-28 rounded-full bg-black/45 blur-2xl md:size-32"
        />
        <span
          aria-hidden
          className="absolute size-20 rounded-full bg-lime/20 blur-xl md:size-24"
        />
        <span className="relative flex size-16 items-center justify-center rounded-full border border-white/10 bg-black/55 shadow-[0_0_32px_rgba(0,0,0,0.55),0_0_22px_rgba(215,255,50,0.3)] backdrop-blur-md md:size-[4.5rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/mark.png"
            alt="MadeByCrew"
            width={64}
            height={64}
            className="size-9 object-contain md:size-10"
            draggable={false}
          />
        </span>
      </div>

      {nodes.map((n) => (
        <div
          key={n.name}
          data-crew-tech-item
          className="absolute z-10 flex w-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 sm:w-[5rem] md:w-[5.5rem]"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#0a0c0e]/55 shadow-[0_0_16px_rgba(215,255,50,0.1)] backdrop-blur-sm sm:size-10 md:size-11">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={n.src}
              alt=""
              width={28}
              height={28}
              className="size-5 object-contain md:size-6"
              draggable={false}
            />
          </span>
          <span className="text-[9px] font-semibold tracking-[-0.01em] text-off-white sm:text-[10px]">
            {n.name}
          </span>
          <span className="text-[8px] tracking-[0.12em] text-lime/70 uppercase">
            {n.role}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Crew() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = useMemo(
    () =>
      story.flatMap((line, lineIndex) => {
        const parts = line.split(" ");
        return parts.map((word, wordIndex) => ({
          word,
          key: `${lineIndex}-${wordIndex}-${word}`,
          breakAfter: wordIndex === parts.length - 1,
        }));
      }),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = wordsRef.current.filter(Boolean);
    const intro = section.querySelector<HTMLElement>("[data-crew-intro]");
    const track = section.querySelector<HTMLElement>("[data-crew-track]");
    const title = section.querySelectorAll("[data-crew-title]");
    const storyEl = section.querySelector<HTMLElement>("[data-crew-story]");
    const statsWrap = section.querySelector<HTMLElement>("[data-crew-stats]");
    const statsEl = section.querySelectorAll("[data-crew-stat]");
    const techTitle = section.querySelectorAll("[data-crew-tech-title]");
    const techBlock = section.querySelector<HTMLElement>("[data-crew-tech]");
    const techItems = section.querySelectorAll("[data-crew-tech-item]");
    const techLines = section.querySelector<HTMLElement>("[data-crew-tech-lines]");

    if (reduce) {
      if (intro) gsap.set(intro, { opacity: 0 });
      gsap.set(
        [title, els, storyEl, statsWrap, statsEl, techTitle, techBlock, techItems, techLines],
        { opacity: 1, y: 0, scale: 1 },
      );
      gsap.set(track, { y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 1 });
      gsap.set(track, { y: 0 });
      gsap.set(title, { opacity: 0, y: 28 });
      gsap.set(els, { opacity: 0, y: 14 });
      gsap.set(storyEl, { opacity: 1 });
      gsap.set(statsWrap, { opacity: 0, y: 16 });
      gsap.set(statsEl, { opacity: 0, y: 12 });
      gsap.set(techTitle, { opacity: 0, y: 28 });
      gsap.set(techBlock, { opacity: 1 });
      gsap.set(techItems, { opacity: 0, scale: 0.85 });
      gsap.set(techLines, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 5.2}`,
          pin: pin,
          pinType: "transform",
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(intro, { opacity: 1, duration: 0.28, ease: "none" });
      tl.to(intro, { opacity: 0, y: -18, duration: 0.3, ease: "none" });

      tl.to(
        title,
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.36, ease: "none" },
        "-=0.04",
      );
      tl.to(els, {
        opacity: 1,
        y: 0,
        stagger: 0.038,
        duration: 0.6,
        ease: "none",
      });
      tl.to(
        [statsWrap, statsEl],
        { opacity: 1, y: 0, duration: 0.3, ease: "none" },
        "-=0.06",
      );

      tl.to({}, { duration: 1.25 });

      tl.to(track, {
        y: () => -window.innerHeight,
        duration: 1.1,
        ease: "none",
      });

      tl.to(
        techTitle,
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.35, ease: "none" },
        "-=0.45",
      );
      tl.to(
        techLines,
        { opacity: 1, duration: 0.3, ease: "none" },
        "-=0.1",
      );
      tl.to(
        techItems,
        {
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          duration: 0.4,
          ease: "none",
        },
        "-=0.2",
      );

      tl.to({}, { duration: 1.45 });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [words]);

  return (
    <section id="crew" ref={sectionRef} className="relative z-10">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <div
          data-crew-intro
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6"
        >
          <p className="display max-w-3xl text-center text-[clamp(1.6rem,1rem+2.8vw,3.25rem)] leading-[1.15] text-off-white">
            Chcesz wiedzieć coś o nas?
          </p>
        </div>

        <div data-crew-track className="will-change-transform">
          <div className="flex h-[100svh] flex-col justify-center py-8 sm:py-10 md:py-14">
            <div
              data-crew-about
              className="section-pad relative z-10 mx-auto w-full max-w-7xl"
            >
              <p data-crew-title className="eyebrow mb-3 md:mb-5">
                O nas
              </p>

              <h2 className="display max-w-4xl text-[clamp(2rem,1.1rem+3.5vw,4.25rem)] leading-[1.05] text-off-white">
                <span data-crew-title className="block">
                  Dwóch ziomków.
                </span>
                <span data-crew-title className="mt-1 block text-lime">
                  Jeden standard.
                </span>
              </h2>

              <div className="mt-6 max-w-3xl md:mt-10 lg:max-w-4xl">
                <p
                  data-crew-story
                  className="max-w-none text-[clamp(1rem,0.85rem+1.1vw,1.3rem)] leading-[1.6] font-medium tracking-[-0.01em] text-pretty text-off-white"
                  aria-label={story.join(" ")}
                >
                  {words.map((item, i) => (
                    <span key={item.key}>
                      <span
                        ref={(el) => {
                          if (el) wordsRef.current[i] = el;
                        }}
                        className="inline-block will-change-transform"
                      >
                        {item.word}
                      </span>
                      {item.breakAfter ? <br /> : " "}
                    </span>
                  ))}
                </p>

                <div
                  data-crew-stats
                  className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-7 md:mt-10 md:gap-6 md:pt-9"
                >
                  {stats.map((s) => (
                    <div key={s.label} data-crew-stat>
                      <p className="display text-2xl text-lime md:text-3xl lg:text-4xl">
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-[11px] tracking-[0.14em] text-white/40 uppercase">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="relative z-20 flex h-0 items-center justify-center"
          >
            <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-center px-8">
              <div className="flex w-full max-w-xl items-center gap-4 md:max-w-2xl md:gap-5">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-lime/40" />
                <span className="relative flex size-3 items-center justify-center">
                  <span className="absolute size-3 rotate-45 border border-lime/50 bg-lime/15 shadow-[0_0_18px_rgba(215,255,50,0.45)]" />
                  <span className="relative size-1.5 rotate-45 bg-lime" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/25 to-lime/40" />
              </div>
            </div>
          </div>

          <div className="flex h-[100svh] flex-col items-center justify-center gap-4 px-4 pt-12 pb-6 sm:gap-5 md:gap-6 md:pt-14 md:pb-10">
            <h3 className="display shrink-0 max-w-3xl px-4 text-center text-[clamp(1.35rem,0.9rem+2vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-off-white">
              <span data-crew-tech-title className="block">
                Z takich technologii
              </span>
              <span data-crew-tech-title className="mt-1 block text-lime">
                korzystamy.
              </span>
            </h3>

            <div className="flex w-full shrink-0 items-center justify-center">
              <TechNetwork />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
