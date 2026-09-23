"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandBanner } from "@/components/Brand";
import { Atmosphere } from "@/components/fx/Atmosphere";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    window.setTimeout(() => {
      setBusy(false);
      setError("Panel jeszcze niepodłączony. To ekran testowy.");
    }, 700);
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <Atmosphere />

      {/* soft blurred square behind the form */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[min(80svh,36rem)] w-[min(88vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-white/[0.06] bg-white/[0.04] shadow-[0_0_60px_rgba(0,0,0,0.3)] backdrop-blur-[3px]"
      />

      <div className="relative z-10 w-full max-w-[22rem] px-2 py-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mark.png"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 object-contain mix-blend-screen"
              priority
            />
            <BrandBanner className="h-6 w-auto" priority />
          </div>
          <p className="mt-4 text-[10px] font-semibold tracking-[0.28em] text-white/35 uppercase">
            Restricted area
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <label className="block">
            <span className="mb-3 block text-[11px] tracking-[0.08em] text-white/45">
              Email address
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="crew@madebycrew.pl"
              className="w-full border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
            />
          </label>

          <label className="relative block">
            <span className="mb-3 block text-[11px] tracking-[0.08em] text-white/45">
              Password
            </span>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full border-0 border-b border-white/20 bg-transparent pb-3 pr-9 text-[15px] text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-0 bottom-3 size-[18px] text-white/35 transition hover:text-lime"
                aria-label={showPass ? "Ukryj hasło" : "Pokaż hasło"}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`absolute inset-0 size-[18px] transition-all duration-300 ease-out ${
                    showPass
                      ? "scale-90 opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M1 12.5C2.7 8.1 7 5 12 5s9.3 3.1 11 7.5c-1.7 4.4-6 7.5-11 7.5S2.7 16.9 1 12.5z" />
                  <circle cx="12" cy="12.5" r="3" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className={`absolute inset-0 size-[18px] transition-all duration-300 ease-out ${
                    showPass
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                  <path d="M9.9 5.1A10.5 10.5 0 0112 5c5 0 9.3 3.1 11 7.5a11.8 11.8 0 01-4.2 5.1" />
                  <path d="M6.7 6.7A11.8 11.8 0 001 12.5C2.7 16.9 7 20 12 20a10.5 10.5 0 005.1-1.3" />
                </svg>
              </button>
            </div>
          </label>

          {error && (
            <p className="text-center text-xs text-lime/80">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 h-12 w-full rounded-full border border-white/12 bg-white/[0.06] text-[11px] font-semibold tracking-[0.2em] text-off-white uppercase transition hover:border-white/20 hover:bg-white/[0.1] disabled:opacity-50"
          >
            {busy ? "…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs text-white/35 transition hover:text-lime"
          >
            Powrót na stronę?
          </Link>
        </p>
      </div>
    </div>
  );
}
