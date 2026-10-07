import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DESKTOP, EASE, LINEN_RGB, OCHRE_RGB, mix, rgba, scrollToStep, stepPosition, useMedia } from "./shared";

// Our Vision, "Word by Word" (Thresholds, p.4). You travel through the
// sentence: nested door frames recede to a vanishing point, the words wait
// there small and faint, and come towards you one at a time, arriving huge
// and lit before passing out of frame and lingering as ghosts ("Building",
// the struck "beautiful"). The note about the current word fades in beneath it.
//
// The section is three screens tall and the view is pinned while you scroll
// through it, as in Process. The list on the right (desktop) jumps to a
// word. With reduced motion the sentence is shown whole and still.
//
// Desktop (1024px and up) is the 1440 × 1000 mock-up scaled to fit the
// screen; phones are the 390 × 844 phone mock-up. --u is one mock-up pixel.

const NOTES = [
  { text: "Beautiful is easy. Thoughtful means everything works precisely as it needs to.", by: "Mike — Resident Wordsmith" },
  { text: "Designed and built from a blank page. No templates, no stock layouts.", by: "Connor — Resident Web Developer" },
  { text: "We’re a small business too, so we know how much a good website matters.", by: "Connor & Mike" },
];

// The sentence, one word (or phrase) at a time. `fit` shrinks the long ones
// so they still fit the frame when they arrive; `exit` is where each one flies
// to as it passes the camera (desktop, then phone), and `ghost` how big it is
// once it's there.
const WORDS = [
  { text: "Building", exit: [[-200, 345], [0, 290]], ghost: 1.8 },
  { text: "beautiful", italic: true, struck: true, exit: [[760, -390], [140, -290]], ghost: 1.5 },
  { text: "thoughtful", italic: true, note: 0, exit: [[-240, 350], [-10, 290]], ghost: 1.8 },
  { text: "websites", note: 1, exit: [[720, -380], [150, -290]], ghost: 1.6 },
  { text: "for businesses", note: 2, fit: [0.9, 0.82], exit: [[-260, 350], [-10, 290]], ghost: 1.6 },
  { text: "with big ", em: "ambitions.", fit: [0.68, 0.6], exit: [[0, 0], [0, 0]], ghost: 1 },
];

// The progress list: which word each entry stands for (beautiful counts
// towards thoughtful, the word that replaces it)
const LIST = [
  { label: "Building", word: 0 },
  { label: "Thoughtful", word: 2 },
  { label: "Websites", word: 3 },
  { label: "Businesses", word: 4 },
  { label: "Ambitions", word: 5 },
];
const listIndexFor = (word) => [0, 1, 1, 2, 3, 4][word];

// Where a word sits, by how far ahead of the camera it is (0 is arrived):
// y, scale and brightness, from the mock-ups
const LAYOUTS = {
  desktop: {
    cx: 720,
    font: 200,
    y: [560, 382, 318, 282, 262, 250],
    s: [1, 0.38, 0.26, 0.15, 0.1, 0.07],
    a: [1, 0.62, 0.5, 0.36, 0.2, 0.08],
  },
  phone: {
    cx: 195,
    font: 78,
    y: [434, 364, 324, 300, 286, 278],
    s: [1, 0.51, 0.33, 0.2, 0.13, 0.09],
    a: [1, 0.62, 0.5, 0.36, 0.2, 0.08],
  },
};

const GHOST = 0.055;
const lerp = (a, b, t) => a + (b - a) * t;

// A word's position, size and colour when it's `d` steps ahead of the camera
function wordState(d, word, layout, phone) {
  const lit = word.struck ? [...LINEN_RGB, 0.45] : [...OCHRE_RGB, 1];
  if (d >= 0) {
    const i = Math.min(Math.floor(d), layout.y.length - 1);
    const j = Math.min(i + 1, layout.y.length - 1);
    const t = Math.min(d - i, 1);
    const alpha = d > layout.y.length - 1 ? 0 : lerp(layout.a[i], layout.a[j], t);
    const ahead = [...LINEN_RGB, alpha];
    return {
      x: layout.cx,
      y: lerp(layout.y[i], layout.y[j], t),
      s: lerp(layout.s[i], layout.s[j], t),
      color: d < 1 ? mix(lit, [...LINEN_RGB, layout.a[1]], d) : ahead,
      weight: Math.round(lerp(300, 500, Math.min(d, 1))),
    };
  }
  // Passing the camera, then lingering as a ghost, then gone
  const [ex, ey] = word.exit[phone ? 1 : 0];
  const t = Math.min(-d, 1);
  const fade = -d <= 2 ? 1 : Math.max(0, 3 + d);
  return {
    x: layout.cx + ex * t,
    y: layout.y[0] + ey * t,
    s: lerp(1, word.ghost, t),
    color: mix(lit, [...LINEN_RGB, GHOST * fade], t),
    weight: 300,
  };
}

