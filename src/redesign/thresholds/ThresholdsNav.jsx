import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SITE } from "@/data/site";

// The Thresholds header (p.2): the wordmark, "Start a project" and "Menu",
// with no links in the bar. Menu opens a full dark menu. It's clear over the
// hero, turns solid once you scroll, and slides away while you scroll down.
// The menu is a native <dialog>, which keeps focus inside it and closes on
// Escape by itself.

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function ThresholdsNav() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < 40 || y < last || headerRef.current?.contains(document.activeElement));
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={false}
        animate={{ y: visible ? 0 : -96 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onFocus={() => setVisible(true)}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 lg:[--lu:min(calc(100vw/1440),1.25px)] ${
          scrolled ? "border-[#f1ebe3]/8 bg-[#13110d]/95" : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#content"
          className="absolute left-4 top-3 z-10 -translate-y-[200%] bg-[#f1ebe3] px-4 py-2.5 text-sm font-medium text-[#13110d] opacity-0 focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>
        <nav className="mx-auto flex items-center justify-between px-6 py-3 md:px-10 lg:max-w-[calc(var(--lu)*1440)] lg:px-[calc(var(--lu)*64)] lg:py-[max(12px,calc(var(--lu)*22))]">
          <a href="#top" className="font-display text-[21px] font-light tracking-normal lg:text-[max(19px,calc(var(--lu)*22))]">
            Beyond Years Designs
          </a>
          <div className="flex items-center gap-[calc(var(--lu)*40)]">
            <a
              href="#contact"
              className="hidden min-h-11 items-center text-[max(14px,calc(var(--lu)*15))] font-medium transition-colors duration-300 hover:text-accent lg:inline-flex"
            >
              Start a project
            </a>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-11 min-w-11 items-center justify-center gap-[14px] border border-[#f1ebe3]/60 text-[max(14px,calc(var(--lu)*15))] font-medium transition-colors duration-300 hover:text-accent lg:border-0"
            >
              <span className="sr-only lg:not-sr-only">Menu</span>
              <MenuIcon />
            </button>
          </div>
        </nav>
      </motion.header>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#13110d] p-0 text-[#f1ebe3] backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="flex items-center justify-between px-6 py-3 md:px-10 lg:px-16 lg:py-6">
          <span className="font-display text-[21px] font-light tracking-normal">Beyond Years Designs</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 items-center gap-3 px-3 text-[15px] font-medium transition-colors duration-300 hover:text-accent"
          >
            Close
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-1 px-6 md:px-10 lg:px-16">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="group inline-flex items-baseline gap-5 py-1 font-display text-[clamp(48px,8vw,96px)] font-light leading-[1.05] tracking-normal transition-colors duration-300 hover:text-accent"
              >
                <span aria-hidden="true" className="font-serif-italic text-[0.3em] text-accent">
                  {["I", "II", "III", "IV"][i]}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="px-6 pb-10 text-[13px] tracking-normal text-[#f1ebe3]/60 md:px-10 lg:px-16">
          Bristol, England{SITE.email ? ` · ${SITE.email}` : ""}
        </p>
      </dialog>
    </>
  );
}

// Two lines, the lower one shorter
function MenuIcon() {
  return (
    <span aria-hidden="true" className="flex w-[22px] flex-col items-end gap-[6px]">
      <span className="h-px w-full bg-current" />
      <span className="h-px w-[15px] bg-current" />
    </span>
  );
}
