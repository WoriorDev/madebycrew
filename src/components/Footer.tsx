import Image from "next/image";
import { BrandBanner } from "./Brand";

const columns = [
  {
    title: "Firma",
    links: [
      { label: "O nas", href: "#crew" },
      { label: "Proces", href: "#proces" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
  {
    title: "Oferty",
    links: [
      { label: "Wizytówka", href: "#uslugi" },
      { label: "Strona firmowa", href: "#uslugi" },
      { label: "Sklep internetowy", href: "#uslugi" },
      { label: "Custom", href: "#uslugi" },
      { label: "Redesign", href: "#uslugi" },
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
      { label: "Inne, napisz", href: "#kontakt" },
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

      <div
        className="section-pad relative mx-auto max-w-[96rem]"
        style={{
          paddingTop: "var(--footer-pt)",
          paddingBottom: "var(--footer-pb)",
        }}
      >
        {/* top grid */}
        <div
          className="grid lg:grid-cols-[1.15fr_1.85fr]"
          style={{ gap: "var(--footer-gap)" }}
        >
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 md:gap-3"
              aria-label="MadeByCrew.pl"
            >
              <Image
                src="/brand/mark.png"
                alt=""
                width={36}
                height={36}
                className="object-contain mix-blend-screen"
                style={{
                  width: "var(--footer-mark)",
                  height: "var(--footer-mark)",
                }}
              />
              <BrandBanner className="w-auto h-[length:var(--footer-brand-h)]" />
            </a>
            <p
              className="mt-[clamp(0.85rem,2svh,1.5rem)] max-w-xs leading-snug text-off-white/85"
              style={{ fontSize: "var(--footer-tagline)" }}
            >
              Gdzie design i kod
              <span className="block text-white/45">dostają charakter.</span>
            </p>
            <ul
              className="mt-[clamp(0.75rem,1.8svh,1.5rem)] flex items-center"
              style={{ gap: "clamp(0.45rem,1.2svh,0.75rem)" }}
            >
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-lime/45 hover:text-lime"
                    style={{
                      width: "var(--footer-social)",
                      height: "var(--footer-social)",
                    }}
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:kontakt@madebycrew.pl"
              className="display mt-[clamp(0.65rem,1.5svh,1.25rem)] inline-block text-off-white transition hover:text-lime"
              style={{ fontSize: "var(--footer-mail)" }}
            >
              kontakt@madebycrew.pl
            </a>
          </div>

          <div
            className="grid sm:grid-cols-3"
            style={{ gap: "var(--footer-col-gap)" }}
          >
            {columns.map((col) => (
              <div key={col.title}>
                <p
                  className="mb-[clamp(0.55rem,1.4svh,1rem)] font-bold tracking-[0.2em] text-white/40 uppercase"
                  style={{ fontSize: "var(--footer-label)" }}
                >
                  {col.title}
                </p>
                <ul
                  className="flex flex-col"
                  style={{ gap: "clamp(0.35rem,0.9svh,0.65rem)" }}
                >
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/70 transition hover:text-lime"
                        style={{ fontSize: "var(--footer-link)" }}
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

        {/* bottom strip */}
        <div
          className="mt-[clamp(1.5rem,4svh,4rem)] flex flex-col gap-2 border-t border-white/8 pt-[clamp(0.75rem,2svh,1.5rem)] text-white/35 md:flex-row md:items-center md:justify-between"
          style={{ fontSize: "calc(1.1 * 0.75rem)" }}
        >
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
