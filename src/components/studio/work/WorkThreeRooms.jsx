import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { caseStudyPath } from "@/data/site";

// Selected Work, "Three Rooms" (Thresholds direction, p.3 of
// Beyond-Years-Redesign-04-Thresholds-v2.pdf). Each project is a room with
// three layers of depth: the real place blurred behind, the website floating
// in its frame, and the name in front. Switching rooms moves the layers at
// different speeds, so it feels like walking rather than changing slides.
// The list, the arrows, the arrow keys and (on phones) a swipe all move
// between rooms.
//
// The section always fills the screen. Desktop (1024px and up) is the
// 1440 x 1000 mock-up scaled to fit the window, by width or height, whichever
// is tighter: --lu is one mock-up pixel. The room sits centred, and the
// blurred place behind fills the rest. Smaller screens follow the 390px
// phone mock-up.

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];
const SCREEN_SIZES = "(min-width: 1024px) min(47vw, 850px), 85vw";
const EASE = [0.22, 1, 0.36, 1];

// How far (as a share of the layer's own width) and how slowly each layer
// travels when you walk to the next room: the place drifts, the frame moves,
// the name moves most
const LAYERS = {
  place: { distance: 4, duration: 1.4 },
  frame: { distance: 20, duration: 1 },
  name: { distance: 15, duration: 0.85 },
};

const walk = (layer) => ({
  enter: (dir) => ({ opacity: 0, x: `${dir * LAYERS[layer].distance}%` }),
  centre: { opacity: 1, x: "0%", transition: { duration: LAYERS[layer].duration, ease: EASE } },
  exit: (dir) => ({
    opacity: 0,
    x: `${-dir * LAYERS[layer].distance}%`,
    transition: { duration: LAYERS[layer].duration * 0.6, ease: EASE },
  }),
});

const city = (location) => location.split(",")[0];
const metaFor = (project) => `${project.industry} · ${city(project.location)} · ${project.year}`;

