import { PROJECTS } from "@/data/projects";
import Reveal from "../Reveal";

// Selected Work — "Rooms".
// Each project is its own chapter, presented as photo prints on paper (the
// hero's language), and an ochre path with numbered pins runs down the margin
// so you walk from one project to the next. Chapters alternate sides.
//
// Content comes from src/data/projects.js. Optional fields used here:
//   print   — lightweight image for the main print (falls back to `image`)
//   detail  — { image, caption, alt, portrait } a second, smaller pinned print
//   quote   — { text, by } shown instead of the tagline

const cityOf = (location = "") => location.split(",")[0].trim();

function Print({ project }) {
  return (
    <div className="bg-[#FBF9F5] p-2.5 shadow-[0_1px_1px_rgba(18,18,18,0.06),0_30px_50px_-28px_rgba(40,28,16,0.45)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_1px_1px_rgba(18,18,18,0.06),0_40px_60px_-30px_rgba(40,28,16,0.5)] md:p-3.5 motion-reduce:transition-none">
      <div className="aspect-[1.8] overflow-hidden bg-[#2B2A28]">
        <img
          src={project.print ?? project.image}
          alt={`The ${project.name} website`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function DetailPrint({ detail, side }) {
  // Pinned over the main print's lower corner, on the side nearest the text
  const position =
    side === "left"
      ? "left-0 -translate-x-[4%] rotate-[-3deg]"
      : "right-0 translate-x-[10%] rotate-[2.5deg]";

  return (
    <div
      className={`absolute bottom-0 ${position} ${
        detail.portrait ? "w-[19%] translate-y-[52%]" : "w-[25%] translate-y-[38%]"
      } origin-top-left`}
    >
      <span aria-hidden="true" className="absolute -left-1 -top-1 z-10 h-2 w-2 rounded-full bg-accent" />
      <figure className="bg-[#FBF9F5] p-1.5 shadow-[0_1px_1px_rgba(18,18,18,0.06),0_24px_40px_-20px_rgba(40,28,16,0.45)] md:p-2.5 xl:pb-0">
        <div className={`${detail.portrait ? "aspect-[0.49]" : "aspect-[0.8]"} overflow-hidden bg-[#2B2A28]`}>
          <img src={detail.image} alt={detail.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
        {/* captions only where the print is large enough to carry them */}
        <figcaption className="hidden h-8 items-center whitespace-nowrap text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground xl:flex">
          {detail.caption}
        </figcaption>
      </figure>
    </div>
  );
}

function Room({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  const printsFirst = index % 2 === 1; // chapters alternate sides on desktop
  const href = `/work/${project.slug}`;

  return (
    <article className="relative">
      {/* pin + number on the path (desktop) */}
      <div aria-hidden="true" className="absolute -left-16 top-1.5 hidden items-center gap-4 lg:flex">
        <span className="h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
        <span className="-ml-3 font-display text-lg leading-none text-accent">{number}</span>
      </div>

      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        {/* Prints */}
        <a
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`group relative block ${
            printsFirst ? "lg:col-span-7 lg:order-1" : "lg:col-span-8 lg:col-start-5 lg:order-2"
          } ${project.detail ? "mb-[22%] lg:mb-[16%]" : ""}`}
        >
          <Print project={project} />
          {project.detail && (
            <DetailPrint detail={project.detail} side={printsFirst ? "right" : "left"} />
          )}
        </a>

        {/* Words */}
        <div
          className={`flex flex-col gap-4 ${
            printsFirst ? "lg:col-span-4 lg:col-start-9 lg:order-2 lg:pt-6" : "lg:col-span-4 lg:order-1 lg:pt-6"
          }`}
        >
          <p className="eyebrow">
            <span className="text-accent lg:hidden">{number} · </span>
            {project.industry}
            {project.location && ` · ${cityOf(project.location)}`}
          </p>
          <h3 className="font-display text-5xl leading-[0.95] md:text-6xl">{project.name}</h3>

          {project.quote ? (
            <figure className="mt-1.5 flex flex-col gap-3">
              <blockquote className="font-serif-italic text-2xl leading-[1.2] md:text-[1.625rem]">
                “{project.quote.text}”
              </blockquote>
              <figcaption className="eyebrow">— {project.quote.by}</figcaption>
            </figure>
          ) : (
            project.tagline && (
              <p className="mt-1.5 font-serif-italic text-2xl leading-[1.2] md:text-[1.625rem]">
                {project.tagline}
              </p>
            )
          )}

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="eyebrow">{project.year}</span>
            <a href={href} className="link-underline inline-flex min-h-11 items-center text-[0.95rem] font-medium">
              Step inside<span className="sr-only"> {project.name}</span>&nbsp;↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WorkRooms() {
  return (
    <section id="work" className="relative overflow-x-clip py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-20 md:mb-28 border-t border-border pt-10">
          <p className="eyebrow mb-4">Selected Work</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
            Places we’ve
            <br />
            <span className="font-serif-italic text-accent">built.</span>
          </h2>
        </Reveal>

        <div className="relative lg:pl-16">
          {/* the path that joins the rooms (desktop) */}
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-3 hidden w-px bg-accent lg:block">
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
          </div>

          <div className="flex flex-col gap-32 md:gap-40">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.slug}>
                <Room project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
