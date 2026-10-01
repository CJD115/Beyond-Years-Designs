import Reveal from "@/components/studio/Reveal";
import { AFTERCARE_GROUPS, AFTERCARE_LINK } from "@/data/aftercare";

// ARCHIVED: Aftercare, option C, "The aftercare card".
// One printed card pinned to the paper (the hero's print language), set like a
// tailor's price list: name, dotted leader, terms, and a line underneath.
// On large screens the card sits at a slight tilt; on smaller ones it lies flat.
// Reads the same items as the live section from src/data/aftercare.js (the
// `terms` field is what fills the right-hand side here).

const TITLE_ID = "aftercare-title";

const INTRO =
  "Once it’s live, it’s yours. If you’d like us to stay on, we’ll look after it and help it grow. Take as much or as little as you need.";

export default function AftercareCard() {
  return (
    <section id="aftercare" aria-labelledby={TITLE_ID} className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 border-t border-border pt-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">Optional add-ons</p>
            <h2 id={TITLE_ID} className="font-display text-5xl md:text-7xl leading-[0.95]">
              Beyond
              <br />
              <span className="font-serif-italic text-accent">launch.</span>
            </h2>
            <p className="mt-8 max-w-[23em] text-base leading-relaxed text-muted-foreground md:mt-11 md:text-lg">
              {INTRO}
            </p>
            <div className="mt-6 md:mt-8">
              <a
                href={AFTERCARE_LINK.href}
                className="link-underline inline-flex min-h-11 items-center gap-2.5 text-[0.95rem] font-medium"
              >
                {AFTERCARE_LINK.label}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <div className="relative bg-[#FBF9F5] px-6 pb-8 pt-12 shadow-[0_1px_1px_rgba(18,18,18,0.06),0_34px_60px_-30px_rgba(40,28,16,0.45)] sm:px-12 sm:pb-10 sm:pt-14 lg:origin-[30%_0] lg:rotate-[0.45deg] xl:px-16">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[18px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-accent"
              />
              <div aria-hidden="true" className="mb-9 text-center sm:mb-10">
                <p className="font-serif-italic text-[2.125rem] leading-none">Aftercare</p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.26em] text-muted-foreground">
                  Beyond Years Designs
                </p>
              </div>

              {AFTERCARE_GROUPS.map((group, gi) => (
                <div key={group.title} className={gi > 0 ? "mt-11" : undefined}>
                  <h3 className="eyebrow mb-5 text-center">{group.title}</h3>
                  <ul className="flex flex-col gap-6">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex items-baseline gap-3">
                          <h4 className="whitespace-nowrap font-display text-[1.625rem] font-medium leading-[1.1] sm:text-[1.7rem]">
                            {item.name}
                          </h4>
                          <span
                            aria-hidden="true"
                            className="min-w-5 flex-1 -translate-y-1.5 border-b border-dotted border-foreground/35"
                          />
                          <p className="text-right font-serif-italic text-lg leading-tight sm:text-xl">{item.terms}</p>
                        </div>
                        <p className="mt-1.5 max-w-[33em] text-base leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
