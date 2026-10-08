import Work from "@/components/studio/Work";
import Vision from "@/components/studio/Vision";
import Services from "@/components/studio/Services";
import WhyStudio from "@/components/studio/WhyStudio";
import Process from "@/components/studio/Process";
import Aftercare from "@/components/studio/Aftercare";
import About from "@/components/studio/About";
import FinalCTA from "@/components/studio/FinalCTA";
import Footer from "@/components/studio/Footer";
import ThresholdsNav from "@/redesign/thresholds/ThresholdsNav";
import HeroDoorway from "@/redesign/thresholds/HeroDoorway";
import { useSeo } from "@/lib/seo";
import "@/redesign/thresholds/thresholds-page.css";
import "./rooms.css";

// The homepage with light and dark grouped into rooms: the page is paper,
// and dark means you've stepped inside somewhere. At /rooms on the dev
// server only, to compare with the live page at /.
//
//   dark    Hero (the Thresholds doorway), Work
//   light   Vision, Services (the paper runs unbroken)
//   dark    Process, About
//   light   Why us, Aftercare (Level Up chapters five and seven, on one sheet)
//   dark    Contact, footer
//
// The doorway hero and its nav come from the Thresholds preview, which is
// dark all over, so they sit inside .room-dark here for the cream text and
// lighter ochre. The live nav isn't used: its dark text would disappear over
// the dark hero. Every other section is the live one, unchanged.
export default function RoomsHome() {
  useSeo({
    title: "Rooms preview | Beyond Years Designs",
    description: "The Beyond Years Designs homepage with light and dark grouped into rooms (preview).",
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="room-dark text-foreground">
        <ThresholdsNav />
      </div>
      <main id="content" tabIndex={-1} className="focus:outline-none">
        <div className="room-dark bg-background text-foreground">
          <HeroDoorway />
        </div>
        <Work />
        <Vision />
        <Services />
        <Process />
        <About />
        <WhyStudio />
        <Aftercare />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
