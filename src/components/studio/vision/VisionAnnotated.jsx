import { useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// "Our Vision" — direction B, "Annotated".
// The statement is set like a marked-up proof: an edit in ochre, and margin
// notes from Mike and Connor pinned to the words they're about, using the same
// ochre line and pins as the hero. On desktop the connectors are measured from
// the real word positions, so they stay attached at any size.

// Draft copy — written from the Services and About text; edit freely.
const NOTES = [
  {
    anchor: "thoughtful",
    text: "Something from Mike. Let him cook.",
    by: "Mike — Resident Wordsmith",
  },
  {
    anchor: "websites",
    text: "Designed and built from a blank page. No templates, no stock layouts.",
    by: "Connor — Resident Web Developer",
  },
  {
    anchor: "businesses",
    text: "Like us. we are also one",
  },
];

const EASE = [0.22, 1, 0.36, 1];
const NOTE_GAP = 32; // minimum space between stacked notes
const CONNECTOR_GAP = 18; // space between a connector's end and its note

export default function VisionAnnotated() {
  const reduceMotion = useReducedMotion();
  const areaRef = useRef(null);
  const notesColumnRef = useRef(null);
  const thoughtfulRef = useRef(null);
  const websitesRef = useRef(null);
  const businessesRef = useRef(null);
  const noteRefs = useRef([]);
  const [layout, setLayout] = useState(null);
  const inView = useInView(areaRef, { once: true, amount: 0.35 });
  const show = inView || reduceMotion;

  // Measure word positions → place notes beside their words → draw connectors.
  useLayoutEffect(() => {
    const area = areaRef.current;
    const column = notesColumnRef.current;
    if (!area || !column) return;

    const anchors = {
      thoughtful: thoughtfulRef.current,
      websites: websitesRef.current,
      businesses: businessesRef.current,
    };

    const measure = () => {
      if (column.offsetParent === null) {
        setLayout(null); // notes column hidden (mobile)
        return;
      }
      const a = area.getBoundingClientRect();
      const columnLeft = column.getBoundingClientRect().left - a.left;
      let nextFreeTop = 0;

      const items = NOTES.map((note, i) => {
        const word = anchors[note.anchor];
        const el = noteRefs.current[i];
        if (!word || !el) return null;
        const w = word.getBoundingClientRect();
        // the pin sits just after the word, around its x-height
        const pin = {
          x: w.right - a.left + 10,
          y: w.top - a.top + w.height * (note.anchor === "thoughtful" ? 0.5 : 0.6),
        };
        const firstLine = parseFloat(getComputedStyle(el.firstChild).lineHeight) || 26;
        const top = Math.max(pin.y - firstLine / 2, nextFreeTop);
        nextFreeTop = top + el.offsetHeight + NOTE_GAP;
        const end = { x: columnLeft - CONNECTOR_GAP, y: top + firstLine / 2 };
        const dx = end.x - pin.x;
        const d = `M ${pin.x} ${pin.y} C ${pin.x + dx * 0.45} ${pin.y}, ${end.x - dx * 0.35} ${end.y}, ${end.x} ${end.y}`;
        return { top, pin, d };
      });

      setLayout({
        items,
        height: Math.max(nextFreeTop - NOTE_GAP, area.querySelector("h2").offsetHeight),
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(area);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="vision" className="relative py-28 md:py-40">
      {/* the hero's paper returns, fading in and out at the edges */}
      <div aria-hidden="true" className="vision-paper pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
        <p className="eyebrow mb-10 md:mb-16">Our vision</p>

        <div
          ref={areaRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 lg:gap-8"
          style={layout ? { minHeight: layout.height } : undefined}
        >
          <h2 className="lg:col-span-8 font-display text-[clamp(44px,6.4vw,120px)] leading-[1.04] tracking-[-0.02em] pt-[0.55em]">
            <span className="block">
              Building{" "}
              <span className="relative inline-block">
                <motion.span
                  aria-hidden="true"
                  initial={reduceMotion ? false : { opacity: 1 }}
                  animate={show ? { opacity: 0.32 } : undefined}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                >
                  beautiful
                </motion.span>
                {/* the strike: an ochre rule drawn through the old word */}
                <motion.span
                  aria-hidden="true"
                  className="absolute -left-1 -right-1 top-[52%] h-[2px] origin-left bg-accent"
                  style={{ rotate: "-3deg" }}
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={show ? { scaleX: 1 } : undefined}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                />
                <motion.ins
                  ref={thoughtfulRef}
                  className="absolute left-[0.07em] bottom-[86%] whitespace-nowrap font-serif-italic text-[0.59em] leading-none text-accent no-underline"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={show ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
                >
                  thoughtful
                </motion.ins>
              </span>
            </span>
            <span className="block">
              <span ref={websitesRef}>websites</span>
            </span>
            <span className="block">
              for small <span ref={businessesRef}>businesses</span>
            </span>
            <span className="block">
              with big <span className="font-serif-italic">ambitions.</span>
            </span>
          </h2>

          {/* Desktop: notes in the margin, pinned to their words */}
          <div ref={notesColumnRef} className="relative hidden lg:col-span-3 lg:col-start-10 lg:block">
            {NOTES.map((note, i) => (
              <motion.div
                key={note.anchor}
                ref={(el) => {
                  noteRefs.current[i] = el;
                }}
                className="absolute left-0 right-0"
                style={{ top: layout?.items[i]?.top ?? 0, visibility: layout ? "visible" : "hidden" }}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={show ? { opacity: 1 } : undefined}
                transition={{ duration: 0.7, delay: 1.5 + i * 0.2, ease: EASE }}
              >
                <p className="font-serif-italic text-[clamp(19px,1.5vw,24px)] leading-[1.25] text-foreground">
                  {note.text}
                </p>
                {note.by && <p className="eyebrow mt-3.5">{note.by}</p>}
              </motion.div>
            ))}
          </div>

          {layout && (
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
              {layout.items.map(
                (item, i) =>
                  item && (
                    <g key={NOTES[i].anchor}>
                      <motion.path
                        d={item.d}
                        fill="none"
                        strokeWidth="1"
                        className="stroke-accent"
                        initial={reduceMotion ? false : { pathLength: 0 }}
                        animate={show ? { pathLength: 1 } : undefined}
                        transition={{ duration: 0.8, delay: 1.2 + i * 0.2, ease: EASE }}
                      />
                      <motion.circle
                        cx={item.pin.x}
                        cy={item.pin.y}
                        r="4"
                        className="fill-accent"
                        initial={reduceMotion ? false : { scale: 0 }}
                        animate={show ? { scale: 1 } : undefined}
                        transition={{ duration: 0.4, delay: 1.2 + i * 0.2, ease: EASE }}
                      />
                    </g>
                  ),
              )}
            </svg>
          )}

          {/* Mobile and tablet: the same notes as a quiet list under the statement */}
          <ul className="mt-14 space-y-8 border-t border-border pt-8 lg:hidden">
            {NOTES.map((note) => (
              <li key={note.anchor} className="flex gap-4">
                <span aria-hidden="true" className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="font-serif-italic text-xl leading-snug">
                    <span className="text-accent">{note.anchor} — </span>
                    {note.text}
                  </p>
                  {note.by && <p className="eyebrow mt-2.5">{note.by}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
