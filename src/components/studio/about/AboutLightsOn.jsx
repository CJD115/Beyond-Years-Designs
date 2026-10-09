import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { TEAM } from "@/data/team";
import { SITE } from "@/data/site";
import SocialLinks from "@/components/studio/SocialLinks";

// About, "Lights On" (Thresholds direction, p.9 of
// Beyond-Years-Redesign-04-Thresholds-v2.pdf). A dark room with two
// portraits: choosing one turns a light on over them, brings their portrait
// up to full colour and shows their story on the right (below, on phones).
//
// Desktop (900px and up) is the 1440px mock-up scaled to the window: --lu is
// one mock-up pixel, so calc(var(--lu)*52) is "52px at 1440 wide". Smaller
// screens use the 390px phone mock-up as drawn.
//
// One grid holds everything so the light (a cone from the top of the section
// down to the full-width rule) can share rows with the portraits:
//   phone:   heading / portraits / rule / names / prompt / story
//   desktop: heading / portraits + story / names / rule / prompt

const PORTRAIT_SIZES = "(min-width: 900px) min(24vw, 425px), 45vw";

// Light-on and light-off looks for the pieces that change
const LIT = {
  portrait: "grayscale-0 brightness-100",
  name: "text-[#f1ebe3]",
  dot: "bg-accent",
  cone: "opacity-100",
};
const UNLIT = {
  portrait: "grayscale brightness-20 group-hover/portrait:brightness-30",
  name: "text-[#f1ebe3]/55 group-hover/name:text-[#f1ebe3]/80",
  dot: "bg-transparent",
  cone: "opacity-0",
};

// The beam: a warm linen, brightest down the centre and softening towards the
// floor; and the pool it leaves on the rule
const BEAM =
  "radial-gradient(ellipse 30% 100% at 50% 0, rgb(250 238 222 / 0.07), transparent 100%), linear-gradient(to bottom, rgb(246 236 222 / 0.13), rgb(246 236 222 / 0.08))";
const POOL = "radial-gradient(ellipse 50% 50% at 50% 50%, rgb(250 238 222 / 0.16), transparent 100%)";

