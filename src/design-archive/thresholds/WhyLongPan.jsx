import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DESKTOP, stepPosition, useMedia } from "@/design-archive/thresholds/shared";

// Why us, "The Long Pan" (Thresholds, p.6). Three reasons, and the one
// sideways move in an otherwise vertical journey: on desktop, scrolling down
// pans the camera across the three statements. The last drifts off left, the
// next comes in from the right, a light travels along the horizon line, and
// giant outlined words move behind at a slower speed.
//
// Desktop (1024px and up): two and a third screens tall, pinned while you
// scroll through, drawn on the 1440 × 1000 mock-up scaled to fit (--u is one
// mock-up pixel). Phones and reduced motion: the three statements stack, each
// on its own horizon line, with the light on the one you're reading.

const REASONS = [
  {
    lead: "Small and",
    word: "agile.",
    outline: "agile",
    body: "No faceless outreach team, and no corporate red tape. When you get in touch, you reach us directly.",
  },
  {
    lead: "Passionate and",
    word: "motivated.",
    outline: "motivated",
    body: "We love working with small businesses, independent makers and creative teams. When you work with us, you’re working with a small team who cares about every detail, and who appreciates the hard work you put into your craft.",
    short: "We love working with small businesses, independent makers and creative teams, and we care about every detail.",
  },
  {
    lead: "Tried and",
    word: "trusted.",
    outline: "trusted",
    body: "Connor and Mike have worked together before, for clients big and small.",
  },
];

const PITCH = 924; // mock-up pixels between one statement and the next
const STATEMENT_X = 330;
const pad = (n) => String(n).padStart(2, "0");

export default function WhyLongPan() {
  const desktop = useMedia(DESKTOP);
  const reduceMotion = useReducedMotion();
  return desktop && !reduceMotion ? <WhyPan /> : <WhyStack />;
}

function Header({ subtitle, className = "", style }) {
  return (
    <div className={className} style={style}>
      <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:text-[max(10.5px,calc(var(--u)*11.5))] lg:font-normal">
        Why choose us?
      </p>
      <h2 id="why-us-title" className="font-serif-italic mt-[6px] text-[19px] leading-[1.21] tracking-normal text-[#f1ebe3]/70 lg:mt-[calc(var(--u)*10)] lg:text-[max(17px,calc(var(--u)*21))]">
        {subtitle}
      </h2>
    </div>
  );
}

// ------------------------------------------------------------------ desktop

const u = (n) => `calc(var(--u) * ${n})`;

function WhyPan() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const position = useTransform(scrollYProgress, (p) => stepPosition(p, REASONS.length));
  const pan = useTransform(position, (c) => `translateX(calc(var(--u) * ${-c * PITCH}))`);
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(position, "change", (c) => setCurrent(Math.round(c)));

  return (
    <section id="why-us" aria-labelledby="why-us-title">
      <div ref={trackRef} className="h-[230svh]">
        <div className="sticky top-0 h-svh overflow-hidden [container-type:size]">
          <div className="absolute left-1/2 top-1/2 h-[calc(var(--u)*1000)] w-[calc(var(--u)*1440)] -translate-x-1/2 -translate-y-1/2 [--u:min(calc(100cqw/1440),calc(100cqh/1000))]">
            {/* The horizon, and the light that travels along it */}
            <div aria-hidden="true" className="absolute left-1/2 h-px w-screen -translate-x-1/2 bg-[#f1ebe3]/10" style={{ top: u(761) }} />
            <span
              aria-hidden="true"
              className="absolute z-10 block -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(185,133,80,0.35)]"
              style={{ left: u(STATEMENT_X + 4), top: u(761), width: u(15), height: u(15) }}
            />

            {/* The giant outlined words, moving at half the speed */}
            {REASONS.map((r, i) => (
              <Outline key={r.outline} reason={r} index={i} position={position} />
            ))}

            {/* The statements, on one long track */}
            <motion.div className="absolute inset-0" style={{ transform: pan }}>
              {REASONS.map((r, i) => (
                <Statement key={r.outline} reason={r} index={i} position={position} />
              ))}
            </motion.div>

            <Header
              subtitle="Three reasons. Scrolling moves you sideways through them."
              className="absolute"
              style={{ left: u(64), top: u(56) }}
            />
            <p
              aria-hidden="true"
              className="font-serif-italic absolute leading-none tracking-normal text-[#f1ebe3]/80"
              style={{ right: u(64), top: u(84), fontSize: u(24) }}
            >
              {pad(current + 1)} <span className="text-[#f1ebe3]/40">/</span> {pad(REASONS.length)}
            </p>

            {/* Progress, and the nudge to keep going */}
            <div aria-hidden="true" className="absolute flex" style={{ left: u(64), top: u(843), gap: u(9) }}>
              {REASONS.map((r, i) => (
                <span
                  key={r.outline}
                  className={`block h-[2px] transition-colors duration-500 ${i === current ? "bg-accent" : "bg-[#f1ebe3]/20"}`}
                  style={{ width: u(79) }}
                />
              ))}
            </div>
            <p
              aria-hidden="true"
              className="absolute uppercase leading-none tracking-[0.24em] text-[#f1ebe3]/55 transition-opacity duration-500"
              style={{ right: u(64), top: u(838), fontSize: "max(10px, calc(var(--u) * 11))", opacity: current < REASONS.length - 1 ? 1 : 0 }}
            >
              Keep scrolling →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement({ reason, index, position }) {
  // Full strength when it's the one you're on, dimmer either side; the body
  // only reads on the current one
  const distance = useTransform(position, (c) => Math.min(Math.abs(index - c), 1));
  const titleOpacity = useTransform(distance, (d) => 1 - d * 0.62);
  const bodyOpacity = useTransform(distance, (d) => Math.max(0, 1 - d * 1.8));
  const left = STATEMENT_X + index * PITCH;

  return (
    <div className="absolute" style={{ left: u(left), top: u(244), width: u(640) }}>
      <motion.div style={{ opacity: titleOpacity }}>
        <p className="font-serif-italic leading-none tracking-normal text-accent" style={{ fontSize: u(22) }}>
          {pad(index + 1)}
        </p>
        <h3 className="font-display whitespace-nowrap font-light leading-[1.05] tracking-[-0.01em]" style={{ marginTop: u(26), fontSize: u(104) }}>
          {reason.lead}
          <br />
          <em className="font-serif-italic font-light text-accent">{reason.word}</em>
        </h3>
      </motion.div>
      <motion.p
        className="leading-[1.65] text-[#f1ebe3]/80"
        style={{ opacity: bodyOpacity, marginTop: u(46), width: u(500), fontSize: "max(15px, calc(var(--u) * 17))" }}
      >
        {reason.body}
      </motion.p>
      {/* the statement's mark on the horizon */}
      <span
        aria-hidden="true"
        className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1ebe3]/35"
        style={{ left: u(4), top: u(761 - 244), width: u(7), height: u(7) }}
      />
    </div>
  );
}

