import { useId, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/studio/Reveal";
import ThresholdsNav from "@/redesign/thresholds/ThresholdsNav";
import { PROJECTS } from "@/data/projects";
import { useSeo } from "@/lib/seo";
import { CASE_STUDIES, roomsCaseStudyPath } from "./caseStudies";

// A case study in the Rooms direction, at /rooms/work/:slug on the dev server
// only, reached from Selected Work on the /rooms preview. Each project is a
// room: its website stands in a doorway at the top, light falls through onto
// the floor, and the next room waits at the bottom.
//
//   hero      the place blurred behind, name, services, the site in a doorway
//   01        the brief: the problem in one line, the client and problem
//   02        the approach, then the key features: choosing one moves a beam
//             of light along a strip of screens to the large one
//   03        the result: Lighthouse scores, the site on desktop and phone
//   next      the next room, in its own doorway
//
// Desktop (1024px and up) follows the 1440px mock-up, scaled to the window:
// --lu is one mock-up pixel. Phones stack everything in one column.

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];
const EASE = [0.22, 1, 0.36, 1];
const ROOMS = "/rooms";

const WRAP = "relative mx-auto w-full px-6 md:px-10 lg:max-w-[calc(var(--lu)*1440)] lg:px-[calc(var(--lu)*64)]";
const EYEBROW =
  "text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] lg:text-[max(10.5px,calc(var(--lu)*12))] lg:font-normal";
const HEADLINE =
  "font-display text-[34px] font-light leading-[1.16] tracking-normal md:text-[42px] lg:text-[calc(var(--lu)*52)] lg:leading-[1.18]";
const BODY_SMALL = "text-[14px] leading-[1.6] text-[#f1ebe3]/80 lg:text-[max(13px,calc(var(--lu)*14))]";
const BODY = "text-[15px] leading-[1.65] text-[#f1ebe3]/80 lg:text-[max(14px,calc(var(--lu)*15))]";

// The next room's columns, shared with the footer so its light lines up
const NEXT_COLUMNS = "lg:grid-cols-[minmax(0,1fr)_calc(var(--lu)*476)] lg:gap-[calc(var(--lu)*60)]";

const METRICS = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["bestPractices", "Best practices"],
  ["seo", "SEO"],
];

const metaFor = (project) => `${project.industry} · ${project.location} · ${project.year}`;

// Plain text with { em } parts in ochre italic
function Line({ parts }) {
  return parts.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <em key={i} className="font-serif-italic text-accent">
        {part.em}
      </em>
    ),
  );
}

