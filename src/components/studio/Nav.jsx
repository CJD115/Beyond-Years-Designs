import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 40) {
        setVisible(false);
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
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <a href="#top" className="font-display text-xl tracking-tight leading-none">
            Lorem <span className="font-serif-italic text-accent">&amp;</span> Ipsum
          </a>
          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden md:inline-block text-sm font-medium link-underline text-foreground"
          >
            Contact
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden text-foreground"
          >
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-60 bg-background md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-xl">
                Lorem <span className="font-serif-italic text-accent">&amp;</span> Ipsum
              </span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
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