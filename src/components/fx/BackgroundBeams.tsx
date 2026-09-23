"use client";

import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute h-full w-full opacity-55"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crew-beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D7FF32" stopOpacity="0" />
            <stop offset="45%" stopColor="#D7FF32" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D7FF32" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={i}
            d={`M${-80 + i * 140} 0 C ${120 + i * 40} ${180 + i * 30}, ${
              280 + i * 20
            } ${420 - i * 10}, ${520 + i * 80} 900`}
            stroke="url(#crew-beam)"
            strokeWidth="1.2"
            fill="none"
            className="beam-path"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
