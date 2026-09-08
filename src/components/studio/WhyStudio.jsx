import Reveal from "./Reveal";

const POINTS = [
  "You speak to the people doing the work — no account managers, no relayed briefs.",
  "Design, development and copywriting sit in the same room, so nothing gets lost in translation.",
  "No unnecessary agency layers, which means fewer meetings, faster decisions and a fairer price.",
  "A flexible, collaborative process that bends around your business rather than the other way round.",
];

export default function WhyStudio() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 border-t border-border pt-10">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-4">Why a small studio?</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              The direct
              <br />
              <span className="font-serif-italic text-accent">path.</span>
            </h2>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7 flex flex-col">
            <Reveal delay={0.1}>
              <p className="text-xl md:text-2xl font-display leading-snug text-foreground/90 max-w-xl mb-10">
                We are two people, and that is the point. Working with a small
                studio means the hands that design your website are the hands
                that build it, write it and answer the phone about it.
              </p>
            </Reveal>
            <ul className="flex flex-col">
              {POINTS.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <li className="flex gap-5 border-t border-border py-5">
                    <span className="font-display text-lg text-accent w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-muted-foreground leading-relaxed">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}