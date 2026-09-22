"use client";

import { useEffect, useState } from "react";
import { BrandBanner } from "./Brand";

const links = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#proces", label: "Proces" },
  { href: "#crew", label: "Crew" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/8 bg-graphite/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex h-20 max-w-6xl items-center justify-between md:h-24">
        <a href="#top" className="inline-flex shrink-0 items-center" aria-label="MadeByCrew.pl">
          <BrandBanner className="h-14 w-auto md:h-16" priority />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Główne">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-off-white/70 transition-colors hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-graphite transition hover:brightness-110"
          >
            Napisz do nas
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-4 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-off-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full bg-off-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/8 bg-graphite/95 px-5 py-4 md:hidden"
          aria-label="Mobilne"
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-base font-medium text-off-white/85"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                className="mt-1 inline-flex rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-graphite"
                onClick={() => setOpen(false)}
              >
                Napisz do nas
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
