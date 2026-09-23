"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./fx/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const briefPoints = [
  { label: "Cel", text: "co ma zrobić strona" },
  { label: "Deadline", text: "kiedy ma być live" },
  { label: "Budżet", text: "orientacyjny zakres" },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Zapytanie od ${name || "klienta"}`);
    const body = encodeURIComponent(
      `Imię: ${name}\nE-mail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:kontakt@madebycrew.pl?subject=${subject}&body=${body}`;
    setSent(true);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const head = section.querySelectorAll("[data-contact-head]");
      const aside = section.querySelectorAll("[data-contact-aside]");
      const form = section.querySelector("[data-contact-form]");
      const rail = section.querySelector("[data-contact-rail]");

      gsap.set(head, { opacity: 0, y: 36 });
      gsap.set(aside, { opacity: 0, y: 22 });
      gsap.set(form, { opacity: 0, y: 40 });
      gsap.set(rail, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 22%",
          scrub: 1.05,
        },
      });

      tl.to(rail, { scaleX: 1, duration: 0.45, ease: "none" }, 0);
      tl.to(
        head,
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: "none" },
        0.08,
      );
      tl.to(
        aside,
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: "none" },
        0.28,
      );
      tl.to(form, { opacity: 1, y: 0, duration: 0.55, ease: "none" }, 0.35);
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      className="relative z-10 overflow-hidden pt-10 pb-24 md:pt-14 md:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] right-[-10%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.14),transparent_64%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8%] left-[-12%] h-[36vmax] w-[36vmax] rounded-full bg-[radial-gradient(circle,rgba(215,255,50,0.08),transparent_68%)] blur-3xl"
      />

      <div className="section-pad relative mx-auto max-w-7xl">
        <div
          data-contact-rail
          aria-hidden
          className="mb-10 flex max-w-xl items-center gap-4 md:mb-14 md:max-w-2xl md:gap-5"
        >
          <span className="relative flex size-3 shrink-0 items-center justify-center">
            <span className="absolute size-3 rotate-45 border border-lime/50 bg-lime/15 shadow-[0_0_18px_rgba(215,255,50,0.45)]" />
            <span className="relative size-1.5 rotate-45 bg-lime" />
          </span>
          <span className="h-px flex-1 origin-left bg-gradient-to-r from-lime/40 via-white/20 to-transparent" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          <div>
            <p data-contact-head className="eyebrow mb-4">
              Kontakt
            </p>
            <h2 className="display text-[clamp(2.8rem,9vw,6rem)] text-off-white">
              <span data-contact-head className="block">
                Masz pomysł?
              </span>
              <span data-contact-head className="mt-1 block text-lime">
                Rzuć go.
              </span>
            </h2>

            <p
              data-contact-aside
              className="mt-6 max-w-md text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-white/50"
            >
              Napisz krótko o projekcie. Odpisujemy zwykle tego samego dnia
              roboczego, bez korpo-kolejki.
            </p>

            <div data-contact-aside className="mt-8 md:mt-10">
              <p className="text-[11px] tracking-[0.18em] text-white/35 uppercase">
                Mail
              </p>
              <MagneticButton
                href="mailto:kontakt@madebycrew.pl"
                className="display mt-2 inline-block text-[clamp(1.35rem,3vw,2.1rem)] text-lime transition hover:brightness-110"
              >
                kontakt@madebycrew.pl
              </MagneticButton>
            </div>

            <ul className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:mt-12">
              {briefPoints.map((item) => (
                <li
                  key={item.label}
                  data-contact-aside
                  className="flex items-baseline gap-4"
                >
                  <span className="display w-24 shrink-0 text-sm text-lime md:w-28">
                    {item.label}
                  </span>
                  <span className="text-sm text-white/45 md:text-[0.95rem]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <form
            data-contact-form
            onSubmit={onSubmit}
            className="relative border border-white/10 bg-black/25 p-6 backdrop-blur-md md:p-8 lg:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent"
            />

            <p className="text-[11px] font-bold tracking-[0.2em] text-white/35 uppercase">
              Brief w 30 sekund
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Imię, mail i kilka zdań o tym, co budujemy. Resztę ogarniemy w
              odpowiedzi.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {(
                [
                  ["name", "Imię", "text", "Jak się do Ciebie zwracać?"],
                  ["email", "E-mail", "email", "twoj@email.pl"],
                ] as const
              ).map(([name, label, type, placeholder]) => (
                <label key={name} className="block">
                  <span className="mb-2.5 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                      {label}
                    </span>
                    <span
                      className={`size-1.5 rotate-45 transition ${
                        focused === name ? "bg-lime" : "bg-white/20"
                      }`}
                    />
                  </span>
                  <input
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    onFocus={() => setFocused(name)}
                    onBlur={() => setFocused(null)}
                    className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-[1.05rem] text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2.5 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                    O projekcie
                  </span>
                  <span
                    className={`size-1.5 rotate-45 transition ${
                      focused === "message" ? "bg-lime" : "bg-white/20"
                    }`}
                  />
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Co budujemy? Jaki cel, deadline, budżet?"
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full resize-y border-0 border-b border-white/15 bg-transparent px-0 py-3 text-[1.05rem] leading-relaxed text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-8 text-sm font-bold text-graphite shadow-[0_0_28px_rgba(215,255,50,0.18)] transition hover:brightness-110"
              >
                Wyślij brief
              </button>
              <p
                className={`text-sm transition ${
                  sent ? "text-lime/80" : "text-white/35"
                }`}
                aria-live="polite"
              >
                {sent
                  ? "Otwieramy skrzynkę. Dokończ wysyłkę."
                  : "Albo od razu na maila obok."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
