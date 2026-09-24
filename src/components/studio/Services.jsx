import { motion } from "framer-motion";
import Reveal from "./Reveal";

const SERVICES = [
  {
    no: "01",
    title: "One-page Website",
    body: "An elegant, one-page website curates your brand and shows the world who you are, all from one convenient location. No matter how complex your business, we’ll showcase all the important information in a clear, considered way that’s right for you.",
  },
  {
    no: "02",
    title: "Bespoke Web Design",
    body: "All our websites are designed from the ground up by our tech whizz, Connor. That means no templates, stock layouts or pre-existing formulas—you won’t find another one quite like it! Your website is uniquely yours, designed bespoke for you.",
  },
  {
    no: "03",
    title: "Professionally Written",
    body: "Our resident wordsmith, Mike, has over 6 years of experience working with clients big and small. With a keen eye for technical details and a deep love of the craft, he’ll ensure your brand is ready to find its audience.",
  },
  {
    no: "04",
    title: "Mobile & Performance Optimisation",
    body: "More than half of all internet browsing these days happens on a mobile. That’s why our sites are mobile-friendly and performance optimised, meaning your site looks and feels as good on a big screen as it does in your hand.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-20 border-t border-border pt-10">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
             Everything your business needs,
            <br />
            <span className="font-serif-italic text-accent">in one focused website.</span>
          </h2>
        </Reveal>

        <div className="border-t border-border">
          {SERVICES.map((s) => (
            <ServiceRow key={s.no} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service }) {
  return (
    <Reveal>
      <motion.a
        href="#contact"
        className="group grid grid-cols-12 items-center gap-4 border-b border-border py-8 md:py-10 transition-colors duration-500 hover:bg-background/60"
      >
        <span className="col-span-2 md:col-span-1 font-display text-2xl md:text-3xl text-muted-foreground group-hover:text-accent transition-colors duration-500">
          {service.no}
        </span>
        <h3 className="col-span-10 md:col-span-4 font-display text-3xl md:text-5xl leading-none transition-transform duration-500 group-hover:translate-x-2">
          {service.title}
        </h3>
        <p className="col-span-12 md:col-span-6 md:col-start-7 text-base text-muted-foreground leading-relaxed max-w-xl">
          {service.body}
        </p>
      </motion.a>
    </Reveal>
  );
}