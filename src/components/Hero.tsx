import { BrandLogo } from "./Brand";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-graphite pb-16 pt-28 md:items-center md:pb-24 md:pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(215,255,50,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(32,37,42,0.55)_0%,transparent_65%)]" />
      <div className="noise" />

      <div className="streak left-[8%] top-[22%] w-[42%] md:w-[28%]" />
      <div className="streak streak-soft left-[4%] bottom-[30%] w-[36%] md:w-[22%]" />

      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
        <div className="animate-rise flex flex-col items-start gap-7 md:max-w-3xl">
          <div className="animate-mark">
            <BrandLogo
              className="h-[clamp(7.5rem,22vw,13rem)] w-auto max-w-[min(100%,22rem)]"
              priority
            />
          </div>

          <h1 className="animate-rise animate-rise-delay-1 font-[family-name:var(--font-display)] text-[clamp(2.1rem,6vw,3.8rem)] font-extrabold leading-[1.02] tracking-tight text-off-white">
            Strony, które
            <span className="block text-lime">pracują na biznes.</span>
          </h1>

          <p className="animate-rise animate-rise-delay-2 max-w-xl text-base leading-relaxed text-off-white/72 md:text-lg">
            Jesteśmy dwuosobowym crewem od web developmentu. Projektujemy i
            kodujemy landingi, wizytówki i aplikacje — bez korpo-bełkotu, z
            naciskiem na efekt.
          </p>

          <div className="animate-rise animate-rise-delay-3 flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#kontakt"
              className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-graphite transition hover:brightness-110 md:text-base"
            >
              Porozmawiajmy o projekcie
            </a>
            <a
              href="#uslugi"
              className="rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-off-white transition hover:border-lime/60 hover:text-lime md:text-base"
            >
              Zobacz usługi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
