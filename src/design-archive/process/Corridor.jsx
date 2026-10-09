import { motion, useTransform } from "motion/react";

// The corridor for Process ("The Corridor", Thresholds direction, p.7): four
// nested door frames in one-point perspective, with the finished website lit
// at the far end.
//
// Everything is drawn in mock-up pixels (desktop: the 1440 x 1000 room;
// phone: the 342 x 400 portrait frame) and sized with --u, one mock-up pixel
// on screen. `progress` (0 to 3) is how far you've walked: at each whole
// number the next door fills the first door's place, and the frames you've
// passed scale out past the camera.

const LINEN = "#f1ebe3";
const OCHRE = "#b9854f";
const SITE_IMAGE = "/work/churcham-homes-desktop-v2";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (t) => Math.min(1, Math.max(0, t));

// Piecewise-linear lookup through [x, y] points (sorted by x)
function lookup(x, points) {
  if (x <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    if (x <= x1) {
      const [x0, y0] = points[i - 1];
      return lerp(y0, y1, (x - x0) / (x1 - x0));
    }
  }
  return points[points.length - 1][1];
}

// All positions measured from the PDF
const GEOMETRY = {
  desktop: {
    width: 1440,
    height: 1000,
    // the three doors, nearest first, then the lit site at the end
    frames: [
      { x: 230.5, y: 120.5, w: 979, h: 699 },
      { x: 400.5, y: 210.5, w: 639, h: 459 },
      { x: 520.4, y: 275.5, w: 399, h: 289 },
      { x: 604.9, y: 325, w: 230, h: 170 },
    ],
    lines: [
      [0, 0],
      [1440, 0],
      [0, 1000],
      [1440, 1000],
    ],
    lineOpacity: 0.071,
    floor: [
      { to: [[1149.9, 1000], [290, 1000]], opacity: 0.035, extend: 3 },
      { to: [[1009.9, 819.9], [430, 819.9]], opacity: 0.031, extend: 1 },
    ],
    glow: { inset: 10, blur: 22, opacity: 0.25 },
    // door stroke and label brightness by apparent size (1 = the nearest door)
    stroke: [[0.408, 0.149], [0.653, 0.22], [1, 0.38]],
    labelOpacity: [[0.408, 0.48], [0.653, 0.63], [1, 1]],
    labelSize: [[0.236, 8], [0.408, 8], [0.653, 10], [1, 10]],
    labelInset: [[0.408, [11.5, 9.7]], [0.653, [13.5, 11.8]], [1, [15.5, 13.8]]],
    image: `${SITE_IMAGE}-1600.webp`,
  },
  phone: {
    width: 342,
    height: 400,
    frames: [
      { x: 0, y: 0, w: 342, h: 400 },
      { x: 58.5, y: 58.5, w: 225, h: 263 },
      { x: 97.5, y: 97.5, w: 146, h: 171 },
      { x: 125, y: 124, w: 92, h: 108 },
    ],
    lines: [
      [0, 0],
      [342, 0],
      [0, 400],
      [342, 400],
    ],
    lineOpacity: 0.078,
    floor: [
      { to: [[342, 400], [0, 400]], opacity: 0.035, extend: 3 },
      { to: [[280, 340], [62, 340]], opacity: 0.031, extend: 1 },
    ],
    glow: { inset: 7, blur: 15, opacity: 0.278 },
    stroke: [[0.428, 0.3], [0.66, 0.4], [1, 0.4]],
    labelOpacity: [[0.428, 0.37], [0.66, 0.44], [1, 0.44]],
    labelSize: [[0, 12], [1, 12]],
    labelInset: [[0.428, [6.5, 6.9]], [0.66, [10, 10.4]], [1, [12, 12.4]]],
    // the door you're standing at is ochre
    focusOchre: true,
    image: `${SITE_IMAGE}-800.webp`,
  },
};

// Where the camera is: x' = s * x + tx (mock-up pixels), so that at stage k
// door k sits exactly where the nearest door is drawn
function camera(geo, progress) {
  const p = Math.min(Math.max(progress, 0), geo.frames.length - 1);
  const k = Math.min(Math.floor(p), geo.frames.length - 2);
  const f = p - k;
  const near = geo.frames[0];
  const a = geo.frames[k];
  const b = geo.frames[k + 1];
  const s = Math.exp(lerp(Math.log(near.w / a.w), Math.log(near.w / b.w), f));
  const cx = lerp(a.x + a.w / 2, b.x + b.w / 2, f);
  const cy = lerp(a.y + a.h / 2, b.y + b.h / 2, f);
  return { s, tx: near.x + near.w / 2 - s * cx, ty: near.y + near.h / 2 - s * cy };
}

// How big a door looks next to the nearest door (1 = standing at it)
const ratio = (geo, i, progress) => (camera(geo, progress).s * geo.frames[i].w) / geo.frames[0].w;

// Doors you've walked through fade as they pass the camera; their labels go
// sooner, so they never drift across the text around the corridor
const passing = (r) => 1 - clamp01((r - 1.03) / 0.3);
const labelPassing = (r) => 1 - clamp01((r - 1.01) / 0.12);

const u = (n) => `calc(var(--u) * ${n})`;

