import { BrandWordmark, LogoMark } from "./Brand";

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-graphite">
      <div className="section-pad mx-auto flex max-w-6xl flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-8 w-auto" />
          <BrandWordmark className="text-base" />
        </div>
        <p className="text-sm text-off-white/45">
          © {new Date().getFullYear()} MadeByCrew.pl — strony internetowe z
          charakterem.
        </p>
      </div>
    </footer>
  );
}