export default function WorkThreeRooms() {
  const [[index, dir], setRoom] = useState([0, 1]);
  const project = PROJECTS[index];
  const count = PROJECTS.length;
  const touchX = useRef(null);

  const goTo = (next) => {
    const target = (next + count) % count;
    if (target === index) return;
    setRoom([target, target > index ? 1 : -1]);
  };
  const step = (by) => {
    setRoom([(index + by + count) % count, by]);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  // Phones: swipe sideways between rooms
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const href = caseStudyPath(project.slug);
  const label = `Room ${NUMERALS[index]} of ${NUMERALS[count - 1]}`;

  // Fills the screen on landscape desktops only, as the hero does: a portrait
  // tablet gets the stage at its own height, with no gap round it
  return (
    <section
      id="work"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative isolate overflow-hidden bg-[#13110d] text-[#f1ebe3] [--accent:30_43%_52%] lg:flex lg:items-center lg:landscape:min-h-svh lg:[--lu:clamp(0.62px,min(calc(100vw/1440),calc(100svh/1000)),1.25px)]"
    >
      {/* The place itself, blurred behind */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={project.slug}
            src={project.room.place}
            alt=""
            decoding="async"
            custom={dir}
            variants={walk("place")}
            initial="enter"
            animate="centre"
            exit="exit"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-[14px] brightness-[0.4] lg:blur-[calc(var(--lu)*16)]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#13110d]/45" />
        {/* The room rises out of the hero's dark instead of starting at a
            hard edge: the top begins in the hero's own near-black */}
        <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-[#13110d] via-[#13110d]/60 to-[#13110d]/0 lg:h-[calc(var(--lu)*300)]" />
      </div>

      {/* Plain <a> links (not React Router's <Link>) on purpose: a full page
          load lets the browser return visitors to this spot when they press
          Back, as the previous design did */}
      <div className="relative mx-auto flex min-h-svh w-full flex-col px-6 pt-[40px] pb-[24.6px] md:min-h-0 md:px-10 md:pt-16 md:pb-14 lg:block lg:h-[calc(var(--lu)*1000)] lg:min-h-0 lg:max-w-[calc(var(--lu)*1440)] lg:p-0">
        <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*52.4)] lg:text-[max(10.5px,calc(var(--lu)*11))] lg:font-normal">
          Selected work
        </p>
        <h2 className="font-serif-italic mt-[6.2px] text-[27px] leading-[1.21] tracking-normal lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*73.6)] lg:mt-0 lg:text-[calc(var(--lu)*34)]">
          Three rooms. Step into any of them.
        </h2>

        {/* Desktop: the rooms by name */}
        {/* Rows sit 62 mock-up pixels apart, centred on the mock-up's lines,
            while each button keeps a 44px touch height */}
        <ul className="absolute left-[calc(var(--lu)*64)] top-[calc(var(--lu)*218-max(22px,var(--lu)*17))] hidden lg:block">
          {PROJECTS.map((p, i) => {
            const isActive = i === index;
            return (
              <li key={p.slug} className="mb-[calc(var(--lu)*62-max(44px,var(--lu)*34))]">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="work-room"
                  onClick={() => goTo(i)}
                  className={`group flex h-[max(44px,calc(var(--lu)*34))] items-center text-left transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-45 hover:opacity-75"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-px bg-accent transition-[width] duration-700 ease-out ${isActive ? "w-[calc(var(--lu)*40)]" : "w-0"}`}
                  />
                  <span
                    aria-hidden="true"
                    className="font-serif-italic ml-[calc(var(--lu)*16)] w-[calc(var(--lu)*46)] text-[calc(var(--lu)*20)] leading-[1.21] tracking-normal text-accent"
                  >
                    {NUMERALS[i]}
                  </span>
                  <span className="font-display text-[calc(var(--lu)*28)] leading-[1.21] tracking-normal">{p.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* The room */}
        <div id="work-room" className="contents">
          <p aria-live="polite" className="sr-only">
            {label}: {project.name}
          </p>

          {/* The website, floating in its frame. The frame is shaped to the
              screenshots (2400 × 1328), so Churcham shows whole and the taller
              ones lose only a thin strip top and bottom. */}
          <div className="relative order-none mt-[58px] ml-[16px] aspect-[2400/1328] lg:absolute lg:left-[calc(var(--lu)*640)] lg:top-[calc(var(--lu)*120)] lg:m-0 lg:aspect-auto lg:h-[calc(var(--lu)*382)] lg:w-[calc(var(--lu)*680)]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.a
                key={project.slug}
                href={href}
                tabIndex={-1}
                aria-hidden="true"
                custom={dir}
                variants={walk("frame")}
                initial="enter"
                animate="centre"
                exit="exit"
                className="absolute inset-0 block bg-[#faf9f5] p-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.3),0_24px_40px_rgba(0,0,0,0.55)] lg:p-[calc(var(--lu)*6)] lg:shadow-[0_calc(var(--lu)*2)_calc(var(--lu)*4)_rgba(0,0,0,0.3),0_calc(var(--lu)*50)_calc(var(--lu)*80)_rgba(0,0,0,0.6)]"
              >
                <img
                  src={project.room.screen}
                  srcSet={project.room.screenSrcSet}
                  sizes={SCREEN_SIZES}
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.a>
            </AnimatePresence>
          </div>

          {/* The name in front, and what it is */}
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={project.slug}
              custom={dir}
              variants={walk("name")}
              initial="enter"
              animate="centre"
              exit="exit"
              className="pointer-events-none lg:absolute lg:inset-0"
            >
              <h3 className="font-display mt-[24.7px] text-[50px] font-light leading-[1.21] [text-shadow:0_2px_2px_rgba(0,0,0,0.35),0_0_36px_rgba(0,0,0,0.45)] lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*462.6)] lg:mt-0 lg:whitespace-nowrap lg:text-[calc(var(--lu)*140)] lg:tracking-[-0.025em] lg:[text-shadow:0_calc(var(--lu)*2)_calc(var(--lu)*2)_rgba(0,0,0,0.35),0_0_calc(var(--lu)*36)_rgba(0,0,0,0.45)]">
                {project.name}
              </h3>
              <p className="font-serif-italic mt-[9.2px] max-w-xl text-[20px] leading-[27px] tracking-normal text-[#f1ebe3]/90 lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*680.9)] lg:mt-0 lg:w-[calc(var(--lu)*600)] lg:max-w-none lg:text-[calc(var(--lu)*27)] lg:leading-[calc(var(--lu)*35)] lg:text-[#f1ebe3]/87">
                {project.room.line}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-[16px] lg:absolute lg:left-[calc(var(--lu)*64)] lg:top-[calc(var(--lu)*873.4)] lg:mt-0 lg:flex lg:items-start lg:gap-[calc(var(--lu)*36)]">
            <p className="text-[12px] font-medium uppercase leading-[19px] tracking-[0.22em] text-[#f1ebe3]/75 lg:mt-[calc(var(--lu)*2.6)] lg:text-[max(10.5px,calc(var(--lu)*11))] lg:font-normal lg:leading-[1.21]">
              {metaFor(project)}
            </p>
            <a
              href={href}
              className="mt-[25px] inline-flex items-center gap-[0.3em] border-b border-[#f1ebe3]/50 pb-[12.3px] text-[15px] font-medium leading-[1.21] transition-colors duration-300 hover:border-accent hover:text-accent lg:mt-0 lg:pb-[calc(var(--lu)*12)] lg:text-[max(14px,calc(var(--lu)*15))]"
            >
              Step inside
              <ArrowUpRight aria-hidden="true" className="h-[0.95em] w-[0.95em]" strokeWidth={1.75} />
              <span className="sr-only">: {project.name} case study</span>
            </a>
          </div>
        </div>

        {/* Moving between rooms */}
        <div className="mt-auto flex items-center justify-between pt-10 lg:absolute lg:right-[calc(var(--lu)*64.6)] lg:top-[calc(var(--lu)*852.4)] lg:mt-0 lg:gap-[calc(var(--lu)*19)] lg:pt-0">
          <p
            aria-hidden="true"
            className="font-serif-italic mr-[calc(var(--lu)*11)] hidden text-[calc(var(--lu)*22)] leading-[1.21] tracking-normal text-[#f1ebe3]/75 lg:block"
          >
            {label}
          </p>
          <ArrowButton direction={-1} onClick={() => step(-1)} />

          {/* Phones: the rooms by numeral */}
          <ul className="flex gap-2 lg:hidden">
            {PROJECTS.map((p, i) => {
              const isActive = i === index;
              return (
                <li key={p.slug}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="work-room"
                    aria-label={p.name}
                    onClick={() => goTo(i)}
                    className={`font-serif-italic flex h-12 w-12 items-center justify-center border-b text-[21px] leading-none tracking-normal transition-colors duration-500 ${isActive ? "border-accent text-[#f1ebe3]" : "border-transparent text-[#f1ebe3]/60"}`}
                  >
                    {NUMERALS[i]}
                  </button>
                </li>
              );
            })}
          </ul>

          <ArrowButton direction={1} onClick={() => step(1)} />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction < 0 ? "Previous room" : "Next room"}
      className="flex h-[47px] w-[47px] items-center justify-center border border-[#f1ebe3]/35 transition-colors duration-300 hover:border-[#f1ebe3] lg:h-[calc(var(--lu)*53)] lg:min-h-11 lg:w-[calc(var(--lu)*53)] lg:min-w-11"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className={`w-4 lg:w-[calc(var(--lu)*16)] ${direction < 0 ? "-scale-x-100" : ""}`}
      >
        <path d="M0 6h15M10 1l5 5-5 5" />
      </svg>
    </button>
  );
}
