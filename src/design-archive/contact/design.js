// Which contact section + footer the site shows. They're swapped as a pair,
// because the Door design's light runs from the contact section into the
// footer. Change this one word to swap them:
//   "door"     — The Door Left Open: a door ajar in a dark room, its light
//                spilling across the floor (Thresholds direction, October 2026)
//   "original" — the big "Your business has a story" heading with the form
//                beside it, and the original footer
export const LIVE = "door";

// Dev server only: /?contact=door or /?contact=original previews either pair
export function contactDesign() {
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("contact")?.toLowerCase()
    : null;
  return key === "door" || key === "original" ? key : LIVE;
}
