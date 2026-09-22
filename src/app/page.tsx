import { Chatbot } from "@/components/Chatbot";
import { Contact } from "@/components/Contact";
import { Crew } from "@/components/Crew";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Crew />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
