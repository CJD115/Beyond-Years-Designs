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
    body: "A good website should fit the business, not the other way around. Whether you need one page or something more involved, we showcase the important information in a clear, considered way that’s right for you.",
  },
  {
    no: "03",
    title: "Production",
    body: "Your website should tell the world who you are, what you do, and how to find you. We’ll periodically check in as we develop your site, keeping you up to date on the project’s progress.",
  },
  {
    no: "04",
    title: "Project complete",
    body: "Once you’re happy with the site, we can handle the admin afterwards, too. We’ll host your site, set up your domain, and keep it maintained, providing ongoing support and keeping everything updated and under control.",
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
            <span className="font-serif-italic text-accent">Your site.</span>
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