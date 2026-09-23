"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

export function SplineOrb({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 right-[-12%] hidden w-[58%] opacity-40 lg:block",
        className,
      )}
    >
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_35%,#101214_78%)]" />
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        className="h-full w-full"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
