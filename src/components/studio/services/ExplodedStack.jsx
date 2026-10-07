import { motion, useTransform } from "motion/react";

// The four layers of one website, drawn for Services ("Exploded View").
//
// Every layer is a flat 1260 x 800 "page", drawn in its own units and then
// skewed onto the screen by one shared matrix, so each sits at exactly the
// mock-up's angle (02 Under the Surface, p.5). All the positions below were
// measured from the PDF and mapped back onto that flat page.
//
// `spread` (a motion value, 0 to 1) pulls the stack apart: 1 is the exploded
// view as drawn, 0 is all four layers settled into one site.

const W = 1260;
const H = 800;
const INK = "#121212";
const OCHRE = "#a67c52";
const OCHRE_LIGHT = "#b98550";
const LINEN = "#f2ebe3";

// Where each layer's top-left corner sits (mock-up pixels), top layer first,
// and the matrix from flat-page units to mock-up pixels
const GEOMETRY = {
  desktop: {
    viewBox: "0 0 1440 1100",
    matrix: [0.316135, -0.140529, 0.26512, 0.167453],
    x: 754.72,
    y: [306.58, 496.51, 686.58, 876.51],
    step: 190,
    lift: 25.93,
  },
  phone: {
    viewBox: "0 240 390 455",
    matrix: [0.152041, -0.067549, 0.128626, 0.081246],
    x: 82.79,
    y: [347.1, 439.11, 531.06, 623.17],
    step: 92,
    lift: 15.95,
  },
};

// Desktop labels beside each layer, with their leader lines
const LABELS = [
  { text: "01 website", y: 287.1, line: [676, 748] },
  { text: "02 design", y: 477.1, line: [669, 749] },
  { text: "03 words", y: 667.1, line: [663, 749] },
  { text: "04 performance", y: 857.1, line: [702, 742] },
];

export default function ExplodedStack({ size, activeIndex, spread, onSelect, showImage, className = "" }) {
  const g = GEOMETRY[size];
  const compact = size === "phone";
  const labelOpacity = useTransform(spread, [0.6, 1], [0, 1]);

  // Painted bottom layer first, so the finished site ends up on top
  const order = [3, 2, 1, 0];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={g.viewBox}
      className={`pointer-events-none select-none ${className}`}
    >
      <defs>
        <clipPath id={`layer-clip-${size}`} clipPathUnits="userSpaceOnUse">
          <rect width={W} height={H} />
        </clipPath>
      </defs>

      {!compact &&
        LABELS.map((label) => (
          <motion.g key={label.text} style={{ opacity: labelOpacity }}>
            <text
              x="600"
              y={label.y}
              fill="#4a4a4a"
              style={{ fontFamily: "var(--font-code)", fontSize: 11, letterSpacing: 0 }}
            >
              {label.text}
            </text>
            <line x1={label.line[0]} x2={label.line[1]} y1={label.y - 3.6} y2={label.y - 3.6} stroke={INK} strokeWidth="1" />
          </motion.g>
        ))}

      {order.map((i) => (
        <Layer
          key={i}
          index={i}
          geometry={g}
          spread={spread}
          active={i === activeIndex}
          clipId={`layer-clip-${size}`}
          compact={compact}
          showImage={showImage}
          onSelect={onSelect}
        />
      ))}
    </svg>
  );
}

