import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { NavBar } from "@/design-archive/hero/Nav";
import Blueprint from "@/design-archive/hero/Blueprint";
import { BLUEPRINT_CODE, measureBlueprint } from "@/design-archive/hero/measure";

// Hero, "X-ray" (02 Under the Surface, p.2 of
// Beyond-Years-Redesign-02-Under-the-Surface-v2.pdf). A calm, finished hero;
// the cursor is a lens that shows the blueprint underneath: the grid, type
// specs, baselines, spacing, hit areas and the code, with a live coordinate
// tag. It shows the craft instead of claiming it.
//
// Desktop (1024px and up) is the PDF's 1440 × 900 frame, every position taken
// from it and scaled with --poster-u (see .xr-* in index.css). Smaller
// screens follow its 390px phone frame.
//
// - Mouse: the lens follows the cursor anywhere in the hero.
// - Touch: drag the lens with your thumb, or tap anywhere in the hero to move
//   it there. A swipe that starts upwards or downwards on the lens scrolls
//   the page as usual; a drag that starts sideways picks the lens up, and
//   then it moves freely. A tap inside it still follows a link underneath.
// - Keyboard, touch and everyone else: "Look underneath" swaps in the whole
//   layer (on desktop the button shows when it's focused).
// - Reduced motion: the lens stays still where it is (it can still be dragged).
// - The nav: the lens sees through it too. The blueprint draws a copy of the
//   bar that tracks the real one, and the real one gets a lens-shaped hole
//   (it stays clickable).
//
// The blueprint is a second copy of the frame, drawn differently and clipped
// to a circle, so everything under the lens lines up with the surface exactly.

