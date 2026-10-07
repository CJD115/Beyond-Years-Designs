import Reveal from "../Reveal";
import { STEPS } from "@/data/process";

// Process, the original design: four numbered steps in a two-column grid.

export default function ProcessOriginal() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-20 border-t border-border pt-10">
          <p className="eyebrow mb-4">Process</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
            How we build
            <br />
            <span className="font-serif-italic text-accent">your site.</span>
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
                <span className="font-display text-5xl md:text-6xl text-accent leading-none">
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