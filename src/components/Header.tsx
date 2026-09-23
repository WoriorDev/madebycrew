"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-300 md:px-4",
          scrolled || open
            ? "border-white/12 bg-black/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "border-white/8 bg-black/35 backdrop-blur-xl",
        )}
      >
        <a href="#top" className="inline-flex items-center gap-3 pl-1" aria-label="MadeByCrew.pl">
          <Image
            src="/brand/mark.png"
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain mix-blend-screen"
            priority
          />
          <BrandBanner className="hidden h-8 w-auto sm:block md:h-9" priority />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Główne">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="ml-2 inline-flex h-11 items-center rounded-full bg-lime px-5 text-sm font-bold text-graphite transition hover:brightness-110"
          >
            Start projektu
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/12 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex w-4 flex-col gap-1.5">
            <span className={cn("h-px w-full bg-white transition", open && "translate-y-[3.5px] rotate-45")} />
            <span className={cn("h-px w-full bg-white transition", open && "-translate-y-[3.5px] -rotate-45")} />
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-black/90 p-4 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#kontakt"
                  className="mt-2 inline-flex rounded-full bg-lime px-5 py-3 text-sm font-bold text-graphite"
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
