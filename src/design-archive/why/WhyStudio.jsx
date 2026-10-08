import WhyOriginal from "@/design-archive/why/WhyOriginal";
import WhyPartyPerks from "@/components/studio/why/WhyPartyPerks";

// Why Us ("Why choose us?").
// Two finished designs live in ./why, and this word picks the one the site
// shows. Change it to swap them:
//   "perks"    — Party Perks: the three reasons as perks on a staircase that
//                steps up from left to right (Level Up direction, October 2026)
//   "original" — the original: three numbered rows
const LIVE = "perks";

const DESIGNS = { perks: WhyPartyPerks, original: WhyOriginal };

export default function WhyStudio() {
  // Dev server only: /?why=perks or /?why=original previews either one
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("why")?.toLowerCase()
    : null;

  const Design = DESIGNS[key] ?? DESIGNS[LIVE];
  return <Design />;
}
