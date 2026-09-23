import Image from "next/image";
import { BrandBanner } from "./Brand";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8">
      <div className="section-pad mx-auto flex max-w-7xl flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="inline-flex items-center gap-3" aria-label="MadeByCrew.pl">
          <Image
            src="/brand/mark.png"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain mix-blend-screen"
          />
          <BrandBanner className="h-8" />
        </a>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} MadeByCrew.pl — strony z charakterem.
        </p>
      </div>
    </footer>
  );
}