export default function RoomsCaseStudy() {
  const { slug } = useParams();
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const study = project && CASE_STUDIES[project.slug];

  useSeo(
    project
      ? {
          title: `${project.name} case study (Rooms preview) | Beyond Years Designs`,
          description: project.description,
          noindex: true,
        }
      : { title: "Case study not found | Beyond Years Designs", description: "No case study here.", noindex: true },
  );

  if (!project || !study) {
    return (
      <main id="content" className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#13110d] px-6 text-[#f1ebe3]">
        <h1 className="font-display text-4xl font-light">No room here.</h1>
        <Link to={`${ROOMS}#work`} className="border-b border-[#f1ebe3]/50 pb-1">
          Back to Selected Work
        </Link>
      </main>
    );
  }

  const count = PROJECTS.length;
  const nextIndex = (index + 1) % count;
  const next = PROJECTS[nextIndex];

  return (
    <div className="min-h-screen bg-[#13110d] text-[#f1ebe3] antialiased [--accent:30_43%_52%] lg:[--lu:min(calc(100vw/1440),1.25px)]">
      <ThresholdsNav home={ROOMS} />
      {/* key: a fresh page for each room, so the features start at the first one */}
      <main key={project.slug} id="content" tabIndex={-1} className="focus:outline-none">
        <Hero project={project} study={study} room={`Room ${NUMERALS[index]} of ${NUMERALS[count - 1]}`} />
        <Brief study={study} />
        <Approach project={project} study={study} />
        <Result project={project} study={study} />
        <NextRoom next={next} numeral={NUMERALS[nextIndex]} />
      </main>
      <footer className="relative overflow-hidden">
        {/* Light through the next doorway, falling onto the floor */}
        <div aria-hidden="true" className={`absolute inset-0 mx-auto hidden lg:grid lg:max-w-[calc(var(--lu)*1440)] lg:px-[calc(var(--lu)*64)] ${NEXT_COLUMNS}`}>
          <div className="relative col-start-2">
            <Floor width={476} className="left-1/2 -translate-x-1/2" />
          </div>
        </div>
        <div className={`${WRAP} flex gap-[36px] py-4 lg:gap-[calc(var(--lu)*36)] lg:py-[calc(var(--lu)*14)]`}>
          <Link to={`${ROOMS}#work`} className="inline-flex min-h-11 items-center text-[14px] font-medium transition-colors duration-300 hover:text-accent lg:text-[max(13px,calc(var(--lu)*14))]">
            All work
          </Link>
          <Link to={`${ROOMS}#contact`} className="inline-flex min-h-11 items-center text-[14px] font-medium transition-colors duration-300 hover:text-accent lg:text-[max(13px,calc(var(--lu)*14))]">
            Start a project
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Hero({ project, study, room }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#f1ebe3]/10">
      {/* The place itself, blurred behind and fading into the room */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={study.place ?? project.room.place}
          alt=""
          decoding="async"
          className="h-full w-full scale-110 object-cover blur-[16px] brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-[#13110d]/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#13110d]/80" />
      </div>

      <div className={`${WRAP} pt-[84px] lg:pt-[calc(var(--lu)*98)]`}>
        <div className="flex items-center justify-between gap-6">
          <Link
            to={`${ROOMS}#work`}
            className="inline-flex min-h-11 items-center gap-[12px] text-[14px] font-medium transition-colors duration-300 hover:text-accent lg:text-[max(13px,calc(var(--lu)*14))]"
          >
            <svg aria-hidden="true" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-4 lg:w-[max(14px,calc(var(--lu)*16))]">
              <path d="M16 6H1M6 1L1 6l5 5" />
            </svg>
            Back to Selected Work
          </Link>
          <p className="font-serif-italic text-[19px] leading-none text-[#f1ebe3]/75 lg:text-[calc(var(--lu)*22)]">{room}</p>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-[calc(var(--lu)*36)] lg:grid-cols-[minmax(0,1fr)_calc(var(--lu)*256)] lg:gap-[calc(var(--lu)*40)]">
          <div>
            <p className={`${EYEBROW} text-[#f1ebe3]/75`}>{metaFor(project)}</p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="font-display mt-3 text-[clamp(52px,14vw,88px)] font-light leading-[1.02] tracking-[-0.015em] lg:mt-[calc(var(--lu)*10)] lg:whitespace-nowrap lg:text-[calc(var(--lu)*134)] lg:leading-[1.08]"
            >
              {project.name}
            </motion.h1>
            <p className="font-serif-italic mt-4 max-w-[36em] text-[20px] leading-[1.35] text-[#f1ebe3]/85 lg:mt-[calc(var(--lu)*18)] lg:max-w-[calc(var(--lu)*760)] lg:text-[calc(var(--lu)*24)]">
              {study.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:block lg:pt-[calc(var(--lu)*8)]">
            <div>
              <p className={`${EYEBROW} text-accent`}>Services</p>
              <ul className={`${BODY_SMALL} mt-3 lg:mt-[calc(var(--lu)*12)] lg:leading-[1.72]`}>
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="lg:mt-[calc(var(--lu)*26)]">
              <p className={`${EYEBROW} text-accent`}>Built with</p>
              <p className={`${BODY_SMALL} mt-3 lg:mt-[calc(var(--lu)*12)]`}>{project.tech.join(" · ")}</p>
            </div>
          </div>
        </div>

        {/* The website, standing in its doorway down to the floor line */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="mx-auto mt-10 aspect-[1028/600] w-full border border-b-0 border-accent/70 bg-[#0d0b08] p-[6px] pb-0 lg:mt-[calc(var(--lu)*28)] lg:aspect-auto lg:h-[calc(var(--lu)*600)] lg:w-[calc(var(--lu)*1028)] lg:p-[calc(var(--lu)*13)] lg:pb-0"
        >
          <img
            src={study.hero?.src ?? project.image}
            srcSet={study.hero?.srcSet ?? project.imageSrcSet}
            sizes="(min-width: 1024px) min(70vw, 1260px), 90vw"
            alt={`The ${project.name} website`}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
      </div>
    </header>
  );
}

// Light falling through a doorway onto the floor: a pale wedge as wide as
// the doorway where it meets the floor line, widening and fading as it goes.
// `width` is the doorway's width in mock-up pixels.
function Floor({ width, className = "" }) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ "--door": width }}
      className={`pointer-events-none absolute top-0 h-[260px] w-[calc(100%*1.22)] lg:h-[calc(var(--lu)*400)] lg:w-[calc(var(--lu)*var(--door)*1.22)] ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1ebe3" stopOpacity="0.09" />
          <stop offset="1" stopColor="#f1ebe3" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="9,0 91,0 100,100 0,100" fill={`url(#${id})`} />
    </svg>
  );
}

function Brief({ study }) {
  return (
    <section aria-labelledby="brief-title" className="relative overflow-hidden border-b border-[#f1ebe3]/10">
      <Floor width={1028} className="left-1/2 -translate-x-1/2" />
      <div
        className={`${WRAP} grid gap-10 pt-20 pb-20 lg:grid-cols-[minmax(0,1fr)_calc(var(--lu)*294)] lg:gap-[calc(var(--lu)*80)] lg:pt-[calc(var(--lu)*130)] lg:pb-[calc(var(--lu)*96)]`}
      >
        <Reveal>
          <p className={`${EYEBROW} text-accent`}>01 — The brief</p>
          <h2 id="brief-title" className={`${HEADLINE} mt-4 lg:mt-[calc(var(--lu)*16)] lg:max-w-[calc(var(--lu)*960)]`}>
            <Line parts={study.brief} />
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:pt-[calc(var(--lu)*40)]">
          <dl>
            <dt className={`${EYEBROW} text-[#f1ebe3]/75`}>The client</dt>
            <dd className={`${BODY} mt-2 lg:mt-[calc(var(--lu)*10)]`}>{study.client}</dd>
            <dt className={`${EYEBROW} mt-6 text-[#f1ebe3]/75 lg:mt-[calc(var(--lu)*28)]`}>The problem</dt>
            <dd className={`${BODY} mt-2 lg:mt-[calc(var(--lu)*10)]`}>{study.problem}</dd>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Approach({ project, study }) {
  return (
    <section aria-labelledby="approach-title" className="relative overflow-hidden border-b border-[#f1ebe3]/10">
      <div className={`${WRAP} pt-20 pb-20 lg:pt-[calc(var(--lu)*78)] lg:pb-[calc(var(--lu)*18)]`}>
        <Reveal>
          <p className={`${EYEBROW} text-accent`}>02 — The approach</p>
          <h2 id="approach-title" className={`${HEADLINE} mt-4 lg:mt-[calc(var(--lu)*16)] lg:max-w-[calc(var(--lu)*1060)]`}>
            <Line parts={study.approach} />
          </h2>
        </Reveal>
        <Features project={project} shots={study.shots} />
      </div>
    </section>
  );
}

// The key features. Choosing one moves the light: the strip of screens marks
// it, a beam runs from there to the large screen, and the large screen shows
// it. Desktop only has the strip and the beam; phones get the list and the
// large screen.
function Features({ project, shots }) {
  const [active, setActive] = useState(0);
  const features = project.keyFeatures;
  const n = features.length;
  const shot = shots[active] ?? shots[0];
  const screenId = useId();

  const onKeyDown = (e) => {
    const by = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!by) return;
    e.preventDefault();
    const target = (active + by + n) % n;
    setActive(target);
    e.currentTarget.querySelectorAll("button")[target]?.focus();
  };

  // The beam, in a 100 × 100 box from the strip's right edge to the screen:
  // narrow where it leaves the chosen screen, full height at the large one
  const top = (active / n) * 100;
  const bottom = ((active + 1) / n) * 100;
  const beam = `M0 ${top} L100 0 L100 100 L0 ${bottom} Z`;

  return (
    <div className="relative mt-14 grid gap-8 lg:mt-[calc(var(--lu)*110)] lg:grid-cols-[calc(var(--lu)*420)_minmax(0,1fr)] lg:gap-[calc(var(--lu)*64)]">
      {/* A soft pool of light over the screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[calc(var(--lu)*120)] right-0 hidden h-[calc(var(--lu)*420)] w-[calc(var(--lu)*900)] bg-[radial-gradient(closest-side,rgba(185,133,80,0.09),transparent)] lg:block"
      />

      <div>
        <p className={`${EYEBROW} text-[#f1ebe3]/80`}>Key features, on the live site</p>
        <p className="font-serif-italic mt-2 text-[17px] leading-[1.3] text-[#f1ebe3]/70 lg:mt-[calc(var(--lu)*8)] lg:text-[max(15px,calc(var(--lu)*17))]">
          Choose one and the light moves to it.
        </p>
        <ul onKeyDown={onKeyDown} className="mt-5 border-t border-[#f1ebe3]/10 lg:mt-[calc(var(--lu)*22)]">
          {features.map((feature, i) => {
            const isActive = i === active;
            return (
              <li key={feature} className="border-b border-[#f1ebe3]/10">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={screenId}
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-baseline gap-[18px] py-[16px] text-left transition-colors duration-500 lg:gap-[calc(var(--lu)*34)] lg:py-[calc(var(--lu)*19)] ${
                    isActive ? "text-[#f1ebe3]" : "text-[#f1ebe3]/55 hover:text-[#f1ebe3]/80"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`font-serif-italic w-[1.6em] shrink-0 text-[15px] leading-none transition-colors duration-500 lg:text-[max(13px,calc(var(--lu)*15))] ${
                      isActive ? "text-accent" : "text-[#f1ebe3]/45"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[21px] leading-[1.3] lg:text-[calc(var(--lu)*24)]">{feature}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 720 × 450 for the screen: the 16:10 of the captured screens, so
          they show whole */}
      <div className="relative lg:flex lg:h-[calc(var(--lu)*450)]">
        {/* The strip of screens, one per feature */}
        <ol aria-hidden="true" className="hidden h-full w-[calc(var(--lu)*70)] shrink-0 flex-col bg-[#0d0b08] lg:flex">
          {features.map((feature, i) => {
            const s = shots[i] ?? shots[0];
            const isActive = i === active;
            return (
              <li key={feature} className="relative min-h-0 flex-1 py-[calc(var(--lu)*3)]">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setActive(i)}
                  className={`block h-full w-full overflow-hidden outline outline-1 -outline-offset-1 transition-[outline-color,opacity] duration-500 ${
                    isActive ? "opacity-100 outline-accent" : "opacity-45 outline-transparent hover:opacity-70"
                  }`}
                >
                  <img
                    src={s.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: s.position }}
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ol>

        {/* The beam */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden h-full w-[calc(var(--lu)*38)] shrink-0 lg:block">
          <defs>
            <linearGradient id={`${screenId}-beam`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b98550" stopOpacity="0.32" />
              <stop offset="1" stopColor="#b98550" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path initial={false} animate={{ d: beam }} transition={{ duration: 0.8, ease: EASE }} fill={`url(#${screenId}-beam)`} />
        </svg>

        {/* The large screen */}
        <div
          id={screenId}
          aria-live="polite"
          className="relative aspect-[16/10] w-full overflow-hidden border border-accent/70 bg-[#0d0b08] lg:aspect-auto lg:h-full lg:flex-1"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={`${active}-${shot.src}`}
              src={shot.src}
              srcSet={shot.srcSet}
              sizes="(min-width: 1024px) min(50vw, 902px), 90vw"
              alt={`${project.name}: ${features[active]}`}
              decoding="async"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={shot.portrait ? undefined : { objectPosition: shot.position }}
              className={`absolute inset-0 h-full w-full ${shot.portrait ? "object-contain py-[4%]" : shot.whole ? "object-contain" : "object-cover"}`}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Result({ project, study }) {
  const desktop =
    study.resultDesktop ??
    (project.responsiveImage
      ? { src: project.responsiveImage, srcSet: project.responsiveImageSrcSet }
      : { src: project.image, srcSet: project.imageSrcSet });
  const phone = study.resultPhone ?? { src: project.mobileImage };

  return (
    <section aria-labelledby="result-title" className="relative overflow-hidden border-b border-[#f1ebe3]/10">
      {/* A little light from above, over the screens */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-[calc(50%+var(--lu)*290)] hidden h-[calc(var(--lu)*90)] w-[calc(var(--lu)*230)] lg:block"
      >
        <polygon points="25,0 75,0 100,100 0,100" fill="#f1ebe3" fillOpacity="0.035" />
      </svg>

      <div
        className={`${WRAP} grid gap-14 pt-20 pb-20 lg:grid-cols-[minmax(0,1fr)_calc(var(--lu)*588)] lg:gap-[calc(var(--lu)*60)] lg:pt-[calc(var(--lu)*78)] lg:pb-[calc(var(--lu)*48)]`}
      >
        <Reveal>
          <p className={`${EYEBROW} text-accent`}>03 — The result</p>
          <h2 id="result-title" className={`${HEADLINE} mt-4 lg:mt-[calc(var(--lu)*16)] lg:max-w-[calc(var(--lu)*680)]`}>
            {study.result}
          </h2>
          <p className="font-serif-italic mt-4 max-w-[36em] text-[19px] leading-[1.4] text-[#f1ebe3]/85 lg:mt-[calc(var(--lu)*22)] lg:max-w-[calc(var(--lu)*610)] lg:text-[calc(var(--lu)*22)]">
            {study.resultMore}
          </p>

          {project.metrics && (
            <>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:mt-[calc(var(--lu)*44)] lg:flex lg:gap-[calc(var(--lu)*52)]">
                {METRICS.map(([key, label]) => (
                  <div key={key} className="flex flex-col-reverse">
                    <dt className={`${EYEBROW} mt-3 text-[#f1ebe3]/75 lg:mt-[calc(var(--lu)*12)]`}>{label}</dt>
                    <dd className="font-display text-[56px] font-light leading-none text-accent [font-variant-numeric:lining-nums] lg:text-[calc(var(--lu)*84)]">
                      {project.metrics[key]}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[13px] text-[#f1ebe3]/70 lg:mt-[calc(var(--lu)*26)] lg:text-[max(12px,calc(var(--lu)*13))]">
                Lighthouse scores, audited on the live site at launch.
              </p>
            </>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-[0.3em] border-b border-[#f1ebe3]/50 pb-[10px] text-[15px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent lg:mt-[calc(var(--lu)*30)] lg:text-[max(14px,calc(var(--lu)*15))]"
            >
              Visit the live website
              <Arrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </Reveal>

        {/* The site on desktop, with the phone in front */}
        <Reveal delay={0.1} className="relative">
          <div className="relative pr-[22%] pb-[14%] lg:pr-0 lg:pb-0 lg:h-[calc(var(--lu)*420)]">
            <img
              src={desktop.src}
              srcSet={desktop.srcSet}
              sizes="(min-width: 1024px) min(40vw, 704px), 75vw"
              alt={`${project.name} on desktop`}
              loading="lazy"
              decoding="async"
              className="aspect-[563/311] w-full object-cover object-top shadow-[0_30px_60px_rgba(0,0,0,0.55)] lg:absolute lg:top-0 lg:left-0 lg:w-[calc(var(--lu)*563)]"
            />
            <figure className="absolute right-0 bottom-0 w-[27%] lg:top-[calc(var(--lu)*64)] lg:bottom-auto lg:w-[calc(var(--lu)*157)]">
              <img
                src={phone.src}
                srcSet={phone.srcSet}
                sizes="(min-width: 1024px) 200px, 27vw"
                alt={`${project.name} on a phone`}
                loading="lazy"
                decoding="async"
                className="aspect-[157/323] w-full rounded-[12px] border border-[#f1ebe3]/25 object-cover object-top shadow-[0_24px_48px_rgba(0,0,0,0.6)] lg:rounded-[calc(var(--lu)*14)]"
              />
              <figcaption className={`${EYEBROW} mt-3 hidden text-right text-[#f1ebe3]/75 lg:mt-[calc(var(--lu)*16)] lg:block`}>
                On the phone
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NextRoom({ next, numeral }) {
  const href = roomsCaseStudyPath(next.slug);

  return (
    <nav aria-labelledby="next-title" className="relative overflow-hidden border-b border-[#f1ebe3]/10">
      <div
        className={`${WRAP} grid gap-10 pt-20 lg:items-end lg:pt-[calc(var(--lu)*40)] ${NEXT_COLUMNS}`}
      >
        <div className="lg:pb-[calc(var(--lu)*66)]">
          <p className={`${EYEBROW} text-accent`}>Next project</p>
          <p id="next-title" className="font-display mt-3 text-[clamp(46px,12vw,72px)] font-light leading-[1.05] tracking-[-0.01em] lg:mt-[calc(var(--lu)*22)] lg:whitespace-nowrap lg:text-[calc(var(--lu)*94)]">
            {next.name}
          </p>
          <p className={`${EYEBROW} mt-4 text-[#f1ebe3]/75 lg:mt-[calc(var(--lu)*22)]`}>
            {next.industry} · {next.location} · {next.year}
          </p>
          <Link
            to={href}
            className="mt-6 inline-flex items-center gap-[0.3em] border-b border-[#f1ebe3]/50 pb-[10px] text-[15px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent lg:mt-[calc(var(--lu)*36)] lg:pb-[calc(var(--lu)*12)] lg:text-[max(14px,calc(var(--lu)*15))]"
          >
            Step through
            <Arrow />
            <span className="sr-only">: {next.name} case study</span>
          </Link>
        </div>

        <div>
          <p aria-hidden="true" className={`${EYEBROW} text-center text-[#f1ebe3]/75`}>
            Room {numeral} — {next.name}
          </p>
          <Link
            to={href}
            tabIndex={-1}
            aria-hidden="true"
            className="group mt-4 block aspect-[476/335] w-full border border-b-0 border-accent/70 bg-[#0d0b08] p-[6px] pb-0 lg:mt-[calc(var(--lu)*22)] lg:p-[calc(var(--lu)*13)] lg:pb-0"
          >
            <span className="block h-full w-full overflow-hidden">
              <img
                src={next.image}
                srcSet={next.imageSrcSet}
                sizes="(min-width: 1024px) 33vw, 90vw"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-[0.7em] w-[0.7em]">
      <path d="M2 10L10 2M4 2h6v6" />
    </svg>
  );
}
