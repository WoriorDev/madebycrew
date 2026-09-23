"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SUGGESTIONS,
  localBotReply,
} from "@/lib/crew-knowledge";
import { cn } from "@/lib/utils";

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

/** Lightweight markdown: **bold**, mailto/http links, newlines, bullets */
function RichText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, lineIndex) => {
        if (!line.trim()) return <div key={lineIndex} className="h-1.5" />;

        const isBullet = /^\s*[-•]\s+/.test(line) || /^\s*\d+\.\s+/.test(line);
        const content = line.replace(/^\s*[-•]\s+/, "").replace(/^\s*\d+\.\s+/, "");

        return (
          <p
            key={lineIndex}
            className={cn(
              "text-[13.5px] leading-relaxed md:text-sm",
              isBullet && "pl-3 relative before:absolute before:left-0 before:content-['•'] before:text-lime",
            )}
          >
            {renderInline(content)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|(kontakt@madebycrew\.pl)|(https?:\/\/[^\s]+)|(#kontakt))/gi;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<span key={key++}>{text.slice(last, match.index)}</span>);
    }

    if (match[2]) {
      nodes.push(
        <strong key={key++} className="font-semibold text-inherit">
          {match[2]}
        </strong>,
      );
    } else if (match[3] && match[4]) {
      nodes.push(
        <a
          key={key++}
          href={match[4]}
          className="underline decoration-lime/60 underline-offset-2 hover:text-lime"
          target={match[4].startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
        >
          {match[3]}
        </a>,
      );
    } else if (match[5]) {
      nodes.push(
        <a
          key={key++}
          href="mailto:kontakt@madebycrew.pl"
          className="font-semibold text-lime underline decoration-lime/40 underline-offset-2"
        >
          kontakt@madebycrew.pl
        </a>,
      );
    } else if (match[6]) {
      nodes.push(
        <a
          key={key++}
          href={match[6]}
          className="underline decoration-lime/60 underline-offset-2 hover:text-lime"
          target="_blank"
          rel="noreferrer"
        >
          {match[6]}
        </a>,
      );
    } else if (match[7]) {
      nodes.push(
        <a
          key={key++}
          href="#kontakt"
          className="font-semibold text-lime underline decoration-lime/40 underline-offset-2"
        >
          #kontakt
        </a>,
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(<span key={key++}>{text.slice(last)}</span>);
  return nodes;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1" aria-label="CrewBot pisze">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-lime"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [nudge, setNudge] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const { messages, sendMessage, status, error, clearError, setMessages } =
    useChat({ transport });

  const busy = status === "submitted" || status === "streaming";

  const followUps = useMemo(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return DEFAULT_SUGGESTIONS.slice(0, 4);
    const text = messageText(lastUser.parts);
    return localBotReply(text).followUps.slice(0, 3);
  }, [messages]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open, status]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!open) setNudge(true);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy) return;
      clearError();
      sendMessage({ text: value.slice(0, 1200) });
      setInput("");
      setNudge(false);
    },
    [busy, clearError, sendMessage],
  );

  function clearChat() {
    setMessages([]);
    clearError();
    setInput("");
  }

  function autoGrow() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 md:right-7 md:bottom-7">
      <AnimatePresence>
        {open && (
          <motion.section
            ref={panelRef}
            role="dialog"
            aria-label="CrewBot — czat MadeByCrew"
            aria-modal="false"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(36rem,calc(100svh-6rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0a0c10]/92 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            <header className="relative flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3.5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent" />
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative">
                  <Image
                    src="/brand/mark.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-contain mix-blend-screen"
                  />
                  <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-[#0a0c10] bg-lime" />
                </div>
                <div className="min-w-0">
                  <p className="display text-sm text-off-white">CrewBot</p>
                  <p className="truncate text-[11px] text-white/45">
                    Online · oferta, proces, kontakt
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-full px-2.5 py-1.5 text-[11px] font-medium text-white/45 transition hover:bg-white/5 hover:text-white/80"
                  >
                    Wyczyść
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/5 hover:text-lime"
                  aria-label="Zamknij czat"
                >
                  ✕
                </button>
              </div>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="display text-lg text-off-white">
                      Hej, tu CrewBot.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      Pytaj o landingi, redesign, timing, wycenę albo jak
                      wygląda współpraca. Konkretnie, bez bełkotu.
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-white/35 uppercase">
                      Szybkie pytania
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_SUGGESTIONS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          disabled={busy}
                          onClick={() => submit(item)}
                          className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-left text-xs text-white/75 transition hover:border-lime/45 hover:text-lime disabled:opacity-40"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <a
                    href="mailto:kontakt@madebycrew.pl?subject=Brief%20MadeByCrew"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-lime transition hover:brightness-110"
                  >
                    Albo od razu mail → kontakt@madebycrew.pl
                  </a>
                </div>
              )}

              {messages.map((message) => {
                const text = messageText(message.parts);
                const isUser = message.role === "user";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", isUser ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[88%] rounded-2xl px-3.5 py-2.5",
                        isUser
                          ? "rounded-br-md bg-lime text-graphite"
                          : "rounded-bl-md border border-white/10 bg-white/[0.04] text-off-white/92",
                      )}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed md:text-sm">
                          {text}
                        </p>
                      ) : (
                        <RichText text={text} />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                    <TypingDots />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-200">
                  Coś nie zagrało. Spróbuj jeszcze raz albo napisz na{" "}
                  <a
                    href="mailto:kontakt@madebycrew.pl"
                    className="font-semibold underline"
                  >
                    kontakt@madebycrew.pl
                  </a>
                  .
                </div>
              )}

              {messages.length > 0 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {followUps.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => submit(item)}
                      className="rounded-full border border-lime/25 bg-lime/5 px-3 py-1.5 text-[11px] text-lime/90 transition hover:border-lime/55 hover:bg-lime/10"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              className="border-t border-white/8 p-3"
              onSubmit={(event) => {
                event.preventDefault();
                submit(input);
              }}
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 focus-within:border-lime/40">
                <label className="sr-only" htmlFor="crewbot-input">
                  Twoja wiadomość
                </label>
                <textarea
                  ref={inputRef}
                  id="crewbot-input"
                  rows={1}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    autoGrow();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      submit(input);
                    }
                  }}
                  disabled={busy}
                  placeholder="Zadaj pytanie…"
                  className="max-h-[7.5rem] min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-off-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="inline-flex h-10 shrink-0 items-center rounded-xl bg-lime px-4 text-sm font-bold text-graphite transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Wyślij
                </button>
              </div>
              <p className="mt-2 px-1 text-[10px] text-white/30">
                Enter wyślij · Shift+Enter nowa linia · Esc zamknij
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {nudge && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              className="absolute right-0 bottom-[calc(100%+0.75rem)] w-56 rounded-2xl border border-white/12 bg-[#0a0c10]/95 p-3 shadow-2xl backdrop-blur-xl"
            >
              <p className="text-xs leading-relaxed text-white/70">
                Masz pytanie o stronę? CrewBot ogarnie ofertę w 10 sekund.
              </p>
              <button
                type="button"
                onClick={() => {
                  setNudge(false);
                  setOpen(true);
                }}
                className="mt-2 text-[11px] font-bold text-lime"
              >
                Zapytaj →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setNudge(false);
          }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-lime px-4 py-3 text-sm font-bold text-graphite shadow-[0_16px_50px_rgba(215,255,50,0.32)] transition hover:brightness-110"
          aria-expanded={open}
          aria-controls={undefined}
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-graphite/40" />
            <span className="relative inline-flex size-2.5 rounded-full bg-graphite" />
          </span>
          {open ? "Zamknij" : "Zapytaj CrewBota"}
        </motion.button>
      </div>
    </div>
  );
}
