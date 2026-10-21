# Instagram concepts and launch set

The studio's Instagram art direction and the nine-post launch set, built with the site's own fonts, colours and project images.

**It is kept apart from the live site:**
- It's a separate page that the site never links to.
- `npm run build` only builds the root `index.html`, so none of this ships.
- Tailwind only scans `src/`, so nothing here affects the site's styles.
- It adds no dependencies.

## Open it

```
npm run dev
```

Then go to **http://localhost:5173/concepts/**. It opens on three views:

- **Launch set** (the default): the profile as a prospect sees it, the launch sequence, and all nine posts with caption, alt text, publish date and approvals. It also shows both coded studies at full size; drag the Hesper slider to change the time of day.
- **By direction**: IV Editions (chosen) plus I–III for reference, each with its colour, type and system.
- **Side by side**: the same post across all four directions.

## Export the posts

```
npm run dev                          # leave it running
node concepts/export-posts.mjs       # in a second terminal
```

This writes to `concepts/exports/`:
- `01-…png` to `09-…png`, the posts at 1080 × 1350, each size-checked;
- `profile-image.png` at 1080 × 1080;
- `profile-grid.png`, the grid as Instagram crops it;
- `contact-sheet.png`.

Options:
- `--only 05` exports one post.
- `--url` sets a different dev-server address.
- `--browser <path>` uses a specific Chrome or Edge.

Like `scripts/capture-work.mjs`, it uses the global `playwright-cli` install with Microsoft Edge.

**Without Playwright:**
1. Open `/concepts/export.html?post=05` in Chrome at 100% zoom, on a display set to 100% scaling.
2. In DevTools, right-click `#export` and choose **Capture node screenshot**.

## Files

| Path | What |
| --- | --- |
| `DESIGN-SYSTEM.md` | **The rules**: colour, type, doors and light, grid and safe areas, folio and credits, honesty system, Reels motion, templates, export specs |
| `editions/data.js` | All launch-set content and facts: captions, alt text, approvals, schedule. Edit copy here |
| `editions/posts.jsx` | The nine posts and the profile image, built from the templates |
| `editions/system.jsx`, `tokens.js` | Reusable parts: Post, RunningHead, Floor, Door, Spill, Credits, Foot |
| `editions/sites.jsx`, `sky.js` | The two coded speculative sites: Ottoline (salon) and Hesper (stay) |
| `editions/editions.css` | Styles for all of the above |
| `export.html`, `export.jsx`, `export/ExportApp.jsx` | Renders one piece of artwork at exact size, for the exporter |
| `export-posts.mjs` | The exporter |
| `make-campaign-captions.mjs` | Writes `Claude outputs/campaign/captions.md` from `editions/data.js` |
| `Gallery.jsx`, `LaunchSet.jsx`, `concepts.css`, `Frame.jsx` | The gallery |
| `directions/` | Directions I–III, and the adapter that shows IV beside them |
| `content.js` | Shared content for directions I–III |

## The campaign toolkit

The 30-day plan, calendar, outreach templates, trackers and approvals list are in **`Claude outputs/campaign/`**. That folder is git-ignored, because the GitHub repository is public and the tracker holds prospects' names.

## Before posting

See `Claude outputs/campaign/approvals.md`. In short:
- Mike's Note 01 line is a placeholder until he approves it.
- Check the Groves location with the client.
- Give Churcham and Groves a courtesy heads-up.
- Decide whether Second Look is free.
- Re-check the two fictional names.

Ottoline and Hesper are fictional, and say so on every post and in their own footers.

To remove all of this, delete the `concepts/` folder.
