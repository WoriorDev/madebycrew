import Image from "next/image";
import { BrandBanner } from "./Brand";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/6">
      <div className="section-pad mx-auto flex max-w-7xl flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="inline-flex items-center gap-3" aria-label="MadeByCrew.pl">
          <Image
            src="/brand/mark.png"
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain mix-blend-screen"
          />
          <BrandBanner className="h-6" />
        </a>
        <p className="text-sm text-white/35">
          © {new Date().getFullYear()} MadeByCrew.pl
        </p>
      </div>
    </footer>
  );
}
