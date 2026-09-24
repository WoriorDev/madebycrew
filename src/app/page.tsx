import { Chatbot } from "@/components/Chatbot";
import { Contact } from "@/components/Contact";
import { Crew } from "@/components/Crew";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