function Outline({ reason, index, position }) {
  const x = useTransform(position, (c) => `translateX(calc(var(--u) * ${(index - c) * PITCH * 0.5}))`);
  const opacity = useTransform(position, (c) => 1 - Math.min(Math.abs(index - c), 1));
  return (
    <motion.p
      aria-hidden="true"
      className="font-serif-italic pointer-events-none absolute whitespace-nowrap font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(241,235,227,0.1)]"
      style={{ left: u(81), top: u(180), fontSize: u(330), transform: x, opacity }}
    >
      {reason.outline}
    </motion.p>
  );
}

// ------------------------------------------------------- phones, reduced motion

function WhyStack() {
  const [current, setCurrent] = useState(0);
  return (
    <section id="why-us" aria-labelledby="why-us-title" className="overflow-hidden px-6 pt-[56px] pb-[64px] md:px-10 lg:px-16 lg:py-32">
      <Header subtitle="Three reasons." />
      <ol className="mt-[28px] lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-12">
        {REASONS.map((r, i) => (
          <StackedReason key={r.outline} reason={r} index={i} lit={i === current} onRead={setCurrent} />
        ))}
      </ol>
    </section>
  );
}

function StackedReason({ reason, index, lit, onRead }) {
  const ref = useRef(null);
  // "Reading" it: it's crossing the middle of the screen
  const reading = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (reading) onRead(index);
  }, [reading, onRead, index]);

  return (
    <li ref={ref} className="relative pt-[44px] pb-[36px] lg:overflow-hidden">
      {/* its horizon, lit while you're reading it */}
      <span aria-hidden="true" className="absolute inset-x-0 top-[12px] h-px bg-[#f1ebe3]/12" />
      <span
        aria-hidden="true"
        className={`absolute top-[12px] block -translate-y-1/2 rounded-full transition-all duration-700 ${
          lit ? "left-0 h-[15px] w-[15px] bg-accent shadow-[0_0_20px_4px_rgba(185,133,80,0.35)]" : "left-[4px] h-[7px] w-[7px] bg-[#f1ebe3]/40"
        }`}
      />
      <p
        aria-hidden="true"
        className="font-serif-italic pointer-events-none absolute right-[-24px] top-[54px] whitespace-nowrap text-[130px] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(241,235,227,0.08)]"
      >
        {reason.outline}
      </p>
      <p className="font-serif-italic relative text-[19px] leading-none tracking-normal text-accent">{pad(index + 1)}</p>
      <h3 className="font-display relative mt-[18px] text-[48px] font-light leading-[1.05] tracking-[-0.01em]">
        {reason.lead}
        <br />
        <em className="font-serif-italic font-light text-accent">{reason.word}</em>
      </h3>
      <p className="relative mt-[22px] max-w-[30rem] text-[16px] leading-[1.65] text-[#f1ebe3]/80">{reason.short ?? reason.body}</p>
    </li>
  );
}
