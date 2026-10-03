// Runs after the two Vite builds (see the "build" script in package.json):
// the browser build in dist/, and src/entry-server.jsx built into dist-ssr/
// so Node can render the app.
//
// Each page is rendered to HTML here, so its first screen arrives ready to
// show instead of waiting for JavaScript to build it; in the browser,
// main.jsx then takes that HTML over. Link previews and some crawlers never
// run JavaScript, and a static host has no file to serve for /work/<slug>
// otherwise. This writes, into dist/:
//
//   index.html                 home, rendered, with its full <head> metadata and
//                              structured data (LocalBusiness + WebSite)
//   work/<slug>/index.html     one per case study, rendered, with that project's
//                              title, description, canonical, share image and
//                              breadcrumb structured data
//   404.html                   noindex copy for unknown URLs (see public/.htaccess),
//                              left empty: the app renders it in the browser
//   robots.txt, sitemap.xml
//
// While SITE.url is a temporary domain (see allowIndexing in src/data/site.js)
// robots.txt disallows all crawlers and every page is marked noindex.
//
// The seo block and #root are replaced, not added to, so the script can be
// re-run on its own (`node scripts/prerender.mjs`) after changing
// src/data/site.js, as long as dist-ssr/ is still there.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SITE, absoluteUrl, allowIndexing, caseStudyMeta } from "../src/data/site.js";
import { PROJECTS } from "../src/data/projects.js";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT_DIR, "dist");
const SSR_ENTRY = path.join(ROOT_DIR, "dist-ssr", "entry-server.js");
const START = /<!-- seo:start[^>]*-->[\s\S]*?<!-- seo:end -->/;
// #root is the only element in <body>, so it runs to the last </div>
const APP_ROOT = /<div id="root">[\s\S]*<\/div>(?=\s*<\/body>)/;

const { render } = await import(pathToFileURL(SSR_ENTRY).href);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Structured data (JSON-LD). Only facts the site itself states, from
// src/data/site.js; anything not there yet (contact details, profiles, logo,
// service areas) is left out rather than guessed. The home page describes the
// business and the site; each case study gets a breadcrumb back to the home page.
const ORG_ID = absoluteUrl("/#organization");

const homeSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": ORG_ID,
      name: SITE.name,
      url: absoluteUrl("/"),
      description: SITE.description,
      image: absoluteUrl(SITE.ogImage),
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.locality,
        addressCountry: SITE.address.country,
      },
      founder: SITE.founders.map(({ name, jobTitle }) => ({ "@type": "Person", name, jobTitle })),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: SITE.name,
      url: absoluteUrl("/"),
      inLanguage: SITE.locale.replace("_", "-"),
      publisher: { "@id": ORG_ID },
    },
  ],
});

const breadcrumbSchema = (name, pagePath) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name, item: absoluteUrl(pagePath) },
  ],
});

// "<" is escaped so no value can close the <script> element early
const jsonLdScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

// `noindex` marks a page that is never indexed (the 404); allowIndexing is the
// site-wide switch. og:url stays on real pages either way — link previews use it.
function head({ title, description, path: pagePath, image = SITE.ogImage, type = "website", noindex = false, jsonLd }) {
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
    jsonLd && jsonLdScript(jsonLd),
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
  throw new Error("prerender: <!-- seo:start --> … <!-- seo:end --> block not found in dist/index.html");
}
if (!APP_ROOT.test(template)) {
  throw new Error('prerender: <div id="root"> not found in dist/index.html');
}

// `meta.path` is also the route rendered into #root; pages without one stay empty
const page = (meta, { rendered = true } = {}) =>
  template
    .replace(START, `<!-- seo:start -->\n    ${head(meta)}\n    <!-- seo:end -->`)
    .replace(APP_ROOT, () => `<div id="root">${rendered ? render(meta.path) : ""}</div>`);

console.log(
  `prerender: ${SITE.url} — search indexing ${allowIndexing ? "ALLOWED" : "BLOCKED"}` +
    (SITE.indexing === "auto" ? " (auto)" : ` (forced by SITE.indexing = ${SITE.indexing})`),
);

const home = { title: SITE.title, description: SITE.description, path: "/", jsonLd: homeSchema() };
await write("index.html", page(home));

const caseStudies = PROJECTS.map((project) => {
  const meta = caseStudyMeta(project);
  return { ...meta, jsonLd: breadcrumbSchema(project.name, meta.path) };
});
for (const meta of caseStudies) {
  await write(`${meta.path.slice(1)}index.html`, page(meta));
}

await write(
  "404.html",
  page(
    { title: `Page not found | ${SITE.name}`, description: "The page you were looking for could not be found.", noindex: true },
    { rendered: false },
  ),
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
