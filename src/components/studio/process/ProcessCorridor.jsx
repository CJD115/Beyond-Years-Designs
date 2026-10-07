import { useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Corridor from "./Corridor";

// Process, "The Corridor" (Thresholds direction, p.7 of
// Beyond-Years-Redesign-04-Thresholds-v2.pdf). Four nested door frames, one
// per stage, with the finished website lit and waiting at the far end, so a
// client can see the destination from the start.
//
// Desktop: scrolling walks you through each door. The section stays pinned
// while the door you pass scales out past the camera and the next stage's
// text takes over; the stage names jump straight to a stage. With reduced
// motion the corridor stays still and the four stages are listed beneath it.
// Phones: the corridor stays whole in a portrait frame, and each tap, arrow
// or swipe walks you through the next door.

const STAGES = [
  {
    no: "01",
    title: "Groundwork",
    nav: "Groundwork",
    door: "01 — Groundwork",
    body: "First, we discuss the style and content you want and get an understanding of your vision for the site. Then we outline the process going forward.",
    short: "First, we discuss the style and content you want and get an understanding of your vision for the site.",
  },
  {
    no: "02",
    title: "Planning",
    nav: "Planning",
    door: "02 — Planning",
    body: "Once we know what you want, we work out a roadmap with milestones and deadlines, then send it over to make sure you’re happy with it.",
    short: "We work out a roadmap with milestones and deadlines, and send it over to make sure you’re happy.",
  },
  {
    no: "03",
    title: "Production",
    nav: "Production",
    door: "03 — Production",
    body: "Connor builds your website from the ground up, one line of code at a time. Meanwhile, Mike crafts your brand copy so it’s ready to greet the online world.",
    short: "Connor builds your website from the ground up, one line of code at a time, while Mike crafts the words.",
  },
  {
    no: "04",
    title: "Project complete",
    nav: "Complete",
    door: "04 — Project complete",
    body: "Happy with it? It’s all yours once the final payment is in, with hosting, maintenance or domain support if you want it.",
    short: "Happy with it? It’s all yours once the final payment is in, plus ongoing support if you want it.",
  },
];

const LAST = STAGES.length - 1;
const EASE = [0.22, 1, 0.36, 1];

// Scroll position (0 to 1 through the pinned stretch) to stage (0 to 3), with
// a pause at each door so its text can be read
const SCROLL_STOPS = [0, 0.07, 0.263, 0.403, 0.597, 0.737, 0.93, 1];
const STAGE_STOPS = [0, 0, 1, 1, 2, 2, 3, 3];

export default function ProcessCorridor() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-[#13110d] text-[#f1ebe3] [--accent:30_43%_52%]">
      <h2 id="process-title" className="sr-only">
        Process: how we build your site
      </h2>
      <div className="hidden lg:block">{reduceMotion ? <DesktopStill /> : <DesktopWalk />}</div>
      <div className="lg:hidden">
        <Phone reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- desktop

const STAGE_HEADING =
  "font-display text-[calc(var(--u)*44)] font-light leading-[1.21] tracking-normal";

function Room({ children }) {
  // --u: one mock-up pixel, so the 1440 x 1000 room always fits the window
  return (
    <div className="flex h-svh items-center justify-center overflow-hidden [--u:clamp(0.62px,min(calc(100vw/1440),calc(100svh/1000)),1.25px)]">
      <div className="relative h-[calc(var(--u)*1000)] w-[calc(var(--u)*1440)] shrink-0">{children}</div>
    </div>
  );
}

function DesktopHeader() {
  return (
    <>
      <p
        aria-hidden="true"
        className="absolute left-[calc(var(--u)*64)] top-[calc(var(--u)*46.3)] text-[max(10.5px,calc(var(--u)*11))] uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75"
      >
        Process
      </p>
      <p
        aria-hidden="true"
        className="font-serif-italic absolute left-[calc(var(--u)*64)] top-[calc(var(--u)*63.6)] text-[calc(var(--u)*34)] leading-[1.21] tracking-normal"
      >
        How we build your site.
      </p>
    </>
  );
}

function DesktopWalk() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, SCROLL_STOPS, STAGE_STOPS);
  const [stage, setStage] = useState(0);
  useMotionValueEvent(progress, "change", (p) => setStage(Math.round(p)));

  // Jump to a stage: scroll to the middle of its pause
  const goTo = (k) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const travel = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * k) / LAST, behavior: "smooth" });
  };

  const current = STAGES[stage];

  return (
    <div ref={trackRef} className="relative h-[360svh]">
      <div className="sticky top-0">
        <Room>
          <Corridor size="desktop" progress={progress} labels={STAGES.map((s) => s.door)} className="absolute inset-0" />
          <DesktopHeader />

          <div className="absolute left-[calc(var(--u)*64)] top-[calc(var(--u)*841.3)] w-[calc(var(--u)*660)]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.no}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className={STAGE_HEADING}>
                  {current.no} <span className="text-accent">—</span> {current.title}
                </h3>
                <p className="mt-[calc(var(--u)*10)] max-w-[calc(var(--u)*632)] text-[max(14px,calc(var(--u)*15))] leading-[1.667] text-[#f1ebe3]/75">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <nav aria-label="Process stages" className="absolute right-[calc(var(--u)*64)] top-[calc(var(--u)*859.7)]">
            <ol className="flex gap-[calc(var(--u)*28)]">
              {STAGES.map((s, i) => {
                const isActive = i === stage;
                return (
                  <li key={s.no}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`relative block border-b pb-[calc(var(--u)*6)] text-[max(10px,calc(var(--u)*10.5))] uppercase leading-[1.21] tracking-[0.22em] transition-colors duration-500 before:absolute before:-inset-x-1 before:-inset-y-3.5 before:content-[''] ${isActive ? "border-accent text-accent" : "border-transparent text-[#f1ebe3]/50 hover:text-[#f1ebe3]/80"}`}
                    >
                      {s.no} {s.nav}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
          <p
            aria-hidden="true"
            className="font-serif-italic absolute right-[calc(var(--u)*64)] top-[calc(var(--u)*909.4)] text-[calc(var(--u)*20)] leading-[1.21] tracking-normal text-[#f1ebe3]/55"
          >
            Scroll to walk through each door.
          </p>
        </Room>
      </div>
    </div>
  );
}

// Reduced motion: the corridor stands still and the four stages are a calm list
function DesktopStill() {
  const still = useMotionValue(0);
  return (
    <Room>
      <Corridor size="desktop" progress={still} labels={STAGES.map((s) => s.door)} className="absolute inset-0" />
      <DesktopHeader />
      <ol className="absolute left-[calc(var(--u)*64)] right-[calc(var(--u)*64)] top-[calc(var(--u)*841.3)] grid grid-cols-4 gap-[calc(var(--u)*36)]">
        {STAGES.map((s) => (
          <li key={s.no}>
            <h3 className="font-display text-[calc(var(--u)*26)] font-light leading-[1.21] tracking-normal">
              {s.no} <span className="text-accent">—</span> {s.title}
            </h3>
            <p className="mt-[calc(var(--u)*6)] text-[max(12.5px,calc(var(--u)*13))] leading-[1.55] text-[#f1ebe3]/75">{s.short}</p>
          </li>
        ))}
      </ol>
    </Room>
  );
}

// ---------------------------------------------------------------- phone

function Phone({ reduceMotion }) {
  const progress = useMotionValue(0);
  const [stage, setStage] = useState(0);
  const touchX = useRef(null);

  const goTo = (k) => {
    const next = Math.min(Math.max(k, 0), LAST);
    if (next === stage) return;
    setStage(next);
    animate(progress, next, reduceMotion ? { duration: 0 } : { duration: 1.1, ease: EASE });
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) goTo(stage + (dx < 0 ? 1 : -1));
  };

  const current = STAGES[stage];

  return (
    <div className="mx-auto flex min-h-svh max-w-[520px] flex-col px-6 pt-[40.4px] pb-[24.6px] md:px-10">
      <p aria-hidden="true" className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75">
        Process
      </p>
      <p aria-hidden="true" className="font-serif-italic mt-[3.2px] text-[28px] leading-[1.21] tracking-normal">
        How we build your site.
      </p>

      {/* The corridor in its portrait frame; swipe to walk through */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="mt-[24.5px] w-full overflow-hidden [container-type:inline-size]"
      >
        <div className="[--u:calc(100cqw/342)]">
          <Corridor size="phone" progress={progress} labels={["01", "02", "03"]} />
        </div>
      </div>

      <div aria-live="polite" className="mt-[20px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.no}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <h3 className="font-display text-[36px] font-light leading-[1.21] tracking-normal">
              {current.no} <span className="text-accent">—</span> {current.title}
            </h3>
            <p className="mt-[13px] text-[15px] leading-[25px] text-[#f1ebe3]/80">{current.short}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav aria-label="Process stages" className="mt-auto flex items-center justify-between pt-8">
        <StepButton direction={-1} disabled={stage === 0} onClick={() => goTo(stage - 1)} />
        <ol className="flex gap-0.5">
          {STAGES.map((s, i) => {
            const isActive = i === stage;
            return (
              <li key={s.no}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${s.no} ${s.title}`}
                  className={`font-display flex h-12 w-12 items-center justify-center border-b text-[21px] leading-none tracking-normal transition-colors duration-500 ${isActive ? "border-accent text-[#f1ebe3]" : "border-transparent text-[#f1ebe3]/60"}`}
                >
                  {s.no}
                </button>
              </li>
            );
          })}
        </ol>
        <StepButton direction={1} disabled={stage === LAST} onClick={() => goTo(stage + 1)} />
      </nav>
    </div>
  );
}

function StepButton({ direction, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction < 0 ? "Previous stage" : "Next stage"}
      className="flex h-[47px] w-[47px] items-center justify-center border border-[#f1ebe3]/35 transition-[border-color,opacity] duration-300 hover:border-[#f1ebe3] disabled:opacity-35 disabled:hover:border-[#f1ebe3]/35"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className={`w-4 ${direction < 0 ? "-scale-x-100" : ""}`}
      >
        <path d="M0 6h15M10 1l5 5-5 5" />
      </svg>
    </button>
  );
}
