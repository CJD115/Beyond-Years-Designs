import { useState } from "react";
import { motion } from "motion/react";
import { Feather, Globe } from "lucide-react";
import Reveal from "@/components/studio/Reveal";
import { line, loop } from "@/lib/contours";
import { AFTERCARE_EQUIP, AFTERCARE_GROUPS, AFTERCARE_INTRO, AFTERCARE_LINK } from "@/data/aftercare";

// Aftercare, "New Game+" (05 Level Up, p.8 of
// Beyond-Years-Redesign-05-Level-Up-v2.pdf). The credits roll, but the game
// carries on: your live website sits at the centre of an equipment screen
// with four slots, two for keeping it running and two for helping it grow,
// each joined to it by a dotted route. Slots rise into place as you scroll,
// and pointing at one lights up its route.
//
// Desktop (1280px and up) is the 1440 × 1050 mock-up, cut to 920 tall for
// four slots, scaled to the window:
// --lu is one mock-up pixel. Smaller screens follow the 390px phone mock-up:
// the emblem on top, the four slots in two columns underneath.

const TITLE_ID = "aftercare-title";

// Where each slot's frame sits on the mock-up (top-left corner), by item name.
// The two groups mirror each other around the emblem, a pair either side of
// its centre.
const SLOTS = {
  "Hosting & Maintenance": { x: 396, y: 446, Icon: ServerIcon },
  Domain: { x: 396, y: 616, Icon: GlobeIcon },
  Content: { x: 936, y: 446, Icon: FeatherIcon },
  Analytics: { x: 936, y: 616, Icon: ChartIcon },
};
const FRAME = 108;
const CENTRE = { x: 720, y: 585 };

