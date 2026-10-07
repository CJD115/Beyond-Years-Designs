import { useIsClient } from "@/lib/useIsClient";
import { useLondonTime } from "./useLondonTime";
import { useDoorOpen } from "./doorState";
import { FloorLight, Warmth } from "./DoorLight";

// Footer, "The Door Left Open" (pairs with ContactDoor). On desktop it's the
// floor of the room: its top edge is the line the door stands on, and the
// door's light fans out across it. "Back to the door" replaces "back to top".

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

const LINK =
  "inline-flex min-h-11 items-center text-[15px] leading-[1.21] transition-colors duration-300 hover:text-accent lg:text-[max(13px,calc(var(--lu)*13))]";

export default function FooterDoor() {
  const open = useDoorOpen();
  const time = useLondonTime();
  const isClient = useIsClient();
  // the year comes from the visitor's clock, not the build's
  const copyright = `© ${isClient ? `${new Date().getFullYear()} ` : ""}Beyond Years Designs`;

  return (
    <footer className="relative overflow-hidden bg-[#13110d] text-[#f1ebe3] lg:border-t lg:border-[#f1ebe3]/10 lg:[--lu:min(calc(100vw/1440),1.25px)]">
      <Warmth open={open} />

      <div className="relative mx-auto w-full px-6 md:px-10 lg:max-w-[calc(var(--lu)*1440)] lg:px-[calc(var(--lu)*64)]">
        {/* Desktop: the light from the gap, which stands 420 mock-up pixels
            from the left edge */}
        <FloorLight
          size="desktop"
          open={open}
          className="left-[calc(var(--lu)*420)] top-0 hidden h-full w-[calc(var(--lu)*1188)] lg:block"
        />

        <div className="relative border-t border-[#f1ebe3]/12 pt-[25px] pb-[26px] lg:ml-[calc(var(--lu)*556)] lg:flex lg:items-end lg:justify-between lg:border-t-0 lg:pt-[calc(var(--lu)*235.4)] lg:pb-[calc(var(--lu)*111)] lg:pl-[calc(var(--lu)*20)]">
          <div>
            <p className="font-display text-[38px] font-light leading-[1.21] tracking-normal lg:text-[calc(var(--lu)*44)]">
              Bristol, England
            </p>
            <p className="mt-2 flex items-center gap-2 text-[13px] leading-[1.21] text-[#f1ebe3]/60 lg:mt-[calc(var(--lu)*6)] lg:text-[max(11.5px,calc(var(--lu)*12))]">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                {time && <span className="hidden lg:inline">Local time {time} · </span>}
                {copyright}
              </span>
            </p>
          </div>

          <nav aria-label="Footer" className="mt-[13px] lg:mt-0">
            <ul className="flex flex-wrap gap-x-[26px] lg:gap-x-[calc(var(--lu)*26)]">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="basis-full lg:basis-auto">
                <a href="#contact" className={`${LINK} text-accent hover:text-[#f1ebe3] lg:text-[#f1ebe3] lg:hover:text-accent`}>
                  Back to the door ↑
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
