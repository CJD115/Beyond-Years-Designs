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
import { PROJECTS } from "@/data/projects";
import AddOns from "@/components/studio/AddOns";

export default function Home() {
  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];

  useSeo({
    title: "Beyond Years Designs | Web Design and Development Studio",
    description:
      "Beyond Years Designs is a Bristol-based two-person web design and development studio. We design, build, and write considered websites for small businesses and creative teams.",
    type: "website",
    image: featured?.image,
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
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