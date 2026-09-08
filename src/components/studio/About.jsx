import Reveal from "./Reveal";

const TEAM = [
  {
    name: "Tom Forsythe",
    role: "Design & Development",
    bio: "Tom leads design and front-end build. Twelve years of making websites for businesses that would rather have something honest than something loud.",
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/b521d9019_generated_a6aaa6f2.jpg",
  },
  {
    name: "Imogen Hale",
    role: "Strategy & Copywriting",
    bio: "Imogen shapes structure and writes the words. She believes a website is mostly an exercise in deciding what to leave out.",
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/e4c2bb033_generated_644fcff5.jpg",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-24 border-t border-border pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">About the studio</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
              Two people,
              <br />
              <span className="font-serif-italic text-accent">one workshop.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 self-end text-base text-muted-foreground leading-relaxed max-w-sm">
            Forsythe &amp; Hale is a web design and development studio working
            from a small studio space in the UK. We make websites for
            businesses that care about how they present themselves — and we
            keep our client list short on purpose.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
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