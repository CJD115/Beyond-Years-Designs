// Faint contour lines for the paper sections (Why us, Aftercare), drawn as
// SVG path data in mock-up pixels. Closed loops are the hills; open lines
// run off the edges.

// A smooth closed loop around (cx, cy), pushed in and out by `wobble`
export function loop(cx, cy, rx, ry, wobble) {
  const points = wobble.map((w, k) => {
    const a = (k / wobble.length) * Math.PI * 2;
    return [cx + Math.cos(a) * rx * (1 + w), cy + Math.sin(a) * ry * (1 + w)];
  });
  return smooth(points, true);
}

export function line(points) {
  return smooth(points, false);
}

// Catmull-Rom through the points, as cubic Béziers
function smooth(points, closed) {
  const n = points.length;
  const at = (i) => (closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))]);
  const r = (v) => Math.round(v * 10) / 10;
  let d = `M${r(points[0][0])} ${r(points[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [x0, y0] = at(i - 1);
    const [x1, y1] = at(i);
    const [x2, y2] = at(i + 1);
    const [x3, y3] = at(i + 2);
    d += ` C${r(x1 + (x2 - x0) / 6)} ${r(y1 + (y2 - y0) / 6)} ${r(x2 - (x3 - x1) / 6)} ${r(y2 - (y3 - y1) / 6)} ${r(x2)} ${r(y2)}`;
  }
  return closed ? `${d}Z` : d;
}
