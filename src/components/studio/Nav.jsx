import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 40) {
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
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
      footer?.setAttribute("aria-hidden", "true");

      const rafId = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        window.cancelAnimationFrame(rafId);
        main?.removeAttribute("inert");
        footer?.removeAttribute("inert");
        main?.removeAttribute("aria-hidden");
        footer?.removeAttribute("aria-hidden");
      };
    }

    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
    main?.removeAttribute("aria-hidden");
    footer?.removeAttribute("aria-hidden");

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
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="nav-poster mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <a href="#top" className="nav-logo font-display text-xl tracking-tight leading-none">
            Beyond Years Designs
          </a>
          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="nav-link link-underline text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="nav-link hidden md:inline-block text-sm font-medium link-underline text-foreground"
          >
            Start a project
          </a>
          <button
            ref={triggerRef}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu-dialog"
            onClick={() => setOpen(true)}
            className="md:hidden text-foreground inline-flex h-11 w-11 items-center justify-center -mr-2"
          >
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </nav>
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
              <span id="mobile-menu-title" className="font-display text-xl">
                Lorem <span className="font-serif-italic text-accent">&amp;</span> Ipsum
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
            <div className="px-6 pb-10">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block border-t border-border pt-6 text-sm text-muted-foreground"
              >
                hello@example.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}