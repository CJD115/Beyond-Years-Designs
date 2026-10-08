import "./hero.css";
import HeroOriginal from "@/design-archive/hero/HeroOriginal";
import HeroXray from "@/design-archive/hero/HeroXray";
import { heroDesign } from "@/design-archive/hero/design";

// Hero. Two finished designs live in ./hero; ./hero/design.js picks the one
// the site shows (and the nav changes with it).
export default function Hero() {
  return heroDesign() === "xray" ? <HeroXray /> : <HeroOriginal />;
}
