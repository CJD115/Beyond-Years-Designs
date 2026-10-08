// Which hero the site shows. The nav changes with it, because the X-ray
// design (Under the Surface) restyles the nav above it. Change this one word
// to swap them:
//   "xray"     — X-ray: a lens that follows the cursor and shows the
//                blueprint under the hero (Under the Surface direction,
//                October 2026)
//   "original" — Hero 3.10, "Pinned to the path": the headline with the
//                three pinned prints
export const LIVE = "xray";

// Dev server only: /?hero=xray or /?hero=original previews either one
export function heroDesign() {
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("hero")?.toLowerCase()
    : null;
  return key === "xray" || key === "original" ? key : LIVE;
}
