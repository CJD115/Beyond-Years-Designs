import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { STEPS } from "@/data/process";
import { getProject } from "@/data/projects";
import "./thresholds.css";

// Process, "Thresholds": the refined Corridor (04 Thresholds; spec in
// design-reference/04-thresholds/06-process). Four thresholds nested on one
// axis, with the finished website lit at the far end. Each stage is a doorway
// with its label on the lintel and one line on the sill; walking through
// scales the view about the lit door, the threshold you pass falls away, the
// current stage reads at full strength and the ones ahead wait at half.
//
// Desktop (900px and up): the section is two and a half screens tall and the corridor
// is pinned; scrolling walks you through it. The stage buttons and the doorway
// scroll to a stage. With reduced motion it isn't pinned, and the buttons and
// doorway switch stages instantly.
// Phones: the corridor stays whole in a portrait frame; tap it, swipe it or
// use the arrows to walk to the next door.

// Each stage's copy as the corridor tells it: trimmed from STEPS for the
// desktop design, and shorter again for phones (both as the mock-ups have them)
const COPY = [
  "First, we discuss the style and content you want and get an understanding of your vision for the site. Then we outline the process going forward.",
  "Once we know what you want, we work out a development roadmap. With the milestones and deadlines agreed, we send the plan over to make sure you’re happy with it.",
  "Connor builds your website from the ground up, one line of code at a time. Meanwhile, Mike crafts your brand copy so it’s ready to greet the online world.",
  "Happy with the final product? It’s all yours once we receive the final payment, with the option of ongoing support like hosting, maintenance or domain setup.",
];
const PHONE_COPY = [
  "First, we discuss the style and content you want and get an understanding of your vision for the site.",
  "We work out a development roadmap, agree the milestones and deadlines, and send the plan over to make sure you’re happy with it.",
  "Connor builds your website from the ground up, one line of code at a time. Meanwhile, Mike crafts your brand copy.",
  "Happy with the final product? It’s all yours once the final payment is in.",
];

// The line on each doorway's sill
const SILLS = [
  "Your style, your content, your vision.",
  "Milestones and deadlines, agreed.",
  "One line of code at a time.",
];

// How far the view scales at each stage, about the lit door
const DESKTOP_CAMS = [1, 1.45, 2.2, 3.4];
const PHONE_CAMS = [1, 1.513, 2.327, 3.3];

const EASE = [0.65, 0, 0.35, 1];
const SITE_IMAGE = getProject("churcham-homes");

const DESKTOP = "(min-width: 900px)";
const subscribeDesktop = (onChange) => {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP).matches, () => false);
}

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Scroll progress (0–1) to the view's position along the corridor (0–3).
// Each stage has a quarter of the scroll: the view rests for the first half
// of it, then walks through to the next door, arriving as the quarter ends.
function scrollToPosition(p) {
  const q = p * 4;
  const k = Math.min(Math.floor(q), 3);
  if (k >= 3) return 3;
  return k + easeInOut(clamp01((q - k - 0.5) / 0.5));
}
const scrollToStage = (p) => Math.min(Math.floor(p * 4), 3);

// Threshold k's label and sill line: half strength while it's ahead, full
// once you stand at it, gone as you walk through
function textOpacity(c, k) {
  if (c > k) return 1 - clamp01((c - k) / 0.6);
  if (c > k - 1) return 0.5 + 0.5 * (c - (k - 1));
  return 0.5;
}
// Threshold k's face, edge and corner lines fall away as you pass it
const frameOpacity = (c, k) => 1 - clamp01((c - k) / 0.6);

// The view's scale at position c, eased evenly between the stages' scales
function cameraScale(c, cams) {
  const i = Math.min(Math.floor(c), cams.length - 2);
  const f = c - i;
  return Math.exp(Math.log(cams[i]) + (Math.log(cams[i + 1]) - Math.log(cams[i])) * f);
}

function useCorridor(position, cams) {
  const scale = useTransform(position, (c) => cameraScale(c, cams));
  const t0 = useTransform(position, (c) => textOpacity(c, 0));
  const t1 = useTransform(position, (c) => textOpacity(c, 1));
  const t2 = useTransform(position, (c) => textOpacity(c, 2));
  const f0 = useTransform(position, (c) => frameOpacity(c, 0));
  const f1 = useTransform(position, (c) => frameOpacity(c, 1));
  const f2 = useTransform(position, (c) => frameOpacity(c, 2));
  return { scale, text: [t0, t1, t2], frame: [f0, f1, f2] };
}

const walkLabel = (i) =>
  i < 3 ? `Walk through to stage ${STEPS[i + 1].no}, ${STEPS[i + 1].title}` : "Back to the first door";

