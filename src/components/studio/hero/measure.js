// Measuring for the X-ray hero's blueprint (see Blueprint.jsx and
// HeroXray.jsx), kept apart from the components. Everything is read from the
// blueprint copy of the hero, so the annotations are the real values at the
// current size.

const LG = "(min-width: 1024px)";

export const WEIGHTS = { 300: "Light", 400: "Regular", 500: "Medium", 600: "SemiBold" };
export const num = (v, digits = 0) => Number(v.toFixed(digits)).toString().replace("-", "−");

// The hero's markup as the code under the lens shows it (12px mono, top right)
export const BLUEPRINT_CODE = [
  [["tag", "<section"], ["text", ' id="top" class="hero"'], ["tag", ">"]],
  [["text", "  "], ["tag", "<h1"], ["text", ' class="hero-title"'], ["tag", ">"]],
  [["text", "    Websites worth"]],
  [["text", "    "], ["tag", "<em>"], ["text", "remembering."], ["tag", "</em>"]],
  [["text", "  "], ["tag", "</h1>"]],
  [["comment", "  // prerendered: paints before JS"]],
  [["comment", "  // reduced motion: respected"], ["tag", "</section>"]],
];

// From the PDF: the lens rests at x 560 · y 380 on the 1440 frame with a
// 180.5px radius, its tag 135 right and 149 down; on the 390 phone frame it
// rests at x 252 · y 318 with a 109.25px radius, its tag 18 right and 105.7
// down. The tag offsets are kept as fractions of the radius.
const DESKTOP = { rest: { x: 560, y: 380 }, radius: 180.5, tag: { dx: 135 / 180.5, dy: 149 / 180.5 } };
const PHONE = { radius: 109.25, tag: { dx: 17.95 / 109.25, dy: 105.7 / 109.25 } };

const canvas = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;

// A font's ascent, cap height and x-height at a given size, from the browser
function fontMetrics(style) {
  canvas.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const size = parseFloat(style.fontSize);
  return {
    ascent: canvas.measureText("Hxg").fontBoundingBoxAscent,
    cap: canvas.measureText("H").actualBoundingBoxAscent / size,
    xHeight: canvas.measureText("x").actualBoundingBoxAscent / size,
  };
}

export function measureBlueprint(root) {
  const box = root.getBoundingClientRect();
  const rel = (r) => ({
    left: r.left - box.left,
    top: r.top - box.top,
    right: r.right - box.left,
    bottom: r.bottom - box.top,
  });
  const q = (name) => root.querySelector(`[data-bp="${name}"]`);
  const px = (v) => parseFloat(v) || 0;

  // An element's text, as one rect per visual line (text only, not the boxes
  // of the elements inside it, like the headline's block <em>)
  const lineRects = (el) => {
    const rects = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      rects.push(...range.getClientRects());
    }
    const lines = [];
    for (const r of rects.filter((r) => r.width > 0 && r.height > 0)) {
      const rr = rel(r);
      const line = lines.find((l) => Math.abs(l.top - rr.top) < 4);
      if (line) {
        line.left = Math.min(line.left, rr.left);
        line.right = Math.max(line.right, rr.right);
        line.bottom = Math.max(line.bottom, rr.bottom);
      } else lines.push({ ...rr });
    }
    return lines.sort((a, b) => a.top - b.top);
  };
  const union = (rects) => ({
    left: Math.min(...rects.map((r) => r.left)),
    top: Math.min(...rects.map((r) => r.top)),
    right: Math.max(...rects.map((r) => r.right)),
    bottom: Math.max(...rects.map((r) => r.bottom)),
  });

  const lg = window.matchMedia(LG).matches;
  // The 1440 × 900 canvas (desktop); its corner is the PDF's 0, 0
  const frame = rel(root.querySelector(".xr-canvas").getBoundingClientRect());
  const unit = lg ? (frame.right - frame.left) / 1440 : 1;
  const origin = lg ? { x: frame.left, y: frame.top } : { x: 0, y: 0 };

  const eyebrowEl = q("eyebrow");
  const eyebrowStyle = getComputedStyle(eyebrowEl);
  const eyebrowLines = lineRects(eyebrowEl);

  const titleEl = q("title");
  const titleStyle = getComputedStyle(titleEl);
  const titleSize = px(titleStyle.fontSize);
  const titleMetrics = fontMetrics(titleStyle);
  const titleBox = rel(titleEl.getBoundingClientRect());
  // Line rects are the text's content area, so the baseline sits one ascent down
  const titleLines = lineRects(titleEl).map((l) => ({ ...l, baseline: l.top + titleMetrics.ascent }));

  const bodyEl = q("body");
  const bodyStyle = getComputedStyle(bodyEl);

  // The nav's copy under the lens, labelled with its own type specs
  const navFont = (selector) => {
    const style = getComputedStyle(root.querySelector(selector));
    return { size: num(px(style.fontSize), 1), weight: px(style.fontWeight) };
  };
  const logo = navFont(".xr-navcopy .nav-logo");
  const link = navFont(".xr-navcopy .nav-link");

  const ctas = [...root.querySelectorAll('[data-bp="cta"]')].map((el) => ({
    box: rel(el.getBoundingClientRect()),
    text: union(lineRects(el)),
  }));

  const contentLeft = titleBox.left;
  const contentRight = lg ? origin.x + 1376 * unit : box.width - contentLeft;
  const lensRadius = lg ? DESKTOP.radius * unit : Math.min(PHONE.radius * (box.width / 390), 150);

  return {
    width: box.width,
    height: box.height,
    lg,
    unit,
    origin,
    contentLeft,
    contentRight,
    lensRadius,
    rest: lg
      ? { x: origin.x + DESKTOP.rest.x * unit, y: origin.y + DESKTOP.rest.y * unit }
      : // over "…ites / worth", as on the phone frame
        { x: contentLeft + (contentRight - contentLeft) * (228 / 342), y: titleBox.top + titleSize * 1.601 },
    tag: lg ? DESKTOP.tag : PHONE.tag,
    eyebrow: {
      box: rel(eyebrowEl.getBoundingClientRect()),
      text: union(eyebrowLines),
      size: px(eyebrowStyle.fontSize),
      tracking: px(eyebrowStyle.letterSpacing) / px(eyebrowStyle.fontSize),
    },
    title: {
      box: titleBox,
      lines: titleLines,
      size: titleSize,
      leading: px(titleStyle.lineHeight) / titleSize,
      tracking: px(titleStyle.letterSpacing) / titleSize,
      weight: px(titleStyle.fontWeight),
      cap: titleMetrics.cap,
      xHeight: titleMetrics.xHeight,
    },
    body: {
      box: rel(bodyEl.getBoundingClientRect()),
      text: union(lineRects(bodyEl)),
      size: px(bodyStyle.fontSize),
      leading: px(bodyStyle.lineHeight) / px(bodyStyle.fontSize),
      measure: px(bodyStyle.maxWidth) / px(bodyStyle.fontSize),
    },
    ctas,
    nav: {
      logo: `a.nav-logo — Cormorant Garamond ${WEIGHTS[logo.weight] ?? logo.weight} ${logo.size}`,
      link: `a.nav-link — Inter ${link.size} / ${link.weight}`,
    },
  };
}
