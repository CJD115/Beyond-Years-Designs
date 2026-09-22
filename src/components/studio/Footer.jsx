import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        })
      );
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-background/20 pt-10">
          <div className="md:col-span-6">
            <p className="eyebrow text-background/50 mb-4">Beyond Years Designs</p>
            <p className="font-display text-3xl md:text-5xl leading-tight max-w-lg">
              A small studio
              <br />
              <span className="font-serif-italic text-accent">with a clear point of view.</span>
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-8 flex flex-col gap-3 text-sm">
            <span className="eyebrow text-background/50 mb-1">Navigate</span>
            <a href="#work" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">Work</a>
            <a href="#services" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">Services</a>
            <a href="#about" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">About</a>
            <a href="#contact" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">Contact</a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <span className="eyebrow text-background/50 mb-1">Elsewhere</span>
            <a href="#" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">Instagram</a>
            <a href="#" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">LinkendIn</a>
            <a href="#" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1 text-background/80">Email</a>
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="font-display text-[12vw] md:text-[8vw] leading-[0.85] tracking-[-0.03em] text-background/90">
            Bristol, UK
          </p>
          <div className="flex flex-col md:items-end gap-1 text-sm text-background/50">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Local time {time}
            </span>
            <span>© {new Date().getFullYear()} Beyond Years Designs. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}