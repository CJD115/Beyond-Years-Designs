import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

// "Our Vision" — direction D, "Read slowly".
// A dark chapter between Work and Services. The section pins while you scroll
// and the sentence lights up word by word, at reading pace, with a thin ochre
// rail (the hero's line, standing upright) marking your progress. With reduced
// motion the sentence is simply shown, fully lit, in a normal section.

const WORDS = [
  { text: "Building" },
  { text: "thoughtful" },
  { text: "websites", breakAfter: true },
  { text: "for" },
  { text: "small" },
  { text: "businesses", breakAfter: true },
  { text: "with" },
  { text: "big", accent: true },
  { text: "ambitions.", accent: true },
];

const LIGHT = "#F4EEE6";
const DIM_OPACITY = 0.16;
const READ_START = 0.1; // scroll progress where reading begins
const READ_END = 0.78; // …and where the last word is fully lit

function Word({ word, index, progress }) {
  const step = (READ_END - READ_START) / WORDS.length;
  const start = READ_START + index * step;
  const opacity = useTransform(progress, [start, start + step * 1.6], [DIM_OPACITY, 1]);

  return (
    <>
      <motion.span
        style={{ opacity }}
        className={word.accent ? "font-serif-italic text-accent" : undefined}
      >
        {word.text}
      </motion.span>
      {word.breakAfter ? <br className="hidden lg:inline" /> : " "}
      {word.breakAfter && <span className="lg:hidden"> </span>}
    </>
  );
}

function Statement({ progress }) {
  return (
    <h2
      className="font-display text-[clamp(44px,7.2vw,112px)] leading-[1.02] tracking-[-0.02em]"
      style={{ color: LIGHT }}
    >
      {WORDS.map((word, i) =>
        progress ? (
          <Word key={word.text} word={word} index={i} progress={progress} />
        ) : (
          <span key={word.text}>
            <span className={word.accent ? "font-serif-italic text-accent" : undefined}>
              {word.text}
            </span>
            {word.breakAfter ? <br className="hidden lg:inline" /> : " "}
            {word.breakAfter && <span className="lg:hidden"> </span>}
          </span>
        ),
      )}
    </h2>
  );
}

// 0 when the section's top reaches the top of the viewport, 1 when its bottom
// reaches the bottom. Measured live every frame (rather than cached), so it
// stays right when images above finish loading and push the section down.
function useReadingProgress(ref, enabled) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      progress.set(distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 1);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [ref, enabled, progress]);

  return progress;
}

export default function VisionReadSlowly() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const scrollYProgress = useReadingProgress(trackRef, !reduceMotion);
  const railScale = useTransform(scrollYProgress, [READ_START, READ_END], [0, 1]);
  const dotTop = useTransform(railScale, (v) => `${v * 100}%`);

  if (reduceMotion) {
    return (
      <section id="vision" ref={trackRef} className="bg-[#141312] py-28 md:py-40">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
          <div className="md:pl-24">
            <p className="eyebrow mb-10 md:mb-14 text-[#F4EEE6]/55">Our vision</p>
            <Statement />
          </div>
        </div>
      </section>
    );
  }

  return (
    // The tall track gives the reader time; the inner frame stays pinned.
    <section id="vision" ref={trackRef} className="relative h-[230svh] bg-[#141312]">
      <div className="sticky top-0 flex min-h-svh items-center py-24">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
          <div className="relative pl-8 md:pl-24">
            <p className="eyebrow mb-10 md:mb-14 text-[#F4EEE6]/55">Our vision</p>

            {/* progress rail */}
            <div aria-hidden="true" className="absolute bottom-[0.2em] left-0 top-[4.2rem] w-px bg-[#F4EEE6]/15 md:top-[5.2rem]">
              <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY: railScale }} />
              <motion.div
                className="absolute -left-1 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-accent"
                style={{ top: dotTop }}
              />
            </div>

            <Statement progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
