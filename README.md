# Beyond Years Designs

Studio website for Beyond Years Designs, a two-person web design and development studio in Bristol.

React 19, Vite, Tailwind CSS 4, React Router and Motion. Plain JavaScript.

## Commands

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run lint
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

`npm run build` runs `vite build` and then `scripts/prerender-meta.mjs`, which writes a copy of the page for each case study (`dist/work/<slug>/index.html`) with its own title, description, canonical URL and share image, plus `404.html`, `robots.txt` and `sitemap.xml`.

## Deploying

The live site is the contents of `dist/` uploaded to Hostinger. Include the dotfile `dist/.htaccess`, which points unknown URLs at the app's not-found page.

The site's domain, contact email and social links live in `src/data/site.js`. When the permanent domain is live, change `SITE.url` there and rebuild; canonical URLs, share images and the sitemap all follow it. The email and social links stay hidden until they're filled in.

Search indexing follows the domain automatically (`SITE.indexing: "auto"`). While `SITE.url` is a temporary Hostinger domain (`*.hostingersite.com`), the build writes a `robots.txt` that disallows all crawlers, marks every page `noindex` and leaves out canonical links. Once `SITE.url` is the real domain, the next build allows indexing, adds canonical links and points `robots.txt` at the sitemap. The build log states which mode it used. Set `indexing` to `true` or `false` to override.

## Content

- Projects and case studies: `src/data/projects.js`
- Share images (1200 × 630): `public/og/`
- `npm run capture:work` takes fresh screenshots of the client sites listed in `scripts/work-sites.json` (see the notes at the top of `scripts/capture-work.mjs`).
