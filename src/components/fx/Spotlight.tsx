"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export function Spotlight({
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

  const background = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(215,255,50,0.14), transparent 45%)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background }}
      />
      {children}
    </div>
  );
}
