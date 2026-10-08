import Nav from "@/components/studio/Nav";
import Hero from "@/components/studio/Hero";
import Work from "@/components/studio/Work";
import Vision from "@/components/studio/Vision";
import Services from "@/components/studio/Services";
import WhyStudio from "@/components/studio/WhyStudio";
import Process from "@/components/studio/Process";
import Aftercare from "@/components/studio/Aftercare";
import About from "@/components/studio/About";
import FinalCTA from "@/components/studio/FinalCTA";
import Footer from "@/components/studio/Footer";
import { useSeo } from "@/lib/seo";

// The homepage before the Rooms redesign (October 2026): the X-ray hero and
// light nav, every section on the paper. Dev server only, at /original.
export default function HomeOriginal() {
  useSeo({
    title: "Original homepage (archive) | Beyond Years Designs",
    description: "The previous Beyond Years Designs homepage, kept for comparison.",
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      {/* tabIndex -1: the skip link can move focus here */}
      <main id="content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Work />
        <Vision />
        <About />
        <Services />
        <WhyStudio />
        <Process />
        <Aftercare />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
