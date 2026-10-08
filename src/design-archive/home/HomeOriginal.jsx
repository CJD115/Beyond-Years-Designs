import Nav from "@/design-archive/hero/Nav";
import Hero from "@/design-archive/hero/Hero";
import Work from "@/design-archive/work/Work";
import Vision from "@/design-archive/vision/Vision";
import Services from "@/design-archive/services/Services";
import WhyStudio from "@/design-archive/why/WhyStudio";
import Process from "@/design-archive/process/Process";
import Aftercare from "@/design-archive/aftercare/Aftercare";
import About from "@/design-archive/about/About";
import FinalCTA from "@/design-archive/contact/FinalCTA";
import Footer from "@/design-archive/contact/Footer";
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
