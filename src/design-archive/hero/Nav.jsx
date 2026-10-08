import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/data/site";
import { heroDesign } from "@/design-archive/hero/design";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The X-ray hero restyles the nav above it (see .nav-xray in index.css)
  const xray = heroDesign() === "xray";
  const headerRef = useRef(null);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // never slide away while a link inside it has keyboard focus
      if (y < 40 || headerRef.current?.contains(document.activeElement)) {
        setVisible(true);
      } else {
        setVisible(y < last);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    // Everything behind the menu, including the header it opened from
    const behind = [document.querySelector("main"), document.querySelector("footer"), headerRef.current];
    const release = () =>
      behind.forEach((el) => {
        el?.removeAttribute("inert");
        el?.removeAttribute("aria-hidden");
      });

    if (open) {
      behind.forEach((el) => {
        el?.setAttribute("inert", "");
        el?.setAttribute("aria-hidden", "true");
      });

      const rafId = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        window.cancelAnimationFrame(rafId);
        release();
      };
    }

    release();

    return undefined;
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
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
  }, [open]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        // tabbing into the header brings it back if it has slid away
        onFocus={() => setVisible(true)}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${xray ? "nav-xray" : ""} ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* First stop for keyboard users; off-screen until focused */}
        <a
          href="#content"
          className="absolute left-4 top-3 z-10 -translate-y-[200%] bg-background px-4 py-2.5 text-sm font-medium text-foreground opacity-0 focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>
        <NavBar xray={xray} open={open} triggerRef={triggerRef} onOpen={() => setOpen(true)} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-60 bg-background md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span id="mobile-menu-title" className="font-display text-xl tracking-tight leading-none">
                Beyond Years Designs
              </span>
              <button
                ref={closeButtonRef}
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center -mr-2"
              >
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl leading-tight"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            {SITE.email && (
              <div className="px-6 pb-10">
                <a
                  href={`mailto:${SITE.email}`}
                  className="block border-t border-border pt-6 text-sm text-muted-foreground"
                >
                  {SITE.email}
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// The bar itself. The X-ray hero also draws it, with `blueprint`, as the copy
// of the nav seen through its lens: the same layout, but inert (spans rather
// than links), with data-spec labels filled in from its own computed styles.
export function NavBar({ xray, open = false, triggerRef, onOpen, blueprint = false, specs }) {
  const Link = blueprint ? "span" : "a";
  const Bar = blueprint ? "div" : "nav";

  return (
    <Bar className="nav-poster mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
      <Link
        href={blueprint ? undefined : "#top"}
        data-spec={specs?.logo}
        className="nav-logo font-display text-xl tracking-tight leading-none"
      >
        Beyond Years Designs
      </Link>
      <ul className="hidden items-center gap-10 md:flex">
        {LINKS.map((l, i) => (
          <li key={l.href}>
            <Link
              href={blueprint ? undefined : l.href}
              data-spec={i === 0 ? specs?.link : undefined}
              className="nav-link link-underline text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={blueprint ? undefined : "#contact"}
        className="nav-link hidden md:inline-block text-sm font-medium link-underline text-foreground"
      >
        Start a project
      </Link>
      {blueprint ? (
        <span className="nav-menu md:hidden inline-flex h-11 w-11 items-center justify-center -mr-2">
          <span className="flex w-[18px] flex-col gap-1.5">
            <span className="h-0.5 bg-current" />
            <span className="h-0.5 bg-current" />
          </span>
        </span>
      ) : (
        <button
          ref={triggerRef}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu-dialog"
          onClick={onOpen}
          className="nav-menu md:hidden text-foreground inline-flex h-11 w-11 items-center justify-center -mr-2"
        >
          {xray ? (
            <span aria-hidden="true" className="flex w-[18px] flex-col gap-1.5">
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
            </span>
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          )}
        </button>
      )}
    </Bar>
  );
}
