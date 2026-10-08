import ThresholdsNav from "@/components/studio/ThresholdsNav";
import HeroDoorway from "@/components/studio/hero/HeroDoorway";
import WorkThreeRooms from "@/components/studio/work/WorkThreeRooms";
import VisionAnnotated from "@/components/studio/vision/VisionAnnotated";
import ServicesExploded from "@/components/studio/services/ServicesExploded";
import WhyPartyPerks from "@/components/studio/why/WhyPartyPerks";
import ProcessThresholds from "@/components/studio/process/ProcessThresholds";
import AftercareNewGame from "@/components/studio/aftercare/AftercareNewGame";
import AboutLightsOn from "@/components/studio/about/AboutLightsOn";
import ContactDoor from "@/components/studio/contact/ContactDoor";
import FooterDoor from "@/components/studio/contact/FooterDoor";
import SectionJoin from "@/components/studio/SectionJoin";
import { useSeo } from "@/lib/seo";
import { SITE } from "@/data/site";
import "@/components/studio/rooms.css";

// The homepage, with light and dark grouped into rooms: the page is paper,
// and dark means you've stepped inside somewhere.
//
//   dark    Hero (the Thresholds doorway), Work (Three Rooms)
//   light   Vision (Annotated), Services (Exploded View; the paper runs unbroken)
//   dark    Process (Thresholds), About (Lights On)
//   light   Why us (Party Perks), Aftercare (New Game+), on one sheet
//   dark    Contact (the door), footer
//
// The doorway hero and its nav come from the Thresholds direction, which is
// dark all over, so they sit inside .room-dark here for the cream text and
// lighter ochre. A gold thread (SectionJoin) runs across each change between
// dark and paper. Earlier designs of every section are kept, unused, in
// src/design-archive.
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
        <VisionAnnotated />
        <ServicesExploded />
        <SectionJoin />
        <ProcessThresholds />
        <AboutLightsOn />
        <SectionJoin />
        <WhyPartyPerks />
        <AftercareNewGame />
        {/* short, to clear Aftercare's closing line */}
        <SectionJoin above={52} />
        <ContactDoor />
      </main>
      <FooterDoor />
    </div>
  );
}
