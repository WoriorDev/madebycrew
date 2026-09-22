type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

/** Horizontal — banner-vector.svg */
export function BrandBanner({
  className = "h-8 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-vector.svg"
      alt="MadeByCrew.pl"
      width={2172}
      height={724}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`object-contain ${className}`}
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

/** Compact — banner-vector.svg */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-vector.svg"
      alt="MadeByCrew.pl"
      width={2172}
      height={724}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`object-contain ${className}`}
svg    />
  );
}
