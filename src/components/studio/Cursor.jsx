import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const FINE_POINTER = "(pointer: fine)";

const subscribe = (onChange) => {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export default function Cursor() {
  // Off in the prerendered HTML (there's no pointer at build time); on once
  // the page is running with a mouse or trackpad
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  // With reduced motion the ring tracks the pointer directly instead of
  // trailing behind it on a spring
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHovering(!!e.target.closest?.("a, button, input, textarea, label, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden style={reduceMotion ? { x, y } : { x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-100 hidden md:block">
      <motion.div
        animate={{ scale: hovering ? 2 : 0.9, opacity: hovering ? 0.4 : 0.3 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="-ml-3 -mt-3 h-6 w-6 rounded-full border border-white/80 mix-blend-difference"
      />
    </motion.div>
  );
}