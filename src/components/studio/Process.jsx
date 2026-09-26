import Reveal from "./Reveal";

const STEPS = [
  {
    no: "01",
    title: "Groundwork",
    body: "First off, we’ll discuss the kind of style and content you want, and get an understanding of your vision for the site. We’ll arrange any follow-ups and outline the process going forward in more detail.",
  },
  {
    no: "02",
    title: "Planning",
    body: "Once we know what you want, we’ll work out a development roadmap. With the milestones and deadlines agreed, we’ll send the plan over to make sure you’re happy with it, and then get to work!",
  },
  {
    no: "03",
    title: "Production",
    body: "Once we get started, Connor will build your website from the ground up, one line of code at a time. Meanwhile, Mike will craft your brand copy so it’s ready to greet the online world.",
  },
  {
    no: "04",
    title: "Project complete",
    body: "Happy with the final product? It’s all yours after we receive the final payment! You’ll have the opportunity once again to choose any ongoing support you might want, like web hosting, maintenance, or domain setup.",
  },
];

export default function Process() {
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