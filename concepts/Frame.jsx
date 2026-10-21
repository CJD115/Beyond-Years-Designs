import { useLayoutEffect, useRef, useState } from "react";

// A fixed-size design canvas (Instagram posts are drawn at 1080 × 1350, the
// salon websites at 1440 × 900) scaled to whatever width it's given, so the
// artwork keeps its exact composition at any size.
//
// crop="grid" shows a 4:5 post as Instagram's profile grid does: a 3:4 tile,
// full height, a sliver trimmed from each side.
export default function Frame({ width = 1080, height = 1350, crop, className = "", label, children }) {
  const ref = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      setBox({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const grid = crop === "grid";
  const scale = grid ? box.h / height : box.w / width;
  const offsetX = grid ? (box.w - width * scale) / 2 : 0;

  return (
    <div
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`frame ${className}`}
      style={{ aspectRatio: grid ? "3 / 4" : `${width} / ${height}` }}
    >
      <div
        className="frame-canvas"
        style={{
          width,
          height,
          transform: `translateX(${offsetX}px) scale(${scale || 0.0001})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
