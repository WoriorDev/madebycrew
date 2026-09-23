"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function InfiniteMarquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const row = [...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative z-10 overflow-hidden border-y border-white/[0.07] bg-black/30 py-3.5 backdrop-blur-[4px] md:py-4",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#050607] to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#050607] to-transparent md:w-24" />

      <motion.div
        className="relative flex w-max items-center gap-8 whitespace-nowrap md:gap-12"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-8 md:gap-12"
          >
            <span
              className={cn(
                "text-[11px] font-semibold tracking-[0.28em] uppercase md:text-xs",
                index % 2 === 0 ? "text-white/45" : "text-lime",
              )}
            >
              {item}
            </span>
            <span
              aria-hidden
              className="size-1 rounded-full bg-lime/55"
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
