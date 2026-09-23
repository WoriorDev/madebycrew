"use client";

import { cn } from "@/lib/utils";

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.18]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(rgba(247,248,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(247,248,250,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 75%)",
      }}
    />
  );
}