export default function ProcessThresholds() {
  const trackRef = useRef(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  // Desktop without reduced motion: scrolling drives the corridor
  const scrollMode = isDesktop && !reduceMotion;

  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const scrollPosition = useTransform(scrollYProgress, scrollToPosition);
  const statePosition = useMotionValue(0);
  const position = scrollMode ? scrollPosition : statePosition;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (scrollMode) setStage(scrollToStage(p));
  });

  // Phones and reduced motion: walk (or jump) to the chosen stage
  useEffect(() => {
    if (scrollMode) return;
    const controls = animate(statePosition, stage, { duration: reduceMotion ? 0 : 1.6, ease: EASE });
    return () => controls.stop();
  }, [stage, scrollMode, reduceMotion, statePosition]);

  const goTo = (k) => {
    const next = (k + 4) % 4;
    if (!scrollMode) {
      setStage(next);
      return;
    }
    // Scroll to where that stage rests
    const track = trackRef.current;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((next + 0.2) / 4) * distance, behavior: "smooth" });
  };

  return (
    <section id="process" aria-label="Process" className="rp-process">
      <DesktopCorridor trackRef={trackRef} stage={stage} position={position} onGo={goTo} />
      <PhoneCorridor stage={stage} position={position} onGo={(k) => setStage(Math.min(Math.max(k, 0), 3))} />
    </section>
  );
}

// ---------------------------------------------------------------- desktop

// A length in mock-up pixels
const u = (n) => `calc(var(--u) * ${n})`;

function DesktopCorridor({ trackRef, stage, position, onGo }) {
  const { scale, text, frame } = useCorridor(position, DESKTOP_CAMS);
  const current = STEPS[stage];

  return (
    <div ref={trackRef} className="rp-desk">
      <div className="rp-pin">
        <div className="rp-canvas">
          <motion.div aria-hidden="true" className="rp-cam" style={{ scale }}>
            {/* The room around the corridor, the light spilling across the
                floor towards you, and the line down its centre. The lines run
                on past the frame so the room fills any screen. */}
            <svg className="rp-svg" viewBox="0 0 1440 1000" fill="none">
              <defs>
                <linearGradient id="rp-spill" gradientUnits="userSpaceOnUse" x1="0" y1="820" x2="0" y2="1000">
                  <stop offset="0" stopColor="#B98550" stopOpacity="0.13" />
                  <stop offset="1" stopColor="#B98550" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M-1610 -840 L230 120 M3050 -840 L1210 120 M-1610 2260 L230 820 M3050 2260 L1210 820"
                stroke="rgba(242,235,227,0.09)"
              />
              <path d="M230 820 L1210 820 L3050 2260 L-1610 2260 Z" fill="url(#rp-spill)" />
              <path className="rp-centre" d="M720 828 L720 2000" stroke="#B98550" strokeOpacity="0.45" />
            </svg>

            <motion.div
              className="rp-face"
              style={{
                opacity: frame[0],
                left: u(230),
                top: u(120),
                width: u(980),
                height: u(700),
                background: `radial-gradient(ellipse 62% 60% at ${u(490)} ${u(290)}, rgba(185,133,80,0.075), rgba(185,133,80,0) 72%), #17130F`,
              }}
            />
            <motion.div
              className="rp-face"
              style={{
                opacity: frame[1],
                left: u(400),
                top: u(210),
                width: u(640),
                height: u(460),
                background: `radial-gradient(ellipse 60% 60% at ${u(320)} ${u(200)}, rgba(185,133,80,0.11), rgba(185,133,80,0) 74%), #1A1511`,
              }}
            />
            <motion.div
              className="rp-face"
              style={{
                opacity: frame[2],
                left: u(520),
                top: u(275),
                width: u(400),
                height: u(290),
                background: `radial-gradient(ellipse 60% 62% at ${u(200)} ${u(135)}, rgba(185,133,80,0.16), rgba(185,133,80,0) 76%), #1E1813`,
              }}
            />

            {/* The corner lines from each opening to the next */}
            <svg className="rp-svg" viewBox="0 0 1440 1000" fill="none" stroke="rgba(242,235,227,0.08)">
              <motion.path style={{ opacity: frame[0] }} d="M230 120 L400 210 M1210 120 L1040 210 M230 820 L400 670 M1210 820 L1040 670" />
              <motion.path style={{ opacity: frame[1] }} d="M400 210 L520 275 M1040 210 L920 275 M400 670 L520 565 M1040 670 L920 565" />
              <motion.path style={{ opacity: frame[2] }} d="M520 275 L566.5 325 M920 275 L873.5 325 M520 565 L566.5 495 M920 565 L873.5 495" />
            </svg>

            <motion.div className="rp-edge rp-edge-outer" style={{ opacity: frame[0], left: u(230), top: u(120), width: u(980), height: u(700) }} />
            <motion.div className="rp-edge" style={{ opacity: frame[1], left: u(400), top: u(210), width: u(640), height: u(460) }} />
            <motion.div className="rp-edge" style={{ opacity: frame[2], left: u(520), top: u(275), width: u(400), height: u(290) }} />

            {/* The finished site, lit at the far end, shaped to its screenshot */}
            <div className="rp-end" style={{ left: u(566.5), top: u(325), width: u(307), height: u(170) }}>
              <img
                src={SITE_IMAGE.image}
                srcSet={SITE_IMAGE.imageSrcSet}
                sizes="55vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <Lintel opacity={text[0]} no="01" title="Groundwork" left={230} width={980} top={159} size={13} tracking={0.34} />
            <Sill opacity={text[0]} left={230} width={980} top={728} size={34}>{SILLS[0]}</Sill>
            <Lintel opacity={text[1]} no="02" title="Planning" left={400} width={640} top={237} size={10} tracking={0.32} />
            <Sill opacity={text[1]} left={400} width={640} top={605} size={24}>{SILLS[1]}</Sill>
            <Lintel opacity={text[2]} no="03" title="Production" left={520} width={400} top={296} size={8} tracking={0.3} />
            <Sill opacity={text[2]} left={520} width={400} top={528} size={16}>{SILLS[2]}</Sill>
            <p className="rp-lab rp-lab-end" style={{ left: u(520), width: u(400), top: u(504), fontSize: u(7), letterSpacing: "0.3em" }}>
              04 — Project complete
            </p>
          </motion.div>

          {/* The foot of the room falls into shadow, so the corridor's light
              fades into About instead of stopping at a hard edge */}
          <div aria-hidden="true" className="rp-seam" />

          <button type="button" className="rp-walk" aria-label={walkLabel(stage)} onClick={() => onGo(stage + 1)} />

          <div className="rp-head">
            <p data-join className="rp-eyebrow">Process</p>
            <h2 className="rp-title">How we build your site.</h2>
          </div>

          <div key={current.no} className="rp-stage rp-rise" aria-live="polite">
            <h3 className="rp-stage-title">
              {current.no} <span className="rp-ochre">—</span> {current.title}
            </h3>
            <p className="rp-stage-body">{COPY[stage]}</p>
          </div>

          <div role="group" aria-label="Stages" className="rp-tabs">
            {STEPS.map((step, k) => (
              <button
                key={step.no}
                type="button"
                className="rp-tab"
                aria-pressed={k === stage}
                onClick={() => onGo(k)}
              >
                {step.no} {step.short}
              </button>
            ))}
          </div>
          <p className="rp-hint">Click the doorway to walk through.</p>
        </div>
      </div>
    </div>
  );
}

