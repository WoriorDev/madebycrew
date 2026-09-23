"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

type MagneticProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  strength = 28,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  function onMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX / (100 / strength));
    y.set(offsetY / (100 / strength));
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
