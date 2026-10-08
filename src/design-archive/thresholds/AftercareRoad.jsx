import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AFTERCARE_LINK } from "@/data/aftercare";
import { EASE } from "@/design-archive/thresholds/shared";

// Aftercare, "Beyond Years" (Thresholds, p.8): the studio's name, finally
// explained. A road runs into the distance (Launch, Month 1, Year 1, Year 2,
// Year 5, Year 10) and each aftercare service is a light placed where it
// happens: hosting is the line that never switches off, the domain glows every
// year, and SEO and analytics light up at launch. The hosting line flows
// forward all the time, the lights come on in order as the road comes into
// view, and scrolling eases the camera a little way down the road.
//
// Desktop (1024px and up) is the 1440 × 1000 mock-up scaled to the window's
// width (--lu is one mock-up pixel). Phones follow the 390px mock-up: a
// vertical timeline narrowing from Launch to Year 10.

const NOTE = (
  <>
    Once your site’s live, we can keep it running with <em className="font-serif-italic text-accent">hosting</em> and{" "}
    <em className="font-serif-italic text-accent">maintenance</em>, and help it grow with{" "}
    <em className="font-serif-italic text-accent">blogs and newsletters</em> and{" "}
    <em className="font-serif-italic text-accent">analytics</em>.
  </>
);

// The road, in mock-up pixels: from the horizon (y 330) to the foot (y 1000)
const TOP = 330;
const left = (y) => 691 - (y - TOP) * (311 / 670);
const right = (y) => 754 + (y - TOP) * (308 / 670);

// Milestones: where they sit, and how big their labels are with distance
const MILESTONES = [
  { label: "Year 10", y: 361, size: 9.5, dot: 2.5, domain: 2.5 },
  { label: "Year 5", y: 400, size: 11, dot: 3, domain: 3.5 },
  { label: "Year 2", y: 470, size: 13.5, dot: 4, domain: 4.5 },
  { label: "Year 1", y: 560, size: 16, dot: 5, domain: 6 },
  { label: "Month 1", y: 690, size: 20, maintenance: 8 },
  { label: "Launch", y: 900, size: 28, lamps: true },
];

// The services, labelled where they happen
const SERVICES = [
  { name: "Domain", when: "Renewed every year", x: 880, y: 530 },
  { name: "Maintenance", when: "On your agreed plan", x: 941, y: 666 },
  { name: "Content", when: "Whenever you need it", x: 993, y: 782 },
  { name: "Hosting & Maintenance", when: "Always on", x: 1040, y: 911 },
  { name: "SEO setup & Analytics", when: "Set up at launch", x: 64, y: 930 },
];

const u = (n) => `calc(var(--lu) * ${n})`;

export default function AftercareRoad() {
  return (
    <section id="aftercare" aria-labelledby="aftercare-title" className="relative overflow-hidden lg:[--lu:min(calc(100vw/1440),1.25px)]">
      <Desktop />
      <Phone />
    </section>
  );
}

function Title({ className = "" }) {
  return (
    <div className={className}>
      <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:hidden">Aftercare</p>
      <h2
        id="aftercare-title"
        className="font-display mt-[12px] text-[50px] font-light leading-none tracking-[-0.01em] lg:mt-0 lg:text-[calc(var(--lu)*100)]"
      >
        Beyond <em className="font-serif-italic font-light text-accent">launch.</em>
      </h2>
      <p className="font-serif-italic mt-[10px] text-[30px] font-light leading-none tracking-normal text-[#f1ebe3]/50 lg:mt-[calc(var(--lu)*26)] lg:text-[calc(var(--lu)*46)]">
        Beyond years.
      </p>
    </div>
  );
}

function AskLink({ className = "" }) {
  return (
    <a
      href={AFTERCARE_LINK.href}
      className={`inline-flex min-h-11 items-center gap-[0.3em] border-b border-[#f1ebe3]/50 text-[15px] font-medium leading-[1.21] transition-colors duration-300 hover:border-accent hover:text-accent lg:text-[max(14px,calc(var(--lu)*15))] ${className}`}
    >
      Ask about aftercare
      <ArrowRight aria-hidden="true" className="h-[0.95em] w-[0.95em]" strokeWidth={1.75} />
    </a>
  );
}

// ------------------------------------------------------------------ desktop

