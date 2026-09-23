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
        "relative z-10 overflow-hidden border-y border-white/6 py-3.5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050607] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050607] to-transparent md:w-28" />
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap md:gap-14"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "display text-xl tracking-tight md:text-3xl",
              index % 2 === 0 ? "text-white/25" : "text-lime/70",
            )}
          >
            {item}
            <span className="ml-10 text-lime/50 md:ml-14">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
