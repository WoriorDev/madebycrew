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
        "relative overflow-hidden border-y border-white/8 bg-graphite-mid/80 py-5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-graphite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-graphite to-transparent" />
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-off-white/35 md:text-4xl"
          >
            {item}
            <span className="ml-10 text-lime">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
