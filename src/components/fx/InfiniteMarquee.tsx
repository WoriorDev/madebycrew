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
        "relative z-10 overflow-hidden border-y border-white/10 bg-black/25 py-4 backdrop-blur-md md:py-5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070809] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070809] to-transparent md:w-28" />
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap md:gap-12"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "display text-2xl tracking-tight md:text-4xl",
              index % 2 === 0 ? "text-off-white/55" : "text-lime",
            )}
          >
            {item}
            <span className="ml-8 text-lime/80 md:ml-12">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
