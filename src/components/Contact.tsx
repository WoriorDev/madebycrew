"use client";

import { useState, type FormEvent } from "react";

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
    <section
      id="kontakt"
      className="relative overflow-hidden border-t border-white/6 bg-graphite-light"
    >
      <div className="absolute -right-24 top-10 h-64 w-64 rounded-full border border-lime/15" />
      <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full border border-white/8" />

      <div className="section-pad relative mx-auto grid max-w-6xl gap-12 py-20 md:grid-cols-[0.95fr_1.05fr] md:py-28">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
            Kontakt
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-off-white md:text-5xl">
            Masz pomysł?
            <span className="block">Rzuć go nam.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-off-white/65">
            Napisz krótko, czego potrzebujesz. Odpowiadamy zwykle tego samego
            dnia roboczego.
          </p>
          <a
            href="mailto:kontakt@madebycrew.pl"
            className="mt-8 inline-block font-[family-name:var(--font-display)] text-lg font-bold text-lime transition hover:brightness-110"
          >
            kontakt@madebycrew.pl
          </a>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pl-10 md:pt-0"
        >
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-off-white/45">
              Imię
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              className="w-full border-b border-white/18 bg-transparent py-3 text-off-white outline-none transition placeholder:text-off-white/30 focus:border-lime"
              placeholder="Jak się do Ciebie zwracać?"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-off-white/45">
              E-mail
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border-b border-white/18 bg-transparent py-3 text-off-white outline-none transition placeholder:text-off-white/30 focus:border-lime"
              placeholder="twoj@email.pl"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-off-white/45">
              O projekcie
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full resize-y border-b border-white/18 bg-transparent py-3 text-off-white outline-none transition placeholder:text-off-white/30 focus:border-lime"
              placeholder="Co budujemy? Deadline? Budżet orientacyjny?"
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-graphite transition hover:brightness-110"
            >
              Wyślij wiadomość
            </button>
            {sent && (
              <p className="text-sm text-off-white/55">
                Otwieramy Twoją skrzynkę — dokończ wysyłkę.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
