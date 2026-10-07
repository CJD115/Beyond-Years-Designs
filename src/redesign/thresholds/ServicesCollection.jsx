import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./shared";

// Services, "The Collection" (Thresholds, p.5). The four services shown like
// a small gallery: one exhibit at a time under a single spotlight, with a
// museum wall label (Medium, Made for / Made by, Shown). The exhibits are the
// Churcham site, a working drawing from a blank page, a page of Mike's copy
// with a live edit, and Hidden Gem on a phone. Each one lights up from dark
// as you come to it. The numbers, the arrows, the arrow keys and (on phones)
// a swipe move between them.
//
// Desktop (1024px and up) is the 1440 × 1000 mock-up scaled to the window's
// width (--lu is one mock-up pixel). Phones follow the 390px mock-up, with the
// wall label under the exhibit. The exhibits are drawn in --x units: one
// mock-up pixel on desktop, scaled to the screen's width on phones.

const EXHIBITS = [
  {
    title: "Bespoke Websites",
    rows: [
      ["Medium", "One page, or many"],
      ["Made for", "One business. Yours."],
      ["Shown", "Churcham Homes, 2025"],
    ],
    text: "An elegant website that curates your brand and shows the world who you are, all from one convenient location.",
    Art: WebsiteExhibit,
  },
  {
    title: "Ground-up Web Design",
    rows: [
      ["Medium", "A blank page"],
      ["Made by", "Connor, lead developer"],
      ["Shown", "A working drawing"],
    ],
    text: "No templates, stock layouts or pre-existing formulas. You won’t find another one quite like it.",
    Art: DrawingExhibit,
  },
  {
    title: "Professionally Written",
    rows: [
      ["Medium", "Words"],
      ["Made by", "Mike, six years a wordsmith"],
      ["Shown", "A page from the studio"],
    ],
    text: "With a keen eye for detail and a deep love of the craft, Mike makes sure your brand is ready to find its audience.",
    Art: CopyExhibit,
  },
  {
    title: "Mobile & Performance",
    rows: [
      ["Medium", "Every screen size"],
      ["Made for", "The phone in your hand"],
      ["Shown", "Hidden Gem, 2024"],
    ],
    text: "More than half of all browsing happens on a phone, so every site is mobile-friendly and performance-optimised.",
    Art: PhoneExhibit,
  },
];

const pad = (n) => String(n).padStart(2, "0");
const x = (n) => `calc(var(--x) * ${n})`;

