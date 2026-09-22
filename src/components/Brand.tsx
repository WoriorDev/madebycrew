import Image from "next/image";

type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Brand assets in /public/brand (all 6 kept):
 * logo.jpg, logo-vector.png, logo-transparent.png,
 * banner.jpg, banner-vector.png, banner-transparent.png
 */

/** Horizontal mark + MadeByCrew.pl — vector banner */
export function BrandBanner({
  className = "h-8 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/banner-vector.png"
      alt="MadeByCrew.pl"
      width={640}
      height={160}
      priority={priority}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}

/** Stacked logo + MadeByCrew.pl — vector */
export function BrandLogo({
  className = "h-28 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/logo-vector.png"
      alt="MadeByCrew.pl"
      width={512}
      height={512}
      priority={priority}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}

/** Compact horizontal for chatbot */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/banner-transparent.png"
      alt="MadeByCrew.pl"
      width={640}
      height={160}
      priority={priority}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}
