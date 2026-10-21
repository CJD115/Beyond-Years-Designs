# Editions: the Beyond Years social design system

Threshold is the signature; Folio is the structure.

The doorway, the floor and the light come straight from beyondyears.co.uk, and they make the work recognisable. The editorial system (running heads, numbered rooms, credits, a fixed foot) makes every post calm, legible and consistent with the others.

Built in `concepts/editions/`. Every token below is taken from `src/index.css`, `src/components/studio/rooms.css` and `public/fonts/`.

---

## 1. Colour

| Token | Hex | Source | Use it for |
| --- | --- | --- | --- |
| Paper | `#F4EEE6` + `textures/paper.webp` at 70% | `--paper` | The ground for editorial posts: statements, notes, offers, people |
| Room | `#13110D` | `.room-dark` | The ground for work posts: rooms and studies |
| Ink | `#121212` | `--foreground` | Text on paper |
| Ink muted | `#4A4A4A` | `--muted-foreground` | Body text and the foot on paper |
| Cream | `#F1EBE3` | `.room-dark` fg | Text in rooms |
| Cream muted | `#A59D92` | `.room-dark` muted | Plate captions and secondary text in rooms |
| Ochre | `#A67C52` | `--accent` | Paper only: doors, numerals, one emphasised word. Text 24px+ only (3.4:1) |
| Deep ochre | `#8C6239` | `--accent-strong` | Paper only: ochre text under 24px (labels, captions) |
| Lamp | `#B98550` | dark `--accent` | Rooms only: doors, emphasis, labels, the speculative status |
| Print shade | `#2B2A28` | `--print-shade` | Behind screenshots, and the frame of a plate |

**Rules**
- **Two grounds only.** No third background colour, no gradients, no cards.
- **Ochre never fills a surface.** It is for the door, the numeral and one word.
- **Light is the only "effect".** It falls from a lit door as two 5% polygons, exactly as on the site's doorway hero.

## 2. Typography

All fonts are the site's own self-hosted files.

| Role | Font | Size at 1080 wide | Notes |
| --- | --- | --- | --- |
| Oversized line | Cormorant Garamond 300 / italic 300 | 132–212px | **One per post.** Tracking −0.035 to −0.045em. Never covers the work |
| Study title | Cormorant Garamond 300 | 150px | "A salon, *imagined.*" |
| Deck | Cormorant Garamond italic 400 | 36px | One line under a room's name |
| Running head, labels, foot | Cormorant SC 500 (600 for status) | 23–26px | Tracking 0.12–0.14em |
| Body | Inter 400 | 24–30px | Line height 1.36–1.45 |
| Credits values | Cormorant Garamond 400 | 32px | |
| Credits keys, plates, recording marks | JetBrains Mono 400 | 17–19px | Uppercase, tracking 0.1–0.12em |

**Minimum sizes.** A post is about 36% of its size in the feed on a phone, so:
- nothing smaller than 17px;
- body text no smaller than 24px;
- honesty labels no smaller than 24px.

## 3. Doorway, light and floor

**The floor**
- A 1px line at **y = 1110** on every post: ink at 22% on paper, cream at 14% in rooms.
- Doors stand on it, and the credits sit just under it.
- Because it sits at the same height on every post, the profile grid reads as one corridor.

**The door**
- **Shape:** the site's door, an ochre frame open at the floor, 2px.
- **Interior:** inset 4.4% from each side and 2.4% from the top. It always reaches the floor.
- **Three kinds, and the kind carries meaning:**
  - **Solid** (room ground, with glow): commissioned work.
  - **Dashed** (room ground, no glow): speculative work.
  - **Opening** (paper ground): a door cut into the page, showing the dark studio behind. Used for people, examples and the front door. The "lit" variant (09 and the profile image) is an open door with warm light inside.
- **One door per post.** The residents post is the only exception: two people, two doors.

**The light**
- Light spills only from a lit door, as two polygons widening to the bottom edge. On paper it is warm (ochre at 9%).
- No other glows, blurs or gradients.

## 4. Grid, margins, crops and safe areas

| | |
| --- | --- |
| Canvas | 1080 × 1350 (4:5 portrait) |
| Side margins | 80px |
| Running head | Top 56px, rule beneath |
| Foot | Bottom 52px |
| Profile-grid crop | Instagram shows posts as 3:4 tiles: full height, **34px trimmed from each side** (1012 wide). With 80px margins, every word survives the crop. Check it with `export.html?grid` |
| Feed | The full 4:5 is shown |

**Image crops**
- Phone screenshots fill a door and are anchored to the **top**, so the client's logo and headline survive.
- Desktop screenshots sit in a **plate**: 440 × 275, with a 10px print-shade frame and a mono caption.
- Portraits are set in black and white with a slight warm tone, anchored on the face.
- Never crop a client's logo in half. Never recolour client work.