export default function ServicesCollection() {
  const [index, setIndex] = useState(0);
  const exhibit = EXHIBITS[index];
  const count = EXHIBITS.length;
  const touchX = useRef(null);
  const go = (k) => setIndex((k + count) % count);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(index + 1);
    else if (e.key === "ArrowLeft") go(index - 1);
    else return;
    e.preventDefault();
  };
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      id="services"
      aria-roledescription="carousel"
      aria-labelledby="services-title"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden [--x:min(calc((100vw_-_48px)/600),1px)] md:[--x:min(calc((100vw_-_80px)/600),1px)] lg:[--lu:min(calc(100vw/1440),1.25px)] lg:[--x:var(--lu)]"
    >
      <div className="relative mx-auto px-6 pt-[56px] pb-[48px] md:px-10 lg:h-[calc(var(--lu)*1000)] lg:max-w-[calc(var(--lu)*1440)] lg:p-0">
        {/* Desktop: the lamp, its beam, and the floor */}
        <svg aria-hidden="true" viewBox="0 0 1440 1000" className="absolute inset-0 hidden h-full w-full overflow-visible lg:block">
          <rect x="951" y="-2" width="79" height="12" fill="#2a2620" />
          <polygon points="951,10 1030,10 1395,1000 585,1000" fill="rgba(241,235,227,0.045)" />
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[calc(var(--lu)*820)] hidden h-px w-screen -translate-x-1/2 bg-[#f1ebe3]/8 lg:block"
        />

        <div className="relative lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*60)] lg:w-[calc(var(--lu)*520)]">
          <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:text-[max(10.5px,calc(var(--lu)*11.5))] lg:font-normal">
            Services — The Collection
          </p>
          <h2
            id="services-title"
            className="font-serif-italic mt-[8px] text-[24px] font-light leading-[1.3] tracking-normal lg:mt-[calc(var(--lu)*12)] lg:text-[calc(var(--lu)*30)]"
          >
            Everything your business needs, in one focussed website.
          </h2>
        </div>

        {/* The exhibit under its light */}
        <div className="relative -mx-6 mt-[24px] md:-mx-10 lg:absolute lg:left-[calc(var(--lu)*990)] lg:top-[calc(var(--lu)*420)] lg:m-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
          {/* Phones: the lamp and its beam over the exhibit */}
          <div aria-hidden="true" className="absolute inset-x-0 -top-[24px] bottom-0 lg:hidden">
            <span className="absolute left-1/2 top-0 h-[8px] w-[56px] -translate-x-1/2 bg-[#2a2620]" />
            <span className="absolute inset-0 bg-[#f1ebe3]/[0.045] [clip-path:polygon(calc(50%_-_28px)_8px,calc(50%_+_28px)_8px,calc(50%_+_42%)_100%,calc(50%_-_42%)_100%)]" />
          </div>
          <div className="relative flex h-[calc(var(--x)*540_+_32px)] items-center justify-center lg:h-[calc(var(--lu)*560)] lg:w-[calc(var(--lu)*620)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                aria-hidden="true"
                initial={{ opacity: 0, filter: "brightness(0.15)" }}
                animate={{ opacity: 1, filter: "brightness(1)", transition: { duration: 1.4, ease: EASE } }}
                exit={{ opacity: 0, filter: "brightness(0.15)", transition: { duration: 0.45 } }}
                className="absolute"
              >
                <exhibit.Art />
              </motion.div>
            </AnimatePresence>
          </div>
          <div aria-hidden="true" className="mx-6 h-px bg-[#f1ebe3]/10 md:mx-10 lg:hidden" />
        </div>

        {/* The wall label */}
        <div
          id="services-exhibit"
          aria-live="polite"
          className="relative mt-[28px] min-h-[300px] lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*298)] lg:mt-0 lg:min-h-0 lg:w-[calc(var(--lu)*470)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-accent lg:text-[max(10.5px,calc(var(--lu)*11.5))] lg:font-normal">
                <span className="sr-only">Service </span>Exhibit {pad(index + 1)} of {pad(count)}
              </p>
              <h3 className="font-display mt-[10px] text-[40px] font-light leading-[1.1] tracking-normal lg:mt-[calc(var(--lu)*14)] lg:text-[calc(var(--lu)*58)]">
                {exhibit.title}
              </h3>
              <span aria-hidden="true" className="mt-[18px] block h-px w-[52px] bg-accent lg:mt-[calc(var(--lu)*24)] lg:w-[calc(var(--lu)*59)]" />
              <dl className="mt-[18px] grid grid-cols-[100px_1fr] gap-y-[8px] lg:mt-[calc(var(--lu)*24)] lg:grid-cols-[calc(var(--lu)*113)_1fr] lg:gap-y-[calc(var(--lu)*10)]">
                {exhibit.rows.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="self-center text-[11px] uppercase leading-none tracking-[0.22em] text-[#f1ebe3]/55 lg:text-[max(10px,calc(var(--lu)*10.5))]">
                      {label}
                    </dt>
                    <dd className="font-display text-[19px] leading-[1.3] tracking-normal text-[#f1ebe3]/90 lg:text-[max(17px,calc(var(--lu)*21))]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="font-serif-italic mt-[18px] text-[19px] leading-[1.45] tracking-normal text-[#f1ebe3]/75 lg:mt-[calc(var(--lu)*28)] lg:text-[max(17px,calc(var(--lu)*21))]">
                {exhibit.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Moving between exhibits */}
        <div className="mt-[28px] flex items-center justify-between lg:absolute lg:inset-x-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*880)] lg:mt-0">
          <ArrowButton direction={-1} onClick={() => go(index - 1)} className="lg:order-2 lg:ml-auto" />
          <ul className="flex gap-[2px] lg:order-1 lg:gap-[calc(var(--lu)*10)]">
            {EXHIBITS.map((e, i) => (
              <li key={e.title}>
                <button
                  type="button"
                  aria-pressed={i === index}
                  aria-controls="services-exhibit"
                  aria-label={e.title}
                  onClick={() => go(i)}
                  className={`font-display flex h-12 min-w-12 items-center justify-center border-b text-[21px] leading-none tracking-normal transition-colors duration-500 lg:h-[max(44px,calc(var(--lu)*52))] lg:w-[calc(var(--lu)*52)] lg:min-w-11 lg:text-[calc(var(--lu)*21)] ${
                    i === index ? "border-accent text-[#f1ebe3]" : "border-transparent text-[#f1ebe3]/55 hover:text-[#f1ebe3]/85"
                  }`}
                >
                  {pad(i + 1)}
                </button>
              </li>
            ))}
          </ul>
          <ArrowButton direction={1} onClick={() => go(index + 1)} className="lg:order-3 lg:ml-[calc(var(--lu)*15)]" />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ direction, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction < 0 ? "Previous exhibit" : "Next exhibit"}
      className={`flex h-[48px] w-[48px] items-center justify-center border border-[#f1ebe3]/35 transition-colors duration-300 hover:border-[#f1ebe3] lg:h-[calc(var(--lu)*53)] lg:min-h-11 lg:w-[calc(var(--lu)*53)] lg:min-w-11 ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.25" className={`w-4 lg:w-[calc(var(--lu)*16)] ${direction < 0 ? "-scale-x-100" : ""}`}>
        <path d="M0 6h15M10 1l5 5-5 5" />
      </svg>
    </button>
  );
}

// ------------------------------------------------------------------ exhibits

const MAT = "bg-[#faf9f5] shadow-[0_2px_4px_rgba(0,0,0,0.3),0_30px_60px_rgba(0,0,0,0.55)]";

// 01: the Churcham site, matted and framed
function WebsiteExhibit() {
  return (
    <div className={MAT} style={{ width: x(600), padding: x(19) }}>
      <img
        src="/work/churcham-homes-desktop.webp"
        srcSet="/work/churcham-homes-desktop-800.webp 800w, /work/churcham-homes-desktop-1600.webp 1600w"
        sizes="(min-width: 1024px) 42vw, 90vw"
        alt=""
        decoding="async"
        className="block w-full object-cover object-left"
        style={{ height: x(341) }}
      />
    </div>
  );
}

// 02: a working drawing from a blank page: the grid, and the boxes a layout
// starts from
function DrawingExhibit() {
  return (
    <div className="relative bg-[#f4efe8] shadow-[0_2px_4px_rgba(0,0,0,0.3),0_30px_60px_rgba(0,0,0,0.55)]" style={{ width: x(576), height: x(366) }}>
      <div className="absolute grid grid-cols-12" style={{ inset: `0 ${x(27)}`, columnGap: x(14) }}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="bg-[#b98550]/[0.09]" />
        ))}
      </div>
      <span className="absolute border border-[#3b342c]" style={{ left: x(27), top: x(24), width: x(522), height: x(21) }} />
      <span className="absolute border border-[#3b342c]" style={{ left: x(27), top: x(66), width: x(329), height: x(137) }}>
        <span className="font-display absolute leading-none text-[#3b342c]" style={{ left: x(16), top: x(20), fontSize: x(27) }}>
          Your headline
        </span>
      </span>
      <span className="absolute border border-dashed border-[#b98550]" style={{ left: x(377), top: x(66), width: x(172), height: x(137) }} />
      <span className="absolute border border-[#3b342c]" style={{ left: x(27), top: x(227), width: x(522), height: x(108) }} />
      <span
        className="absolute whitespace-nowrap uppercase leading-none tracking-[0.2em] text-[#8c6239]"
        style={{ right: x(27), bottom: x(12), fontSize: x(9) }}
      >
        Sheet 01 — From a blank page
      </span>
    </div>
  );
}

// 03: a page of Mike's copy, mid-edit: "simple" struck through for "clear"
function CopyExhibit() {
  return (
    <div className={`relative ${MAT}`} style={{ width: x(400), height: x(540), padding: x(38) }}>
      <p className="uppercase leading-none tracking-[0.2em] text-[#8c6239]" style={{ fontSize: x(9.5) }}>
        Draft 3 — For the homepage
      </p>
      <p className="font-display leading-[1.32] tracking-normal text-[#1c1a17]" style={{ marginTop: x(22), fontSize: x(28) }}>
        My job is all about conveying information in a{" "}
        <span className="relative text-[#1c1a17]/45">
          simple
          <motion.span
            className="absolute inset-x-0 top-[55%] h-px origin-left bg-[#b98550]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
          />
        </span>{" "}
        <motion.em
          className="font-serif-italic text-[#8c6239]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
        >
          clear
        </motion.em>{" "}
        way, and making sure your brand voice comes through wherever it shows up.
      </p>
      <p className="font-display leading-[1.4] tracking-normal text-[#6b655d]" style={{ marginTop: x(22), fontSize: x(19) }}>
        From the front page of a website to the fine print of a pamphlet.
      </p>
      <p className="font-serif-italic absolute text-[#8c6239]" style={{ left: x(38), bottom: x(34), fontSize: x(21) }}>
        — Mike
      </p>
    </div>
  );
}

// 04: Hidden Gem on a phone
function PhoneExhibit() {
  return (
    <div className={MAT} style={{ width: x(257), padding: x(10) }}>
      <img
        src="/work/hidden-gem-phone.webp"
        srcSet="/work/hidden-gem-phone-400.webp 400w, /work/hidden-gem-phone.webp 900w"
        sizes="(min-width: 1024px) 18vw, 40vw"
        alt=""
        decoding="async"
        className="block w-full"
        style={{ height: x(480) }}
      />
    </div>
  );
}
