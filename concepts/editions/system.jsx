// The Editions system: reusable parts every post is built from.
// Canvas: 1080 × 1350 (Instagram portrait). See DESIGN-SYSTEM.md.
//
//   <Post>         the ground: "paper" (editorial) or "room" (work)
//   <RunningHead>  section, left; number, right. Every post.
//   <Floor>        the line at y = 1110. Every post. Doors stand on it.
//   <Door>         solid = commissioned, dashed = speculative,
//                  opening = a door cut into paper. Always on the floor.
//   <Spill>        light falling out of a door. Room ground only.
//   <Credits>      the credits strip, just under the floor.
//   <Foot>         studio name, left; honesty status, right. Every post.

import { FLOOR, H, W } from "./tokens";

export function Post({ ground = "paper", className = "", children }) {
  return <div className={`ed ed-${ground} ${className}`}>{children}</div>;
}

export function RunningHead({ left, right }) {
  return (
    <header className="ed-rh">
      <span>{left}</span>
      <span>{right}</span>
    </header>
  );
}

export function Floor() {
  return <div className="ed-floor" aria-hidden="true" />;
}

// Two soft polygons, as the site's doorway hero draws them
export function Spill({ x, w }) {
  const wide = w * 0.42;
  const near = w * 0.16;
  return (
    <svg className="ed-spill" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <polygon points={`${x},${FLOOR} ${x + w},${FLOOR} ${x + w + wide},${H} ${x - wide},${H}`} />
      <polygon points={`${x},${FLOOR} ${x + w},${FLOOR} ${x + w + near},${H} ${x - near},${H}`} />
    </svg>
  );
}

// A door always stands on the floor: give it x, width and height only.
export function Door({ x, w, h, kind = "solid", className = "", children }) {
  return (
    <div
      className={`ed-door ed-door-${kind} ${className}`}
      style={{ left: x, top: FLOOR - h, width: w, height: h }}
    >
      <div className="ed-door-in">{children}</div>
    </div>
  );
}

export function Credits({ items, className = "" }) {
  return (
    <dl className={`ed-credits ${className}`}>
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Foot({ status, speculative }) {
  return (
    <footer className="ed-foot">
      <span>Beyond Years</span>
      <span className={speculative ? "ed-foot-spec" : ""}>{status}</span>
    </footer>
  );
}

// Screenshot or other work set inside a door or a plate
export function Shot({ src, position = "top", className = "" }) {
  return <img className={`ed-shot ${className}`} src={src} alt="" style={{ objectPosition: position }} />;
}
