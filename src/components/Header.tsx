"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrandBanner } from "./Brand";
import { cn } from "@/lib/utils";

const links = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#proces", label: "Proces" },
  { href: "#crew", label: "Crew" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 md:px-5",
          scrolled || open
            ? "border-white/10 bg-graphite/80 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-white/5 bg-graphite/35 backdrop-blur-md",
        )}
      >
        <a href="#top" className="inline-flex shrink-0" aria-label="MadeByCrew.pl">
          <BrandBanner className="h-10 w-auto md:h-12" priority />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Główne">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-off-white/65 transition hover:bg-white/5 hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="ml-2 inline-flex h-10 items-center rounded-full bg-lime px-4 text-sm font-semibold text-graphite transition hover:brightness-110"
          >
            Start projektu
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex w-4 flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-full bg-off-white transition",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-off-white transition",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-graphite/95 p-4 backdrop-blur-xl md:hidden"
            aria-label="Mobilne"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-off-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#kontakt"
                  className="mt-2 inline-flex rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-graphite"
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
