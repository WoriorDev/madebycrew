type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

/** Horizontal wordmark — banner-text.png (MadeByCrew.pl) */
export function BrandBanner({
  className = "h-8 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-text.png"
      alt="MadeByCrew.pl"
      width={1024}
      height={148}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`object-contain object-left ${className}`}
    />
  );
}

/** Stacked — logo-vector.svg */
export function BrandLogo({
  className = "h-28 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-vector.svg"
      alt="MadeByCrew.pl"
      width={1254}
      height={1254}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`object-contain ${className}`}
    />
  );
}

/** Compact wordmark — same PNG as banner */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-text.png"
      alt="MadeByCrew.pl"
      width={1024}
      height={148}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`object-contain object-left ${className}`}
    />
  );
}