function Layer({ index, geometry, spread, active, clipId, compact, showImage, onSelect }) {
  // Settled (spread 0), every layer slides to the middle of the stack
  const collapse = useTransform(spread, (s) => (1.5 - index) * geometry.step * (1 - s));
  const [a, b, c, d] = geometry.matrix;
  const Art = [WebsiteLayer, DesignLayer, WordsLayer, PerformanceLayer][index];

  return (
    <motion.g style={{ y: collapse }}>
      <g transform={`translate(${geometry.x} ${geometry.y[index]})`}>
        <motion.g
          initial={false}
          animate={{ y: active ? -geometry.lift : 0, opacity: active ? 1 : 0.62 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto cursor-pointer"
          onClick={() => onSelect(index)}
        >
          <g transform={`matrix(${a} ${b} ${c} ${d} 0 0)`}>
            <g clipPath={`url(#${clipId})`}>
              <Art compact={compact} showImage={showImage} />
            </g>
            <rect
              width={W}
              height={H}
              fill="none"
              stroke={active ? OCHRE : INK}
              strokeOpacity={active ? 1 : 0.35}
              strokeWidth="1.45"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke] duration-500"
            />
          </g>
        </motion.g>
      </g>
    </motion.g>
  );
}

// 01 website: the finished Churcham Homes homepage. SVG images can't be
// lazy-loaded, so the section only asks for it once it's nearly in view.
function WebsiteLayer({ compact, showImage }) {
  if (!showImage) return null;
  return (
    <image
      href={compact ? "/work/churcham-homes-desktop-800.webp" : "/work/churcham-homes-desktop-1600.webp"}
      x="-84.9"
      y="4.7"
      width="1430"
      height="790"
      preserveAspectRatio="none"
    />
  );
}

// 02 design: the wireframe on a 12-column grid (4 columns on phones)
const DESIGN = {
  desktop: {
    columns: [
      [53.2, 130.7], [150.1, 230.1], [249.5, 327], [346.4, 424], [443.3, 523.3], [542.7, 620.2],
      [639.6, 717.2], [736.5, 816.5], [835.9, 913.4], [932.8, 1010.4], [1029.8, 1109.7], [1129.1, 1206.7],
    ],
    columnY: [4.8, 795.1],
    nav: [54.4, 44.8, 1205.4, 90.9],
    hero: [54.4, 132.1, 783.8, 498.1],
    side: [829.9, 132, 1220, 279.9],
    dashed: [829.9, 311.4, 1220, 498.1],
    footer: [54.4, 539.3, 1220, 759.9],
  },
  phone: {
    columns: [[70.6, 322.6], [362.9, 609.9], [650.2, 902.2], [942.5, 1189.4]],
    columnY: [10.2, 789.6],
    nav: [73.2, 62.5, 1186.9, 117.5],
    hero: [73.2, 162.6, 773.7, 517.3],
    side: [829.1, 162.3, 1207.1, 307.2],
    dashed: [829.1, 352.2, 1207.1, 517.1],
    footer: [73.2, 572.2, 1207.1, 757],
  },
};

function Box({ box, ...props }) {
  const [x1, y1, x2, y2] = box;
  return (
    <rect
      x={x1}
      y={y1}
      width={x2 - x1}
      height={y2 - y1}
      fill="none"
      stroke={INK}
      strokeWidth="0.73"
      vectorEffect="non-scaling-stroke"
      {...props}
    />
  );
}

function DesignLayer({ compact }) {
  const art = DESIGN[compact ? "phone" : "desktop"];
  const [hx1, hy1, hx2, hy2] = art.hero;
  return (
    <>
      <rect width={W} height={H} fill="#f4eee6" />
      {art.columns.map(([x1, x2]) => (
        <rect
          key={x1}
          x={x1}
          y={art.columnY[0]}
          width={x2 - x1}
          height={art.columnY[1] - art.columnY[0]}
          fill={OCHRE}
          fillOpacity="0.122"
        />
      ))}
      <Box box={art.nav} />
      <Box box={art.hero} />
      <path
        d={`M${hx1} ${hy1}L${hx2} ${hy2}M${hx2} ${hy1}L${hx1} ${hy2}`}
        stroke={INK}
        strokeWidth="0.73"
        vectorEffect="non-scaling-stroke"
      />
      <Box box={art.side} />
      <Box box={art.dashed} stroke={OCHRE} strokeWidth="0.8" strokeDasharray="2.5 1.65" />
      <Box box={art.footer} />
    </>
  );
}

// 03 words: Mike's edit of a headline, then the body copy as grey lines
const WORDS = {
  desktop: {
    size: 96.95,
    x: 92.2,
    first: 169.4,
    second: 271.2,
    struck: { x: 701.6, strike: [135.4, 145.1], end: 1008.2 },
    lines: [[344, 1080.9], [385.2, 1017.9], [426.4, 1102.7], [467.6, 717.4]],
    lineHeight: 17,
  },
  phone: {
    size: 105.4,
    x: 100.7,
    first: 175.4,
    second: 285.3,
    struck: { x: 766.1, strike: [140.1, 150.1], end: 1100.9 },
    lines: [[370.1, 1073.3], [430, 1012.9], [490, 715.5]],
    lineHeight: 25,
  },
};

function WordsLayer({ compact }) {
  const art = WORDS[compact ? "phone" : "desktop"];
  const text = { fontFamily: "var(--font-display)", fontSize: art.size, letterSpacing: 0 };
  return (
    <>
      <rect width={W} height={H} fill="#fbf9f5" />
      <text x={art.x} y={art.first} fill={INK} style={{ ...text, fontWeight: 400 }}>
        A headline that
      </text>
      <text x={art.struck.x} y={art.first} fill={INK} fillOpacity="0.4" style={{ ...text, fontWeight: 400 }}>
        explains
      </text>
      <rect
        x={art.struck.x}
        y={art.struck.strike[0]}
        width={art.struck.end - art.struck.x}
        height={art.struck.strike[1] - art.struck.strike[0]}
        fill={OCHRE}
      />
      <text x={art.x} y={art.second} fill={OCHRE} style={{ ...text, fontStyle: "italic" }}>
        sounds like you.
      </text>
      {art.lines.map(([y, x2]) => (
        <rect key={y} x={art.x} y={y} width={x2 - art.x} height={art.lineHeight} fill={INK} fillOpacity="0.161" />
      ))}
    </>
  );
}

// 04 performance: the code that makes it fast
const CODE = {
  desktop: {
    size: 31.51,
    spans: [
      ["<img", 72.7, 106.6, "tag"],
      [' loading="lazy"', 148.3, 106.6],
      ['     srcset="print-800.webp 800w,', 72.7, 162.3],
      ['             print-1600.webp 1600w"', 72.7, 220.5],
      [">@font-face", 734.3, 220.4, "tag"],
      [" { font-display: block; }", 942.2, 220.4],
      ["@media", 72.7, 276.3, "tag"],
      [" (max-width: 767px) { … }", 186.1, 276.3],
      ["// prerendered: paints before JS", 72.7, 334.5, "comment"],
    ],
  },
  phone: {
    size: 60.2,
    spans: [
      ["<img", 91.2, 149.7, "tag"],
      [' loading="lazy"', 236.4, 149.7],
      ['  srcset="…"', 91.2, 249.6],
      [">", 526.7, 249.5, "tag"],
      ["@media", 91.2, 354.6, "tag"],
      [" (max-width: 767px)", 308.9, 354.5],
      ["// paints before JS", 91.2, 454.5, "comment"],
    ],
  },
};

function PerformanceLayer({ compact }) {
  const art = CODE[compact ? "phone" : "desktop"];
  return (
    <>
      <rect width={W} height={H} fill="#15130f" />
      {art.spans.map(([text, x, y, kind]) => (
        <text
          key={`${x}-${y}`}
          x={x}
          y={y}
          xmlSpace="preserve"
          fill={kind === "tag" ? OCHRE_LIGHT : LINEN}
          fillOpacity={kind === "tag" ? 1 : kind === "comment" ? 0.45 : 0.8}
          style={{ fontFamily: "var(--font-code)", fontSize: art.size, letterSpacing: 0, whiteSpace: "pre" }}
        >
          {text}
        </text>
      ))}
    </>
  );
}
