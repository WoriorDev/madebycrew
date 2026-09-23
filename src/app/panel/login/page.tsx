"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandBanner } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Atmosphere } from "@/components/fx/Atmosphere";

export default function PanelLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    // Placeholder — pełne auth podepniemy później
    window.setTimeout(() => {
      setBusy(false);
      setError("Panel jeszcze niepodłączony. To tylko ekran logowania (test).");
    }, 700);
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <Atmosphere />
      <div className="relative z-10 flex flex-1 flex-col">
        <header className="section-pad mx-auto flex w-full max-w-7xl items-center justify-between py-6">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="MadeByCrew.pl">
            <Image
              src="/brand/mark.png"
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain mix-blend-screen"
              priority
            />
            <BrandBanner className="h-6" priority />
          </Link>
          <Link
            href="/"
            className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase transition hover:text-lime"
          >
            ← Back to site
          </Link>
        </header>

        <main className="section-pad mx-auto flex w-full max-w-md flex-1 flex-col justify-center pb-16">
          <p className="eyebrow mb-4">Restricted area</p>
          <h1 className="display text-4xl text-off-white md:text-5xl">
            Panel
            <span className="block text-lime">logowania.</span>
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Wejście tylko dla crew. Testowy ekran — bez realnego auth.
          </p>

          <form
            onSubmit={onSubmit}
            className="wire-card mt-8 flex flex-col gap-4 p-6 md:p-7"
          >
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                E-mail
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="crew@madebycrew.pl"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                Hasło
              </span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
              />
            </label>

            {error && (
              <p className="rounded-xl border border-lime/25 bg-lime/5 px-3 py-2 text-xs text-lime/90">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={busy}
              className="mt-2 h-12 rounded-full bg-lime text-sm font-bold text-graphite hover:bg-lime/90 disabled:opacity-50"
            >
              {busy ? "Sprawdzam…" : "Zaloguj"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
