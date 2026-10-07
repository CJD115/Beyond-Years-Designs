import { useSyncExternalStore } from "react";

// Shared pieces for the Thresholds homepage preview (/thresholds).

export const BG = "#13110d";
export const LINEN = "#f1ebe3";
export const OCHRE = "#b98550";
export const EASE = [0.22, 1, 0.36, 1];

export const DESKTOP = "(min-width: 1024px)";

// True while the media query matches; false while prerendering
export function useMedia(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Scroll progress (0–1) through a pinned track to a position along `count`
// steps (0 to count - 1), as Process does it: each step has an equal share of
// the scroll, resting for the first half of it and moving on to the next step
// in the second, so the last step rests through its whole share.
export function stepPosition(p, count) {
  const q = p * count;
  const k = Math.min(Math.floor(q), count - 1);
  if (k >= count - 1) return count - 1;
  return k + easeInOut(clamp01((q - k - 0.5) / 0.5));
}

// Scroll a pinned track to where step k rests
export function scrollToStep(track, k, count) {
  const top = track.getBoundingClientRect().top + window.scrollY;
  const distance = track.offsetHeight - window.innerHeight;
  window.scrollTo({ top: top + ((k + 0.2) / count) * distance, behavior: "smooth" });
}

// [r, g, b, a] colours, mixed for the scroll-linked words
export const LINEN_RGB = [241, 235, 227];
export const OCHRE_RGB = [185, 133, 80];
export function mix(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t);
}
export function rgba([r, g, b, a]) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;
}
