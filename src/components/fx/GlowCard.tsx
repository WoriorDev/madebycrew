"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-graphite-light/60 p-6 transition duration-300 hover:border-lime/35",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x) var(--y), rgba(215,255,50,0.12), transparent 45%)",
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
