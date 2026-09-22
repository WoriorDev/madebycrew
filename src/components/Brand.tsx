import Image from "next/image";

type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

/** Horizontal mark + MadeByCrew.pl (transparent / vector banner) */
export function BrandBanner({
  className = "h-8 w-auto",
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

/** Stacked logo + MadeByCrew.pl */
export function BrandLogo({
  className = "h-28 w-auto",
  priority = false,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/logo-transparent.png"
      alt="MadeByCrew.pl"
      width={512}
      height={512}
      priority={priority}
      className={`h-auto w-auto object-contain mix-blend-screen ${className}`}
    />
  );
}

/** Compact horizontal for nav / chatbot */
export function BrandMark({
  className = "h-7 w-auto",
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