## 5. The folio system

Every post carries the same furniture, in the same places:

1. **Running head**: section on the left ("Beyond Years — Rooms"), number on the right ("Room II of III", "Study 01", "No. 07").
2. **Floor line**: y 1110.
3. **Credits strip** (work posts and notes): mono keys with serif values. Design & build / Words / Platform / Lighthouse (launch score) / Kind / Client.
4. **Foot**: "Beyond Years" on the left, the **honesty status** on the right.

**Numbering**
- Rooms take Roman numerals in the order of the site's case studies (I Churcham, II Groves, III Hidden Gem).
- Studies and Notes take two-digit numbers.
- Other posts take No. 01–09 in the launch set, then continue.

**Credits must be accurate**
- Platform and year come from `src/data/projects.js`.
- "Words: Mike" appears only where copywriting was part of the job.
- Lighthouse figures are labelled "at launch" because that is what the case studies record.

## 6. Real, speculative and illustrative work

Each kind is signalled on the artwork in **three ways**, so it can't be misread even in a cropped grid tile:

| | Door | Label near the top | Foot status |
| --- | --- | --- | --- |
| **Commissioned** | Solid, lit | "Room I of III" | "Commissioned · Place · Year" |
| **Speculative** | Dashed | Dashed box: "Speculative study · Fictional salon · Not a client" (lamp, 25px) | "Speculative · Fictional salon · Not a client" (lamp, 600 weight) |
| **Illustrative** | None: a ruled slip | "Before / After" | "Illustrative example · Invented copy" |
| **Studio** | Opening, or none | "No. 0X" | "Studio · …" |

Speculative sites also state that they are fictional in their own footers, so the label survives any crop or reuse.

**Never:**
- show a real business's site in a critique without written permission;
- give an invented business a real business's name, branding or address;
- quote anyone who hasn't said the line. The residents' lines come from their own published bios.

## 7. Motion for Reels

For when a post becomes a Reel, such as a room walkthrough, a study's light changing or a Second Look explainer.

1. **The light comes on first.** Open on the dark room. The door's frame fades up, then the light spills (0.6s, ease-out), then the work inside. It lasts about a second, and every Reel starts the same way.
2. **Walk in, don't zoom.** Move as the site does: the door scales up from its foot (transform-origin about 50% 60%), as in `HeroDoorway.jsx`. No spins, no whip-pans.
3. **Screen recordings play inside the door or a plate** at real speed, scrolled smoothly (about 600px a second). No speeding up.
4. **Type arrives once and stays.** A 300ms fade with an 8px rise, for the oversized line only. Labels and credits are on screen from the first frame.
5. **The honesty status is visible for the whole Reel** on studies.
6. **Sound:** quiet room tone, or nothing. No trending audio. A Reel must make sense with the sound off.
7. **Length:** 12–25 seconds. End on the credits strip for 2 seconds.
8. **Format:** 1080 × 1920, 30fps. Keep everything important inside the central 1080 × 1350 (the 4:5 area), because the profile grid and some feed placements crop Reels. Check the cover crop in the app before posting.

## 8. Templates and making a new post

| Template | Ground | Used by | Parts |
| --- | --- | --- | --- |
| **Room** | Room | 02, 04 | Name (oversized italic + small caps), deck, solid door with phone shot, plate, decisions, credits |
| **Study** | Room | 06, 08 | Speculative label, title, dashed door with a coded site, "What it tests", credits |
| **Doorway spread** | Paper | 01, 03, 07, 09 | Statement, body, door opening (work, people, example or light) |
| **Slip** | Paper | 05 | Ruled "before" slip, oversized "after", one line on why |

**A new post in about an hour:**

1. Copy the closest post component in `editions/posts.jsx`; Room and Study take a data object.
2. Put its facts in `editions/data.js`: id, slug, title, status, caption, alt text, approvals.
3. Add it to `POSTS` at the bottom of `posts.jsx`.
4. Check it in the gallery (`/concepts/`), then export: `node concepts/export-posts.mjs --only 10`.
5. Keep the grid alternating: post a paper post after a room post, and vice versa.

## 9. Export specifications

| Asset | Size | Format |
| --- | --- | --- |
| Feed post | 1080 × 1350 | PNG, sRGB, exported at device scale 1 |
| Profile image | 1080 × 1080 (shown as a circle) | PNG |
| Reel | 1080 × 1920, 30fps | MP4 H.264 (record with OBS or the Windows Snipping Tool, edit in DaVinci Resolve) |
| Story / highlight cover | 1080 × 1920; keep the subject in the central 1080 circle | PNG |

**Export:**
1. Run `npm run dev`.
2. In a second terminal, run `node concepts/export-posts.mjs`.

The script refuses to write a post that isn't exactly 1080 × 1350.
