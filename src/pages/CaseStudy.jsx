import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Reveal from "@/components/studio/Reveal";
import Mockup from "@/components/studio/Mockup";
import { Image } from "@/components/ui/image";
import { getProject, getNextProject } from "@/data/projects";

function Section({ label, children, className = "" }) {
  return (
    <Reveal className={`border-t border-border py-10 md:py-14 ${className}`}>
      {label && <p className="eyebrow mb-6">{label}</p>}
      {children}
    </Reveal>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-display text-4xl">Project not found.</p>
        <Link to="/" className="link-underline">Return home</Link>
      </div>
    );
  }

  const next = getNextProject(slug);

  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Project hero */}
      <header className="relative pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Selected work
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="eyebrow mb-6">
              {project.industry} — {project.location} — {project.year}
            </p>
          </Reveal>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.03em] text-balance max-w-[14ch]"
          >
            {project.name}
          </motion.h1>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <p className="md:col-span-6 text-xl md:text-2xl font-display leading-snug text-foreground/90 max-w-2xl">
              {project.tagline}
            </p>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4">
              <div>
                <span className="eyebrow block mb-2">Services</span>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {project.services.join(" · ")}
                </p>
              </div>
              <div>
                <span className="eyebrow block mb-2">Built with</span>
                <p className="text-sm text-foreground/80">{project.tech.join(" · ")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Large website screenshot */}
      <Reveal className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pb-20 md:pb-32">
        <Mockup className="aspect-16/10">
          <Image src={project.image} alt={`${project.name} website`} fittingType="fill" className="h-full w-full" />
        </Mockup>
      </Reveal>

      {/* Overview */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Section label="Overview">
          <p className="text-2xl md:text-3xl font-display leading-snug text-foreground/90 max-w-3xl">
            {project.overview}
          </p>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-6">
            <Section label="The Client">
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {project.clientBackground}
              </p>
            </Section>
          </div>
          <div className="md:col-span-6">
            <Section label="The Problem">
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {project.problem}
              </p>
            </Section>
          </div>
        </div>

        <Section label="Our Approach">
          <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-2xl">
            {project.approach}
          </p>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-6">
            <Section label="Design Process">
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {project.designProcess}
              </p>
            </Section>
          </div>
          <div className="md:col-span-6">
            <Section label="Development Process">
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {project.developmentProcess}
              </p>
            </Section>
          </div>
        </div>

        {/* Key features */}
        <Section label="Key Features">
          <ul className="flex flex-col">
            {project.keyFeatures.map((f, i) => (
              <li key={i} className="flex gap-6 border-t border-border py-5 last:border-b">
                <span className="font-display text-lg text-accent w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Responsive screenshots */}
        <Section label="Responsive">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <Mockup className="aspect-16/10">
                <Image src={project.image} alt={`${project.name} on desktop`} fittingType="fill" className="h-full w-full" />
              </Mockup>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <Mockup className="aspect-9/16 max-w-60 mx-auto md:mx-0">
                <Image src={project.mobileImage} alt={`${project.name} on mobile`} fittingType="fill" className="h-full w-full" />
              </Mockup>
            </div>
          </div>
        </Section>

        {/* Outcome */}
        <Section label="Outcome">
          <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-2xl">
            {project.outcome}
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-base font-medium link-underline"
          >
            Visit the live website
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
          </a>
        </Section>
      </div>

      {/* Next project */}
      <nav className="border-t border-border">
        <Link to={`/work/${next.slug}`} className="group block">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-16 md:py-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 transition-colors duration-500 group-hover:bg-secondary/40">
            <div>
              <p className="eyebrow mb-4">Next Project</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
                {next.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{next.industry}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-base font-medium link-underline">
              View case study
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
            </span>
          </div>
        </Link>
      </nav>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-10 flex justify-between text-sm text-muted-foreground">
          <Link to="/#work" className="link-underline">All work</Link>
          <Link to="/#contact" className="link-underline">Start a project</Link>
        </div>
      </div>
    </article>
  );
}