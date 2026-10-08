import { motion } from "motion/react";
import Reveal from "@/components/studio/Reveal";
import { line, loop } from "@/lib/contours";

// Why Us, "Party Perks" (05 Level Up, p.6 of
// Beyond-Years-Redesign-05-Level-Up-v2.pdf). The three reasons to choose us
// become perks you unlock as you climb a staircase that steps up from left to
// right: Small and Agile (01), Passionate and Motivated (02), Tried and
// Trusted (03). Each step and perk rises into place as you scroll, and the
// emblem turns slightly on hover.
//
// Desktop (1280px and up) is the 1440 × 1000 mock-up scaled to the window:
// --lu is one mock-up pixel. Smaller screens follow the 390px phone mock-up,
// where the staircase turns vertical and each perk edges right.

// x/y place each perk's emblem in mock-up pixels; w is its text column and
// tread the width of the step it stands on (the last step runs off the page).
// Every step has the same shape relative to its perk, so the staircase is
// drawn by the perks themselves.
const PERKS = [
  {
    level: 1,
    title: "Small and Agile",
    type: "No red tape",
    body: "No faceless outreach team. When you get in touch, you reach us directly, and when you have an idea, we’re there right away.",
    Emblem: ChevronsEmblem,
    x: 60.5,
    y: 686.5,
    w: 292,
    tread: 460,
  },
  {
    level: 2,
    title: "Passionate and Motivated",
    type: "Care in every detail",
    body: "We love working with small businesses, independent makers and creative teams, and we appreciate the hard work you put into your craft.",
    Emblem: FlameEmblem,
    x: 520.5,
    y: 446.5,
    w: 275,
    tread: 430,
  },
  {
    level: 3,
    title: "Tried and Trusted",
    type: "Worked together for years",
    body: "The studio is new; the partnership isn’t. Clients big and small, from high-street hairdressers to national automotive resale and high-end property development.",
    Emblem: ShieldEmblem,
    x: 950.5,
    y: 206.5,
    w: 305,
    tread: null,
  },
];

