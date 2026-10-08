import ThresholdsNav from "@/components/studio/ThresholdsNav";
import HeroDoorway from "@/components/studio/hero/HeroDoorway";
import WorkThreeRooms from "@/components/studio/work/WorkThreeRooms";
import Vision from "@/components/studio/Vision";
import Services from "@/components/studio/Services";
import WhyStudio from "@/components/studio/WhyStudio";
import Process from "@/components/studio/Process";
import Aftercare from "@/components/studio/Aftercare";
import About from "@/components/studio/About";
import FinalCTA from "@/components/studio/FinalCTA";
import Footer from "@/components/studio/Footer";
import SectionJoin from "@/components/studio/SectionJoin";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/data/site";
import "@/components/studio/rooms.css";

// The homepage, with light and dark grouped into rooms: the page is paper,
// and dark means you've stepped inside somewhere.
//
//   dark    Hero (the Thresholds doorway), Work
//   light   Vision, Services (the paper runs unbroken)
//   dark    Process, About
//   light   Why us, Aftercare (Level Up chapters five and seven, on one sheet)
//   dark    Contact, footer
//
// The doorway hero and its nav come from the Thresholds direction, which is
// dark all over, so they sit inside .room-dark here for the cream text and
// lighter ochre. A gold thread (SectionJoin) runs across each change between
// dark and paper. The previous homepage is kept in
// src/design-archive/home (dev server: /original).
export default function Home() {
  useSeo({
    title: SITE.title,
    description: SITE.description,
    type: "website",
    path: "/",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="room-dark text-foreground">
        <ThresholdsNav />
      </div>
      {/* tabIndex -1: the skip link can move focus here */}
      <main id="content" tabIndex={-1} className="focus:outline-none">
        <div className="room-dark bg-background text-foreground">
          <HeroDoorway />
        </div>
        <WorkThreeRooms />
        {/* A thread across each change between dark and paper */}
        <SectionJoin />
        <Vision />
        <Services />
        <SectionJoin />
        <Process />
        <About />
        <SectionJoin />
        <WhyStudio />
        <Aftercare />
        {/* short, to clear Aftercare's closing line */}
        <SectionJoin above={52} />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