export default function AboutLightsOn() {
  const [activeIndex, setActiveIndex] = useState(0);
  const person = TEAM[activeIndex];
  const socials = SITE.founders.find((f) => f.name === person.name)?.socials;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#13110d] text-[#f1ebe3] [--accent:30_43%_52%] lg:[--lu:min(calc(100vw/1440),1.25px)]"
    >
      <div className="isolate mx-auto grid w-full grid-cols-2 gap-x-4 px-6 md:px-10 lg:max-w-[calc(var(--lu)*1440)] lg:grid-cols-[calc(var(--lu)*340)_calc(var(--lu)*340)_minmax(0,1fr)] lg:gap-x-[calc(var(--lu)*36)] lg:px-[calc(var(--lu)*64)]">
        {/* The light: one cone per person, from the top of the section down
            to the rule, with a pool where it lands. Only the chosen person's
            is on. It fades in from the top so it doesn't start at a hard line
            under Process, and is brightest down its centre, like a beam. */}
        {TEAM.map((m, i) => {
          const look = i === activeIndex ? LIT : UNLIT;
          return (
            <div
              key={`light-${m.name}`}
              aria-hidden="true"
              style={{ background: BEAM }}
              className={`pointer-events-none -z-10 row-start-1 row-end-3 mx-[-10.5px] transition-opacity duration-900 ease-out [clip-path:polygon(44.5%_0,55.5%_0,100%_100%,0_100%)] [mask-image:linear-gradient(to_bottom,transparent,#000_120px)] lg:row-end-4 lg:[mask-image:linear-gradient(to_bottom,transparent,#000_calc(var(--lu)*160))] lg:mx-[calc(-46*var(--lu))] ${i === 0 ? "col-start-1" : "col-start-2"} ${look.cone}`}
            />
          );
        })}

        <div className="col-span-full row-start-1 pt-10 lg:pt-[calc(var(--lu)*52)]">
          <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:text-[max(10.5px,calc(var(--lu)*11))] lg:font-normal">
            About
          </p>
          <h2 className="font-display mt-[7px] mb-[22px] text-[40px] font-light leading-none tracking-normal lg:mt-[calc(var(--lu)*10)] lg:mb-[calc(var(--lu)*72)] lg:text-[calc(var(--lu)*52)]">
            Small team,
            <br className="lg:hidden" />{" "}
            <span className="font-serif-italic text-accent">serious standards.</span>
          </h2>
        </div>

        {/* Portraits. A mouse shortcut to the name buttons below, so they're
            kept out of the tab order and hidden from screen readers. */}
        {TEAM.map((m, i) => {
          const look = i === activeIndex ? LIT : UNLIT;
          return (
            <button
              key={`portrait-${m.name}`}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setActiveIndex(i)}
              className={`group/portrait relative row-start-2 mb-[14px] block aspect-163/222 w-full overflow-hidden bg-[#0c0908] lg:mb-0 lg:aspect-340/480 ${i === 0 ? "col-start-1" : "col-start-2"}`}
            >
              <img
                src={m.image}
                srcSet={m.imageSrcSet}
                sizes={PORTRAIT_SIZES}
                width={m.imageSize[0]}
                height={m.imageSize[1]}
                alt=""
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover transition-[filter] duration-900 ease-out ${look.portrait}`}
              />
            </button>
          );
        })}

        {/* The full-width rule where the light lands */}
        <div aria-hidden="true" className="relative col-span-full row-start-3 h-px lg:row-start-4">
          <div className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-[#f1ebe3]/10" />
        </div>

        {/* The pool of light on the floor under the chosen person */}
        {TEAM.map((m, i) => (
          <div
            key={`pool-${m.name}`}
            aria-hidden="true"
            className={`pointer-events-none relative -z-10 row-start-3 h-px lg:row-start-4 ${i === 0 ? "col-start-1" : "col-start-2"} ${i === activeIndex ? LIT.cone : UNLIT.cone} transition-opacity duration-900 ease-out`}
          >
            <div
              style={{ background: POOL }}
              className="absolute left-1/2 top-0 h-[44px] w-[150%] -translate-x-1/2 -translate-y-1/2 lg:h-[calc(var(--lu)*80)]"
            />
          </div>
        ))}

        {/* Names: the real controls */}
        {TEAM.map((m, i) => {
          const isActive = i === activeIndex;
          const look = isActive ? LIT : UNLIT;
          return (
            <button
              key={`name-${m.name}`}
              type="button"
              aria-pressed={isActive}
              aria-controls="about-story"
              onClick={() => setActiveIndex(i)}
              className={`group/name row-start-4 mt-2 flex items-center justify-between border-t border-[#f1ebe3]/25 pt-[14px] text-left lg:row-start-3 lg:mt-[calc(var(--lu)*24)] lg:block lg:pt-[calc(var(--lu)*11)] lg:pb-[calc(var(--lu)*31)] ${i === 0 ? "col-start-1" : "col-start-2"}`}
            >
              <span
                className={`font-display block text-[28px] leading-[1.21] tracking-normal transition-colors duration-900 ease-out lg:text-[calc(var(--lu)*32)] ${look.name}`}
              >
                {m.name}
              </span>
              <span className="hidden text-[max(10px,calc(var(--lu)*11))] uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/60 lg:block">
                {m.role}
              </span>
              <span
                aria-hidden="true"
                className={`h-[11px] w-[11px] shrink-0 rounded-full border border-accent transition-colors duration-900 lg:hidden ${look.dot}`}
              />
            </button>
          );
        })}

        <p className="font-serif-italic col-span-full row-start-5 mt-5 text-[18px] leading-[1.21] tracking-normal text-[#f1ebe3]/55 lg:mt-[calc(var(--lu)*27.5)] lg:pb-[calc(var(--lu)*48)] lg:text-[max(16px,calc(var(--lu)*20))]">
          Choose one to turn the light on.
        </p>

        {/* The chosen person's story */}
        <div
          id="about-story"
          className="col-span-full row-start-6 mt-8 self-start pb-[46px] lg:col-[3/4] lg:row-[2/4] lg:mt-0 lg:pb-0 lg:pl-[calc(var(--lu)*54)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-accent lg:text-[max(10px,calc(var(--lu)*10.5))] lg:font-normal">
                {person.role}
              </p>
              <h3 className="font-display mt-[3.5px] text-[44px] font-light leading-[1.21] tracking-normal lg:mt-[calc(var(--lu)*3.3)] lg:text-[calc(var(--lu)*64)]">
                {person.name}
              </h3>
              <div className="font-display mt-[9px] space-y-[14px] text-[19px] leading-[27px] tracking-normal text-[#f1ebe3]/87 md:max-w-xl lg:mt-[calc(var(--lu)*11)] lg:max-w-none lg:space-y-[calc(var(--lu)*19)] lg:text-[max(17px,calc(var(--lu)*21))] lg:leading-[1.43] lg:font-light">
                {/* The phone mock-up keeps the story to two paragraphs */}
                {person.shortBio.map((paragraph, i) => (
                  <p key={paragraph} className={i > 1 ? "hidden lg:block" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* Start a project, with their own socials alongside */}
              <div className="mt-[31px] flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-[calc(var(--lu)*40.7)] lg:gap-x-[calc(var(--lu)*32)]">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-[0.3em] border-b border-[#f1ebe3]/50 pb-[13px] text-[15px] font-medium leading-[1.21] transition-colors duration-500 hover:border-[#f1ebe3] lg:pb-[calc(var(--lu)*13.5)] lg:text-[max(14px,calc(var(--lu)*14.5))]"
                >
                  Start a project
                  <ArrowRight aria-hidden="true" className="h-[0.95em] w-[0.95em]" strokeWidth={1.75} />
                </a>
                <SocialLinks
                  socials={socials}
                  owner={person.name}
                  className="-mx-3 -mt-[13px] lg:-mt-[calc(var(--lu)*13.5)]"
                  linkClassName="text-[#f1ebe3]/70 hover:text-accent"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