const FINE_POINTER = "(pointer: fine)";
const subscribePointer = (onChange) => {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
// True with a mouse or trackpad; false on touch screens and while prerendering
function useFinePointer() {
  return useSyncExternalStore(subscribePointer, () => window.matchMedia(FINE_POINTER).matches, () => false);
}

const EASE = [0.22, 1, 0.36, 1];

export default function HeroXray() {
  const sectionRef = useRef(null);
  const blueprintRef = useRef(null);
  const navCopyRef = useRef(null);
  const underneathRef = useRef(false);
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const follows = finePointer && !reduceMotion;

  const [measures, setMeasures] = useState(null);
  const [underneath, setUnderneath] = useState(false);
  const moved = useRef(false); // once the lens has been moved, a resize keeps it where it is
  const drag = useRef(null);

  // Where the lens is (relative to the hero) and how big it is
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const lensX = follows ? springX : x;
  const lensY = follows ? springY : y;
  const radius = useMotionValue(0);
  const clipPath = useMotionTemplate`circle(${radius}px at ${lensX}px ${lensY}px)`;

  // Measure the blueprint once the fonts are in, and again whenever the hero
  // changes size
  const remeasure = useCallback(() => {
    const root = blueprintRef.current;
    if (!root) return;
    const m = measureBlueprint(root);
    setMeasures(m);
    if (!moved.current) {
      x.jump(m.rest.x);
      y.jump(m.rest.y);
      springX.jump(m.rest.x);
      springY.jump(m.rest.y);
    } else {
      x.set(Math.min(Math.max(x.get(), 0), m.width));
      y.set(Math.min(Math.max(y.get(), 0), m.height));
    }
  }, [x, y, springX, springY]);

  useEffect(() => {
    let cancelled = false;
    const run = () => !cancelled && remeasure();
    document.fonts?.ready.then(run);
    const observer = new ResizeObserver(run);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [remeasure]);

  // Open the lens once there's something measured to show; swap the whole
  // layer in and out with "Look underneath"
  const ready = measures !== null;
  const lensRadius = measures?.lensRadius ?? 0;
  const fullRadius = measures ? Math.hypot(measures.width, measures.height) : 0;
  useEffect(() => {
    if (!ready) return;
    const controls = animate(radius, underneath ? fullRadius : lensRadius, {
      duration: reduceMotion ? 0 : underneath ? 0.9 : 0.7,
      ease: EASE,
    });
    return () => controls.stop();
  }, [ready, underneath, lensRadius, fullRadius, radius, reduceMotion]);

  // The nav. While the hero is on screen, every frame: keep the blueprint's
  // copy of the bar where the real one is (it slides away on scroll), and cut
  // the lens out of the real one so the copy shows through. With the whole
  // layer swapped in, the real nav stays whole and turns light instead.
  useEffect(() => {
    underneathRef.current = underneath;
  }, [underneath]);
  useEffect(() => {
    const header = document.querySelector("header");
    const copy = navCopyRef.current;
    const section = sectionRef.current;
    if (!header || !copy || !section) return;
    let frame = 0;
    const tick = () => {
      const s = section.getBoundingClientRect();
      const h = header.getBoundingClientRect();
      copy.style.transform = `translateY(${h.top - s.top}px)`;
      if (header.classList.contains("bg-transparent")) copy.dataset.top = "";
      else delete copy.dataset.top;
      const r = radius.get();
      if (!underneathRef.current && r > 0) {
        header.dataset.xrLens = "";
        header.style.setProperty("--xr-x", `${lensX.get() + s.left - h.left}px`);
        header.style.setProperty("--xr-y", `${lensY.get() + s.top - h.top}px`);
        header.style.setProperty("--xr-r", `${r}px`);
      } else delete header.dataset.xrLens;
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
      else delete header.dataset.xrLens;
    });
    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      delete header.dataset.xrLens;
    };
  }, [lensX, lensY, radius]);

  // Escape puts the surface back. While the whole layer is showing, the
  // nav above it turns light (see .xr-hero in index.css).
  useEffect(() => {
    if (!underneath) return;
    const onKey = (e) => e.key === "Escape" && setUnderneath(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.dataset.xray = "underneath";
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.xray;
    };
  }, [underneath]);

  const toLocal = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    return { px: e.clientX - rect.left, py: e.clientY - rect.top };
  };

  // Mouse: the lens follows the cursor anywhere over the hero, including
  // under the nav (which sits on top of it, so this listens on the window)
  useEffect(() => {
    if (!follows) return;
    const onMove = (e) => {
      if (e.pointerType !== "mouse" || underneathRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
      moved.current = true;
      x.set(px);
      y.set(py);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [follows, x, y]);

  // Glide the lens to a point in the hero (touch and reduced motion)
  const moveLensTo = (px, py) => {
    moved.current = true;
    const to = { duration: reduceMotion ? 0 : 0.6, ease: EASE };
    animate(x, px, to);
    animate(y, py, to);
  };

  // Touch (and reduced motion): drag the lens itself. The lens allows
  // vertical panning (touch-pan-y), so a swipe that starts up or down is the
  // browser's and scrolls the page (it cancels this pointer); one that starts
  // sideways stays here, and the lens follows it in any direction.
  const onLensDown = (e) => {
    const { px, py } = toLocal(e);
    x.stop();
    y.stop();
    drag.current = { dx: px - x.get(), dy: py - y.get(), startX: e.clientX, startY: e.clientY, travelled: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onLensMove = (e) => {
    if (!drag.current || !measures) return;
    const { px, py } = toLocal(e);
    const d = drag.current;
    d.travelled = Math.max(d.travelled, Math.hypot(e.clientX - d.startX, e.clientY - d.startY));
    // Hold still until it's clearly a drag, so taps don't nudge the lens. On
    // touch, a gesture that sets off up or down is a scroll (the browser is
    // about to take it), so the lens stays where it is for the rest of it.
    if (d.travelled < 6) return;
    if (d.scroll === undefined) {
      d.scroll = e.pointerType !== "mouse" && Math.abs(e.clientY - d.startY) > Math.abs(e.clientX - d.startX);
    }
    if (d.scroll) return;
    moved.current = true;
    x.set(Math.min(Math.max(px - d.dx, 0), measures.width));
    y.set(Math.min(Math.max(py - d.dy, 0), measures.height));
  };
  const onLensUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.travelled >= 6) return;
    // A tap rather than a drag: follow a link under the lens, or else move the
    // lens to where it was tapped
    const target = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((el) => !e.currentTarget.contains(el) && el.closest("a[href], button"));
    const link = target?.closest("a[href], button");
    if (link) link.click();
    else {
      const { px, py } = toLocal(e);
      moveLensTo(px, py);
    }
  };

  // Touch (and reduced motion): tap anywhere else in the hero to move the lens
  const onHeroClick = (e) => {
    if (follows || underneath || !measures) return;
    if (e.target.closest("a[href], button, .xr-lens")) return;
    const { px, py } = toLocal(e);
    moveLensTo(px, py);
  };

  return (
    <section ref={sectionRef} id="top" onClick={onHeroClick} className="hero xr-hero">
      {/* Paper texture — fades out towards the next section */}
      <div aria-hidden="true" className="hero-paper pointer-events-none absolute inset-0" />

      {/* The surface */}
      <Frame underneath={underneath} follows={follows} onToggle={() => setUnderneath((on) => !on)} />

      {/* Underneath: the same frame as a blueprint, seen through the lens */}
      <motion.div
        ref={blueprintRef}
        aria-hidden="true"
        inert
        style={{ clipPath, WebkitClipPath: clipPath }}
        className="xr-hero xr-blueprint pointer-events-none absolute inset-0 z-20"
      >
        <Frame blueprint underneath={underneath} follows={follows} />
        <Blueprint measures={measures} />
        {/* The nav, as seen through the lens */}
        <div ref={navCopyRef} className={`xr-navcopy nav-xray ${underneath ? "invisible" : ""}`}>
          <NavBar blueprint xray specs={measures?.nav} />
        </div>
      </motion.div>

      {/* The lens: its rim, and the live coordinate tag */}
      {ready && (
        <Lens
          x={lensX}
          y={lensY}
          radius={radius}
          measures={measures}
          hidden={underneath}
          draggable={!follows}
          onPointerDown={onLensDown}
          onPointerMove={onLensMove}
          onPointerUp={onLensUp}
          onPointerCancel={() => (drag.current = null)}
        />
      )}
    </section>
  );
}

// The hero itself. `blueprint` draws the copy under the lens: the same layout,
// but the headline is a plain element rather than a second h1, the links are
// inert spans, and the grid and code are drawn in. data-bp marks what the
// blueprint measures.
function Frame({ blueprint = false, underneath, follows, onToggle }) {
  const Title = blueprint ? "div" : "h1";
  const Cta = blueprint ? "span" : "a";

  return (
    <div className="xr-frame">
      {/* The 1440 × 900 canvas, anchored to the frame's foot (desktop) */}
      <div className="xr-canvas">
        {blueprint && <Grid />}
        {blueprint && <Code />}

        {/* The eyebrow stays inside the h1, as it always has, so "Bristol web
            design" is part of the page's main heading */}
        <Title className="xr-heading">
          <span data-bp="eyebrow" className="xr-eyebrow">
            Bristol Web Design & Development Studio
          </span>{" "}
          <span data-bp="title" className="xr-title hero-title">
            Websites worth <em>remembering.</em>
          </span>
        </Title>

        <p data-bp="body" className="xr-body">
          Building a website shouldn’t get in the way of your business. You’re working hard, your junk folder’s full, and
          the list keeps getting longer. That’s where we come in.
        </p>

        <div className="xr-ctas">
          <Cta href={blueprint ? undefined : "#work"} data-bp="cta" className="xr-cta">
            View work
          </Cta>
          <Cta href={blueprint ? undefined : "#contact"} data-bp="cta" className="xr-cta">
            Get started
          </Cta>
        </div>

        <Controls blueprint={blueprint} underneath={underneath} follows={follows} onToggle={onToggle} />
      </div>
    </div>
  );
}

// The hint and the "Look underneath" toggle. With a mouse it's the quiet line
// at the foot of the frame, and the toggle appears when it has keyboard
// focus; on touch screens it's the boxed button with "or drag the lens". The
// blueprint keeps an invisible copy so the two layers stay the same height.
function Controls({ blueprint, underneath, follows, onToggle }) {
  const Toggle = blueprint ? "span" : "button";
  const label = underneath ? "Back to the surface" : "Look underneath";

  return (
    <div className={`xr-controls ${underneath ? "is-underneath" : ""} ${blueprint ? "invisible" : ""}`}>
      <span className="xr-hint">
        <CrosshairIcon className="xr-hint-icon" />
        {follows ? "Move anywhere to look under the surface" : "Drag the lens to look under the surface"}
      </span>
      <Toggle
        {...(blueprint ? {} : { type: "button", "aria-pressed": underneath, onClick: onToggle })}
        className="xr-toggle"
      >
        <CrosshairIcon className="xr-toggle-icon" />
        {label}
      </Toggle>
      <span className="xr-drag">or drag the lens</span>
    </div>
  );
}

function CrosshairIcon({ className }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      <circle cx="6" cy="6" r="5.4" strokeWidth="1.1" />
      <path d="M6 .6v10.8M.6 6h10.8" strokeWidth="1.1" />
    </svg>
  );
}

// The layout grid: the hero's 12 columns on desktop, 4 on phones
function Grid() {
  return (
    <div className="xr-grid" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

// The hero's own markup, top right (desktop)
function Code() {
  return (
    <pre className="xr-code">
      {BLUEPRINT_CODE.map((line, i) => (
        <span key={i} className="block">
          {line.map(([kind, text], j) => (
            <span key={j} className={`xr-code-${kind}`}>
              {text}
            </span>
          ))}
        </span>
      ))}
    </pre>
  );
}

function Lens({ x, y, radius, measures, hidden, draggable, ...handlers }) {
  const size = useTransform(radius, (r) => r * 2);
  const left = useTransform([x, radius], ([lx, r]) => lx - r);
  const top = useTransform([y, radius], ([ly, r]) => ly - r);
  // The tag sits where the PDF puts it (bottom right of the rim on desktop,
  // just under it on phones), kept inside the hero
  const tagRef = useRef(null);
  const { tag } = measures;
  const tagX = useTransform([x, radius], ([lx, r]) =>
    Math.min(lx + r * tag.dx, measures.width - (tagRef.current?.offsetWidth ?? 110) - 4),
  );
  const tagY = useTransform([y, radius], ([ly, r]) => Math.min(ly + r * tag.dy, measures.height - 26));

  return (
    <>
      <motion.div
        aria-hidden="true"
        {...(draggable ? handlers : {})}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ x: left, y: top, width: size, height: size }}
        className={`xr-lens absolute top-0 left-0 z-30 rounded-full ${
          draggable && !hidden ? "pointer-events-auto cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"
        }`}
      />
      <motion.div
        ref={tagRef}
        aria-hidden="true"
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ x: tagX, y: tagY }}
        className="xr-tag pointer-events-none absolute top-0 left-0 z-30"
      >
        <Coordinates x={x} y={y} origin={measures.origin} unit={measures.unit} />
      </motion.div>
    </>
  );
}

// "x 560 · y 380": the lens's centre in the hero's own pixels (the 1440 × 900
// frame on desktop), written straight into the tag as the lens moves rather
// than re-rendering anything
function Coordinates({ x, y, origin, unit }) {
  const ref = useRef(null);
  const format = () => `x ${Math.round((x.get() - origin.x) / unit)} · y ${Math.round((y.get() - origin.y) / unit)}`;
  const update = () => {
    if (ref.current) ref.current.textContent = format();
  };
  useMotionValueEvent(x, "change", update);
  useMotionValueEvent(y, "change", update);
  return <span ref={ref}>{format()}</span>;
}
