# AGENTS.md

## Project Context

Studio website for Beyond Years Designs: React 19 + Vite + Tailwind CSS 4 + React Router + Motion, in plain JavaScript. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Read `CLAUDE.md` for the design direction and development principles, and `README.md` for commands and deployment.

## Key Files

- `src/pages/`: the home page and the case-study page.
- `src/components/studio/`: the site's sections.
- `src/data/projects.js`: project and case-study content.
- `src/data/site.js`: domain, contact details and social links (shared with the build script).
- `src/entry-server.jsx` + `scripts/prerender.mjs`: run after `vite build`; render the home and case-study pages to HTML (which `src/main.jsx` hydrates) with per-route `<head>` metadata, and write `404.html`, `robots.txt` and `sitemap.xml`. Anything browser-only must stay out of the first render (use effects, or `useIsClient` from `src/lib/useIsClient.js`).
- `scripts/make-image-sizes.mjs` (`npm run images`): makes the smaller image copies that srcsets in `src/data/projects.js` point to.

## Working Notes

- Run `npm run lint` and `npm run build` before finishing code changes.
- Don't add dependencies for things the existing setup already handles.
- Code style: double quotes, semicolons, 2-space indentation.
