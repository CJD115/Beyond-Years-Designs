import { useSeo } from "@/lib/seo";
import WorkThreeRooms from "@/components/studio/work/WorkThreeRooms";
import ProcessThresholds from "@/components/studio/process/ProcessThresholds";
import AboutLightsOn from "@/components/studio/about/AboutLightsOn";
import ContactDoor from "@/components/studio/contact/ContactDoor";
import FooterDoor from "@/components/studio/contact/FooterDoor";
import ThresholdsNav from "@/components/studio/ThresholdsNav";
import HeroDoorway from "@/components/studio/hero/HeroDoorway";
import VisionWordByWord from "./VisionWordByWord";
import ServicesCollection from "./ServicesCollection";
import WhyLongPan from "./WhyLongPan";
import AftercareRoad from "./AftercareRoad";
import "./thresholds-page.css";

// The whole homepage in the Thresholds direction
// (Beyond-Years-Redesign-04-Thresholds-v2.pdf), at /thresholds on the dev
// server only, to compare with the live homepage. App.jsx loads it on demand
// and only in development, so none of src/redesign reaches the live site.
//
// Work, Process, About and Contact + footer are the live Thresholds sections,
// used as they are; the rest are built here. Sections follow the direction's
// own order.
export default function ThresholdsHome() {
  useSeo({
    title: "Thresholds preview | Beyond Years Designs",
    description: "The Beyond Years Designs homepage in the Thresholds direction (preview).",
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-[#13110d] text-[#f1ebe3] antialiased [--accent:30_43%_52%]">
      <ThresholdsNav />
      <main id="content" tabIndex={-1} className="focus:outline-none">
        <HeroDoorway />
        <WorkThreeRooms />
        <VisionWordByWord />
        <ServicesCollection />
        <WhyLongPan />
        <ProcessThresholds />
        <AftercareRoad />
        <AboutLightsOn />
        <ContactDoor />
      </main>
      <FooterDoor />
    </div>
  );
}
