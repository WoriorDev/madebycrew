"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandBanner } from "./Brand";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "#crew", label: "O nas" },
  { href: "#projekty", label: "Projekty" },
  { href: "#uslugi", label: "Oferty" },
  { href: "#proces", label: "Proces" },
  { href: "#kontakt", label: "Kontakt" },
];

function getActiveHref() {
  if (window.scrollY < 80) return "";

  let bestHref = "";
  let bestVisible = 0;

  for (const link of links) {
    const el = document.getElementById(link.href.slice(1));
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visible = Math.max(0, visibleBottom - visibleTop);

    // Która sekcja realnie zajmuje najwięcej viewportu
    // (długi pin O nas nie blokuje wtedy Projektów)
    if (visible > bestVisible) {
      bestVisible = visible;
      bestHref = link.href;
    }
  }

  if (bestVisible < window.innerHeight * 0.18) return "";
  return bestHref;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sync = () => {
      setScrolled(window.scrollY > 16);
      setActive(getActiveHref());
    };

    sync();

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: sync,
      onRefresh: sync,
    });

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      sync();
    }, 400);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      st.kill();
    };
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter,box-shadow] duration-300",
        solid
          ? "border-b border-white/8 bg-white/[0.05] backdrop-blur-[6px]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="section-pad mx-auto flex max-w-[96rem] items-center justify-between py-4 md:py-5">
        <a href="#top" className="inline-flex items-center gap-3" aria-label="MadeByCrew.pl">
          <Image
            src="/brand/mark.png"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain mix-blend-screen"
            priority
          />
          <BrandBanner className="hidden h-6 w-auto sm:block md:h-7" priority />
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          aria-label="Główne"
        >
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition",
                  isActive
                    ? "text-lime"
                    : "text-white/70 hover:bg-white/5 hover:text-lime",
                )}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-0.5 mx-auto h-px bg-lime/80"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden h-10 items-center rounded-full border border-white/15 bg-white/[0.06] px-5 text-[13px] font-semibold text-off-white backdrop-blur-md transition hover:border-lime/45 hover:text-lime sm:inline-flex"
          >
            Start projektu
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-md lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex w-4 flex-col gap-1.5">
              <span
                className={cn(
                  "h-px w-full bg-white transition",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-white transition",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="section-pad mx-auto max-w-[96rem] pb-4 lg:hidden"
          >
            <ul className="glass-card flex flex-col gap-1 p-3">
              {links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition",
                        isActive
                          ? "text-lime underline decoration-lime/80 underline-offset-4"
                          : "text-white/85 hover:bg-white/5",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="#kontakt"
                  className="mt-1 inline-flex rounded-full bg-lime px-5 py-3 text-sm font-bold text-graphite"
                  onClick={() => setOpen(false)}
                >
                  Start projektu
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
