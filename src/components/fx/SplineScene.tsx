"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedOrb } from "./AnimatedOrb";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

/**
 * Spline 3D layer with static brand fallback.
 * Missing: własna scena Spline MadeByCrew (obecnie publiczny placeholder URL).
 */
export function SplineScene({
  className,
  sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE,
}: {
  className?: string;
  sceneUrl?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hasScene = Boolean(sceneUrl);

  if (!hasScene || failed) {
    return (
      <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
        <AnimatedOrb className="right-[4%] top-[42%] opacity-80" />
        <div className="absolute right-[18%] top-[28%] hidden size-28 opacity-90 lg:block">
          <Image
            src="/brand/mark.png"
            alt=""
            width={256}
            height={256}
            className="h-full w-full object-contain mix-blend-screen"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 right-[-8%] hidden w-[55%] opacity-45 lg:block",
        className,
      )}
    >
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_30%,#101214_78%)]" />
      <Spline
        scene={sceneUrl!}
        className="h-full w-full"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
