import { Link } from "react-router-dom";
import ThresholdsNav from "@/components/studio/ThresholdsNav";

const LINK =
  "inline-flex min-h-11 items-center border-b border-[#f1ebe3]/50 text-[15px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent";

// The not-found page, for unknown URLs and for case studies that don't exist
// (/work/<slug>). Dark like the rooms, with the header, so it feels like
// part of the site rather than an error screen.
export default function NotFound({ message = "The page you were looking for isn’t here. It may have moved, or the link may be wrong." }) {
  return (
    <div className="min-h-svh bg-[#13110d] text-[#f1ebe3] antialiased [--accent:30_43%_52%]">
      <ThresholdsNav home="/" />
      <main id="content" tabIndex={-1} className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center px-6 py-28 focus:outline-none md:px-10">
        <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75">404</p>
        <h1 className="font-display mt-4 text-[min(64px,15vw)] font-light leading-[1.02] md:text-[84px]">
          No room <em className="font-serif-italic text-accent">here.</em>
        </h1>
        <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.6] text-[#f1ebe3]/80">{message}</p>
        <div className="mt-8 flex flex-wrap gap-x-9 gap-y-2">
          <Link to="/" className={LINK}>
            Back to the homepage
          </Link>
          <Link to="/#work" className={LINK}>
            See our work
          </Link>
          <Link to="/#contact" className={LINK}>
            Start a project
          </Link>
        </div>
      </main>
    </div>
  );
}
