import Reveal from "../Reveal";
import {
  AFTERCARE_ASIDE,
  AFTERCARE_GROUPS,
  AFTERCARE_LINK,
  AFTERCARE_NOTE,
  AFTERCARE_SIGNOFF,
} from "@/data/aftercare";

// Aftercare: "Beyond launch", the handover note.
// A short note from Connor and Mike with each service picked out in ochre
// italic, then a two-column key underneath that explains each one.
// Content comes from src/data/aftercare.js.

const TITLE_ID = "aftercare-title";

export default function AftercareNote() {
  return (
    <section id="aftercare" aria-labelledby={TITLE_ID} className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        {/* Heading + the note */}
        <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">Aftercare</p>
            <h2 id={TITLE_ID} className="font-display text-5xl md:text-7xl leading-[0.95]">
              Beyond
              <br />
              <span className="font-serif-italic text-accent">launch.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:pt-8">
            <p className="font-display text-[clamp(28px,2.8vw,44px)] leading-[1.28] tracking-[-0.012em] text-pretty">
              {AFTERCARE_NOTE.map((part, i) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <em key={i} className="font-serif-italic text-accent">
                    {part.em}
                  </em>
                ),
              )}
            </p>
            <p className="eyebrow mt-8">— {AFTERCARE_SIGNOFF}</p>
          </Reveal>
        </div>

        {/* The key */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal className="order-2 lg:order-1 lg:col-span-4">
            <p className="max-w-[19em] text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
              {AFTERCARE_ASIDE}
            </p>
            <div className="mt-5">
              <a
                href={AFTERCARE_LINK.href}
                className="link-underline inline-flex min-h-11 items-center gap-2.5 text-[0.95rem] font-medium"
              >
                {AFTERCARE_LINK.label}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>

          <div className="order-1 grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-12 lg:order-2 lg:col-span-7 lg:col-start-6">
            {AFTERCARE_GROUPS.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.08}>
                <h3 className="eyebrow mb-5 flex items-center gap-3.5">
                  {/* the ochre pin used across the site */}
                  <span aria-hidden="true" className="inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
                  {group.title}
                </h3>
                <ul className="border-b border-border">
                  {group.items.map((item) => (
                    <li key={item.name} className="border-t border-border pb-6 pt-5">
                      <h4 className="font-display text-[1.75rem] leading-[1.05]">{item.name}</h4>
                      <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
