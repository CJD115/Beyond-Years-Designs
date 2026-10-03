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
          {/* Each line slides up out of a mask (.hero-line in index.css). It's
              a CSS animation so it plays as soon as the prerendered page
              appears, without waiting for JavaScript. */}
          <h1
            // flow-root keeps line 2's negative margin inside the heading, so the
            // gap to the paragraph below is unchanged
            className="hero-title flow-root font-display text-[15vw] leading-[0.98] tracking-[-0.03em] md:text-[11vw] lg:text-[10.5vw] text-balance"
          >
            <span className="eyebrow hero-eyebrow block leading-normal text-wrap mb-10 md:mb-12 lg:mb-16">
              Bristol Web Design & Development Studio
            </span>{" "}
            <span className="block overflow-hidden">
              <span className="hero-line block">Websites worth</span>
            </span>{" "}
            {/* Masked like line 1. The italic g hangs ~0.11em below the line box,
                so the mask is 0.15em deeper (padding) and the extra depth is
                taken back with a negative margin. */}
            <span className="block overflow-hidden mb-[-0.15em]">
              <span className="hero-line hero-line-2 font-serif-italic text-accent block pb-[0.15em]">
                remembering.
              </span>
            </span>
          </h1>

          <div className="hero-lower mt-12 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="hero-body-col md:col-span-5">
              <p className="hero-body text-lg md:text-xl leading-relaxed text-muted-foreground max-w-lg">
                Building a website shouldn’t get in the way of your business.
We get it—you’re working hard, your junk folder’s full, and the list of things to do keeps getting longer. Sometimes, all you need is something simple.
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
    </section>
  );
}
