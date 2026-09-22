type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Brand assets in /public/brand:
 * JPG: logo.jpg, banner.jpg
 * PNG: logo-vector.png, banner-vector.png, logo-transparent.png, banner-transparent.png
 * SVG: logo-vector.svg, banner-vector.svg
 */

/** Horizontal mark + MadeByCrew.pl — SVG */
export function BrandBanner({
  className = "h-8 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-vector.svg"
      alt="MadeByCrew.pl"
      width={720}
      height={180}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}

/** Stacked logo + MadeByCrew.pl — SVG */
export function BrandLogo({
  className = "h-28 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-vector.svg"
      alt="MadeByCrew.pl"
      width={520}
      height={420}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}

/** Compact horizontal for chatbot — SVG */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/banner-vector.svg"
      alt="MadeByCrew.pl"
      width={720}
      height={180}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}
