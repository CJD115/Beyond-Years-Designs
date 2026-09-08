import Reveal from "./Reveal";

const STEPS = [
  {
    no: "01",
    title: "Discover",
    body: "We learn the business, the audience and the goals. Conversations, not questionnaires — we want to understand what you actually need, not what a template assumes.",
  },
  {
    no: "02",
    title: "Define",
    body: "We plan the structure, content and creative direction. A clear map of the site before any design begins, so everyone knows where we are heading.",
  },
  {
    no: "03",
    title: "Design & Build",
    body: "We design and develop the website together, in the open. You see it taking shape and feed in as we go, rather than waiting for a big reveal.",
  },
  {
    no: "04",
    title: "Launch & Improve",
    body: "We test, launch and keep improving. A site is never finished on launch day — we stay on hand to refine, measure and grow it.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-20 border-t border-border pt-10">
          <p className="eyebrow mb-4">Process</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
            How we
            <br />
            <span className="font-serif-italic text-accent">get there.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.no}
              delay={i * 0.1}
              className="border-t border-border py-10 md:py-12"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-display text-5xl md:text-6xl text-accent/80 leading-none">
                  {s.no}
                </span>
                <h3 className="font-display text-3xl md:text-4xl leading-none">
                  {s.title}
                </h3>
              </div>
              <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}