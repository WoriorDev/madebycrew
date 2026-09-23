"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
