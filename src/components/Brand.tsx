type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Brand assets in /public/brand (all kept):
 * logo.jpg, logo-vector.png, logo-transparent.png,
 * banner.jpg, banner-vector.png, banner-transparent.png,
 * logo-vector.svg, banner-vector.svg
 */

/** Horizontal — Twój baner wektorowy */
export function BrandBanner({
  className = "h-8 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-vector.png"
      alt="MadeByCrew.pl"
      width={1024}
      height={341}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}

/** Stacked — Twoje logo wektorowe */
export function BrandLogo({
  className = "h-28 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-vector.png"
      alt="MadeByCrew.pl"
      width={1024}
      height={1024}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}

/** Compact — Twój baner wektorowy */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-vector.png"
      alt="MadeByCrew.pl"
      width={1024}
      height={341}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}
