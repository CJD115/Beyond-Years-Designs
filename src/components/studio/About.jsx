import Reveal from "./Reveal";

const TEAM = [
  {
    name: "Lorem Ipsum",
    role: "Role Placeholder",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    image: "",
  },
  {
    name: "Dolor Sit",
    role: "Role Placeholder",
    bio: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.",
    image: "",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-24 border-t border-border pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
              Lorem ipsum,
              <br />
              <span className="font-serif-italic text-accent">dolor sit amet.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 self-end text-base text-muted-foreground leading-relaxed max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere
            consectetur est at lobortis. Maecenas faucibus mollis interdum,
            nullam id dolor id nibh ultricies vehicula ut id elit.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-secondary">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                  <h3 className="font-display text-3xl md:text-4xl leading-none">{m.name}</h3>
                  <span className="eyebrow">{m.role}</span>
                </div>
                <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
                  {m.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}