export default function AftercareNewGame() {
  // The slot being pointed at, so its route can light up
  const [active, setActive] = useState(null);

  return (
    <section
      id="aftercare"
      aria-labelledby={TITLE_ID}
      className="relative overflow-hidden xl:[--lu:min(calc(100vw/1440),1.25px)]"
    >
      {/* The paper and its contour lines, as in Why us */}
      <div aria-hidden="true" className="why-paper pointer-events-none absolute inset-0">
        <Contours />
      </div>

      <div className="relative mx-auto w-full max-w-[640px] px-6 pt-16 pb-20 md:pt-24 md:pb-28 xl:h-[calc(var(--lu)*920)] xl:max-w-[calc(var(--lu)*1440)] xl:px-0 xl:pt-0 xl:pb-0">
        <Reveal className="xl:pt-[calc(var(--lu)*50)] xl:text-center">
          <p className="text-center text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-foreground/75 xl:text-[max(10.5px,calc(var(--lu)*11))] xl:font-normal">Aftercare</p>
          <h2
            id={TITLE_ID}
            className="font-display mt-[18px] text-center text-[min(60px,15.5vw)] leading-none xl:mt-[calc(var(--lu)*5)] xl:text-[calc(var(--lu)*96)]"
          >
            Beyond <span className="font-serif-italic text-accent">launch.</span>
          </h2>
          <p className="font-serif-italic mx-auto mt-[16px] max-w-[22em] text-center text-[20px] leading-[1.3] text-foreground/90 xl:mt-[calc(var(--lu)*18.5)] xl:max-w-[calc(var(--lu)*690)] xl:text-[max(19px,calc(var(--lu)*27))] xl:leading-[1.26]">
            {AFTERCARE_INTRO}
          </p>
        </Reveal>

        {/* Desktop: the dotted routes from each slot to the emblem */}
        <Routes active={active} />

        <Emblem />

        {/* Phones: the routes running down from the emblem to the slots */}
        <svg aria-hidden="true" viewBox="0 0 200 44" className="mx-auto -mt-[14px] block w-[200px] text-accent xl:hidden">
          <path d="M72 0 22 44M128 0l50 44" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="0.1 5" opacity="0.7" />
        </svg>

        {/* The four slots. Phones: two columns between two rules. Desktop:
            each slot sits on its own spot around the emblem. */}
        <div className="grid grid-cols-2 gap-x-4 border-t border-foreground/15 pt-6 sm:gap-x-8 xl:block xl:border-0 xl:pt-0">
          {AFTERCARE_GROUPS.map((group, gi) => (
            <Group key={group.title} group={group} side={gi === 0 ? "left" : "right"} onActive={setActive} />
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-center gap-x-[29px] gap-y-3 border-t border-foreground/15 pt-8 text-center xl:absolute xl:inset-x-0 xl:top-[calc(var(--lu)*810)] xl:mt-0 xl:flex-row xl:justify-center xl:border-0 xl:pt-0">
          <p className="font-serif-italic text-[20px] leading-[1.2] text-foreground/70 xl:text-[max(18px,calc(var(--lu)*21))]">
            {AFTERCARE_EQUIP}
          </p>
          <a
            href={AFTERCARE_LINK.href}
            className="inline-flex min-h-11 items-center gap-1.5 border-b border-foreground text-[15px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent-strong"
          >
            {AFTERCARE_LINK.label}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Group({ group, side, onActive }) {
  const left = side === "left";

  return (
    <div>
      <h3
        className={`mb-4 text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-foreground/75 xl:absolute xl:top-[calc(var(--lu)*405)] xl:mb-0 xl:text-[max(10.5px,calc(var(--lu)*11))] xl:font-normal ${
          left ? "xl:left-[calc(var(--lu)*150)]" : "xl:right-[calc(var(--lu)*150)]"
        }`}
      >
        {group.title}
      </h3>
      <ul className="flex flex-col gap-5 md:gap-7">
        {group.items.map((item, i) => (
          <Slot key={item.name} item={item} left={left} index={i + (left ? 0 : group.items.length)} onActive={onActive} />
        ))}
      </ul>
    </div>
  );
}

function Slot({ item, left, index, onActive }) {
  const { x, y, Icon } = SLOTS[item.name];

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay: 0.15 + (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={() => onActive(item.name)}
      onPointerLeave={() => onActive(null)}
      style={{ "--x": x, "--y": y }}
      className="group flex items-start gap-3 xl:absolute xl:left-[calc(var(--lu)*var(--x))] xl:top-[calc(var(--lu)*var(--y))] xl:block"
    >
      {/* The slot: a pale ochre mount around a framed square */}
      <div
        aria-hidden="true"
        className="relative size-[52px] shrink-0 border border-accent/35 bg-[var(--paper)] p-[3px] xl:size-[calc(var(--lu)*108)] xl:p-[calc(var(--lu)*4)]"
      >
        <div className="flex size-full items-center justify-center border-[1.5px] border-foreground/55 bg-[var(--print)] transition-colors duration-500 group-hover:border-accent">
          <Icon className="size-[22px] text-foreground xl:size-[calc(var(--lu)*34)]" />
        </div>
      </div>

      <div
        className={`min-w-0 xl:absolute xl:top-1/2 xl:w-[calc(var(--lu)*290)] xl:-translate-y-1/2 ${
          left ? "xl:right-[calc(100%+var(--lu)*21)] xl:text-right" : "xl:left-[calc(100%+var(--lu)*20)]"
        }`}
      >
        <h4 className="font-sc text-[15.5px] font-semibold leading-[1.1] tracking-normal text-foreground xl:text-[calc(var(--lu)*24)] xl:leading-none">
          {item.name}
        </h4>
        <p className="font-serif-italic mt-1 text-[15px] leading-[1.2] text-accent-strong xl:mt-[calc(var(--lu)*6)] xl:text-[max(16px,calc(var(--lu)*18))]">
          {item.terms}
        </p>
        {/* Phones leave the line out, as in the mock-up, but screen readers still get it */}
        <p className="sr-only text-[14px] leading-[1.5] text-foreground/80 md:not-sr-only md:mt-1.5 md:block xl:mt-[calc(var(--lu)*5)] xl:text-[max(13px,calc(var(--lu)*13.3))] xl:leading-[1.48]">
          {item.summary}
        </p>
      </div>
    </motion.li>
  );
}

// "Your website — LIVE": the dark disc in its rings. --d is the outer ring's
// diameter; everything inside is drawn relative to it.
function Emblem() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-10 size-[var(--d)] [--d:164px] md:mt-14 xl:absolute xl:left-[calc(var(--lu)*592)] xl:top-[calc(var(--lu)*457)] xl:mt-0 xl:[--d:calc(var(--lu)*256)]"
    >
      <span className="absolute inset-0 rounded-full border border-accent/35" />
      <span className="absolute inset-[3.9%] rounded-full border-[1.25px] border-accent bg-[var(--paper)]" />
      <span className="absolute inset-[7.03%] flex flex-col items-center rounded-full bg-foreground pt-[calc(var(--d)*0.2266)] text-[var(--print)]">
        <BrowserIcon className="w-[calc(var(--d)*0.227)] text-accent" />
        <span className="font-sc mt-[calc(var(--d)*0.055)] text-[max(12px,calc(var(--d)*0.086))] font-semibold leading-none tracking-normal">
          Your website
        </span>
        <span className="mt-[calc(var(--d)*0.055)] text-[max(8px,calc(var(--d)*0.04))] font-medium leading-none tracking-[0.3em] text-accent">
          LIVE
        </span>
      </span>
    </motion.div>
  );
}

// Dotted routes from each slot's centre towards the emblem. They run under
// the slots' frames and stop just short of the outer ring.
function Routes({ active }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1440 920"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="pointer-events-none absolute inset-0 hidden h-full w-full text-accent xl:block"
    >
      {Object.entries(SLOTS).map(([name, { x, y }]) => {
        const sx = x + FRAME / 2;
        const sy = y + FRAME / 2;
        const dx = CENTRE.x - sx;
        const dy = CENTRE.y - sy;
        const k = 1 - 136 / Math.hypot(dx, dy);
        const lit = active === name;
        return (
          <path
            key={name}
            d={`M${sx} ${sy}L${(sx + dx * k).toFixed(1)} ${(sy + dy * k).toFixed(1)}`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="0.1 6"
            className={`transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-60"}`}
          />
        );
      })}
    </motion.svg>
  );
}

// Line icons, drawn on a 24px grid like the site's other line icons. The
// server's lights and the tallest bar are picked out in ochre.
const LUCIDE = { strokeWidth: 1.3 };

function ServerIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <rect x="1.5" y="1.75" width="21" height="6.3" />
      <rect x="1.5" y="8.85" width="21" height="6.3" />
      <rect x="1.5" y="15.95" width="21" height="6.3" />
      <g fill="hsl(var(--accent))" stroke="none">
        <circle cx="4.6" cy="4.9" r="0.8" />
        <circle cx="4.6" cy="12" r="0.8" />
        <circle cx="4.6" cy="19.1" r="0.8" />
      </g>
    </svg>
  );
}

function GlobeIcon({ className }) {
  return <Globe {...LUCIDE} className={className} />;
}

function FeatherIcon({ className }) {
  return <Feather {...LUCIDE} className={className} />;
}

function ChartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className}>
      <path d="M1 22.35h22" strokeLinecap="round" />
      <rect x="3.5" y="13.5" width="4.5" height="8.85" />
      <rect x="10" y="8.5" width="4.5" height="13.85" />
      <rect x="16.25" y="2" width="5" height="20.35" fill="hsl(var(--accent))" stroke="none" />
    </svg>
  );
}

