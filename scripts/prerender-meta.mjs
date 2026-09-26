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

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, absoluteUrl, caseStudyMeta } from "../src/data/site.js";
import { PROJECTS } from "../src/data/projects.js";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const START = /<!-- seo:start[^>]*-->[\s\S]*?<!-- seo:end -->/;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function head({ title, description, path: pagePath, image = SITE.ogImage, type = "website", noindex = false }) {
  const url = pagePath && absoluteUrl(pagePath);
  const img = absoluteUrl(image);
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${esc(url)}" />`,
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
const page = (meta) => template.replace(START, head(meta));

console.log("prerender-meta:");

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

await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`);

const urls = [home, ...caseStudies].map((m) => `  <url><loc>${esc(absoluteUrl(m.path))}</loc></url>`);
await write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
