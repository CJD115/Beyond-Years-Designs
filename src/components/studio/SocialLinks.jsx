import { liveSocials } from "@/data/site";

// Instagram and LinkedIn marks, drawn as single-weight outlines to sit with
// the site's thin rules rather than as solid brand badges. Lucide no longer
// ships brand icons, so they're inline here.
const ICONS = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5v6M7.5 7.4v.1M11 16.5v-6M11 13.2c0-1.6 1-2.7 2.5-2.7s2.5 1 2.5 2.7v3.3" />
    </>
  ),
};

// A row of icon links. `owner` names whose profiles they are, for the
// accessible names ("Connor on LinkedIn"). Anything without an href is left
// out, and with none at all nothing renders.
export default function SocialLinks({
  socials,
  owner,
  className = "",
  linkClassName = "",
  iconClassName = "h-[19px] w-[19px]",
}) {
  const live = liveSocials(socials);
  if (!live.length) return null;

  return (
    <ul className={`flex items-center ${className}`}>
      {live.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${owner} on ${label} (opens in a new tab)`}
            className={`inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 ${linkClassName}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={iconClassName}
            >
              {ICONS[label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
