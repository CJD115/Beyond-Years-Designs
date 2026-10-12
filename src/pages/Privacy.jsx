import { Link } from "react-router-dom";
import ThresholdsNav from "@/components/studio/ThresholdsNav";
import { SITE, privacyMeta } from "@/data/site";
import { useSeo } from "@/lib/seo";

// The privacy notice (/privacy/): what the contact form collects, who handles
// it and for how long, in plain words. Linked from the form and the footer.
//
// Keep it true: update "Who else handles it" when email moves off Hostinger,
// "Cookies" if analytics are ever added, and UPDATED whenever it changes.

const UPDATED = "12 October 2026";

const H2 = "font-display mt-12 text-[28px] font-light leading-[1.15] md:text-[32px]";
const P = "mt-3 text-[16px] leading-[1.7] text-[#f1ebe3]/80";

export default function Privacy() {
  useSeo(privacyMeta);
  const emails = SITE.founders.map(({ email }) => email);

  return (
    <div className="min-h-svh bg-[#13110d] text-[#f1ebe3] antialiased [--accent:30_43%_52%]">
      <ThresholdsNav home="/" />
      <main id="content" tabIndex={-1} className="mx-auto w-full max-w-[44rem] px-6 pt-32 pb-24 focus:outline-none md:px-10">
        <p className="text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75">Privacy</p>
        <h1 className="font-display mt-4 text-[min(56px,13vw)] font-light leading-[1.05] md:text-[72px]">
          Your details, <em className="font-serif-italic text-accent">looked after.</em>
        </h1>
        <p className={`${P} mt-6`}>
          This notice explains what we collect when you get in touch, why, and what happens to it. Last updated {UPDATED}.
        </p>

        <h2 className={H2}>Who we are</h2>
        <p className={P}>
          {SITE.name} is a two-person web design studio in Bristol, run by Connor and Mike. We’re responsible for the
          personal details you send us. You can reach us at <Email address={emails[0]} /> or <Email address={emails[1]} />.
        </p>

        <h2 className={H2}>What we collect</h2>
        <p className={P}>
          When you use our contact form, we receive your name, your email address, the kind of project you’re looking
          for and your message. If you email us directly, we receive whatever you include in your email. We don’t
          collect anything else about you.
        </p>

        <h2 className={H2}>Why we use it</h2>
        <p className={P}>
          Only to reply to you and, if we go on to work together, to talk about your project. We never sell your
          details, share them for marketing or add you to a mailing list.
        </p>

        <h2 className={H2}>Who else handles it</h2>
        <p className={P}>
          Our contact form is delivered to our inbox by Web3Forms, a form-delivery service that processes your message
          on our behalf. Our email is hosted by Hostinger. Neither uses your details for anything else.
        </p>

        <h2 className={H2}>How long we keep it</h2>
        <p className={P}>
          We keep enquiries for 12 months after our last conversation, then delete them. If we work together, we keep what we need for the project and our
          accounts.
        </p>

        <h2 className={H2}>Cookies</h2>
        <p className={P}>This website doesn’t use analytics, advertising or tracking cookies.</p>

        <h2 className={H2}>Your rights</h2>
        <p className={P}>
          You can ask us at any time for a copy of the details we hold about you, or ask us to correct or delete them.
          Just email either of us. If you’re unhappy with how we’ve handled your details, you can complain to the
          Information Commissioner’s Office at{" "}
          <a href="https://ico.org.uk/make-a-complaint/" className="link-underline link-underline-light text-[#f1ebe3]">
            ico.org.uk
          </a>
          .
        </p>

        <Link
          to="/#contact"
          className="mt-14 inline-flex min-h-11 items-center border-b border-[#f1ebe3]/50 text-[15px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          Back to the contact form
        </Link>
      </main>
    </div>
  );
}

function Email({ address }) {
  return (
    <a href={`mailto:${address}`} className="link-underline link-underline-light text-[#f1ebe3]">
      {address}
    </a>
  );
}
