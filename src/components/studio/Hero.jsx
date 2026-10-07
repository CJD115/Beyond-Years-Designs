import HeroOriginal from "./hero/HeroOriginal";
import HeroXray from "./hero/HeroXray";
import { heroDesign } from "./hero/design";

// Hero. Two finished designs live in ./hero; ./hero/design.js picks the one
// the site shows (and the nav changes with it).
export default function Hero() {
  return heroDesign() === "xray" ? <HeroXray /> : <HeroOriginal />;
}
