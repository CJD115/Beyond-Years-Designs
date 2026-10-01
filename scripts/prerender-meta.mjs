// Runs after `vite build` (see the "build" script in package.json).
//
// The site is a single-page app, so every URL is served the same index.html.
// Link previews and some crawlers never run JavaScript, and a static host has
// no file to serve for /work/<slug>. This writes, into dist/:
//
//   index.html                 home, with its full <head> metadata
//   work/<slug>/index.html     one copy per case study, with that project's
//                              title, description, canonical and share image
//   404.html                   noindex copy for unknown URLs (see public/.htaccess)
//   robots.txt, sitemap.xml
//
// Every page still boots the same React app; only the <head> differs.
//
// While SITE.url is a temporary domain (see allowIndexing in src/data/site.js)
// robots.txt disallows all crawlers and every page is marked noindex.
//
// The seo markers are kept in the output, so the script can be re-run on its
// own (`node scripts/prerender-meta.mjs`) after changing src/data/site.js.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, absoluteUrl, allowIndexing, caseStudyMeta } from "../src/data/site.js";
import { PROJECTS } from "../src/data/projects.js";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const START = /<!-- seo:start[^>]*-->[\s\S]*?<!-- seo:end -->/;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// `noindex` marks a page that is never indexed (the 404); allowIndexing is the
// site-wide switch. og:url stays on real pages either way — link previews use it.
function head({ title, description, path: pagePath, image = SITE.ogImage, type = "website", noindex = false }) {
  const indexable = allowIndexing && !noindex;
  const url = pagePath && absoluteUrl(pagePath);
  const img = absoluteUrl(image);
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    indexable ? `<link rel="canonical" href="${esc(url)}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    !noindex && `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

async function write(rel, html) {
  const file = path.join(DIST, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`  ${rel}`);
}

const template = await readFile(path.join(DIST, "index.html"), "utf8");
if (!START.test(template)) {
  throw new Error("prerender-meta: <!-- seo:start --> … <!-- seo:end --> block not found in dist/index.html");
}
const page = (meta) =>
  template.replace(START, `<!-- seo:start -->\n    ${head(meta)}\n    <!-- seo:end -->`);

console.log(
  `prerender-meta: ${SITE.url} — search indexing ${allowIndexing ? "ALLOWED" : "BLOCKED"}` +
    (SITE.indexing === "auto" ? " (auto)" : ` (forced by SITE.indexing = ${SITE.indexing})`),
);

const home = { title: SITE.title, description: SITE.description, path: "/" };
await write("index.html", page(home));

const caseStudies = PROJECTS.map(caseStudyMeta);
for (const meta of caseStudies) {
  await write(`${meta.path.slice(1)}index.html`, page(meta));
}

await write(
  "404.html",
  page({ title: `Page not found | ${SITE.name}`, description: "The page you were looking for could not be found.", noindex: true }),
);

await write(
  "robots.txt",
  allowIndexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
    : `# Search indexing is off (${SITE.indexing === "auto" ? "temporary domain" : "SITE.indexing = false"}; see src/data/site.js)\nUser-agent: *\nDisallow: /\n`,
);

const urls = [home, ...caseStudies].map((m) => `  <url><loc>${esc(absoluteUrl(m.path))}</loc></url>`);
await write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
