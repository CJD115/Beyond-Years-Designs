import { PROJECTS } from "@/data/projects";

// Hero 3.10 — "Pinned to the path". A fixed composition: three photo prints
// hanging from ochre pins along a drawn line. Every value below comes from the
// mockup, drawn on a 1440 × 900 frame, and is expressed in poster pixels
// (--poster-u, defined in index.css) so the artwork scales as one unit with
// the headline. Rendered inside .hero-poster, anchored to its bottom-left.

const u = (n) => `calc(var(--poster-u) * ${n})`;

const LINE_PATH =
  "M 598 806 C 612 730, 622 660, 640 610 C 700 548, 780 500, 830 476 C 900 430, 980 268, 1040 200";
const LINE_START = { x: 598, y: 806 };

const PRINTS = [
  {
    slug: "hidden-gem",
    label: "",
    x: 640,
    y: 610,
    rotate: 3,
    padding: 9,
    imageWidth: 170,
    imageHeight: 96,
    captionHeight: 30,
    imageOpacity: 0.55,
    captionColor: "rgba(74, 74, 74, 0.7)",
    shadow: [16, 28, -18, 0.4],
  },
  {
    slug: "groves-hairstyling",
    label: "",
    x: 830,
    y: 476,
    rotate: 4,
    padding: 10,
    imageWidth: 200,
    imageHeight: 112,
    captionHeight: 32,
    imageOpacity: 0.8,
    captionColor: "#4A4A4A",
    shadow: [18, 30, -18, 0.42],
  },
  {
    slug: "churcham-homes",
    label: "",
    x: 1040,
    y: 200,
    rotate: 2,
    padding: 12,
    imageWidth: 300,
    imageHeight: 200,
    captionHeight: 46,
    imageOpacity: 1,
    featured: true,
    shadow: [26, 40, -20, 0.45],
  },
]
  .map((print) => ({ ...print, project: PROJECTS.find((p) => p.slug === print.slug) }))
  .filter((print) => print.project);

const shadowFor = ([y, blur, spread, alpha]) =>
  `0 ${u(1)} ${u(1)} rgba(18, 18, 18, 0.06), 0 ${u(y)} ${u(blur)} ${u(spread)} rgba(40, 28, 16, ${alpha})`;

function Print({ print }) {
  const { project } = print;

  return (
    <div
      className="absolute bg-[#FBF9F5]"
      style={{
        left: u(print.x),
        top: u(print.y),
        padding: `${u(print.padding)} ${u(print.padding)} 0`,
        boxShadow: shadowFor(print.shadow),
        transform: `rotate(${print.rotate}deg)`,
        transformOrigin: "0 0",
      }}
    >
      <div
        className="overflow-hidden"
        style={{
          width: u(print.imageWidth),
          height: u(print.imageHeight),
          background: print.featured ? "#2B2A28" : "#FBF9F5",
        }}
      >
        <img
          src={project.thumb ?? project.image}
          alt=""
          draggable="false"
          className="block h-full w-full object-cover"
          style={{ opacity: print.imageOpacity }}
        />
      </div>

      {print.featured ? (
        <div
          className="flex items-center justify-between"
          style={{ height: u(print.captionHeight) }}
        >
          <span className="flex items-baseline" style={{ gap: u(12) }}>
            <span
              className="tracking-[0.22em] text-[#B98550]"
              style={{ fontSize: u(10.4) }}
            >
              {print.label}
            </span>
            <span
              className="font-serif-italic tracking-[-0.01em] text-[#121212]"
              style={{ fontSize: u(19) }}
            >
              {project.name}
            </span>
          </span>
          <span
            className="uppercase tracking-[0.22em] text-[#4A4A4A]"
            style={{ fontSize: u(10.4) }}
          >
            {project.year}
          </span>
        </div>
      ) : (
        <div
          className="flex items-center uppercase tracking-[0.22em]"
          style={{
            height: u(print.captionHeight),
            gap: u(10),
            fontSize: u(9.6),
            color: print.captionColor,
          }}
        >
          <span className="text-[#B98550]">{print.label}</span>
          <span>{project.name}</span>
        </div>
      )}
    </div>
  );
}

export default function PrintTrail() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 z-0"
      style={{ width: u(1440), height: u(900) }}
    >
      {PRINTS.map((print) => (
        <Print key={print.slug} print={print} />
      ))}

      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1440 900"
      >
        <path d={LINE_PATH} fill="none" stroke="#B98550" strokeWidth="1" />
        <circle cx={LINE_START.x} cy={LINE_START.y} r="3" fill="#B98550" />
        {PRINTS.map((print) => (
          <circle key={print.slug} cx={print.x} cy={print.y} r="4" fill="#B98550" />
        ))}
      </svg>
    </div>
  );
}
