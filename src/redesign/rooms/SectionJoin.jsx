import { useLayoutEffect, useRef, useState } from "react";

// The thin ochre thread where a dark room meets the paper (or the paper meets
// a dark room): it drops in from the section above, marks the edge with a
// small diamond, and turns in towards the next section's eyebrow, so the
// change of colour reads as one page carrying on.
//
// Place it between two sections. It finds the eyebrow it leads to by the
// `data-join` attribute in the section that follows, and follows it as the
// layout changes. `above` shortens the reach where the section above has
// something near its foot. If that eyebrow sits far below the edge (Contact on phones,
// under its door), the thread is left out rather than run a long way down; so is a
// phone, where the eyebrow sits too near the edge of the screen for it.

const ABOVE = 88; // how far the thread reaches up into the section above, by default
const GAP = 34; // the thread sits this far left of the eyebrow
const TURN = 20; // the turn towards the eyebrow, stopping short of it
const MAX_DROP = 260;

export default function SectionJoin({ above = ABOVE }) {
  const ref = useRef(null);
  const [geo, setGeo] = useState(null);

  useLayoutEffect(() => {
    const anchor = ref.current;
    const next = anchor?.nextElementSibling;
    if (!next) return;

    const measure = () => {
      const eyebrow = [...next.querySelectorAll("[data-join]")].find((el) => el.getClientRects().length > 0);
      if (!eyebrow) return setGeo(null);
      const edge = anchor.getBoundingClientRect();
      const box = eyebrow.getBoundingClientRect();
      // A pinned (sticky) section moves its eyebrow once you scroll into
      // it; only measure the drop while the section starts below the top
      const top = next.getBoundingClientRect().top;
      setGeo((prev) => {
        const drop = top >= 0 || !prev ? box.top + box.height / 2 - edge.top : prev.drop;
        const x = box.left - edge.left - GAP;
        return drop > 0 && drop <= MAX_DROP && x > 0 ? { x, drop } : null;
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(next);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none relative z-10 h-0">
      {geo && (
        <div className="absolute" style={{ left: geo.x, top: -above, height: above + geo.drop, width: TURN }}>
          {/* down, then in towards the eyebrow */}
          <span className="absolute left-0 top-0 h-full w-px bg-[#b98550]/80" />
          <span className="absolute bottom-0 left-0 h-px w-full bg-[#b98550]/80" />
          {/* the diamond on the edge */}
          <span
            className="absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#b98550]"
            style={{ left: 0.5, top: above }}
          />
        </div>
      )}
    </div>
  );
}
