import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useIsClient } from "@/lib/useIsClient";
import Reveal from "./Reveal";

// Portraits are exported at 640 and 1280px wide (name-640.webp, name.webp)
const CARD_SIZES = "(min-width: 1600px) 704px, (min-width: 768px) 45vw, 100vw";
const MODAL_SIZES = "(min-width: 768px) 512px, 100vw";

const TEAM = [
  {
    name: "Connor",
    role: "Resident Web Developer",
    cardBio:
      "Technical co-founder behind Beyond Years Designs, and the reason every site looks, works and feels the way it does." +
      " A full-stack developer with several years of experience, he has built websites and digital applications across industries from local high-street hairdressers to nationally accredited auction houses and high-end property developers." +
      " He builds every site from the ground up, treating each one less like a page and more like a place people step into.",
    // One string per paragraph
    modalBio: [
      "The first thing I ever made was a game about a man stuck in a room with his thoughts. It was rough, and I never finished it, but it said something I was feeling at the time. That’s still why I make things.",
      "I’m Connor, the technical half of Beyond Years Designs. I design and build websites, but I don’t really think of them as pages. I think of them as places. For Groves Hairstyling, I wanted the site to feel like walking into the salon itself: marble, crystal, that quiet sense of being looked after.",
      "Most websites play it safe. They try to please everyone and end up pleasing no one. I’d rather help a business look exactly like who they are.",
    ],
    teaser:
      "The first thing I ever made was a game about a man stuck in a room with his thoughts.",
    image: "/team/connor.webp",
    imageSrcSet: "/team/connor-640.webp 640w, /team/connor.webp 1280w",
    imageSize: [1280, 1920],
  },
  {
    name: "Mike",
    role: "Resident Wordsmith",
    cardBio:
      "Mike is the resident wordsmith at Beyond Years Designs, bringing six years of professional writing experience to the team." +
      " He has written for businesses across automotive resale, financial advice, and construction, as well as working on creative writing of his own." +
      " He takes care of the words: shaping the information, finding the right way to say it, and making sure your website actually sounds like your business.",
    modalBio: [
      "Hi there! I’m Mike. I am the words expert behind Beyond Years Designs. I’ve been writing professionally for six years now, and I’ve had the opportunity to work with some incredible clients across various sectors, including national automotive resale, financial advice and high-end property construction.",
      "My job is all about conveying information in a clear way, and making sure your brand voice comes through wherever it shows up, from the front page of a website to the fine-print of a pamphlet.",
      "Even when I’m not working, I still love words. You’ll often find me researching the etymology for some obscure or archaic word. Otherwise, I’m probably reading novels, writing stories, or playing The Witcher 3, Baldur’s Gate 3, or Clair Obscur: Expedition 33. (Or Dungeons & Dragons. Love Dungeons & Dragons.)",
    ],
    teaser: "Even when I’m not working, I still love words.",
    image: "/team/mike.webp",
    imageSrcSet: "/team/mike-640.webp 640w, /team/mike.webp 1280w",
    imageSize: [1280, 1792],
  },
];

