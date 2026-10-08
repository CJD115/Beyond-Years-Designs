import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Hero, "The Doorway" (Thresholds, p.2). Dark, cinematic and quiet: the
// headline on the left, and on the right a single lit doorway showing a real
// room from a real client, the Groves salon, its light spilling across the
// floor. The room drifts slowly inside the frame and the "Step inside" line
// pulses downwards. As you scroll on, the door grows towards you while the
// words fade, the start of stepping through it (not pinned: the page scrolls
// as normal).
//
// Desktop (1024px and up) is the 1440 × 900 mock-up scaled to fit the window
// (--lu is one mock-up pixel), anchored to the foot of the screen so the light
// always reaches the bottom. Smaller screens follow the 390px phone mock-up,
// with the door above the headline.

const SALON = "/work/groves-saln.webp";
const SALON_SRCSET = "/work/groves-salon-400.webp 400w, /work/groves-salon.webp 480w";

export default function HeroDoorway() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const doorScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.9]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduceMotion ? 1 : 0]);
  // Once you start scrolling, the foot of the room falls into shadow, so the
  // light and the growing door fade out rather than stopping at a hard edge
  // where Selected Work begins. Hidden at rest, so the hero looks the same.
  const seamOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Fills the screen on landscape desktops only: on a portrait tablet wide
  // enough for the desktop stage, filling the height just left a gap above it
  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden lg:flex lg:items-end lg:landscape:min-h-svh lg:justify-center lg:[--lu:clamp(0.62px,min(calc(100vw/1440),calc(100svh/900)),1.25px)]"
    >
      <Desktop doorScale={doorScale} copyOpacity={copyOpacity} />
      <Phone />
      <motion.div
        aria-hidden="true"
        style={{ opacity: seamOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[calc(var(--lu)*200)] bg-gradient-to-b from-[#13110d]/0 to-[#13110d] lg:block"
      />
    </section>
  );
}

function Heading({ eyebrow, className = "", style }) {
  return (
    <h1 className={className} style={style}>
      <span className="block text-[12px] font-medium uppercase leading-[1.21] tracking-[0.24em] text-[#f1ebe3]/75 lg:text-[max(10.5px,calc(var(--lu)*11.5))] lg:font-normal">
        {eyebrow}
      </span>{" "}
      <span className="font-display mt-[16px] block text-[min(64px,17vw)] font-light leading-[0.92] tracking-[-0.02em] md:text-[84px] lg:mt-[calc(var(--lu)*26)] lg:text-[calc(var(--lu)*132)] lg:leading-[0.86]">
        Websites
        <br /> worth
        <br /> <em className="font-serif-italic font-light text-accent">remembering.</em>
      </span>
    </h1>
  );
}

function Ctas({ className = "", style }) {
  const link =
    "inline-flex min-h-11 items-center border-b border-[#f1ebe3]/50 text-[15px] font-medium leading-[1.21] transition-colors duration-300 hover:border-accent hover:text-accent lg:text-[max(14px,calc(var(--lu)*15))]";
  return (
    <div className={`flex gap-[36px] ${className}`} style={style}>
      <a href="#work" className={link}>
        View work
      </a>
      <a href="#contact" className={link}>
        Get started
      </a>
    </div>
  );
}

// The doorway: an ochre frame open at the floor, the salon inside it
function Door({ className = "", style }) {
  return (
    <motion.div
      aria-hidden="true"
      style={style}
      className={`border border-b-0 border-accent/80 shadow-[0_0_60px_rgba(185,133,80,0.12)] ${className}`}
    >
      <div className="absolute inset-x-[4.4%] top-[2.1%] bottom-0 overflow-hidden bg-[#2b2a28]">
        <img
          src={SALON}
          srcSet={SALON_SRCSET}
          sizes="(min-width: 1024px) 300px, 200px"
          alt=""
          decoding="async"
          className="th-drift h-full w-full object-cover"
        />
        {/* the room is lit; its edges fall into shadow */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.45)]" />
      </div>
    </motion.div>
  );
}

function StepInside({ className = "", style }) {
  return (
    <div aria-hidden="true" className={`flex flex-col items-center ${className}`} style={style}>
      <span className="text-[11px] uppercase leading-none tracking-[0.3em] text-[#f1ebe3]/70 lg:text-[max(10px,calc(var(--lu)*11))]">
        Step inside
      </span>
      <span className="relative mt-[14px] block h-[32px] w-px overflow-hidden bg-accent/25 lg:mt-[calc(var(--lu)*14)] lg:h-[calc(var(--lu)*72)]">
        <span className="th-pulse absolute inset-0 bg-accent" />
      </span>
    </div>
  );
}

// ------------------------------------------------------------------ desktop

