# Design archive

Previous versions, experiments and alternative concepts, kept for reference.
**Nothing in here is on the site, and nothing in here can be reached from it:**
no route, query string or switch loads any of it, it isn't bundled, and
Tailwind doesn't scan it (`@source not` in `src/index.css`).

The site is the Rooms design (October 2026), and only that:

- `/`: `src/pages/Home.jsx`
- `/work/:slug`: `src/pages/CaseStudy.jsx`, with its copy in `src/data/caseStudies.js`

Everything those pages render lives in `src/components/studio/`.

## Rules

- Production code never imports from here.
- Archived files import with the `@/` alias, so their imports still point at
  real files (some at live components, some at each other). They aren't
  routed anywhere, so they don't run; to look at one, temporarily render it
  from a page on the dev server.
- To bring a design back: move it into `src/components/studio/`, render it
  from the page, and move the version it replaces in here.

## Contents

| Folder | What's in it |
| --- | --- |
| `home/` | `HomeOriginal.jsx`, the homepage before Rooms: light nav, every section on paper |
| `case-study/` | `CaseStudyOriginal.jsx`, the case study before Rooms (reads `src/data/projects.js` only) |
| `hero/` | `Nav.jsx` (the light nav), `Hero.jsx` (its switch), `HeroXray.jsx` with `Blueprint.jsx` and `measure.js` (Under the Surface), `HeroOriginal.jsx` (Hero 3.10), `design.js`, and their styles in `hero.css` |
| `work/` | `Work.jsx` (switch), `WorkRooms.jsx` (pinned prints), `WorkClassic.jsx`, `WorkIndex.jsx` |
| `vision/` | `Vision.jsx` (switch), `VisionOriginal.jsx`, `VisionReadSlowly.jsx` |
| `services/` | `Services.jsx` (switch), `ServicesOriginal.jsx` |
| `why/` | `WhyStudio.jsx` (switch), `WhyOriginal.jsx` |
| `process/` | `Process.jsx` (switch), `ProcessOriginal.jsx`, `ProcessCorridor.jsx` with its drawing `Corridor.jsx` |
| `about/` | `About.jsx` (switch), `AboutProfiles.jsx` |
| `aftercare/` | `Aftercare.jsx` (switch), `AftercareNote.jsx`, `AftercareCard.jsx`, `AddOns.jsx` |
| `contact/` | `FinalCTA.jsx` + `Footer.jsx` (switches), `ContactOriginal.jsx` + `FooterOriginal.jsx`, `design.js` |
| `shared/` | `Mockup.jsx` and `PrintTrail.jsx`, used only by archived designs |
| `thresholds/` | The all-dark Thresholds homepage (`ThresholdsHome.jsx`) and the sections built only for it |

The switch files are the old one-word section pickers (`LIVE = "..."` with
`?section=` previews on the dev server). They're kept as they were and do
nothing now.

## Kept elsewhere

- **Mock-ups that were never built** (Aftercare option A "The list",
  Selected Work "Feature + archive", Our Vision "Small / Big" and "Doorway",
  the hero concepts and the About card ideas) are on the design canvas, not
  in code.
