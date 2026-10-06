// Site-wide details, shared by the app and by scripts/prerender.mjs
// (which writes each route's <head> at build time), so the two never drift.
//
// Contact details and social links stay null until they exist: anything null
// is hidden rather than linked to a placeholder.

export const SITE = {
  name: "Beyond Years Designs",
  // The live domain. Canonical URLs, og:url, og:image and sitemap.xml all
  // follow this one line. (Previously the temporary Hostinger domain
  // https://ivory-wasp-465710.hostingersite.com.)
  url: "https://beyondyears.co.uk",
  // Search indexing. "auto" keeps search engines out while `url` is a
  // temporary hosting domain (see TEMPORARY_DOMAINS) and lets them in as soon
  // as `url` is the real domain. true / false force it either way.
  indexing: "auto",
  locale: "en_GB",
  title: "Web Design in Bristol | Beyond Years Designs",
  description:
    "Beyond Years Designs is a Bristol-based two-person web design and development studio. We design, build, and write considered websites for small businesses and creative teams.",
  // 1200 × 630 share image
  ogImage: "/og/home.jpg",
  // Structured data (JSON-LD, written into each page by scripts/prerender.mjs).
  // Only what the site itself states: where the studio is based (town and
  // country, no street address on purpose) and its two founders.
  address: { locality: "Bristol", country: "GB" },
  founders: [
    { name: "Connor", jobTitle: "Resident Web Developer" },
    { name: "Mike", jobTitle: "Resident Wordsmith" },
  ],
  email: null,
  socials: [
    { label: "Instagram", href: null },
    { label: "LinkedIn", href: null },
  ],
};

// Case studies are prerendered to /work/<slug>/index.html, so their canonical
// URL ends in a slash — the form static hosts serve without a redirect.
export const caseStudyPath = (slug) => `/work/${slug}/`;

export const absoluteUrl = (path) => new URL(path, SITE.url).toString();

// Hosts' temporary preview domains, which should never end up in search results
const TEMPORARY_DOMAINS = ["hostingersite.com"];

export function isTemporaryDomain(url) {
  const host = new URL(url).hostname;
  return TEMPORARY_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
}

// When false: robots.txt disallows all crawlers, every page carries
// <meta name="robots" content="noindex">, and no canonical link is written.
export const allowIndexing = SITE.indexing === "auto" ? !isTemporaryDomain(SITE.url) : SITE.indexing === true;

export function caseStudyMeta(project) {
  return {
    title: `${project.name} Case Study | ${SITE.name}`,
    description: `${project.tagline.trim()} Case study for ${project.industry} in ${project.location}. Services: ${project.services.slice(0, 3).join(", ")}.`,
    path: caseStudyPath(project.slug),
    image: `/og/${project.slug}.jpg`,
    type: "article",
  };
}
