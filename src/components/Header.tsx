"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BrandBanner } from "./Brand";
import { cn } from "@/lib/utils";

const links = [
  { href: "#uslugi", label: "Oferta" },
  { href: "#proces", label: "Proces" },
  { href: "#realizacje", label: "Prace" },
  { href: "#crew", label: "Crew" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-pad mx-auto flex max-w-7xl items-center justify-between py-5 md:py-6">
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
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-white/55 transition hover:text-lime"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden h-10 items-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-[13px] font-semibold text-off-white backdrop-blur-md transition hover:border-lime/45 hover:text-lime sm:inline-flex"
          >
            Start projektu
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md lg:hidden"
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
            className="section-pad mx-auto max-w-7xl lg:hidden"
          >
            <ul className="glass-card flex flex-col gap-1 p-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
