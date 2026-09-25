import Reveal from "./Reveal";

const POINTS = [
  {
    title: "Small and Agile",
    body: "Beyond Years Designs is a small business. There is no faceless outreach team, and no corporate red tape. When you get in touch, you reach us directly. When you have an idea, we are there to help make it happen right away.",
  },
  {
    title: "Passionate and Motivated",
    body: "We love working with small businesses, independent makers, and creative teams. When you work with us, you know you are working with a small team who cares about every detail, and who appreciates the hard work you put into your craft.",
  },
  {
    title: "Tried and Trusted",
    body: "Although Beyond Years Designs is new, Connor and Mike have worked together before. In fact, we have been at this for a while. We have worked with clients big and small, including local high-street hairdressers, national automotive resale, and high-end property development.",
  },
];

export default function WhyStudio() {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 border-t border-border pt-10">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-4">Why Us</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              Who
              <br />
              <span className="font-serif-italic text-accent">we are.</span>
            </h2>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7 flex flex-col">
            <Reveal delay={0.1}>
              <p className="text-xl md:text-2xl font-display leading-snug text-foreground/90 max-w-xl mb-10">
                We build, host, and maintain websites for small businesses,
                independent makers and creative teams.
              </p>
            </Reveal>
            <ul className="flex flex-col">
              {POINTS.map((point, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <li className="border-t border-border py-6 md:py-7">
                    <span className="block font-display text-lg md:text-lg leading-none text-accent mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight text-foreground mb-3">
                      {point.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-xlex">
                      {point.body}
                    </p>
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
