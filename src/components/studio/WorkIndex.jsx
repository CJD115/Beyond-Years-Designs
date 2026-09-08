import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { PROJECTS } from "@/data/projects";

export default function WorkIndex() {
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  const onMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const activeProject = PROJECTS.find((p) => p.slug === active);

  return (
    <div className="relative" onMouseMove={onMove}>
      <p className="eyebrow mb-6">All Projects</p>
      <ul className="border-t border-border">
        {PROJECTS.map((p, i) => (
          <li key={p.slug} className="border-b border-border">
            <Link
              to={`/work/${p.slug}`}
              onMouseEnter={() => setActive(p.slug)}
              onMouseLeave={() => setActive(null)}
              className={`group flex items-center justify-between gap-6 py-6 md:py-8 transition-opacity duration-300 ${
                active && active !== p.slug ? "opacity-40" : "opacity-100"
              }`}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="eyebrow w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-4xl md:text-6xl lg:text-7xl leading-none text-foreground transition-transform duration-500 ease-out group-hover:translate-x-3">
                  {p.name}
                </span>
              </div>
              <div className="flex items-center gap-6 md:gap-10">
                <span className="hidden md:block text-sm text-muted-foreground">
                  {p.industry} — {p.year}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 text-muted-foreground transition-all duration-500 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.25}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block -ml-37.5 -mt-25"
          >
            <div className="h-50 w-75 overflow-hidden border border-border shadow-2xl shadow-black/20">
              <Image
                src={activeProject.image}
                alt={activeProject.name}
                fittingType="fill"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}