function Desktop() {
  const ref = useRef(null);
  const roadRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const lit = useInView(roadRef, { once: true, amount: 0.4 }) || reduceMotion;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const camera = useTransform(scrollYProgress, [0.2, 0.9], [1, reduceMotion ? 1 : 1.07]);

  // Each light comes on in turn, from launch outwards
  const on = (step) => ({
    initial: reduceMotion ? false : { opacity: 0 },
    animate: lit ? { opacity: 1 } : undefined,
    transition: { duration: 0.8, delay: 0.3 + step * 0.25, ease: EASE },
  });

  return (
    <div ref={ref} className="relative mx-auto hidden h-[calc(var(--lu)*1000)] max-w-[calc(var(--lu)*1440)] lg:block">
      <Title className="absolute left-[calc(var(--lu)*64)] top-[calc(var(--lu)*62)]" />
      <div className="absolute" style={{ left: u(900), top: u(68), width: u(480) }}>
        <p className="font-display text-[calc(var(--lu)*26)] font-light leading-[1.3] tracking-normal text-[#f1ebe3]/90">{NOTE}</p>
        <p className="mt-[calc(var(--lu)*14)] text-[max(10px,calc(var(--lu)*11))] uppercase leading-none tracking-[0.22em] text-[#f1ebe3]/60">
          Connor &amp; Mike
        </p>
        <AskLink className="mt-[calc(var(--lu)*18)]" />
      </div>

      {/* The horizon */}
      <div aria-hidden="true" className="absolute left-1/2 h-px w-screen -translate-x-1/2 bg-[#f1ebe3]/8" style={{ top: u(TOP) }} />

      <motion.div
        ref={roadRef}
        aria-hidden="true"
        className="absolute inset-0"
        style={{ scale: camera, transformOrigin: `${u(722)} ${u(TOP)}` }}
      >
        <svg viewBox="0 0 1440 1000" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          <polygon points={`691,${TOP} 754,${TOP} 1062,1000 380,1000`} fill="rgba(241,235,227,0.035)" />
          <line x1="691" y1={TOP} x2="380" y2="1000" stroke="rgba(241,235,227,0.18)" />
          <CentreLine />
          {MILESTONES.map((m) => (
            <line key={m.label} x1={left(m.y)} y1={m.y} x2={right(m.y)} y2={m.y} stroke="rgba(241,235,227,0.13)" />
          ))}
          {/* Hosting: the line that never switches off, flowing towards you */}
          <line x1="754" y1={TOP} x2="1062" y2="1000" stroke="rgba(185,133,80,0.22)" strokeWidth="7" />
          <line className="th-flow" x1="754" y1={TOP} x2="1062" y2="1000" stroke="#b98550" strokeWidth="2" strokeDasharray="14 12" />

          {/* The lights */}
          {MILESTONES.map((m, i) => (
            <motion.g key={m.label} {...on(MILESTONES.length - 1 - i)}>
              {m.dot && <circle cx={left(m.y)} cy={m.y} r={m.dot} fill="#b98550" />}
              {m.domain && (
                <rect
                  className="th-breathe"
                  x={right(m.y) - m.domain}
                  y={m.y - m.domain}
                  width={m.domain * 2}
                  height={m.domain * 2}
                  fill="#f1ebe3"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              )}
              {m.maintenance && (
                <rect x={right(m.y) - 4} y={m.y - 4} width="8" height="8" fill="#f1ebe3" />
              )}
              {m.lamps &&
                [560, 880].map((cx) => (
                  <g key={cx}>
                    <circle className="th-breathe" cx={cx} cy={m.y} r="20" fill="rgba(185,133,80,0.28)" />
                    <circle cx={cx} cy={m.y} r="8" fill="#b98550" />
                  </g>
                ))}
            </motion.g>
          ))}
        </svg>

        {/* Milestone labels, smaller the further away they are */}
        {MILESTONES.map((m) => (
          <p
            key={m.label}
            className="font-display absolute -translate-y-1/2 whitespace-nowrap leading-none tracking-normal"
            style={{
              right: u(1440 - left(m.y) + (m.y > 800 ? 18 : 12)),
              top: u(m.y),
              fontSize: u(m.size),
              color: `rgba(241, 235, 227, ${0.4 + (m.y - TOP) / 1100})`,
            }}
          >
            {m.label}
          </p>
        ))}
      </motion.div>

      {/* The services, where they happen (outside the camera, so they stay readable) */}
      <ul className="contents">
        {SERVICES.map((s, i) => (
          <motion.li key={s.name} className="absolute" style={{ left: u(s.x), top: u(s.y) }} {...on(i === 4 ? 0 : 4 - i)}>
            <p className="font-display text-[calc(var(--lu)*22)] leading-[1.1] tracking-normal">{s.name}</p>
            <p className="mt-[calc(var(--lu)*7)] text-[max(9.5px,calc(var(--lu)*10.5))] uppercase leading-none tracking-[0.22em] text-accent">
              {s.when}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// The dashes down the middle of the road, longer as they come closer
function CentreLine() {
  const dashes = [];
  let y = 345;
  let len = 4;
  while (y < 1000) {
    const end = Math.min(y + len, 1000);
    dashes.push(<line key={y} x1="722" y1={y} x2="721" y2={end} stroke="rgba(241,235,227,0.4)" />);
    y = end + len * 1.7;
    len *= 1.28;
  }
  return <g>{dashes}</g>;
}

// ------------------------------------------------------------------ phone

// The timeline, in px from its top: where each milestone sits, and the road's
// right edge (where the hosting line runs) at that height
const PHONE_HEIGHT = 600;
const edge = (y) => 58 - (y / PHONE_HEIGHT) * 27;
const PHONE_STOPS = [
  {
    label: "Launch",
    y: 33,
    size: 30,
    marker: "lamp",
    services: [
      ["Hosting & Maintenance", "Always on"],
      ["SEO setup & Analytics", "Set up at launch"],
    ],
  },
  {
    label: "Month 1",
    y: 213,
    size: 28,
    marker: "square",
    services: [
      ["Maintenance", "On your agreed plan"],
      ["Content", "Whenever you need it"],
    ],
  },
  { label: "Year 1", y: 390, size: 22, marker: "dot", services: [["Domain", "Renewed every year"]] },
  { label: "Year 2", y: 505, size: 18, marker: "small" },
  { label: "Year 5", y: 543, size: 16, marker: "small" },
  { label: "Year 10", y: 576, size: 14, marker: "small" },
];

function Phone() {
  return (
    <div className="px-6 pt-[56px] pb-[56px] md:px-10 lg:hidden">
      <Title />
      <p className="font-display mt-[24px] max-w-[30rem] text-[20px] leading-[1.45] tracking-normal text-[#f1ebe3]/90">{NOTE}</p>

      <div className="relative mt-[28px]" style={{ height: PHONE_HEIGHT }}>
        <svg aria-hidden="true" width="64" height={PHONE_HEIGHT} viewBox={`0 0 64 ${PHONE_HEIGHT}`} className="absolute left-0 top-0 overflow-visible" fill="none">
          <polygon points={`0,0 58,0 31,${PHONE_HEIGHT} 27,${PHONE_HEIGHT}`} fill="rgba(241,235,227,0.04)" />
          <line x1="0" y1="0" x2="27" y2={PHONE_HEIGHT} stroke="rgba(241,235,227,0.14)" />
          <line x1="58" y1="0" x2="31" y2={PHONE_HEIGHT} stroke="rgba(185,133,80,0.22)" strokeWidth="5" />
          <line className="th-flow" x1="58" y1="0" x2="31" y2={PHONE_HEIGHT} stroke="#b98550" strokeWidth="2" strokeDasharray="14 12" />
          {PHONE_STOPS.map((s) => {
            const x = edge(s.y);
            if (s.marker === "lamp")
              return (
                <g key={s.label}>
                  <circle className="th-breathe" cx={x} cy={s.y} r="16" fill="rgba(185,133,80,0.28)" />
                  <circle cx={x} cy={s.y} r="7" fill="#b98550" />
                </g>
              );
            if (s.marker === "square") return <rect key={s.label} x={x - 5} y={s.y - 5} width="10" height="10" fill="#f1ebe3" />;
            return <circle key={s.label} cx={x} cy={s.y} r={s.marker === "dot" ? 5 : 3} fill="#b98550" />;
          })}
          {PHONE_STOPS.map((s) => (
            <line key={`tick-${s.label}`} x1={(s.y / PHONE_HEIGHT) * 27} y1={s.y} x2={edge(s.y)} y2={s.y} stroke="rgba(241,235,227,0.18)" />
          ))}
        </svg>

        <ol className="absolute inset-y-0 left-[87px] right-0">
          {PHONE_STOPS.map((s) => (
            <li key={s.label} className="absolute left-0 right-0" style={{ top: s.y - s.size * 0.6 }}>
              <p
                className="font-display leading-[1.2] tracking-normal"
                style={{ fontSize: s.size, color: `rgba(241, 235, 227, ${1 - (s.y / PHONE_HEIGHT) * 0.45})` }}
              >
                {s.label}
              </p>
              {s.services && (
                <ul className="mt-[14px] space-y-[18px]">
                  {s.services.map(([name, when]) => (
                    <li key={name}>
                      <p className="font-display text-[20px] leading-[1.15] tracking-normal">{name}</p>
                      <p className="mt-[6px] text-[10.5px] uppercase leading-none tracking-[0.2em] text-accent">{when}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>

      <AskLink className="mt-[40px]" />
    </div>
  );
}