export default function Corridor({ size, progress, labels, className = "" }) {
  const geo = GEOMETRY[size];
  const end = geo.frames[3];
  const transform = useTransform(progress, (p) => {
    const { s, tx, ty } = camera(geo, p);
    return `translate(${u(tx)}, ${u(ty)}) scale(${s})`;
  });
  // Strokes stay one mock-up pixel wide however far the room is scaled
  const hairline = useTransform(progress, (p) => 1 / camera(geo, p).s);

  // The vanishing lines run from the far door's corners out past the room
  const endCorners = [
    [end.x, end.y],
    [end.x + end.w, end.y],
    [end.x, end.y + end.h],
    [end.x + end.w, end.y + end.h],
  ];
  const far = (from, to, k) => [from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k];
  const bottomLeft = endCorners[2];
  const bottomRight = endCorners[3];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative ${className}`}
      style={{ width: u(geo.width), height: u(geo.height) }}
    >
      <motion.div className="absolute inset-0 origin-top-left" style={{ transform }}>
        <svg
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          {geo.lines.map((corner, i) => {
            const [x2, y2] = far(endCorners[i], corner, 6);
            return (
              <motion.line
                key={i}
                x1={endCorners[i][0]}
                y1={endCorners[i][1]}
                x2={x2}
                y2={y2}
                stroke={LINEN}
                strokeOpacity={geo.lineOpacity}
                style={{ strokeWidth: hairline }}
              />
            );
          })}
          {geo.floor.map((light) => {
            const [r, l] = light.to;
            const pr = far(bottomRight, r, light.extend);
            const pl = far(bottomLeft, l, light.extend);
            return (
              <polygon
                key={light.opacity}
                points={`${bottomLeft.join(",")} ${bottomRight.join(",")} ${pr.join(",")} ${pl.join(",")}`}
                fill={LINEN}
                fillOpacity={light.opacity}
              />
            );
          })}
          {[0, 1, 2].map((i) => (
            <Door key={i} geo={geo} index={i} progress={progress} hairline={hairline} />
          ))}
        </svg>

        {/* The finished site, lit at the end of the corridor */}
        <div
          className="absolute"
          style={{
            left: u(end.x - geo.glow.inset),
            top: u(end.y - geo.glow.inset),
            width: u(end.w + geo.glow.inset * 2),
            height: u(end.h + geo.glow.inset * 2),
            backgroundColor: `rgba(185, 133, 79, ${geo.glow.opacity})`,
            filter: `blur(${u(geo.glow.blur)})`,
          }}
        />
        <div
          className="absolute overflow-hidden bg-[#2a2928]"
          style={{ left: u(end.x), top: u(end.y), width: u(end.w), height: u(end.h) }}
        >
          <img src={geo.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        <svg viewBox={`0 0 ${geo.width} ${geo.height}`} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          <motion.rect x={end.x} y={end.y} width={end.w} height={end.h} stroke={OCHRE} style={{ strokeWidth: hairline }} />
        </svg>
      </motion.div>

      {/* Door labels stay at reading size while the doors grow */}
      {labels.map((label, i) => (
        <DoorLabel key={label} geo={geo} index={i} progress={progress} text={label} />
      ))}
    </div>
  );
}

function Door({ geo, index, progress, hairline }) {
  const door = geo.frames[index];
  const strokeOpacity = useTransform(progress, (p) => {
    const r = ratio(geo, index, p);
    const focused = geo.focusOchre && r > 0.9 && r < 1.1;
    return (focused ? 1 : lookup(r, geo.stroke)) * passing(r);
  });
  const stroke = useTransform(progress, (p) => {
    const r = ratio(geo, index, p);
    return geo.focusOchre && r > 0.9 && r < 1.1 ? OCHRE : LINEN;
  });
  return (
    <motion.rect
      x={door.x}
      y={door.y}
      width={door.w}
      height={door.h}
      style={{ stroke, strokeOpacity, strokeWidth: hairline }}
    />
  );
}

function DoorLabel({ geo, index, progress, text }) {
  const door = geo.frames[index];
  const isEnd = index === 3;

  const left = useTransform(progress, (p) => {
    const { s, tx } = camera(geo, p);
    const inset = isEnd ? 0 : lookup(ratio(geo, index, p), geo.labelInset.map(([r, v]) => [r, v[0]]));
    return u(s * door.x + tx + inset);
  });
  const top = useTransform(progress, (p) => {
    const { s, ty } = camera(geo, p);
    if (isEnd) return u(s * (door.y + door.h) + ty + 6.2);
    const inset = lookup(ratio(geo, index, p), geo.labelInset.map(([r, v]) => [r, v[1]]));
    return u(s * door.y + ty + inset);
  });
  const fontSize = useTransform(progress, (p) => u(lookup(ratio(geo, index, p), geo.labelSize)));
  const opacity = useTransform(progress, (p) => {
    const r = ratio(geo, index, p);
    // the site's own label steps aside once you're nearly there
    if (isEnd) return 1 - clamp01((r - 0.5) / 0.2);
    const focused = geo.focusOchre && r > 0.9 && r < 1.1;
    return (focused ? 1 : lookup(r, geo.labelOpacity)) * labelPassing(r);
  });
  const color = useTransform(progress, (p) => {
    const r = ratio(geo, index, p);
    return isEnd || (geo.focusOchre && r > 0.9 && r < 1.1) ? OCHRE : LINEN;
  });

  return (
    <motion.span
      className="absolute whitespace-nowrap font-body uppercase leading-[1.21] tracking-[0.22em]"
      style={{ left, top, fontSize, opacity, color }}
    >
      {text}
    </motion.span>
  );
}
