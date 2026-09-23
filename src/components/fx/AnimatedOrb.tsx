"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Spline-inspired 3D orb (always-on, no external scene required) */
export function AnimatedOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-[-8%] top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 lg:block",
        className,
      )}
    >
      <motion.div
        className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#f7f8fa_0%,#d7ff32_28%,#6f8a12_58%,#101214_78%)] opacity-80 blur-[1px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[8%] rounded-full border border-lime/20"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_42%,#101214_72%)]" />
      <div className="absolute inset-[30%] rounded-full bg-lime/10 blur-3xl" />
    </div>
  );
}
