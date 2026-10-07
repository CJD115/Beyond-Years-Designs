import { useSyncExternalStore } from "react";

// "The Door Left Open": once an enquiry is sent, the door swings wider and the
// room warms. The contact section and the footer are separate elements (the
// footer has to stay a <footer>), so they share that moment through this
// small store.
let open = false;
const listeners = new Set();

export function openDoor() {
  open = true;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useDoorOpen() {
  return useSyncExternalStore(
    subscribe,
    () => open,
    () => false,
  );
}
