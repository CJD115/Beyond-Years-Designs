import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const enabled = window.matchMedia("(pointer: fine)").matches;
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
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-100 hidden md:block">
      <motion.div
        animate={{ scale: hovering ? 2 : 0.9, opacity: hovering ? 0.4 : 0.3 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="-ml-3 -mt-3 h-6 w-6 rounded-full border border-white/80 mix-blend-difference"
      />
    </motion.div>
  );
}