// The live website, in ochre: a browser window with lines of text and a picture
function BrowserIcon({ className }) {
  return (
    <svg viewBox="0 0 58 44" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="0.75" y="0.75" width="56.5" height="42.5" />
      <path d="M0.75 9h56.5M8 21h22M8 27h16M8 33h10" />
      <rect x="38" y="17" width="10" height="17" />
      <circle cx="5" cy="5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The faint contour lines, in mock-up pixels: a hill rising behind the
// emblem and lines sweeping round the left and along the foot.
const CONTOURS = [
  loop(712, 448, 64, 72, [0.04, -0.06, 0.02, 0.08, -0.04, 0.06, 0.02, -0.08]),
  loop(706, 472, 150, 172, [0.03, -0.04, 0.06, 0.02, -0.05, 0.04, 0.07, -0.03]),
  loop(690, 520, 330, 290, [0.02, -0.03, 0.05, 0.04, -0.02, 0.03, 0.06, -0.04]),
  line([[-20, 860], [60, 650], [170, 440], [300, 325], [450, 268], [620, 250]]),
  line([[60, 1070], [70, 900], [40, 740], [80, 560], [180, 400]]),
  line([[120, 1070], [320, 1005], [560, 985], [820, 1000], [1000, 1060]]),
  line([[260, 960], [520, 935], [780, 945], [1040, 920], [1460, 860]]),
];

function Contours() {
  return (
    <svg
      viewBox="0 0 1440 1050"
      preserveAspectRatio="xMidYMin slice"
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
