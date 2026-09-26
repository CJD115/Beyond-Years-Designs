import Nav from "@/components/studio/Nav";
import Hero from "@/components/studio/Hero";
import Work from "@/components/studio/Work";
// import WorkIndex from "@/components/studio/WorkIndex";
import StatementSection from "@/components/studio/StatementSection";
import Services from "@/components/studio/Services";
import WhyStudio from "@/components/studio/WhyStudio";
import Process from "@/components/studio/Process";
import About from "@/components/studio/About";
import FinalCTA from "@/components/studio/FinalCTA";
import Footer from "@/components/studio/Footer";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/data/site";
import AddOns from "@/components/studio/AddOns";

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
        {/* <section className="relative pt-0 pb-24 md:pt-20 md:pb-36">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
            <WorkIndex />
          </div>
        </section> */}
        <StatementSection />
        <Services />
        <WhyStudio />
        <Process />
        <About />
        <AddOns />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}