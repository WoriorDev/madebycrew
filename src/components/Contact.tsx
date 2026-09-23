"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./fx/Reveal";
import { Spotlight } from "./fx/Spotlight";
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
    <Spotlight className="relative overflow-hidden border-t border-white/6 bg-graphite-light">
      <section id="kontakt" className="relative">
        <div className="absolute -right-20 top-16 size-72 rounded-full border border-lime/20" />
        <div className="absolute -left-10 bottom-10 size-52 rounded-full border border-white/10" />

        <div className="section-pad relative mx-auto max-w-6xl py-20 md:py-28">
          <Reveal className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-lime uppercase">
              Kontakt
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-6xl">
              Masz pomysł?
              <span className="block text-lime">Rzuć go nam.</span>
            </h2>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-graphite/50 p-8 backdrop-blur-md">
                <p className="text-base leading-relaxed text-off-white/65">
                  Napisz krótko: cel, deadline, budżet orientacyjny. Odpowiadamy
                  zwykle tego samego dnia roboczego.
                </p>
                <MagneticButton
                  href="mailto:kontakt@madebycrew.pl"
                  className="mt-8 inline-block font-[family-name:var(--font-display)] text-xl font-bold text-lime"
                >
                  kontakt@madebycrew.pl
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-white/10 bg-graphite/40 p-6 backdrop-blur-md md:p-8"
              >
                <div className="flex flex-col gap-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold tracking-[0.16em] text-off-white/45 uppercase">
                      Imię
                    </span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-off-white outline-none transition placeholder:text-off-white/30 focus:border-lime"
                      placeholder="Jak się do Ciebie zwracać?"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold tracking-[0.16em] text-off-white/45 uppercase">
                      E-mail
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-off-white outline-none transition placeholder:text-off-white/30 focus:border-lime"
                      placeholder="twoj@email.pl"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold tracking-[0.16em] text-off-white/45 uppercase">
                      O projekcie
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-off-white outline-none transition placeholder:text-off-white/30 focus:border-lime"
                      placeholder="Co budujemy? Deadline? Budżet?"
                    />
                  </label>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button
                      type="submit"
                      className="h-12 rounded-full bg-lime px-6 text-sm font-semibold text-graphite hover:bg-lime/90"
                    >
                      Wyślij wiadomość
                    </Button>
                    {sent && (
                      <p className="text-sm text-off-white/55">
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
    </Spotlight>
  );
}