export default function VisionWordByWord() {
  const reduceMotion = useReducedMotion();
  return reduceMotion ? <VisionStill /> : <VisionJourney />;
}

function VisionJourney() {
  const trackRef = useRef(null);
  const phone = !useMedia(DESKTOP);
  const layout = phone ? LAYOUTS.phone : LAYOUTS.desktop;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const position = useTransform(scrollYProgress, (p) => stepPosition(p, WORDS.length));
  const frameScale = useTransform(position, (c) => 1 + c * 0.035);
  // The word nearest the camera, and whether it has come to rest (the note
  // only shows then, so a word flying past never crosses it)
  const [[current, settled], setCurrent] = useState([0, true]);
  useMotionValueEvent(position, "change", (c) => {
    const k = Math.round(c);
    const rest = Math.abs(c - k) < 0.12;
    setCurrent((prev) => (prev[0] === k && prev[1] === rest ? prev : [k, rest]));
  });

  const note = settled ? WORDS[current].note : undefined;
  const listIndex = listIndexFor(current);

  return (
    <section id="vision" aria-labelledby="vision-title">
      <h2 id="vision-title" className="sr-only">
        Our vision: building thoughtful websites for businesses with big ambitions.
      </h2>
      <ul className="sr-only">
        {NOTES.map((n) => (
          <li key={n.by}>
            {n.text} ({n.by})
          </li>
        ))}
      </ul>

      <div ref={trackRef} className="h-[300svh]">
        <div className="sticky top-0 h-svh overflow-hidden [container-type:size]">
          <div
            className="absolute left-1/2 top-1/2 h-[calc(var(--u)*844)] w-[calc(var(--u)*390)] -translate-x-1/2 -translate-y-1/2 [--u:min(calc(100cqw/390),calc(100cqh/844))] lg:h-[calc(var(--u)*1000)] lg:w-[calc(var(--u)*1440)] lg:[--u:min(calc(100cqw/1440),calc(100cqh/1000))]"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ scale: frameScale, transformOrigin: phone ? "50% 37%" : "50% 28%" }}
            >
              {phone ? <PhoneFrames /> : <DesktopFrames />}
            </motion.div>

            {WORDS.map((word, i) => (
              <Word key={word.text} word={word} index={i} position={position} layout={layout} phone={phone} />
            ))}

            <div aria-hidden="true" className="absolute left-[calc(var(--u)*24)] top-[calc(var(--u)*40)] lg:left-[calc(var(--u)*64)] lg:top-[calc(var(--u)*106)]">
              <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:text-[max(10.5px,calc(var(--u)*11.5))] lg:font-normal">
                Our vision
              </p>
              <p className="font-serif-italic mt-[6px] text-[19px] leading-[1.21] tracking-normal text-[#f1ebe3]/70 lg:mt-[calc(var(--u)*10)] lg:text-[max(17px,calc(var(--u)*21))]">
                {phone ? "Scroll through it, word by word." : "Scroll to move through it, word by word."}
              </p>
            </div>

            {/* The note about the current word */}
            <div aria-hidden="true" className="absolute inset-x-[calc(var(--u)*24)] top-[calc(var(--u)*590)] text-center lg:inset-x-[calc(var(--u)*400)] lg:top-[calc(var(--u)*688)]">
              <AnimatePresence mode="wait">
                {note !== undefined && (
                  <motion.div
                    key={note}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p className="font-serif-italic text-[19px] leading-[1.35] tracking-normal text-[#f1ebe3]/85 lg:text-[max(18px,calc(var(--u)*26))]">
                      “{NOTES[note].text}”
                    </p>
                    <p className="mt-[14px] text-[11px] uppercase leading-none tracking-[0.22em] text-[#f1ebe3]/60 lg:mt-[calc(var(--u)*20)] lg:text-[max(10px,calc(var(--u)*11))]">
                      {NOTES[note].by}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {phone ? (
              <PhoneProgress active={listIndex} />
            ) : (
              <DesktopProgress active={listIndex} onGo={(k) => scrollToStep(trackRef.current, LIST[k].word, WORDS.length)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({ word, index, position, layout, phone }) {
  const state = (c) => wordState(index - c, word, layout, phone);
  const transform = useTransform(position, (c) => {
    const { x, y, s } = state(c);
    return `translate(calc(var(--u) * ${x}), calc(var(--u) * ${y})) translate(-50%, -50%) scale(${s})`;
  });
  const color = useTransform(position, (c) => rgba(state(c).color));
  const fontWeight = useTransform(position, (c) => state(c).weight);
  const strike = useTransform(position, (c) => Math.max(state(c).color[3], 0.3) * (index - c < -2 ? Math.max(0, 3 + index - c) : 1));
  const fit = word.fit?.[phone ? 1 : 0] ?? 1;

  return (
    <motion.p
      aria-hidden="true"
      className={`absolute left-0 top-0 whitespace-nowrap leading-none tracking-[-0.01em] will-change-transform ${word.italic ? "font-serif-italic" : "font-display"}`}
      style={{ transform, color, fontWeight, fontSize: `calc(var(--u) * ${layout.font * fit})` }}
    >
      <span className="relative">
        {word.text}
        {word.em && <span className="font-serif-italic">{word.em}</span>}
        {word.struck && (
          <motion.span
            className="absolute -left-[0.04em] -right-[0.04em] top-[56%] h-[0.012em] min-h-px bg-accent"
            style={{ opacity: strike }}
          />
        )}
      </span>
    </motion.p>
  );
}

// The nested doorways, receding to the vanishing point
function DesktopFrames() {
  const rects = [
    [40, 70, 1360, 899],
    [220, 120, 1000, 639],
    [360, 150, 719, 459],
    [471, 171, 499, 318],
    [550, 193, 340, 214],
  ];
  const inner = [610, 213, 220, 138];
  return (
    <svg viewBox="0 0 1440 1000" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
      <g stroke="rgba(241,235,227,0.09)">
        {rects.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
        ))}
        <path d="M40 70 L610 213 M1400 70 L830 213 M40 969 L610 351 M1400 969 L830 351" />
      </g>
      <rect x={inner[0]} y={inner[1]} width={inner[2]} height={inner[3]} stroke="rgba(185,133,80,0.4)" />
    </svg>
  );
}

function PhoneFrames() {
  const rects = [
    [16, 105, 357, 612],
    [85, 190, 220, 380],
    [127, 244, 135, 250],
  ];
  return (
    <svg viewBox="0 0 390 844" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
      <g stroke="rgba(241,235,227,0.09)">
        {rects.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
        ))}
        <path d="M16 105 L156 279 M373 105 L233 279 M16 717 L156 414 M373 717 L233 414" />
      </g>
      <rect x="156" y="279" width="77" height="135" stroke="rgba(185,133,80,0.4)" />
    </svg>
  );
}

function DesktopProgress({ active, onGo }) {
  return (
    <ul className="absolute right-[calc(var(--u)*63)] top-[calc(var(--u)*318)]">
      {LIST.map((item, k) => (
        <li key={item.label}>
          <button
            type="button"
            aria-current={k === active ? "step" : undefined}
            onClick={() => onGo(k)}
            className={`flex min-h-[max(34px,calc(var(--u)*36))] w-full items-center justify-end gap-[calc(var(--u)*14)] text-[max(10px,calc(var(--u)*11))] uppercase leading-none tracking-[0.22em] transition-colors duration-500 ${
              k === active ? "text-accent" : "text-[#f1ebe3]/55 hover:text-[#f1ebe3]/85"
            }`}
          >
            <span className="sr-only">Go to </span>
            {item.label}
            <span
              aria-hidden="true"
              className={`h-px bg-current transition-[width] duration-500 ${k === active ? "w-[calc(var(--u)*44)]" : "w-[calc(var(--u)*14)]"}`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

function PhoneProgress({ active }) {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-[calc(var(--u)*764)] flex flex-col items-center">
      <span className="flex gap-[6px]">
        {LIST.map((item, k) => (
          <span key={item.label} className={`h-px w-[22px] transition-colors duration-500 ${k === active ? "bg-accent" : "bg-[#f1ebe3]/30"}`} />
        ))}
      </span>
      <span className="mt-[16px] text-[12px] uppercase leading-none tracking-[0.22em] text-accent">{LIST[active].label}</span>
    </div>
  );
}

// Reduced motion: the whole sentence, still, inside the doorways
function VisionStill() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16 lg:py-32">
      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#f1ebe3]/75">Our vision</p>
      <h2 id="vision-title" className="font-display mt-10 text-center text-[clamp(44px,7vw,112px)] font-light leading-[1.05] tracking-[-0.01em]">
        Building <s className="text-[#f1ebe3]/40 decoration-accent decoration-2">beautiful</s>{" "}
        <em className="font-serif-italic text-accent">thoughtful</em>
        <br /> websites for businesses
        <br /> with big <em className="font-serif-italic">ambitions.</em>
      </h2>
      <ul className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-3">
        {NOTES.map((n) => (
          <li key={n.by} className="text-center">
            <p className="font-serif-italic text-[20px] leading-[1.35] text-[#f1ebe3]/85">“{n.text}”</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#f1ebe3]/60">{n.by}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
