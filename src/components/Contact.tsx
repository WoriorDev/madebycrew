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
    <section id="kontakt" className="relative z-10 px-3 pb-20 md:px-6 md:pb-28">
      <div className="wire-card relative mx-auto max-w-7xl overflow-hidden p-6 md:p-12 lg:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(215,255,50,0.1),transparent_50%)]" />
        <Reveal className="relative mb-10 max-w-3xl text-center md:mx-auto md:mb-14">
          <p className="eyebrow mb-4">Kontakt</p>
          <h2 className="display text-[clamp(2.5rem,8vw,5rem)] text-off-white">
            Masz pomysł?
            <span className="block text-lime">Rzuć go.</span>
          </h2>
        </Reveal>

        <div className="relative grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="glass-card h-full p-7 md:p-8">
              <p className="text-base leading-relaxed text-white/50 md:text-lg">
                Cel, deadline, budżet orientacyjny. Odpisujemy zwykle tego samego
                dnia roboczego.
              </p>
              <MagneticButton
                href="mailto:kontakt@madebycrew.pl"
                className="display mt-8 inline-block text-xl text-lime md:text-2xl"
              >
                kontakt@madebycrew.pl
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} className="glass-card p-5 md:p-8">
              <div className="flex flex-col gap-4">
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
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
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
                    className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-lime px-7 text-sm font-bold text-graphite hover:bg-lime/90"
                  >
                    Wyślij
                  </Button>
                  {sent && (
                    <p className="text-sm text-white/50">
                      Otwieramy skrzynkę. Dokończ wysyłkę.
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
