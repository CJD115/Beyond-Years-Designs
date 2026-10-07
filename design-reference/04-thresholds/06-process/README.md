# Process — "The Corridor" (direction 04 Thresholds)

Design reference for building the Process section of the redesign. It was designed on a canvas, not in this codebase. Treat these files as the visual spec, not as code to copy.

## Files in this folder

- `desktop-stage-1.png` … `desktop-stage-4.png`: the desktop design at 1440×1000, one image per stage. These are the target look.
- `desktop.dc.html`: the source of the desktop mockup. It's plain HTML/CSS plus a small logic class. Use it for exact colours, sizes, positions, copy and behaviour. It uses a canvas-only template syntax (`{{ }}`, `<sc-for>`, `class Component extends DCLogic`), so **don't** copy that syntax. Rebuild it as a normal React component.
- `phone.png`, `phone.dc.html`: the phone mockup (390px wide). It was made **before** the desktop was refined. Use it for the phone **interaction pattern** (one portrait view, tap or swipe to walk through the next door). Use the **desktop's visual system** (centred thresholds, lintel label and sill line) for the look.

## The idea

There are four thresholds nested on one central axis, with the finished website lit at the far end (stage 04).

- Each of stages 01–03 is a doorway "face" around the next opening:
  - its **label** sits centred on the lintel above the opening (e.g. `01 — Groundwork`, number in ochre);
  - **one line** sits centred on the sill below it.
- Moving through the stages "walks" the viewer forward:
  - the view scales about the lit door;
  - the threshold you pass fades away;
  - the current stage's text is at full strength;
  - stages ahead wait at half strength.
- At stage 04, the finished site fills most of the view.

### Sill lines

| Stage | Sill line |
|---|---|
| 01 | Your style, your content, your vision. |
| 02 | Milestones and deadlines, agreed. |
| 03 | One line of code at a time. |
| 04 | Caption under the lit site: `04 — Project complete` |

The stage title and body text at the bottom left come from the existing `STEPS` data in `src/components/studio/Process.jsx`. The mockup uses slightly trimmed versions of it. Reuse that data rather than retyping the copy.

## Exact values (desktop mockup, 1440×1000 stage)

### Colours

| Token | Value |
|---|---|
| Background | `#14110E` |
| Text (linen) | `#F2EBE3` |
| Accent (ochre) | `#B98550` |
| Face 01 | `#17130F` |
| Face 02 | `#1A1511` |
| Face 03 | `#1E1813` |

Each face also has a faint ochre radial glow centred on the lit door, getting stronger towards it.

### Geometry (left, top, width × height)

| Element | Geometry |
|---|---|
| Threshold 01 | 230, 120, 980 × 700 |
| Threshold 02 opening | 400, 210, 640 × 460 |
| Threshold 03 opening | 520, 275, 400 × 290 |
| Lit site (04) | 605, 325, 230 × 170, 1px ochre border, breathing ochre glow |

### Camera

- Scale about the point **(720, 410)**.
- Per stage: `[1, 1.45, 2.2, 3.4]`.
- 1.6s, `cubic-bezier(.65,0,.35,1)`.

### Text opacity

- Current stage: 1.
- Stages ahead: 0.5.
- Stages passed: 0.

Opening edges, corner lines and faces of passed thresholds fade to 0.

### Other details

- **Floor light:** an ochre gradient spilling from the bottom of threshold 01 towards the viewer, and a thin ochre centre line on the floor.
- **Typography:**
  - Labels: Inter 500, uppercase, wide tracking (13 / 10 / 8px for 01 / 02 / 03).
  - Sill lines: Cormorant Garamond italic (34 / 24 / 16px).

## How it should behave on the real site

- **Scroll-driven.** The section is tall (about 4 screens). Its corridor is sticky at full viewport height.
  - Scroll progress through the section drives the camera smoothly between the four scales, and the stage text changes at each quarter.
  - Use Motion's `useScroll` / `useTransform`, which are already in the project.
- **Stage buttons** (01 Groundwork … 04 Complete):
  - Clicking one scrolls to that stage's position.
  - Mark the current one with `aria-pressed`.
  - Each must be at least 44px tall.
- **Clicking the doorway** goes to the next stage.
- **Reduced motion:** no scroll-linked camera. Show the corridor at stage 01 with the four stages as a plain list, or let the buttons switch stages instantly with no travel.
- **Phone:** follow `phone.png`. The corridor stays whole in a portrait frame, and tapping or swiping walks to the next door.
- **Accessibility:**
  - The corridor drawing is decorative (`aria-hidden`).
  - The readable content is the real heading, stage title and body text.
  - Keep contrast AA for all readable text. The half-strength text inside the corridor is decorative.

## Assets and fonts

- **Images:** the mockup's image `/_blob/229c64cbf7ab99c4506a4d6ca901dcae` is the Churcham Homes homepage screenshot. In this repo, use the Churcham entry's `image` / `imageSrcSet` from `src/data/projects.js` (`public/work/churcham-homes-desktop*.webp`).
- **Fonts:** Cormorant Garamond and Inter are already self-hosted. The project only has Cormorant **italic at weight 400**, so use that wherever the mockup asks for light italic. Don't add new font files.

## Rules (from CLAUDE.md)

- Keep the live site untouched. Build this inside the redesign area only.
- No new dependencies.
- Run build and lint when done.
