// Exports the Instagram launch set as final PNGs.
//
//   1. npm run dev                      (leave it running)
//   2. node concepts/export-posts.mjs   (in a second terminal)
//
// Writes to concepts/exports/:
//   01-front-door.png … 09-working-with-us.png   1080 × 1350, the posts
//   profile-image.png                            1080 × 1080
//   profile-grid.png                             the grid as Instagram crops it
//   contact-sheet.png                            all nine, uncropped, labelled
//
// Like scripts/capture-work.mjs, it uses the Playwright engine that ships with
// the global `playwright-cli` install and drives the installed Microsoft Edge,
// so the project gains no dependencies. Options:
//   --url http://localhost:5173   where the dev server is (default shown)
//   --only 02,04                  export just these posts
//   --browser <path>              use a specific Chrome/Edge executable

import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "exports");

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const BASE = (arg("url") ?? "http://localhost:5173").replace(/\/$/, "");
const ONLY = arg("only")?.split(",").map((s) => s.trim().padStart(2, "0"));

async function loadPlaywright() {
  try {
    const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
    const require = createRequire(path.join(globalRoot, "@playwright", "cli", "package.json"));
    return require("playwright-core");
  } catch {
    // Fall back to a playwright-core resolvable from here, if there is one
    return import("playwright-core");
  }
}

// Post ids and slugs, read from the launch data so file names never drift
async function launchPosts() {
  const src = await readFile(path.join(HERE, "editions", "data.js"), "utf8");
  return [...src.matchAll(/id: "(\d\d)",\s+slug: "([^"]+)"/g)].map(([, id, slug]) => ({ id, slug }));
}

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function shoot(page, query, file, expected) {
  await page.goto(`${BASE}/concepts/export.html?${query}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })),
    );
  });
  await page.waitForTimeout(400);
  const png = await page.locator("#export").screenshot({ animations: "disabled" });
  const size = pngSize(png);
  if (expected && (size.width !== expected[0] || size.height !== expected[1])) {
    throw new Error(`${file} came out ${size.width} × ${size.height}, expected ${expected.join(" × ")}`);
  }
  await writeFile(path.join(OUT, file), png);
  console.log(`✓ ${file}  ${size.width} × ${size.height}`);
}

const { chromium } = await loadPlaywright();
const executablePath = arg("browser");
const browser = await chromium.launch(executablePath ? { executablePath } : { channel: "msedge" });
// deviceScaleFactor 1: one CSS pixel is one image pixel, so 1080 is 1080
const page = await browser.newPage({ viewport: { width: 1600, height: 2000 }, deviceScaleFactor: 1 });

await mkdir(OUT, { recursive: true });
let failed = 0;
const posts = (await launchPosts()).filter((p) => !ONLY || ONLY.includes(p.id));

for (const { id, slug } of posts) {
  try {
    await shoot(page, `post=${id}`, `${id}-${slug}.png`, [1080, 1350]);
  } catch (err) {
    failed++;
    console.error(`✗ ${id}: ${err.message.split("\n")[0]}`);
  }
}

if (!ONLY) {
  for (const [query, file, size] of [
    ["profile", "profile-image.png", [1080, 1080]],
    ["grid", "profile-grid.png"],
    ["sheet", "contact-sheet.png"],
  ]) {
    try {
      await shoot(page, query, file, size);
    } catch (err) {
      failed++;
      console.error(`✗ ${file}: ${err.message.split("\n")[0]}`);
    }
  }
}

await browser.close();
if (failed) console.error(`\n${failed} failed. Is the dev server running at ${BASE}?`);
process.exitCode = failed ? 1 : 0;
