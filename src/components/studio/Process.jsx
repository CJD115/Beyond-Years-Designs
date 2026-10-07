import ProcessCorridor from "./process/ProcessCorridor";
import ProcessOriginal from "./process/ProcessOriginal";

// Process ("How we build your site").
// Two finished designs live in ./process, and this word picks the one the
// site shows. Change it to swap them:
//   "corridor" — The Corridor: four nested doors you walk through as you
//                scroll (Thresholds direction, October 2026)
//   "original" — the original: four numbered steps in a grid
const LIVE = "corridor";

const DESIGNS = { corridor: ProcessCorridor, original: ProcessOriginal };

export default function Process() {
  // Dev server only: /?process=corridor or /?process=original previews either one
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("process")?.toLowerCase()
    : null;

  const Design = DESIGNS[key] ?? DESIGNS[LIVE];
  return <Design />;
}
