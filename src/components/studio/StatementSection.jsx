import { useEffect } from "react";
import Reveal from "./Reveal";
import { Image } from "@/components/ui/image";
import VisionAnnotated from "./vision/VisionAnnotated";
import VisionReadSlowly from "./vision/VisionReadSlowly";

// "Our Vision" is being tested in three versions. Pick one with the URL:
//   /?vision=annotated   direction B — the marked-up proof with margin notes
//   /?vision=read        direction D — the pinned, read-slowly dark section
//   /                    the original section (default)
// Once a direction is chosen, render it directly and delete the others.
const ALIASES = { annotated: "annotated", b: "annotated", read: "read", d: "read" };

function currentVariant() {
  if (typeof window === "undefined") return "original";
  const key = new URLSearchParams(window.location.search).get("vision");
  return ALIASES[key?.toLowerCase()] ?? "original";
}

export default function StatementSection() {
  const variant = currentVariant();
  return (
    <>
      {variant === "annotated" && <VisionAnnotated />}
      {variant === "read" && <VisionReadSlowly />}
      {variant === "original" && <OriginalStatement />}
      {import.meta.env.DEV && <VariantSwitcher />}
    </>
  );
}

function OriginalStatement() {
  return (
    <section id="vision" className="relative overflow-hidden bg-accent text-foreground py-24 md:py-40 grain min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-7">
            <p className="eyebrow mb-8 text-foreground/60">Our Vision</p>
            <h2 className="font-display text-[10vw] md:text-[5.4vw] leading-[0.98] tracking-[-0.02em] text-balance">
              Building thoughtful websites for small businesses with big ambitions.
              {/* <span className="font-serif-italic">eiusmod tempor.</span> */}
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-foreground/15 shadow-2xl shadow-black/20">
              <Image
                src="https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/72708a541_generated_image.png"
                alt="Lorem ipsum placeholder studio image"
                fittingType="fill"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Development only: a small switcher so the versions can be flicked between
// in place. It never appears in a production build.
function VariantSwitcher() {
  const options = [
    { label: "Original", href: "?", variant: "original" },
    { label: "B · Annotated", href: "?vision=annotated", variant: "annotated" },
    { label: "D · Read slowly", href: "?vision=read", variant: "read" },
  ];
  const active = currentVariant();

  // After switching, land back on the section rather than the top of the page
  useEffect(() => {
    if (window.location.hash !== "#vision") return;
    const timer = window.setTimeout(() => {
      document.getElementById("vision")?.scrollIntoView({ behavior: "instant" });
    }, 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <nav
      aria-label="Vision section versions (development only)"
      className="fixed bottom-4 left-4 z-[80] flex items-center gap-3 bg-foreground px-4 py-2.5 text-xs text-background shadow-lg"
    >
      <span className="opacity-60">Our Vision:</span>
      {options.map((o) => {
        const isActive = o.variant === active;
        return (
          <a
            key={o.label}
            href={`${o.href}#vision`}
            aria-current={isActive ? "true" : undefined}
            className={isActive ? "underline underline-offset-4" : "opacity-80 hover:opacity-100"}
          >
            {o.label}
          </a>
        );
      })}
    </nav>
  );
}
