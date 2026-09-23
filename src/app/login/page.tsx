"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandBanner } from "@/components/Brand";

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
      setError("Panel jeszcze niepodłączony — to ekran testowy.");
    }, 700);
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050607] px-6">
      {/* soft planet / void glow — Spacefox style */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[min(90vw,640px)] -translate-x-1/2 -translate-y-[48%] rounded-full bg-[radial-gradient(circle,rgba(80,90,70,0.35)_0%,rgba(215,255,50,0.06)_35%,transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(215,255,50,0.05),transparent_45%)]"
      />

      <div className="relative z-10 w-full max-w-[22rem]">
        <div className="mb-14 flex flex-col items-center text-center">
          <Image
            src="/brand/mark.png"
            alt=""
            width={40}
            height={40}
            className="mb-5 size-10 object-contain mix-blend-screen"
            priority
          />
          <BrandBanner className="h-7" priority />
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

          <label className="block">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] tracking-[0.08em] text-white/45">
                Password
              </span>
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="text-[10px] tracking-[0.12em] text-white/30 uppercase transition hover:text-lime"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="w-full border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-off-white outline-none transition placeholder:text-white/25 focus:border-lime"
            />
          </label>

          {error && (
            <p className="text-center text-xs text-lime/80">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 h-12 w-full rounded-lg bg-[#1a1c18] text-[11px] font-semibold tracking-[0.22em] text-off-white uppercase transition hover:bg-[#22251f] disabled:opacity-50"
          >
            {busy ? "…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-white/35">
          Powrót na stronę?{" "}
          <Link href="/" className="text-white/80 transition hover:text-lime">
            MadeByCrew.pl
          </Link>
        </p>

        <div className="mt-16 flex justify-center">
          <div
            className="flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]"
            style={{
              boxShadow: "0 0 20px rgba(215,255,50,0.15)",
            }}
            aria-hidden
          >
            <svg viewBox="0 0 16 16" className="size-3.5 text-lime" fill="none">
              <path
                d="M3.5 8.2l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
