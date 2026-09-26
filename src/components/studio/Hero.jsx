import { motion } from "motion/react";
import PrintTrail from "./PrintTrail";

export default function Hero() {
  return (
    <section id="top" className="hero-section relative min-h-svh flex flex-col justify-end overflow-hidden">
      {/* Paper texture — fades out towards the next section */}
      <div aria-hidden="true" className="hero-paper pointer-events-none absolute inset-0" />

      {/* Hero 3.10 poster. From 1024px up this frame scales as one unit to fit
          the viewport (see .hero-poster / --poster-u in index.css). */}
      <div className="hero-poster relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        {/* Pinned prints along a drawn line (desktop only; sits beneath the copy) */}
        <div className="hidden lg:block">
          <PrintTrail />
        </div>

        <div className="relative z-10">
          <div>
            <p className="eyebrow hero-eyebrow mb-10 md:mb-12 lg:mb-16">
              Web Design & Development Studio
            </p>
          </div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.15,
                },
              },
            }}
            className="hero-title font-display text-[15vw] leading-[0.98] tracking-[-0.03em] md:text-[11vw] lg:text-[10.5vw] text-balance"
          >
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block"
              >
                Websites worth
              </motion.span>
            </span>
            <span className="block overflow-visible">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="font-serif-italic text-accent block"
              >
                remembering.
              </motion.span>
            </span>
          </motion.h1>

          <div className="hero-lower mt-12 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="hero-body-col md:col-span-5">
              <p className="hero-body text-lg md:text-xl leading-relaxed text-muted-foreground max-w-lg">
                You’re a small business. We’re a small business—We get it.
                You’re busy doing what you do best. You’re working hard, your junk folder’s full, and there just
                isn’t the time or budget for a flashy, overdesigned website or app. Sometimes, all you need is
                something simple.
                That’s where we come in.
              </p>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <div className="hero-ctas flex flex-col gap-4 md:items-end">
                <a href="#work" className="hero-cta link-underline inline-flex min-h-11 items-center py-1 text-base font-medium">
                  View Work
                </a>
                <a href="#contact" className="hero-cta link-underline inline-flex min-h-11 items-center py-1 text-base font-medium">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* <div className="pointer-events-none absolute left-6 md:left-10 lg:left-16 bottom-6 hidden md:block">
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Live · {vw}px</span>
          </div>
          <div className="mt-1 text-foreground/60">Perf · 100</div>
        </div>
      </div> */}
    </section>
  );
}
