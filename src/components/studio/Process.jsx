import ProcessCorridor from "./process/ProcessCorridor";
import ProcessOriginal from "./process/ProcessOriginal";
import ProcessThresholds from "./process/ProcessThresholds";

// Process ("How we build your site").
// Three finished designs live in ./process, and this word picks the one the
// site shows. Change it to swap them:
//   "thresholds" — Thresholds: the refined corridor, with each stage's label
//                  on its lintel and one line on its sill, and the finished
//                  site lit at the far end (Thresholds direction, October 2026;
//                  spec in design-reference/04-thresholds/06-process)
//   "corridor"   — The Corridor: the first version of the four nested doors
//   "original"   — the original: four numbered steps in a grid
const LIVE = "thresholds";

const DESIGNS = { thresholds: ProcessThresholds, corridor: ProcessCorridor, original: ProcessOriginal };

export default function Process() {
  // Dev server only: /?process=thresholds, /?process=corridor or
  // /?process=original previews any of them
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("process")?.toLowerCase()
    : null;

  const Design = DESIGNS[key] ?? DESIGNS[LIVE];
  return <Design />;
}
