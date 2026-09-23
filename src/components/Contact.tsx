"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./fx/Reveal";
import { MagneticButton } from "./fx/MagneticButton";

export function Contact() {
  const [sent, setSent] = useState(false);

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

  return (
    <section id="kontakt" className="relative z-10 py-24 md:py-40">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-4xl md:mb-20">
          <p className="eyebrow mb-5">Kontakt</p>
          <h2 className="display text-[clamp(2.8rem,9vw,7rem)] text-off-white">
            Masz pomysł?
            <span className="block text-lime">Rzuć go.</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="panel h-full rounded-[2rem] p-8 md:p-10">
              <p className="text-base leading-relaxed text-white/60 md:text-lg">
                Cel, deadline, budżet orientacyjny. Odpisujemy zwykle tego samego
                dnia roboczego.
              </p>
              <MagneticButton
                href="mailto:kontakt@madebycrew.pl"
                className="display mt-10 inline-block text-2xl text-lime md:text-3xl"
              >
                kontakt@madebycrew.pl
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="panel rounded-[2rem] p-6 md:p-10">
              <div className="flex flex-col gap-5">
                {(
                  [
                    ["name", "Imię", "text", "Jak się do Ciebie zwracać?"],
                    ["email", "E-mail", "email", "twoj@email.pl"],
                  ] as const
                ).map(([name, label, type, placeholder]) => (
                  <label key={name} className="block">
                    <span className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                      {label}
                    </span>
                    <input
                      name={name}
                      type={type}
                      required
                      placeholder={placeholder}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                    O projekcie
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Co budujemy?"
                    className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-lime px-7 text-sm font-bold text-graphite hover:bg-lime/90"
                  >
                    Wyślij
                  </Button>
                  {sent && (
                    <p className="text-sm text-white/50">
                      Otwieramy skrzynkę — dokończ wysyłkę.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
