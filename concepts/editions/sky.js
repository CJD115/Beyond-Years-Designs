// Hesper: the homepage follows the light at the hut. `hour` is 0–24.
const SKY = [
  // hour, sky top, sky bottom, land, window glow 0–1
  [0, "#0d0f17", "#1f1c2b", "#0b0c10", 1],
  [5.5, "#1b2236", "#5a4552", "#111217", 0.9],
  [7.5, "#a8bccc", "#efd9bd", "#37402f", 0.15],
  [12, "#8fb0cc", "#e2e7e2", "#3b4a36", 0],
  [15, "#9fb0c2", "#ecd3b0", "#323b2c", 0.1],
  [16.6, "#2d3150", "#d6895a", "#15161c", 1],
  [18.5, "#141726", "#3a2a35", "#0d0e13", 1],
  [24, "#0d0f17", "#1f1c2b", "#0b0c10", 1],
];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => {
  const [x, y] = [hex(a), hex(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
};

export function skyAt(hour) {
  const h = ((hour % 24) + 24) % 24;
  let i = SKY.findIndex((k) => k[0] > h) - 1;
  if (i < 0) i = 0;
  const [h0, t0, b0, l0, g0] = SKY[i];
  const [h1, t1, b1, l1, g1] = SKY[i + 1];
  const t = (h - h0) / (h1 - h0);
  const top = mix(t0, t1, t);
  // Light or dark text, from how bright the sky actually is (not a step per
  // keyframe), so the switch happens once the sky has really darkened.
  const [r, g, b] = top.match(/\d+/g).map(Number);
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return {
    top,
    bottom: mix(b0, b1, t),
    land: mix(l0, l1, t),
    glow: g0 + (g1 - g0) * t,
    dark: brightness < 0.5,
  };
}

export const hourLabel = (hour) => {
  const h = Math.floor(hour) % 24;
  const m = Math.round((hour - Math.floor(hour)) * 60);
  return `${String(h).padStart(2, "0")}:${String(m === 60 ? 59 : m).padStart(2, "0")}`;
};
