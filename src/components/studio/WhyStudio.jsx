import Reveal from "./Reveal";

const POINTS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
];

export default function WhyStudio() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 border-t border-border pt-10">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-4">Why Studio</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              Lorem ipsum
              <br />
              <span className="font-serif-italic text-accent">dolor sit.</span>
            </h2>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7 flex flex-col">
            <Reveal delay={0.1}>
              <p className="text-xl md:text-2xl font-display leading-snug text-foreground/90 max-w-xl mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante venenatis dapibus posuere velit aliquet,
                maecenas faucibus mollis interdum.
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