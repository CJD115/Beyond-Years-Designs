import Reveal from "./Reveal";

const STEPS = [
  {
    no: "01",
    title: "Lorem",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  },
  {
    no: "02",
    title: "Ipsum",
    body: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna.",
  },
  {
    no: "03",
    title: "Dolor Sit",
    body: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum, sed posuere consectetur est at lobortis.",
  },
  {
    no: "04",
    title: "Amet",
    body: "Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-20 border-t border-border pt-10">
          <p className="eyebrow mb-4">Process</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
            Lorem ipsum
            <br />
            <span className="font-serif-italic text-accent">dolor sit.</span>
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