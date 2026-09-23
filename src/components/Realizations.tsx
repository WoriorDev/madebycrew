"use client";

import Image from "next/image";
import { Reveal } from "./fx/Reveal";

const cases = [
  {
    id: "01",
    title: "Concept frame",
    tag: "Direction A",
    src: "/brand/case-01-desktop.png",
    note: "Kierunek wizualny — dark + lime, glass UI, kosmos",
  },
  {
    id: "02",
    title: "Concept frame",
    tag: "Direction B",
    src: "/brand/case-02-desktop.png",
    note: "Kierunek wizualny — cinematic scene, wireframe cuby",
  },
];

export function Realizations() {
  return (
    <section id="realizacje" className="relative z-10 py-24 md:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col gap-5 text-center md:mb-20">
          <p className="eyebrow">Realizacje</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.5rem,7vw,4.8rem)] text-off-white">
            Duże kadry.
            <span className="block text-white/30">Direction frames.</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-white/45">
            Style preview — nie case klientów. Jak wrzucisz realne projekty,
            podmienimy 1:1.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {cases.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="wire-card group overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={item.src}
                    alt={`${item.title} ${item.id}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    priority={i === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] tracking-[0.16em] text-white/70 uppercase backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="display text-sm text-lime">{item.id}</p>
                    <h3 className="display mt-1 text-2xl text-off-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/45">{item.note}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