// A doorway's label, centred on its lintel: the number in ochre
function Lintel({ opacity, no, title, left, width, top, size, tracking }) {
  return (
    <motion.p
      className="rp-lab"
      style={{ opacity, left: u(left), width: u(width), top: u(top), fontSize: u(size), letterSpacing: `${tracking}em` }}
    >
      <i>{no}</i> — {title}
    </motion.p>
  );
}

// A doorway's line, centred on its sill
function Sill({ opacity, left, width, top, size, children }) {
  return (
    <motion.p className="rp-phr" style={{ opacity, left: u(left), width: u(width), top: u(top), fontSize: u(size) }}>
      {children}
    </motion.p>
  );
}

// ---------------------------------------------------------------- phone

// A length in the phone frame's pixels (342 × 400)
const p = (n) => `calc(var(--pu) * ${n})`;

function PhoneCorridor({ stage, position, onGo }) {
  const { scale, text, frame } = useCorridor(position, PHONE_CAMS);
  const current = STEPS[stage];
  const touch = useRef(null);

  // A swipe walks forwards or back; a tap walks forwards
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, swiped: false };
  };
  const onTouchEnd = (e) => {
    const t = touch.current;
    if (!t) return;
    const dx = e.changedTouches[0].clientX - t.x;
    const dy = e.changedTouches[0].clientY - t.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      t.swiped = true;
      onGo(dx < 0 ? stage + 1 : stage - 1);
    }
  };
  const onClick = () => {
    if (touch.current?.swiped) {
      touch.current = null;
      return;
    }
    onGo(stage < 3 ? stage + 1 : 0);
  };

  return (
    <div className="rp-phone">
      <p data-join className="rp-eyebrow">Process</p>
      <h2 className="rp-title">How we build your site.</h2>

      <button
        type="button"
        className="rp-pframe"
        aria-label={walkLabel(stage)}
        onClick={onClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.div aria-hidden="true" className="rp-pworld" style={{ scale }}>
          <motion.div
            className="rp-face"
            style={{
              opacity: frame[0],
              inset: 0,
              background: `radial-gradient(ellipse 62% 58% at ${p(171)} ${p(178)}, rgba(185,133,80,0.075), rgba(185,133,80,0) 72%), #17130F`,
            }}
          />
          <motion.div
            className="rp-face"
            style={{
              opacity: frame[1],
              left: p(58),
              top: p(58),
              width: p(226),
              height: p(264),
              background: `radial-gradient(ellipse 60% 58% at ${p(113)} ${p(120)}, rgba(185,133,80,0.11), rgba(185,133,80,0) 74%), #1A1511`,
            }}
          />
          <motion.div
            className="rp-face"
            style={{
              opacity: frame[2],
              left: p(97),
              top: p(97),
              width: p(147),
              height: p(172),
              background: `radial-gradient(ellipse 60% 60% at ${p(74)} ${p(81)}, rgba(185,133,80,0.16), rgba(185,133,80,0) 76%), #1E1813`,
            }}
          />
          <svg className="rp-svg" viewBox="0 0 342 400" fill="none" stroke="rgba(242,235,227,0.08)">
            <motion.path style={{ opacity: frame[0] }} d="M0 0 L58 58 M342 0 L284 58 M0 400 L58 322 M342 400 L284 322" />
            <motion.path style={{ opacity: frame[1] }} d="M58 58 L97 97 M284 58 L244 97 M58 322 L97 269 M284 322 L244 269" />
            <motion.path style={{ opacity: frame[2] }} d="M97 97 L123 151.5 M244 97 L219 151.5 M97 269 L123 204.5 M244 269 L219 204.5" />
          </svg>
          <motion.div className="rp-edge rp-edge-outer" style={{ opacity: frame[0], inset: 0 }} />
          <motion.div className="rp-edge" style={{ opacity: frame[1], left: p(58), top: p(58), width: p(226), height: p(264) }} />
          <motion.div className="rp-edge" style={{ opacity: frame[2], left: p(97), top: p(97), width: p(147), height: p(172) }} />

          <div className="rp-end" style={{ left: p(123), top: p(151.5), width: p(96), height: p(53) }}>
            <img
              src={SITE_IMAGE.image}
              srcSet={SITE_IMAGE.imageSrcSet}
              sizes="400px"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <PhoneLintel opacity={text[0]} no="01" title="Groundwork" left={0} width={342} top={24.5} size={9.5} />
          <PhonePhrase opacity={text[0]} left={0} width={342} top={352} size={17}>{SILLS[0]}</PhonePhrase>
          <PhoneLintel opacity={text[1]} no="02" title="Planning" left={58} width={226} top={74} size={7} />
          <PhonePhrase opacity={text[1]} left={58} width={226} top={288} size={12.5}>{SILLS[1]}</PhonePhrase>
          <PhoneLintel opacity={text[2]} no="03" title="Production" left={97} width={147} top={108} size={5.2} />
          <PhonePhrase opacity={text[2]} left={97} width={147} top={247} size={8}>{SILLS[2]}</PhonePhrase>
          <p className="rp-lab rp-lab-end" style={{ left: p(97), width: p(147), top: p(210), fontSize: p(4.6), letterSpacing: "0.3em" }}>
            04 — Project complete
          </p>
        </motion.div>
      </button>

      <div key={current.no} className="rp-pstage rp-rise" aria-live="polite">
        <h3 className="rp-pstage-title">
          {current.no} <span className="rp-ochre">—</span> {current.title}
        </h3>
        <p className="rp-pstage-body">{PHONE_COPY[stage]}</p>
      </div>

      <nav aria-label="Stages" className="rp-pnav">
        <button type="button" className="rp-arrow" aria-label="Previous door" disabled={stage === 0} onClick={() => onGo(stage - 1)}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <path d="M17 6H1M6 1L1 6l5 5" />
          </svg>
        </button>
        <div className="rp-nums">
          {STEPS.map((step, k) => (
            <button
              key={step.no}
              type="button"
              className="rp-num"
              aria-pressed={k === stage}
              aria-label={`Stage ${step.no}: ${step.title}`}
              onClick={() => onGo(k)}
            >
              {step.no}
            </button>
          ))}
        </div>
        <button type="button" className="rp-arrow" aria-label="Next door" disabled={stage === 3} onClick={() => onGo(stage + 1)}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <path d="M1 6h16M12 1l5 5-5 5" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

function PhoneLintel({ opacity, no, title, left, width, top, size }) {
  return (
    <motion.p
      className="rp-lab"
      style={{ opacity, left: p(left), width: p(width), top: p(top), fontSize: p(size), letterSpacing: "0.3em" }}
    >
      <i>{no}</i> — {title}
    </motion.p>
  );
}

function PhonePhrase({ opacity, left, width, top, size, children }) {
  return (
    <motion.p className="rp-phr" style={{ opacity, left: p(left), width: p(width), top: p(top), fontSize: p(size) }}>
      {children}
    </motion.p>
  );
}