export default function About() {
  const [activeMemberIndex, setActiveMemberIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const continueRefs = useRef([]);
  const goToContactRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isClient = useIsClient(); // the profile portal needs document.body
  const activeMember =
    activeMemberIndex !== null ? TEAM[activeMemberIndex] : null;

  useEffect(() => {
    if (!activeMember) return;

    document.body.style.overflow = "hidden";

    // The dialog is portalled to <body>, so the whole app — header included —
    // can be made inert behind it
    const app = document.getElementById("root");
    app?.setAttribute("inert", "");
    app?.setAttribute("aria-hidden", "true");

    const rafId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
      app?.removeAttribute("inert");
      app?.removeAttribute("aria-hidden");
    };
  }, [activeMember]);

  useEffect(() => {
    if (!activeMember) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveMemberIndex(null);
        return;
      }

      if (e.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;

      const focusable = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeMember]);

  useEffect(() => {
    if (activeMember) return;

    // Leaving via "Start a project": the page is scrollable and no longer
    // inert by now, so move to the contact section instead of back to the card
    if (goToContactRef.current) {
      goToContactRef.current = false;
      const contact = document.getElementById("contact");
      if (!contact) return;
      contact.setAttribute("tabindex", "-1");
      contact.focus({ preventScroll: true });
      contact.scrollIntoView();
      return;
    }

    lastTriggerRef.current?.focus();
  }, [activeMember]);

  const openProfile = (index, trigger) => {
    lastTriggerRef.current = trigger;
    setActiveMemberIndex(index);
  };

  const closeProfile = () => setActiveMemberIndex(null);

  const startProject = (e) => {
    e.preventDefault();
    goToContactRef.current = true;
    closeProfile();
  };

  return (
    <>
      <section id="about" className="relative py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
          <Reveal className="mb-16 md:mb-24 border-t border-border pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">About</p>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] max-w-2xl">
                Small team,
                <br />
                <span className="font-serif-italic text-accent">
                  serious standards.
                </span>
              </h2>
            </div>
            <p className="md:col-span-4 md:col-start-9 self-end text-base text-muted-foreground leading-relaxed max-w-lg">
              Beyond Years Designs is a small, Bristol-based team founded by Connor and Mike.
              After a decade of friendship, we finally decided it was time to put our heads together and do what we do best.
              <br />
              <br />
              Combining web development and professional writing, all of our projects are designed to function flawlessly and communicate effectively.
              We work closely with clients from the first conversation to the finished product to ensure we give you what your business actually needs.
              <br />
              <br />
              If you’re making something worth putting in front of the world, we want to help put it there.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="group">
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-secondary">
                    {/* Mouse shortcut to the same profile as "Continue reading"
                        below, so it's kept out of the tab order and hidden from
                        screen readers; focus returns to that button on close */}
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => openProfile(i, continueRefs.current[i])}
                      className="block h-full w-full text-left"
                    >
                      <img
                        src={m.image}
                        srcSet={m.imageSrcSet}
                        sizes={CARD_SIZES}
                        width={m.imageSize[0]}
                        height={m.imageSize[1]}
                        alt={m.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </button>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                    <h3 className="font-display text-3xl md:text-4xl leading-none">
                      {m.name}
                    </h3>
                    <span className="eyebrow">{m.role}</span>
                  </div>
                  <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
                    {m.cardBio}
                  </p>
                  <button
                    ref={(el) => {
                      continueRefs.current[i] = el;
                    }}
                    type="button"
                    aria-label={`Continue reading about ${m.name}`}
                    onClick={(e) => openProfile(i, e.currentTarget)}
                    className="mt-8 flex max-w-[30rem] flex-col gap-[18px] border-t border-border pt-6 text-left"
                  >
                    <span className="font-serif-italic text-[1.625rem] md:text-[1.75rem] leading-[1.18] tracking-[-0.01em] text-foreground transition-colors duration-500 group-hover:text-accent group-focus-within:text-accent motion-reduce:transition-none">
                      “{m.teaser}”
                    </span>
                    <span className="eyebrow inline-flex items-center gap-2.5 text-foreground">
                      Continue reading
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transition-none"
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {isClient && createPortal(
        <AnimatePresence>
          {activeMember && (
            <motion.div
              className="fixed inset-0 z-70 bg-foreground/55 backdrop-blur-sm px-4 py-6 md:px-8 md:py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) closeProfile();
              }}
            >
              <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="about-profile-title"
                  aria-describedby="about-profile-bio"
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 20,
                    scale: shouldReduceMotion ? 1 : 0.98,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 12,
                    scale: shouldReduceMotion ? 1 : 0.985,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full max-h-full overflow-auto border border-border bg-background"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-6 bg-secondary">
                      <img
                        src={activeMember.image}
                        srcSet={activeMember.imageSrcSet}
                        sizes={MODAL_SIZES}
                        width={activeMember.imageSize[0]}
                        height={activeMember.imageSize[1]}
                        alt={activeMember.name}
                        decoding="async"
                        className="h-full w-full object-cover object-[center_25%] min-h-[280px] max-h-[50svh] md:object-center md:min-h-[560px] md:max-h-none"
                      />
                    </div>
                    <div className="md:col-span-6 p-6 md:p-10 lg:p-12 flex flex-col">
                      <div className="flex items-start justify-between gap-4 border-b border-border pb-5 md:pb-6">
                        <div>
                          <p className="eyebrow mb-3">Team Profile</p>
                          <h2
                            id="about-profile-title"
                            className="font-display text-5xl md:text-6xl leading-[0.95]"
                          >
                            {activeMember.name}
                          </h2>
                          <p className="mt-3 text-sm md:text-base text-muted-foreground">
                            {activeMember.role}
                          </p>
                        </div>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          onClick={closeProfile}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background/60 hover:bg-secondary transition-colors"
                          aria-label="Close profile dialog"
                        >
                          <X className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div
                        id="about-profile-bio"
                        className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-foreground/85 max-w-prose"
                      >
                        {activeMember.modalBio.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="mt-10 border-t border-border pt-6 md:mt-auto">
                        <a
                          href="#contact"
                          onClick={startProject}
                          className="group/cta eyebrow inline-flex items-center gap-2.5 text-foreground"
                        >
                          Start a project
                          <ArrowRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover/cta:translate-x-1 group-focus-visible/cta:translate-x-1 motion-reduce:transition-none"
                            strokeWidth={1.5}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
