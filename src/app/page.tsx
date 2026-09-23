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
          items={["LANDINGI", "SKLEPY", "APLIKACJE", "MOTION", "REDESIGN", "LAUNCH"]}
        />
        <Services />
        <Realizations />
        <Process />
        <Crew />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
