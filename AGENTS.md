# AGENTS.md

## Project Context

Studio website for Beyond Years Designs: React 19 + Vite + Tailwind CSS 4 + React Router + Motion, in plain JavaScript. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Read `CLAUDE.md` for the design direction and development principles, and `README.md` for commands and deployment.

## Key Files

- `src/pages/`: the home page and the case-study page.
- `src/components/studio/`: the site's sections.
- `src/data/projects.js`: project and case-study content.
- `src/data/site.js`: domain, contact details and social links (shared with the build script).
- `scripts/prerender-meta.mjs`: runs after `vite build`; writes per-route `<head>` metadata, `404.html`, `robots.txt` and `sitemap.xml`.

## Working Notes

- Run `npm run lint` and `npm run build` before finishing code changes.
- Don't add dependencies for things the existing setup already handles.
- Code style: double quotes, semicolons, 2-space indentation.
