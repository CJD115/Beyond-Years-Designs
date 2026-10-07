# Design archive

Previous versions, experiments and alternative concepts we've deliberately kept
for later. Nothing in here is on the live site.

**Production** is `src/components/studio/` (plus `src/pages/`, `src/data/`).
Only what the site actually renders lives there.

**Archive** is this folder, grouped by the section each design belongs to.

## Rules

- Production code never imports from here directly. The only link is a
  dev-only preview in each section's wrapper, e.g.
  `import.meta.env.DEV ? lazy(() => import("@/design-archive/..."))`.
  In a production build `import.meta.env.DEV` is `false`, so the import is
  removed and nothing in this folder is bundled.
- Archived files import shared pieces with the `@/` alias
  (`@/components/studio/Reveal`, `@/data/...`), so they keep working from here.
- To bring a design back: move it into `src/components/studio/<section>/`,
  render it from the section wrapper, and move the old live version in here.

## Previewing (dev server only: `npm run dev`)

| Section | URL | Shows |
| --- | --- | --- |
| Selected Work | `/?work=classic` | `work/WorkClassic.jsx` |
| Selected Work | `/?work=index` | `work/WorkIndex.jsx` |
| Our Vision | `/?vision=original` | `vision/VisionOriginal.jsx` |
| Our Vision | `/?vision=read` | `vision/VisionReadSlowly.jsx` |
| Aftercare | `/?aftercare=c` | `aftercare/AftercareCard.jsx` |
| Aftercare | `/?aftercare=original` | `aftercare/AddOns.jsx` |
| About | `/?about=profiles` | `components/studio/about/AboutProfiles.jsx` |
| About | `/?about=lights` | `components/studio/about/AboutLightsOn.jsx` |

The query string does nothing on the live site.

| Contact + footer | `/?contact=original` | `components/studio/contact/ContactOriginal.jsx` + `FooterOriginal.jsx` |
| Contact + footer | `/?contact=door` | `components/studio/contact/ContactDoor.jsx` + `FooterDoor.jsx` |

| Process | `/?process=original` | `components/studio/process/ProcessOriginal.jsx` |
| Process | `/?process=corridor` | `components/studio/process/ProcessCorridor.jsx` |
| Services | `/?services=original` | `components/studio/services/ServicesOriginal.jsx` |
| Services | `/?services=exploded` | `components/studio/services/ServicesExploded.jsx` |

| Selected Work | `/?work=rooms` | `components/studio/work/WorkRooms.jsx` |
| Selected Work | `/?work=three` | `components/studio/work/WorkThreeRooms.jsx` |

**Selected Work, Services, Process, About and Contact are the exceptions to the rules
below:** two finished designs of each are kept in production, and one word
picks the one the site shows, so swapping is a one-word change:

- Selected Work: `LIVE` in `components/studio/Work.jsx` ("three" for Three
  Rooms, "rooms" for Rooms). Three Rooms reads each project's `room` entry in
  `src/data/projects.js` (background photo, framed screenshot, one line).

- Process: `LIVE` in `components/studio/Process.jsx` (designs in
  `components/studio/process/`; the corridor drawing is `Corridor.jsx`).
- Services: `LIVE` in `components/studio/Services.jsx` (designs in
  `components/studio/services/`; the Exploded View copy is in
  `src/data/services.js`).
- About: `LIVE` in `components/studio/About.jsx` (designs in
  `components/studio/about/`, both reading `src/data/team.js`).
- Contact + footer, swapped as a pair: `LIVE` in
  `components/studio/contact/design.js`. Both contact designs send enquiries
  through the same `contact/useEnquiryForm.js`.

## Contents

### `work/`

Live version: `components/studio/work/WorkRooms.jsx` ("Rooms"), via `Work.jsx`.

- **WorkClassic.jsx**: the original Selected Work layout (large image cards).
- **WorkIndex.jsx**: a typographic project index with a hover preview that
  follows the cursor. It used to sit, commented out, under Selected Work in
  `Home.jsx`. `WorkIndexSection` (added when archived) is that wrapper.

### `vision/`

Live version: `components/studio/vision/VisionAnnotated.jsx` ("Annotated"), via
`Vision.jsx`.

- **VisionOriginal.jsx**: the original ochre statement section.
- **VisionReadSlowly.jsx**: direction D, "Read slowly": the statement brightens
  word by word as you scroll.

### `aftercare/`

Live version: `components/studio/aftercare/AftercareNote.jsx` (option B, the
handover note), via `Aftercare.jsx`.

- **AftercareCard.jsx**: option C, the aftercare card: one pinned print set like
  a price list. Reads the same items from `src/data/aftercare.js`, including the
  `terms` field the live version doesn't show.
- **AddOns.jsx**: the first "Optional add-ons / Beyond launch" section (the
  six-cell grid), kept as it was, including its own copy.

## Kept elsewhere

- **Mock-ups that were never built** (Aftercare option A "The list",
  Selected Work "Feature + archive", Our Vision "Small / Big" and "Doorway",
  the hero concepts and the About card ideas) are on the design canvas, not
  in code.
