// Site-wide details, shared by the app and by scripts/prerender-meta.mjs
// (which writes each route's <head> at build time), so the two never drift.
//
// Contact details and social links stay null until they exist: anything null
// is hidden rather than linked to a placeholder.

export const SITE = {
  name: "Beyond Years Designs",
  // Temporary Hostinger domain. Change this one line when the real domain is
  // live; canonical URLs, og:url, og:image and sitemap.xml all follow it.
  url: "https://ivory-wasp-465710.hostingersite.com",
  locale: "en_GB",
  title: "Beyond Years Designs | Web Design and Development Studio",
  description:
    "Beyond Years Designs is a Bristol-based two-person web design and development studio. We design, build, and write considered websites for small businesses and creative teams.",
  // 1200 × 630 share image
  ogImage: "/og/home.jpg",
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

export function caseStudyMeta(project) {
  return {
    title: `${project.name} Case Study | ${SITE.name}`,
    description: `${project.tagline.trim()} Case study for ${project.industry} in ${project.location}. Services: ${project.services.slice(0, 3).join(", ")}.`,
    path: caseStudyPath(project.slug),
    image: `/og/${project.slug}.jpg`,
    type: "article",
  };
}
