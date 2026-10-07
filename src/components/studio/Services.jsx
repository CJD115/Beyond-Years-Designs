import ServicesExploded from "./services/ServicesExploded";
import ServicesOriginal from "./services/ServicesOriginal";

// Services ("Everything your business needs in one focussed website").
// Two finished designs live in ./services, and this word picks the one the
// site shows. Change it to swap them:
//   "exploded" — Exploded View: the four services as the four layers of one
//                website (Under the Surface direction, October 2026)
//   "original" — the original: four numbered rows
const LIVE = "exploded";

const DESIGNS = { exploded: ServicesExploded, original: ServicesOriginal };

export default function Services() {
  // Dev server only: /?services=exploded or /?services=original previews either one
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("services")?.toLowerCase()
    : null;

  const Design = DESIGNS[key] ?? DESIGNS[LIVE];
  return <Design />;
}
