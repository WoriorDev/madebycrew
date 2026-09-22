"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { LogoMark } from "./Brand";

const SUGGESTIONS = [
  "Co oferujecie?",
  "Jak wygląda współpraca?",
  "Ile kosztuje strona?",
  "Jak się skontaktować?",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open, status]);

  function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    clearError();
    sendMessage({ text: value });
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      {open && (
        <section
          className="flex h-[min(34rem,calc(100svh-6.5rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden border border-white/10 bg-graphite shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          aria-label="Czat MadeByCrew"
        >
          <header className="flex items-center justify-between border-b border-white/8 bg-graphite-light px-4 py-3">
            <div className="flex items-center gap-3">
              <LogoMark className="h-7 w-auto" />
              <div>
                <p className="font-[family-name:var(--font-display)] text-sm font-bold text-off-white">
                  CrewBot
                </p>
                <p className="text-xs text-off-white/50">Pytaj o ofertę i współpracę</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center text-off-white/55 transition hover:text-lime"
              aria-label="Zamknij czat"
            >
              ✕
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-off-white/70">
                  Cześć! Jestem CrewBotem. Mogę opowiedzieć o usługach, procesie i
                  kontakcie MadeByCrew.pl.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => submit(item)}
                      className="border border-white/12 px-3 py-1.5 text-left text-xs text-off-white/75 transition hover:border-lime/50 hover:text-lime"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-lime text-graphite"
                      : "border border-white/10 bg-graphite-light text-off-white/90"
                  }`}
                >
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <span key={`${message.id}-${index}`} className="whitespace-pre-wrap">
                        {part.text}
                      </span>
                    ) : null,
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <p className="text-xs text-off-white/45">CrewBot pisze…</p>
            )}

            {error && (
              <p className="border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                Coś poszło nie tak. Spróbuj jeszcze raz albo napisz na kontakt@madebycrew.pl.
              </p>
            )}
          </div>

          <form
            className="border-t border-white/8 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              submit(input);
            }}
          >
            <div className="flex items-end gap-2">
              <label className="sr-only" htmlFor="crewbot-input">
                Twoja wiadomość
              </label>
              <textarea
                id="crewbot-input"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit(input);
                  }
                }}
                disabled={busy}
                placeholder="Zadaj pytanie…"
                className="max-h-28 min-h-11 flex-1 resize-none bg-graphite-light px-3 py-2.5 text-sm text-off-white outline-none placeholder:text-off-white/35 focus:ring-1 focus:ring-lime/50"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="h-11 shrink-0 bg-lime px-4 text-sm font-semibold text-graphite transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Wyślij
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-semibold text-graphite shadow-[0_12px_40px_rgba(215,255,50,0.28)] transition hover:brightness-110"
        aria-expanded={open}
      >
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-graphite" aria-hidden />
        {open ? "Zamknij" : "Zapytaj CrewBota"}
      </button>
    </div>
  );
}
