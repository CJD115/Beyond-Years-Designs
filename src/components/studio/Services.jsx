import { motion } from "framer-motion";
import Reveal from "./Reveal";

const SERVICES = [
  {
    no: "01",
    title: "Lorem Service",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis, donec id elit non mi porta gravida.",
  },
  {
    no: "02",
    title: "Ipsum Service",
    body: "Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur, vestibulum id ligula porta felis euismod semper.",
  },
  {
    no: "03",
    title: "Dolor Service",
    body: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
  {
    no: "04",
    title: "Amet Service",
    body: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-20 border-t border-border pt-10">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Lorem ipsum,
            <br />
            <span className="font-serif-italic text-accent">dolor amet.</span>
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