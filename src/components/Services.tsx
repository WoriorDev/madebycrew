"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const GAP = 20;
const MAX_CARD_DESKTOP = 340;
const MAX_CARD_MOBILE = 360;
const MQ = "(min-width: 768px)";

const packages = [
  {
    id: "landing",
    name: "Wizytówka",
    blurb:
      "Jedna strona, która skupia uwagę na Twojej ofercie i zachęca do kontaktu.",
    cta: "Zapytaj o wizytówkę",
    popular: false,
    icon: "/brand/icon-launch.png",
    features: [
      "Indywidualny projekt",
      "Prezentacja usługi lub produktu",
      "Formularz kontaktowy",
      "Dopasowanie do telefonów",
      "Publikacja gotowej strony",
    ],
  },
  {
    id: "firmowa",
    name: "Strona firmowa",
    blurb:
      "Pokaż, czym się zajmujesz, co Cię wyróżnia i dlaczego warto Ci zaufać.",
    cta: "Zapytaj o stronę firmową",
    popular: true,
    icon: "/brand/icon-growth.png",
    features: [
      "Projekt dopasowany do marki",
      "Podstrony oferty i realizacji",
      "Wygodna edycja treści",
      "Podstawowa konfiguracja SEO",
      "Formularz kontaktowy",
    ],
  },
  {
    id: "sklep",
    name: "Sklep internetowy",
    blurb:
      "Zamień zainteresowanie Twoimi produktami w wygodne zakupy online.",
    cta: "Zapytaj o sklep",
    popular: false,
    icon: "/brand/icon-custom.png",
    features: [
      "Katalog i karty produktów",
      "Koszyk i składanie zamówień",
      "Integracja płatności i dostaw",
      "Panel zarządzania sklepem",
      "Dopasowanie do telefonów",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    blurb:
      "Aplikacje, panele i integracje poza standardem. Budujemy dokładnie pod Twój scope.",
    cta: "Zapytaj o Custom",
    popular: false,
    icon: "/brand/icon-custom.png",
    features: [
      "Indywidualny zakres i wycena",
      "Aplikacje i panele webowe",
      "Integracje pod brief",
      "Handover albo opieka",
      "Priorytetowy kontakt z crew",
    ],
  },
  {
    id: "redesign",
    name: "Redesign",
    blurb:
      "Odśwież wygląd i strukturę obecnej strony, żeby lepiej sprzedawała i wyglądała współcześnie.",
    cta: "Zapytaj o redesign",
    popular: false,
    icon: "/brand/icon-growth.png",
    features: [
      "Audit obecnej strony",
      "Nowy kierunek wizualny",
      "Lepsza struktura treści",
      "Mobile-first i performance",
      "Wdrożenie bez chaosu",
    ],
  },
  {
    id: "aplikacja",
    name: "Aplikacja webowa",
    blurb:
      "Produkt cyfrowy z logiką, kontami i panelami, nie tylko strona wizytówka.",
    cta: "Zapytaj o aplikację",
    popular: false,
    icon: "/brand/icon-launch.png",
    features: [
      "Flow UX i architektura",
      "Konta, role, panele",
      "Integracje API",
      "Bezpieczeństwo i skalowanie",
      "Wsparcie po starcie",
    ],
  },
];

function getVisible() {
  if (typeof window === "undefined") return 3;
  return window.matchMedia(MQ).matches ? 3 : 1;
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLElement>(null);
  const edgeLeftRef = useRef<HTMLDivElement>(null);
  const edgeRightRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [visible, setVisible] = useState(3);

  const maxIndex = Math.max(0, packages.length - visible);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const viewport = viewportRef.current;
    if (!shell || !viewport) return;

    const measure = () => {
      const v = getVisible();
      setVisible(v);
      const available = shell.clientWidth;
      const maxW = v === 1 ? MAX_CARD_MOBILE : MAX_CARD_DESKTOP;
      const w = Math.min(
        maxW,
        Math.floor((available - GAP * (v - 1)) / v),
      );
      setCardW(w);
      viewport.style.width = `${w * v + GAP * (v - 1)}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(shell);
    const mql = window.matchMedia(MQ);
    mql.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mql.removeEventListener("change", measure);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const popular = popularRef.current;
    const edgeL = edgeLeftRef.current;
    const edgeR = edgeRightRef.current;
    if (!section || !track || cardW <= 0 || maxIndex <= 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const step = cardW + GAP;
    const fadeScroll = () => window.innerHeight * 0.7;
    const moveScroll = () => maxIndex * window.innerHeight * 0.9;

    const ctx = gsap.context(() => {
      gsap.set(track, { x: 0 });
      // Popular floats above the strip — scale outside overflow, no inner scroll
      if (popular) {
        gsap.set(popular, {
          transformOrigin: "50% 50%",
          scale: 1.05,
          zIndex: 20,
        });
      }
      if (edgeL) gsap.set(edgeL, { opacity: 0 });
      if (edgeR) gsap.set(edgeR, { opacity: 0 });

      const fadeEdgeL = edgeL
        ? gsap.quickTo(edgeL, "opacity", { duration: 0.35, ease: "power2.out" })
        : null;
      const fadeEdgeR = edgeR
        ? gsap.quickTo(edgeR, "opacity", { duration: 0.35, ease: "power2.out" })
        : null;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${fadeScroll() + moveScroll()}`,
          pin: true,
          pinType: "transform",
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => {
              const total = fadeScroll() + moveScroll();
              const fadeP = fadeScroll() / total;
              if (value <= fadeP) return 0;
              const t = (value - fadeP) / (1 - fadeP);
              return (
                fadeP + (Math.round(t * maxIndex) / maxIndex) * (1 - fadeP)
              );
            },
            duration: { min: 0.15, max: 0.4 },
            delay: 0.04,
            ease: "power1.inOut",
            onComplete: () => {
              fadeEdgeL?.(0);
              fadeEdgeR?.(0);
            },
          },
          onUpdate: (self) => {
            const total = fadeScroll() + moveScroll();
            const fadeP = fadeScroll() / total;
            let glow = 0;
            if (self.progress > fadeP) {
              const t = (self.progress - fadeP) / (1 - fadeP);
              const raw = t * maxIndex;
              const dist = Math.abs(raw - Math.round(raw));
              // smooth bell: 0 at snap, 1 at midpoint
              glow = Math.min(1, Math.sin(Math.min(1, dist * 2) * Math.PI));
            }
            fadeEdgeL?.(glow);
            fadeEdgeR?.(glow);
          },
        },
      });

      const fadeDur = fadeScroll() / (fadeScroll() + moveScroll());
      const moveDur = 1 - fadeDur;

      if (popular) {
        const badge = popular.querySelector("[data-popular-badge]");
        tl.to(
          popular,
          {
            scale: 1,
            zIndex: 1,
            borderColor: "rgba(247,248,250,0.12)",
            backgroundColor: "rgba(0,0,0,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: fadeDur,
            ease: "power1.inOut",
          },
          0,
        );
        if (badge) {
          tl.to(
            badge,
            { opacity: 0, duration: fadeDur, ease: "power1.inOut" },
            0,
          );
        }
        const cta = popular.querySelector("[data-popular-cta]");
        if (cta) {
          tl.to(
            cta,
            {
              backgroundColor: "rgba(255,255,255,0.03)",
              color: "#f7f8fa",
              borderColor: "rgba(247,248,250,0.12)",
              duration: fadeDur,
              ease: "power1.inOut",
            },
            0,
          );
        }
      } else {
        tl.to({}, { duration: fadeDur }, 0);
      }

      tl.to(
        track,
        {
          x: -maxIndex * step,
          duration: moveDur,
        },
        fadeDur,
      );
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [cardW, maxIndex]);

  return (
    <section id="uslugi" ref={sectionRef} className="relative z-10">
      <div className="flex min-h-[100svh] flex-col justify-center py-20 md:py-24">
        <div className="section-pad mx-auto mb-10 w-full max-w-7xl text-center md:mb-14">
          <p className="eyebrow mb-4">Oferty</p>
          <h2 className="display flex flex-col items-center text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95]">
            <span className="text-off-white">Twój biznes.</span>
            <span className="whitespace-nowrap text-lime">
              Nasza dobra robota.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
            Od pierwszej strony po rozbudowany sklep. Wybierz, czego potrzebujesz,
            a my zadbamy o projekt i wykonanie.
          </p>
        </div>

        <div
          ref={shellRef}
          className="section-pad mx-auto flex w-full max-w-7xl justify-center"
        >
          {/* outer: room for Popular sticking out — no scroll here */}
          <div className="relative overflow-visible py-6 md:py-8">
            {/* inner strip: only horizontal clip, never scrolls itself */}
            <div
              ref={viewportRef}
              className="overflow-x-clip overflow-y-visible"
              style={{ touchAction: "pan-y" }}
            >
              <div
                ref={trackRef}
                className="flex items-center will-change-transform"
                style={{ gap: GAP }}
              >
                {packages.map((pkg) => (
                  <article
                    key={pkg.id}
                    ref={pkg.popular ? popularRef : undefined}
                    style={{
                      width: cardW || undefined,
                      flex: cardW ? `0 0 ${cardW}px` : "0 0 auto",
                    }}
                    className={cn(
                      "wire-card relative box-border flex flex-col p-6 md:p-7",
                      !cardW && "w-full max-w-[340px]",
                      pkg.popular &&
                        "z-20 origin-center scale-[1.05] border-lime/50 bg-white/[0.05] shadow-[0_0_40px_rgba(215,255,50,0.12)]",
                    )}
                  >
                    {pkg.popular && (
                      <span
                        data-popular-badge
                        className="absolute top-5 right-5 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-graphite uppercase"
                      >
                        Popular
                      </span>
                    )}

                    <div className="relative mb-5 h-14 w-14">
                      <Image
                        src={pkg.icon}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain object-left"
                      />
                    </div>

                    <h3 className="min-h-[3rem] text-[1.25rem] font-semibold tracking-[-0.02em] text-off-white md:text-[1.35rem]">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 min-h-[4rem] text-sm leading-relaxed text-white/45">
                      {pkg.blurb}
                    </p>

                    <a
                      href="#kontakt"
                      data-popular-cta={pkg.popular ? true : undefined}
                      className={cn(
                        "mt-6 inline-flex h-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition",
                        pkg.popular
                          ? "border-transparent bg-lime text-graphite hover:brightness-110"
                          : "border-white/12 bg-white/[0.03] text-off-white hover:border-lime/40 hover:text-lime",
                      )}
                    >
                      {pkg.cta}
                    </a>

                    <ul className="mt-7 flex flex-col gap-2.5 border-t border-white/8 pt-6">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-white/60"
                        >
                          <span
                            className={cn(
                              "mt-1.5 size-1.5 shrink-0 rounded-full",
                              pkg.popular ? "bg-lime" : "bg-white/35",
                            )}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div
              ref={edgeLeftRef}
              aria-hidden
              className="pointer-events-none absolute -top-10 -bottom-10 -left-10 z-30 w-20 opacity-0"
            >
              <div
                className="absolute inset-y-0 left-1/2 w-20 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.22)_38%,transparent_72%)] blur-[10px]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-white/80 blur-[5px]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 3%, #000 8%, #000 92%, rgba(0,0,0,0.5) 97%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 3%, #000 8%, #000 92%, rgba(0,0,0,0.5) 97%, transparent 100%)",
                }}
              />
            </div>
            <div
              ref={edgeRightRef}
              aria-hidden
              className="pointer-events-none absolute -top-10 -bottom-10 -right-10 z-30 w-20 opacity-0"
            >
              <div
                className="absolute inset-y-0 left-1/2 w-20 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.22)_38%,transparent_72%)] blur-[10px]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-white/80 blur-[5px]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 3%, #000 8%, #000 92%, rgba(0,0,0,0.5) 97%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 3%, #000 8%, #000 92%, rgba(0,0,0,0.5) 97%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <p className="section-pad mx-auto mt-10 max-w-lg text-center text-sm leading-relaxed text-white/45 md:mt-12 md:text-base">
          Każdy projekt wyceniamy indywidualnie, po poznaniu Twoich potrzeb.
        </p>

        <div
          aria-hidden
          className="section-pad relative z-20 mx-auto mt-14 flex max-w-7xl items-center justify-center md:mt-20"
        >
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
    </section>
  );
}
