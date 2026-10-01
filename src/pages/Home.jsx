import Nav from "@/components/studio/Nav";
import Hero from "@/components/studio/Hero";
import Work from "@/components/studio/Work";
import StatementSection from "@/components/studio/StatementSection";
import Services from "@/components/studio/Services";
import WhyStudio from "@/components/studio/WhyStudio";
import Process from "@/components/studio/Process";
import Aftercare from "@/components/studio/Aftercare";
import About from "@/components/studio/About";
import FinalCTA from "@/components/studio/FinalCTA";
import Footer from "@/components/studio/Footer";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/data/site";

export default function Home() {
  useSeo({
    title: SITE.title,
    description: SITE.description,
    type: "website",
    path: "/",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      {/* tabIndex -1: the skip link can move focus here */}
      <main id="content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Work />
        <StatementSection />
        <Services />
        <WhyStudio />
        <Process />
        <Aftercare />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}