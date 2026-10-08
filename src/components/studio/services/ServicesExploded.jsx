import { useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SERVICE_LAYERS } from "@/data/services";
import ExplodedStack from "./ExplodedStack";

// Services, "Exploded View" (02 Under the Surface, p.5 of
// Beyond-Years-Redesign-02-Under-the-Surface-v2.pdf). The four services are
// the four layers of one website: performance code at the bottom, then words,
// design, and the finished site on top. Choosing a service lifts its layer
// and explains it. On scroll the stack comes apart, then settles back into a
// single site as you leave the section.
//
// Desktop (900px and up) is the 1440px mock-up scaled to the window: --lu is
// one mock-up pixel. Smaller screens follow the 390px phone mock-up, where the
// layer labels are the controls and the explanation is one sentence.

// True at the desktop layout (900px and up); false while prerendering
const DESKTOP = "(min-width: 900px)";
const subscribeDesktop = (onChange) => {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP).matches, () => false);
}

export default function ServicesExploded() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICE_LAYERS[activeIndex];
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const nearView = useInView(sectionRef, { once: true, margin: "800px 0px" });
  const isDesktop = useIsDesktop();

  // Apart by the time the section is well in view, together again on the way out
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scrollSpread = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const stillSpread = useMotionValue(1);
  const spread = reduceMotion ? stillSpread : scrollSpread;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-secondary/40 lg:[--lu:min(calc(100vw/1440),1.25px)]"
    >
      {/* The paper behind the drawing, fading in and out at the edges so it
          meets Our Vision above and Why Us below like the original did */}
      <div aria-hidden="true" className="vision-paper pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full px-6 pt-[48px] pb-[35px] md:px-10 lg:h-[calc(var(--lu)*1100)] lg:max-w-[calc(var(--lu)*1440)] lg:px-[calc(var(--lu)*64)] lg:pt-[calc(var(--lu)*70)] lg:pb-0">
        <ExplodedStack
          size="desktop"
          activeIndex={activeIndex}
          spread={spread}
          onSelect={setActiveIndex}
          showImage={nearView && isDesktop}
          className="absolute inset-0 hidden h-full w-full lg:block"
        />

        <div className="relative lg:w-[calc(var(--lu)*460)]">
          <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-foreground/75 lg:text-[max(10.5px,calc(var(--lu)*11))] lg:font-normal">
            /services — 4 layers, 1 website
          </p>
          <h2 className="font-display mt-[14px] text-[44px] lg:mt-[calc(var(--lu)*14.3)] lg:text-[calc(var(--lu)*64)]">
            Everything your
            <br className="hidden lg:inline" /> business needs{" "}
            <span className="font-serif-italic text-accent">
              in
              <br className="hidden lg:inline" /> one focussed website.
            </span>
          </h2>

          {/* Phones: the stack, with its labels as the controls */}
          <div className="relative -mx-6 mt-[28px] max-w-[520px] md:-mx-10 lg:hidden">
            <ExplodedStack
              size="phone"
              activeIndex={activeIndex}
              spread={spread}
              onSelect={setActiveIndex}
              showImage={nearView && !isDesktop}
              className="block aspect-[390/455] w-full"
            />
            <ul className="absolute inset-0">
              {SERVICE_LAYERS.map((service, i) => (
                <li
                  key={service.no}
                  className="absolute left-6 -translate-y-1/2 md:left-10"
                  style={{ top: `${((288.9 + 7.9 + i * 92 - 240) / 455) * 100}%` }}
                >
                  <button
                    type="button"
                    aria-pressed={i === activeIndex}
                    aria-controls="services-layer"
                    onClick={() => setActiveIndex(i)}
                    className="inline-flex min-h-11 items-center gap-[10px] font-mono text-[12px] leading-[1.32]"
                  >
                    <span aria-hidden="true" className={i === activeIndex ? "text-accent-strong" : "text-muted-foreground"}>{service.no}</span>
                    <span aria-hidden="true" className={i === activeIndex ? "text-foreground" : "text-muted-foreground"}>{service.layer}</span>
                    <span className="sr-only">{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: the list of services */}
          <ul className="mt-[calc(var(--lu)*124)] hidden border-t border-foreground/16 lg:block">
            {SERVICE_LAYERS.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={service.no} className="border-b border-foreground/16">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="services-layer"
                    onClick={() => setActiveIndex(i)}
                    className="group flex h-[calc(var(--lu)*57)] min-h-11 w-full items-center text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`w-[calc(var(--lu)*48)] shrink-0 font-mono text-[max(11px,calc(var(--lu)*12))] leading-[1.32] tracking-normal transition-colors duration-500 ${isActive ? "text-accent-strong" : "text-muted-foreground"}`}
                    >
                      {service.no}
                    </span>
                    <span
                      className={`font-display text-[calc(var(--lu)*28)] leading-[1.21] tracking-normal transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/58 group-hover:text-foreground/80"}`}
                    >
                      {service.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The chosen layer, explained */}
          <div id="services-layer" className="mt-[16px] lg:mt-[calc(var(--lu)*47.8)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.no}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-[12px] leading-[1.32] tracking-normal text-muted-foreground lg:text-[max(10.5px,calc(var(--lu)*11))]">
                  layer {active.no} — {active.by}
                </p>
                <h3 className="font-display mt-[5px] text-[36px] leading-[1.21] tracking-normal lg:mt-[calc(var(--lu)*5.9)] lg:text-[calc(var(--lu)*42)]">
                  {active.title}
                </h3>
                <p className="mt-[6px] text-[15px] leading-[24px] text-muted-foreground lg:mt-[calc(var(--lu)*10.1)] lg:text-[max(14px,calc(var(--lu)*15))] lg:leading-[1.667]">
                  <span className="lg:hidden">{active.sentence}</span>
                  <span className="hidden lg:inline">{active.body}</span>
                </p>
                <a
                  href="#contact"
                  className="mt-[22px] inline-flex items-center gap-[0.3em] border-b border-foreground pb-[12px] text-[15px] font-medium leading-[1.21] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent-strong lg:mt-[calc(var(--lu)*31.9)] lg:pb-[calc(var(--lu)*12.5)] lg:text-[max(14px,calc(var(--lu)*14.5))]"
                >
                  Talk to us about this
                  <ArrowRight aria-hidden="true" className="h-[0.95em] w-[0.95em]" strokeWidth={1.75} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
