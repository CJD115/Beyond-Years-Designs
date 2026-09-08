import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    slug: "marston-roe",
    name: "Marston & Roe",
    industry: "Independent Law Firm",
    year: "2024",
    description: "A measured, authoritative site for a boutique practice with a clear structure, restrained typography and copy that lets its expertise speak plainly.",
    services: ["Strategy", "Design", "Development"],
    tech: ["React", "Vite"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    slug: "foundry-coffee-roasters",
    name: "Foundry Coffee Roasters",
    industry: "Specialty Coffee",
    year: "2024",
    description: "A full-bodied e-commerce experience built around the ritual of coffee, considered product pages and a confident editorial voice.",
    services: ["Web Design", "Development", "E-commerce", "Strategy"],
    tech: ["Next.js", "Shopify"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "atelier-boyd",
    name: "Atelier Boyd",
    industry: "Ceramics Studio",
    year: "2023",
    description: "A quiet gallery-style portfolio for a working ceramicist, where each object has space to breathe.",
    services: ["Brand Design", "Development"],
    tech: ["Astro", "Stripe"],
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "northbank-architecture",
    name: "Northbank Architecture",
    industry: "Architectural Practice",
    year: "2024",
    description: "A project-led site that lets the work take the words, with a flexible editorial system for a growing practice.",
    services: ["Strategy", "Design", "Development"],
    tech: ["CMS Integration", "React"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "linden-co",
    name: "Linden & Co.",
    industry: "Independent Bookshop",
    year: "2023",
    description: "A literary, warm site for a high-street bookshop, events and recommendations, all written in the shop's own voice.",
    services: ["Web Design", "Development", "Copywriting", "CMS Integration"],
    tech: ["Payload", "React"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
  },
];

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Mockup({ children, className = "" }) {
  return <div className={`overflow-hidden rounded-sm bg-black/10 ${className}`}>{children}</div>;
}

function Meta({ label, items }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{label}</span>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-foreground/80">
        {items.map((s, i) => (
          <span key={s}>
            {s}
            {i < items.length - 1 && <span className="text-muted-foreground/50">,</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectInfo({ project }) {
  return (
    <div className="mt-6">
      <p className="eyebrow mb-2">
        {project.industry} — {project.year}
      </p>
      <h3 className="font-display text-3xl md:text-4xl leading-none">{project.name}</h3>
      <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        <Meta label="Services" items={project.services} />
        <Meta label="Built with" items={project.tech} />
      </div>
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <Reveal className="mb-20 md:mb-32">
      <p className="eyebrow mb-4">Featured Case Study</p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <a href={`#${project.slug}`} className="group md:col-span-8 block">
          <motion.div whileHover="hover" className="relative">
            <motion.div
              variants={{ hover: { scale: 1.03 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Mockup className="aspect-[16/10]">
                <img
                  src={project.image}
                  alt={project.name}
                  fittingType="fill"
                  className="h-full w-full"
                />
              </Mockup>
            </motion.div>
          </motion.div>
        </a>
        <div className="md:col-span-4">
          <ProjectInfo project={project} />
          <a
            href={`#${project.slug}`}
            className="group mt-8 inline-flex items-center gap-2 text-base font-medium link-underline"
          >
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectBlock({ project, layout }) {
  const colClass = {
    large: "md:col-span-7",
    small: "md:col-span-4",
    "small-right": "md:col-span-4 md:col-start-9",
    "large-right": "md:col-span-7 md:col-start-6",
  }[layout];

  const aspect = {
    large: "aspect-[16/10]",
    small: "aspect-[4/3]",
    "small-right": "aspect-[4/3]",
    "large-right": "aspect-[16/10]",
  }[layout];

  return (
    <Reveal className={`my-10 md:my-16 ${colClass}`}>
      <a href={`#${project.slug}`} className="group block">
        <motion.div whileHover="hover" className="relative">
          <motion.div
            variants={{ hover: { scale: 1.03 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Mockup className={aspect}>
              <img
                src={project.image}
                alt={project.name}
                fittingType="fill"
                className="h-full w-full"
              />
            </Mockup>
          </motion.div>
        </motion.div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <ProjectInfo project={project} />
          <span className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium link-underline shrink-0 mt-1">
            View <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default function Work() {
  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const rest = PROJECTS.filter((p) => p.slug !== featured.slug);
  // Asymmetric rhythm: large, small-right, small, large-right
  const rhythm = ["large", "small-right", "small", "large-right"];

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-border pt-10">
          <div>
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
              A handful of sites,
              <br />
              <span className="font-serif-italic text-accent">made with care.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            Each project below is designed, written and built by the two of us —
            no outsourcing, no templates, no filler.
          </p>
        </Reveal>

        <FeaturedProject project={featured} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8">
          {rest.map((p, i) => (
            <ProjectBlock key={p.slug} project={p} layout={rhythm[i % rhythm.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}