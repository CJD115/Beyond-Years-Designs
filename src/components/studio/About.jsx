import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Reveal from "./Reveal";

const TEAM = [
  {
    name: "Connor",
    role: "Resident Web Developer",
    cardBio:
      "Connor is the tech whizz behind Beyond Years Designs." +
      " A full-stack developer with several years of experience, he has built websites and digital applications across industries from local high-street hairdressers to nationally accredited auction houses and high-end property developers." +
      " He handles the technical side of every project, from building the site itself to making sure everything works as it should.",
    modalBio:
      "Hi there! I’m Connor. Working on the technical side of Beyond Years Designs, my job means ensuring our sites and apps look great, function properly, and make our clients’ lives easier." +
      " I’m a full-stack developer with more than six years of experience with front end and back end systems, and I love seeing projects take shape one line of code at a time." +
      " Some of my previous clients include local hairdressers, nationally accredited auction houses and high-end property developers." +
      "Away from work, I’m a regular at the gym. In fact, a few years ago, I won a charity MMA tournament!" +
      "When I’m not keeping fit, you might just find me playing back through some of my lifelong favourite games, like NieR: Automata, Bloodborne, Outer Wilds, and The Last of Us. ",
      image: "/connor-about.jpg",
  },
  {
    name: "Mike",
    role: "Resident Wordsmith",
    cardBio:
      "Mike is the resident wordsmith at Beyond Years Designs, bringing four years of professional writing experience to the team." +
      " He has written for businesses across automotive resale, financial advice, and construction, as well as working on creative writing of his own." +
      " He takes care of the words: shaping the information, finding the right way to say it, and making sure your website actually sounds like your business.",
    modalBio:
      "Hi there! I’m Mike. I am the words expert behind Beyond Years Designs. " +
      "I’ve been writing professionally for six years now, and I’ve had the opportunity work with some incredible clients across various sectors, including national automotive resale, financial advice and high-end property construction. " +
      "My job is all about conveying information in a clear way, and making sure your brand voice comes through wherever it shows up, from the front page of a website to the fine-print of a pamphlet." +
      "Even when I’m not working, I still love words. You’ll often find me researching the etymology for some obscure or archaic word." +
      "Otherwise, I’m probably reading novels, writing stories, or playing The Witcher 3, Baldur’s Gate 3, or Clair Obscur: Expedition 33. (Or Dungeons & Dragons. Love Dungeons & Dragons.)",
      image: "/mike-about-picture.jpg",
  },
];

export default function About() {
  const [activeMemberIndex, setActiveMemberIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const activeMember = activeMemberIndex !== null ? TEAM[activeMemberIndex] : null;

  useEffect(() => {
    if (!activeMember) return;

    document.body.style.overflow = "hidden";

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    main?.setAttribute("aria-hidden", "true");
    footer?.setAttribute("aria-hidden", "true");

    const rafId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("aria-hidden");
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
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    lastTriggerRef.current?.focus();
  }, [activeMember]);

  const openProfile = (index, trigger) => {
    lastTriggerRef.current = trigger;
    setActiveMemberIndex(index);
  };

  const closeProfile = () => setActiveMemberIndex(null);

  return (
    <>
      <section id="about" className="relative py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 md:mb-24 border-t border-border pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
              Small team,
              <br />
              <span className="font-serif-italic text-accent">serious standards.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 self-end text-base text-muted-foreground leading-relaxed max-w-sm">
            Beyond Years Designs is a small Bristol-based studio founded by Connor and Mike. 
            Between us, we combine web development and professional writing to build websites that work properly and communicate clearly.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-secondary">
                  <button
                    type="button"
                    aria-label={`Read more about ${m.name}`}
                    onClick={(e) => openProfile(i, e.currentTarget)}
                    className="block h-full w-full text-left"
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </button>
                </div>
                <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                  <h3 className="font-display text-3xl md:text-4xl leading-none">{m.name}</h3>
                  <span className="eyebrow">{m.role}</span>
                </div>
                <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
                  {m.cardBio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {activeMember && (
            <motion.div
              className="fixed inset-0 z-[70] bg-foreground/55 backdrop-blur-sm px-4 py-6 md:px-8 md:py-10"
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
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.985 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-h-full overflow-auto border border-border bg-background"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-6 bg-secondary">
                      <img
                        src={activeMember.image}
                        alt={activeMember.name}
                        className="h-full w-full object-cover min-h-[280px] md:min-h-[560px]"
                      />
                    </div>
                    <div className="md:col-span-6 p-6 md:p-10 lg:p-12 flex flex-col">
                      <div className="flex items-start justify-between gap-4 border-b border-border pb-5 md:pb-6">
                        <div>
                          <p className="eyebrow mb-3">Team Profile</p>
                          <h3 id="about-profile-title" className="font-display text-5xl md:text-6xl leading-[0.95]">
                            {activeMember.name}
                          </h3>
                          <p className="mt-3 text-sm md:text-base text-muted-foreground">{activeMember.role}</p>
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

                      <p
                        id="about-profile-bio"
                        className="mt-6 text-base md:text-lg leading-relaxed text-foreground/85 max-w-prose"
                      >
                        {activeMember.modalBio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}