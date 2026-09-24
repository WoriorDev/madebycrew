import { Chatbot } from "@/components/Chatbot";
import { Contact } from "@/components/Contact";
import { Crew } from "@/components/Crew";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Realizations } from "@/components/Realizations";
import { Services } from "@/components/Services";
import { Atmosphere } from "@/components/fx/Atmosphere";
import { InfiniteMarquee } from "@/components/fx/InfiniteMarquee";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

export default function Home() {
  return (
    <>
      <Atmosphere />
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <InfiniteMarquee
          items={[
            "Wizytówki",
            "Strona firmowa",
            "Sklepy",
            "Aplikacje",
            "Custom",
            "Redesign",
          ]}
        />
        <Crew />
        <Realizations />
        <Services />
        <div
          aria-hidden
          className="relative z-10 flex h-20 items-center justify-center md:h-28"
        >
          <div className="flex w-full max-w-xl items-center gap-4 px-8 md:max-w-2xl md:gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-lime/40" />
            <span className="relative flex size-3 items-center justify-center">
              <span className="absolute size-3 rotate-45 border border-lime/50 bg-lime/15 shadow-[0_0_18px_rgba(215,255,50,0.45)]" />
              <span className="relative size-1.5 rotate-45 bg-lime" />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/25 to-lime/40" />
          </div>
        </div>
        <Process />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