const u = (n) => `calc(var(--lu) * ${n})`;

function Desktop({ doorScale, copyOpacity }) {
  return (
    <div className="relative hidden h-[calc(var(--lu)*900)] w-[calc(var(--lu)*1440)] shrink-0 lg:block">
      {/* The floor, and the light spilling across it from the door */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 h-px w-screen -translate-x-1/2 bg-[#f1ebe3]/10"
        style={{ top: u(761) }}
      />
      <svg aria-hidden="true" viewBox="0 0 1440 900" className="absolute inset-0 h-full w-full overflow-visible">
        <polygon points="846,761 1164,761 1340,900 662,900" fill="rgba(241,235,227,0.045)" />
        <polygon points="846,761 1164,761 1235,900 762,900" fill="rgba(241,235,227,0.045)" />
      </svg>

      <motion.div style={{ opacity: copyOpacity }}>
        <Heading
          eyebrow="Bristol Web Design & Development Studio"
          className="absolute"
          style={{ left: u(64), top: u(226) }}
        />
        {/* (the mock-up runs this paragraph across the floor line; it sits
            above it here) */}
        <p
          className="absolute text-[max(15px,calc(var(--lu)*17.5))] leading-[1.6] text-[#f1ebe3]/80"
          style={{ left: u(64), top: u(660), width: u(470) }}
        >
          Building a website shouldn’t get in the way of your business. We make places people step into, not pages they
          scroll past.
        </p>
        <Ctas className="absolute" style={{ left: u(64), top: u(788) }} />
      </motion.div>

      <p
        aria-hidden="true"
        className="absolute -translate-x-1/2 whitespace-nowrap text-[max(10px,calc(var(--lu)*11))] uppercase leading-none tracking-[0.26em] text-[#f1ebe3]/70"
        style={{ left: u(1005), top: u(104) }}
      >
        Room 01 — Groves Hairstyling
      </p>
      <Door
        className="absolute origin-[50%_60%]"
        style={{ left: u(846), top: u(137), width: u(318), height: u(624), scale: doorScale }}
      />
      <StepInside className="absolute -translate-x-1/2" style={{ left: u(1005), top: u(785) }} />
      <p
        aria-hidden="true"
        className="font-serif-italic absolute text-[calc(var(--lu)*21)] leading-none tracking-normal text-[#f1ebe3]/55"
        style={{ right: u(64), top: u(838) }}
      >
        01 of 03 rooms
      </p>
    </div>
  );
}

// ------------------------------------------------------------------ phone

const SPILL_OUTER =
  "polygon(calc(50% - var(--dw)) 0, calc(50% + var(--dw)) 0, calc(50% + var(--dw) * 3) 100%, calc(50% - var(--dw) * 2.2) 100%)";
const SPILL_INNER =
  "polygon(calc(50% - var(--dw)) 0, calc(50% + var(--dw)) 0, calc(50% + var(--dw) * 1.7) 100%, calc(50% - var(--dw) * 1.4) 100%)";

function Phone() {
  return (
    <div className="relative px-6 pt-[78px] pb-12 md:px-10 md:pt-[96px] lg:hidden">
      <p
        aria-hidden="true"
        className="text-center text-[11px] uppercase leading-none tracking-[0.26em] text-[#f1ebe3]/70"
      >
        Room 01 — Groves Hairstyling
      </p>
      <Door className="relative mx-auto mt-[17px] h-[298px] w-[175px] md:h-[400px] md:w-[235px]" />

      {/* The floor; everything below it sits in the door's light, which
          spreads from the door's width (--dw is half of it) */}
      <div className="relative [--dw:87.5px] md:[--dw:117.5px]">
        <div aria-hidden="true" className="-mx-6 h-px bg-[#f1ebe3]/10 md:-mx-10" />
        {/* the light thins out before the section ends, so it doesn't stop
            in a hard line against Selected Work */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-6 top-0 -bottom-12 bg-[#f1ebe3]/[0.045] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] md:-inset-x-10"
          style={{ clipPath: SPILL_OUTER }}
        />
        <div
          aria-hidden="true"
          className="absolute -inset-x-6 top-0 -bottom-12 bg-[#f1ebe3]/[0.045] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] md:-inset-x-10"
          style={{ clipPath: SPILL_INNER }}
        />

        <div className="relative">
          <StepInside className="pt-[22px]" />
          <Heading eyebrow="Bristol Web Design Studio" className="mt-[24px]" />
          <p className="mt-[20px] max-w-[30rem] text-[16px] leading-[1.6] text-[#f1ebe3]/80">
            We make places people step into, not pages they scroll past.
          </p>
          <Ctas className="mt-[22px]" />
        </div>
      </div>
    </div>
  );
}
