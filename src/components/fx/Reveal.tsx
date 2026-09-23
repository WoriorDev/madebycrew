"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      // stay visible longer: leave only when mostly off-screen
      viewport={{ once: false, amount: 0.08, margin: "12% 0px -6% 0px" }}
      variants={{
        hidden: {
          opacity: 0,
          y,
          transition: {
            duration: 0.55,
            delay: 0,
            ease: [0.4, 0, 1, 1],
          },
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.75,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
