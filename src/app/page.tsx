import { Chatbot } from "@/components/Chatbot";
import { Contact } from "@/components/Contact";
import { Crew } from "@/components/Crew";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Realizations } from "@/components/Realizations";
import { Services } from "@/components/Services";
import { InfiniteMarquee } from "@/components/fx/InfiniteMarquee";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <InfiniteMarquee
          items={[
            "LANDINGI",
            "APLIKACJE",
            "MOTION",
            "REDESIGN",
            "SKLEPY",
            "LAUNCH",
          ]}
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