export default function WhyPartyPerks() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="relative overflow-hidden xl:[--lu:min(calc(100vw/1440),1.25px)]"
    >
      {/* The paper and its faint contour lines, softening in at the top so
          the section meets Services above */}
      <div aria-hidden="true" className="why-paper pointer-events-none absolute inset-0">
        <Contours />
      </div>

      <div className="relative mx-auto w-full px-6 pt-16 md:px-10 md:pt-24 xl:h-[calc(var(--lu)*1000)] xl:max-w-[calc(var(--lu)*1440)] xl:px-0 xl:pt-0">
        <Reveal className="max-w-[560px] xl:max-w-none xl:w-[calc(var(--lu)*460)] xl:ml-[calc(var(--lu)*64)] xl:pt-[calc(var(--lu)*50)]">
          <p data-join className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-foreground/75 xl:text-[max(10.5px,calc(var(--lu)*11))] xl:font-normal">Why us</p>
          <h2
            id="why-us-title"
            className="font-display mt-[14px] text-[min(56px,14.5vw)] leading-[1.1] xl:mt-[calc(var(--lu)*7.5)] xl:whitespace-nowrap xl:text-[calc(var(--lu)*84)]"
          >
            Why <span className="font-serif-italic text-accent">choose us?</span>
          </h2>
          <p className="font-display mt-[16px] text-[21px] leading-[1.3] tracking-normal text-foreground/90 xl:mt-[calc(var(--lu)*26)] xl:text-[max(19px,calc(var(--lu)*26))] xl:leading-[1.28]">
            We build, host, and maintain websites for small businesses, independent makers and creative teams. Three things
            come as standard.
          </p>
        </Reveal>

        {/* The staircase. Phones: a vertical stair down the left, each perk a
            step further right. Desktop: each perk stands on its own step. */}
        <ul className="mt-12 max-w-[560px] md:mt-16 xl:mt-0 xl:max-w-none">
          {PERKS.map((perk, i) => (
            <Perk key={perk.level} perk={perk} index={i} last={i === PERKS.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Perk({ perk, index, last }) {
  const { Emblem } = perk;

  return (
    <motion.li
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay: 0.1 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--i": index, "--x": perk.x, "--y": perk.y, "--w": perk.w, "--tread": perk.tread ?? 0 }}
      className={`group relative max-xl:ml-[calc(var(--i)*22px)] max-xl:border-l-2 max-xl:border-accent max-xl:pt-[12px] max-xl:pl-[20px] ${last ? "max-xl:pb-20 max-md:pb-16" : "max-xl:pb-[38px]"} xl:absolute xl:left-[calc(var(--lu)*var(--x))] xl:top-[calc(var(--lu)*var(--y))]`}
    >
      <Step index={index} last={last} />

      <p
        aria-hidden="true"
        className="font-sc mb-[8px] text-[16px] font-medium leading-[1.25] tracking-normal text-accent-strong xl:absolute xl:left-[calc(var(--lu)*4)] xl:top-[calc(var(--lu)*245)] xl:mb-0 xl:-translate-y-1/2 xl:whitespace-nowrap xl:text-[max(13px,calc(var(--lu)*16))]"
      >
        {String(perk.level).padStart(2, "0")}
      </p>

      <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-x-[14px] xl:grid-cols-[calc(var(--lu)*103)_calc(var(--lu)*var(--w))] xl:gap-x-[calc(var(--lu)*18.5)]">
        <div
          aria-hidden="true"
          className="relative col-start-1 row-start-1 aspect-square w-[64px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[8deg] xl:row-span-3 xl:w-[calc(var(--lu)*103)] xl:self-start"
        >
          <span className="absolute inset-[14.645%] rotate-45 border border-foreground bg-[var(--linen)]" />
          <Emblem className="absolute left-1/2 top-1/2 size-[36.9%] -translate-x-1/2 -translate-y-1/2 text-accent" />
        </div>

        <h3
          className="font-sc col-start-2 row-start-1 self-center text-[27px] font-semibold leading-none tracking-normal text-foreground xl:self-start xl:pt-[calc(var(--lu)*4)] xl:text-[calc(var(--lu)*30)]"
        >
          {perk.title}
        </h3>
        <p className="font-serif-italic col-span-2 row-start-2 mt-[14px] text-[19.5px] leading-[1.2] text-accent-strong xl:col-span-1 xl:col-start-2 xl:mt-[calc(var(--lu)*7)] xl:text-[max(17px,calc(var(--lu)*19.5))]">
          {perk.type}
        </p>
        <p className="col-span-2 row-start-3 mt-[8px] text-[15px] leading-[24px] tracking-normal text-foreground/80 xl:col-span-1 xl:col-start-2 xl:mt-[calc(var(--lu)*8)] xl:text-[max(14px,calc(var(--lu)*15))] xl:leading-[1.667]">
          {perk.body}
        </p>
      </div>
    </motion.li>
  );
}

// The step a perk stands on, with its shadow. Desktop: the tread under the
// perk and the riser up from the step below. Phones: the stair runs down the
// perk's left edge (its border), with a shadow outside it and a short tread
// across from the step above.
function Step({ index, last }) {
  return (
    <span aria-hidden="true" className="pointer-events-none">
      {/* Phones */}
      <span className="absolute top-0 bottom-0 left-[-16px] w-[14px] bg-foreground/[0.07] xl:hidden" />
      {index > 0 && <span className="absolute top-0 left-[-24px] h-[2px] w-[24px] bg-accent xl:hidden" />}

      {/* Desktop */}
      <span className="hidden xl:block">
        {index > 0 && (
          <>
            <span className="absolute top-[calc(var(--lu)*273.5)] left-[calc(var(--lu)*-20.5+2px)] h-[calc(var(--lu)*240)] w-[calc(var(--lu)*7)] bg-foreground/[0.07]" />
            <span className="absolute top-[calc(var(--lu)*273.5)] left-[calc(var(--lu)*-20.5)] h-[calc(var(--lu)*240)] w-[2px] bg-accent" />
          </>
        )}
        <span
          className={`absolute top-[calc(var(--lu)*273.5+2px)] h-[calc(var(--lu)*14)] bg-foreground/[0.07] ${
            index > 0 ? "left-[calc(var(--lu)*-20.5+2px+var(--lu)*7)]" : "left-[calc(var(--lu)*-20.5)]"
          } ${last ? "w-[100vw]" : index > 0 ? "w-[calc(var(--lu)*var(--tread))]" : "w-[calc(var(--lu)*(var(--tread)+7)+2px)]"}`}
        />
        <span
          className={`absolute top-[calc(var(--lu)*273.5)] left-[calc(var(--lu)*-20.5)] h-[2px] bg-accent ${
            last ? "w-[100vw]" : "w-[calc(var(--lu)*var(--tread)+2px)]"
          }`}
        />
      </span>
    </span>
  );
}

// Line-drawn emblems, drawn on a 24px grid like the site's other line icons
function ChevronsEmblem({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5.5 6.5 11 12l-5.5 5.5M12.5 6.5 18 12l-5.5 5.5" />
    </svg>
  );
}

function FlameEmblem({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21.25c-3.6 0-6-2.45-6-5.75 0-2.8 1.7-4.75 3.2-6.6 1.2-1.5 1.95-3.4 1.75-5.9 2.4 1.25 3.6 3.5 3.45 6.1.75-.55 1.3-1.4 1.55-2.35 1.4 1.6 2.05 4.15 2.05 6.75v2c0 3.3-2.4 5.75-6 5.75Z" />
      <path d="M12 12.25c1.35 1.5 2.5 2.85 2.5 4.4a2.5 2.5 0 0 1-5 0c0-1.55 1.15-2.9 2.5-4.4Z" />
    </svg>
  );
}

function ShieldEmblem({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19.5 12.5c0 4.7-3.3 7.1-7.2 8.5a.9.9 0 0 1-.6 0c-3.9-1.4-7.2-3.8-7.2-8.5V6a.9.9 0 0 1 .9-.9c1.9 0 4.2-1.1 5.85-2.55a1.1 1.1 0 0 1 1.5 0C14.4 4 16.7 5.1 18.6 5.1a.9.9 0 0 1 .9.9Z" />
      <path d="m8.75 12 2.25 2.25 4.25-4.5" />
    </svg>
  );
}

// The faint contour lines behind the staircase, in mock-up pixels. Closed
// loops are the hills; open lines run off the edges.
const CONTOURS = [
  // Around the heading
  loop(250, 160, 370, 320, [0.04, -0.02, 0.06, 0.02, -0.04, 0.03, 0.08, -0.03]),
  loop(280, 150, 255, 215, [0.06, 0, 0.05, -0.02, -0.06, 0.04, 0.07, -0.04]),
  loop(300, 130, 160, 125, [0.08, -0.04, 0.02, -0.06, -0.02, 0.06, 0.04, -0.05]),
  // Above Lv 3
  loop(905, 132, 98, 82, [0.02, 0.1, -0.04, -0.1, 0.06, 0.02, -0.06, 0.08]),
  loop(918, 158, 52, 42, [0.08, 0.04, -0.08, -0.04, 0.1, 0, -0.06, 0.06]),
  // Bottom right, under the top step
  loop(1110, 860, 335, 265, [0.02, -0.05, 0.06, 0.04, -0.02, 0.05, -0.04, 0.03]),
  loop(1115, 860, 215, 200, [0.04, -0.06, 0.05, 0.06, -0.04, 0.03, -0.06, 0.02]),
  loop(1135, 838, 115, 135, [0.06, -0.08, 0.04, 0.08, -0.06, 0.02, -0.04, 0.05]),
  loop(1178, 838, 52, 60, [0.1, -0.06, 0.02, 0.08, -0.1, 0.04, -0.02, 0.06]),
  // Lines running across
  line([[-20, 418], [160, 452], [340, 515], [520, 552], [700, 520], [850, 430], [905, 330]]),
  line([[-20, 500], [120, 556], [300, 602], [470, 605], [610, 570], [720, 520]]),
  line([[640, -10], [720, 110], [790, 250], [830, 360], [870, 470], [960, 560], [1120, 590], [1300, 560], [1460, 520]]),
];

function Contours() {
  return (
    <svg
      viewBox="0 0 1440 1000"
      preserveAspectRatio="xMinYMin slice"
      fill="none"
      stroke="currentColor"
      className="absolute inset-0 h-full w-full text-accent/20 [mask-image:linear-gradient(to_bottom,transparent,#000_96px)]"
    >
      {CONTOURS.map((d, i) => (
        <path key={i} d={d} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
