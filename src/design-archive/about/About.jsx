import AboutLightsOn from "@/components/studio/about/AboutLightsOn";
import AboutProfiles from "@/design-archive/about/AboutProfiles";

// About ("Small team, serious standards").
// Two finished designs live in ./about, and this word picks the one the site
// shows. Change it to swap them:
//   "lights"   — Lights On: the dark room where choosing Connor or Mike turns
//                a light on over them (Thresholds direction, October 2026)
//   "profiles" — the original: two portrait cards, each opening a long-bio
//                dialog
const LIVE = "lights";

const DESIGNS = { lights: AboutLightsOn, profiles: AboutProfiles };

export default function About() {
  // Dev server only: /?about=lights or /?about=profiles previews either one
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("about")?.toLowerCase()
    : null;

  const Design = DESIGNS[key] ?? DESIGNS[LIVE];
  return <Design />;
}
