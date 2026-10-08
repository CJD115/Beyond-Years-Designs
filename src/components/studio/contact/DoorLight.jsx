// The door and the light it lets out, for "The Door Left Open" (ContactDoor
// and FooterDoor). Desktop sizes use --lu, one pixel of the 1440px mock-up
// (set on the section); phones use the 390px mock-up as drawn.

const LINEN = "#f1ebe3";

// A door in its frame, ajar on the right. The light sits behind the door
// leaf, so the gap is simply the part the leaf doesn't cover; when `open`,
// the leaf swings back on its left hinge and more light shows. Pointing at
// the door eases it a little wider, as if someone's about to come through.
export function Door({ open, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`group relative h-[240px] w-[158px] [--gap:14px] [--inset:10px] [--leaf:126px] [--slit:8px] lg:h-[calc(var(--lu)*594)] lg:w-[calc(var(--lu)*300)] lg:[--gap:calc(var(--lu)*12)] lg:[--inset:calc(var(--lu)*14)] lg:[--leaf:calc(var(--lu)*260)] lg:[--slit:calc(var(--lu)*14)] ${className}`}
    >
      {/* Frame: left, top and right edges */}
      <div className="absolute inset-0 border border-b-0 border-accent/55" />

      {/* The doorway: light behind, leaf in front */}
      <div className="absolute top-(--inset) bottom-0 left-(--inset) right-(--gap) [perspective:1400px]">
        <div className="door-flicker absolute inset-0 bg-[#f1ebe3]" />
        <div
          className={`absolute inset-y-0 left-0 w-(--leaf) origin-left bg-[#1d1a16] transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "[transform:rotateY(40deg)]" : "motion-safe:group-hover:[transform:rotateY(9deg)]"}`}
        >
          {/* Handle */}
          <div className="absolute left-[112px] top-[110px] h-[16px] w-[5px] bg-[#2b2520] lg:left-[calc(var(--lu)*232)] lg:top-[calc(var(--lu)*290)] lg:h-[calc(var(--lu)*22)] lg:w-[calc(var(--lu)*8)]" />
        </div>
      </div>

      {/* Glow around the gap, spilling over the leaf */}
      <div
        className="door-flicker absolute bottom-0 top-(--inset) left-[calc(var(--inset)+var(--leaf))] w-(--slit) bg-[#f1ebe3]/42 blur-[18px] transition-[background-color] duration-[1800ms] group-hover:bg-[#f1ebe3]/60 lg:blur-[calc(var(--lu)*22)]"
      />
    </div>
  );
}

// The light on the floor: two beams fanning out from the gap. Points are in
// mock-up pixels, measured from the gap's left edge at floor level.
const BEAMS = {
  // 390px phone mock-up: they stop where the floor plane ends, 344px down
  phone: {
    viewBox: "-22 0 387 344",
    outer: { points: "0,0 10,0 365,344 -22,344", opacity: 0.071 },
    inner: { points: "0,0 10,0 225.8,344 48,344", opacity: 0.039 },
  },
  // 1440px mock-up: the floor below the door, 420px deep
  desktop: {
    viewBox: "0 0 1188 420",
    outer: { points: "0,0 14,0 1187.7,420 80,420", opacity: 0.059 },
    inner: { points: "0,0 14,0 780,420 200,420", opacity: 0.039 },
  },
};

export function FloorLight({ size, open, className = "" }) {
  const beams = BEAMS[size];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={beams.viewBox}
      preserveAspectRatio="none"
      className={`door-flicker pointer-events-none absolute transition-[filter] duration-[1800ms] ${open ? "brightness-150" : ""} ${className}`}
    >
      <polygon points={beams.outer.points} fill={LINEN} fillOpacity={beams.outer.opacity} />
      <polygon points={beams.inner.points} fill={LINEN} fillOpacity={beams.inner.opacity} />
    </svg>
  );
}

// "The whole section warms" once the enquiry is sent
export function Warmth({ open }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-accent transition-opacity duration-[2400ms] ease-out ${open ? "opacity-[0.07]" : "opacity-0"}`}
    />
  );
}
