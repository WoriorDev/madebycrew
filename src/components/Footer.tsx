import Image from "next/image";
import { BrandBanner } from "./Brand";

const columns = [
  {
    title: "Firma",
    links: [
      { label: "O crew", href: "#crew" },
      { label: "Proces", href: "#proces" },
      { label: "Kontakt", href: "#kontakt" },
      { label: "CrewBot", href: "#top" },
    ],
  },
  {
    title: "Oferta",
    links: [
      { label: "Launch — landingi", href: "#uslugi" },
      { label: "Growth — strony & redesign", href: "#uslugi" },
      { label: "Custom — aplikacje", href: "#uslugi" },
      { label: "Opieka po live", href: "#uslugi" },
      { label: "Motion & UI", href: "#uslugi" },
    ],
  },
  {
    title: "Branże",
    links: [
      { label: "Startupy", href: "#kontakt" },
      { label: "E-commerce", href: "#kontakt" },
      { label: "Lokalny biznes", href: "#kontakt" },
      { label: "SaaS / produkty", href: "#kontakt" },
      { label: "Agencje & partnerzy", href: "#kontakt" },
      { label: "Inne — napisz", href: "#kontakt" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "#", icon: "ig" },
  { label: "Facebook", href: "#", icon: "fb" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "YouTube", href: "#", icon: "yt" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/8 bg-black/25 backdrop-blur-[6px]">
      {/* ADV-style atmospheric glow — lime instead of red */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(215,255,50,0.1),transparent_45%),radial-gradient(ellipse_at_85%_100%,rgba(215,255,50,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-lime/8 blur-3xl"
      />

      <div className="section-pad relative mx-auto max-w-7xl pt-16 pb-8 md:pt-20 md:pb-10">
        {/* top grid */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr] lg:gap-16">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-3"
              aria-label="MadeByCrew.pl"
            >
              <Image
                src="/brand/mark.png"
                alt=""
                width={36}
                height={36}
                className="size-9 object-contain mix-blend-screen"
              />
              <BrandBanner className="h-7" />
            </a>
            <p className="mt-6 max-w-xs text-lg leading-snug text-off-white/85 md:text-xl">
              Gdzie design i kod
              <span className="block text-white/45">dostają charakter.</span>
            </p>
            <p className="mt-4 text-xs tracking-[0.18em] text-lime/70 uppercase">
              Test copy · placeholder
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition hover:text-lime"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* contact + socials */}
        <div className="mt-14 flex flex-col gap-8 border-t border-white/8 pt-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2 text-sm text-white/50">
            <p>ul. Przykładowa 12 / 00-000 Warszawa</p>
            <p>
              <a
                href="tel:+48123456789"
                className="transition hover:text-lime"
              >
                +48 123 456 789
              </a>
            </p>
            <a
              href="mailto:kontakt@madebycrew.pl"
              className="display mt-3 inline-block text-xl text-off-white transition hover:text-lime md:text-2xl"
            >
              kontakt@madebycrew.pl
            </a>
          </div>

          <ul className="flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-lime/45 hover:text-lime"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* bottom strip */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-6 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© {year} MadeByCrew.pl. All rights reserved.</p>
          <a
            href="/login"
            className="tracking-[0.14em] text-white/40 uppercase transition hover:text-lime"
          >
            Restricted area
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: "ig" | "fb" | "in" | "yt" }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "size-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };

  if (name === "ig") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "fb") {
    return (
      <svg {...common}>
        <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (name === "in") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 11v6M8 8.5v.1M12 17v-3.5c0-1.5 2-1.6 2 0V17M12 11v.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M5 8.5c0-1.2.9-2.1 2.1-2.2 2.2-.2 7.6-.2 9.8 0 1.2.1 2.1 1 2.1 2.2v7c0 1.2-.9 2.1-2.1 2.2-2.2.2-7.6.2-9.8 0C5.9 17.6 5 16.7 5 15.5v-7z" />
      <path d="M11 10.5l4 2-4 2v-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}
