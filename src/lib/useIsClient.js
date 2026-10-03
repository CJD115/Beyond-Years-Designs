import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False while a page is prerendered at build time (scripts/prerender.mjs) and
// while React takes that HTML over in the browser, then true. Anything that
// only exists in the browser (portals, the current date) waits for it, so the
// first render matches the prerendered HTML.
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
