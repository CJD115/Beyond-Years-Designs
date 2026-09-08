import Nav from "@/components/studio/Nav";
import Hero from "@/components/studio/Hero";
import Work from "@/components/studio/Work";
import Services from "@/components/studio/Services";
import WhyStudio from "@/components/studio/WhyStudio";
import Process from "@/components/studio/Process";
import About from "@/components/studio/About";
import FinalCTA from "@/components/studio/FinalCTA";
import Footer from "@/components/studio/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <WhyStudio />
        <Process />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}