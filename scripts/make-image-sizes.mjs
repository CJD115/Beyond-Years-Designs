// Makes the smaller copies of portfolio images that the srcsets in
// src/data/projects.js point to (e.g. hidden-gem-800.webp beside hidden-gem.webp).
//
//   npm run images              make any copies that don't exist yet
//   npm run images -- --force   remake them all
//
// In each srcset the widest entry is the original; every other entry is
// resized from it. To add an image: put the original in public/, give it a
// srcset with srcSetFor() in projects.js, then run this.
//
// Like capture-work.mjs, it drives the installed Microsoft Edge through the
// global `playwright-cli` install, so the project gains no dependencies.

import { execSync } from "node:child_process";
import { access, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECTS } from "../src/data/projects.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const WEBP_QUALITY = 0.82;

const SRCSET = /^\S+ \d+w(, \S+ \d+w)*$/;

function loadPlaywright() {
  const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
  const require = createRequire(path.join(globalRoot, "@playwright", "cli", "package.json"));
  return require("playwright-core");
}

// Every srcset string anywhere in the project data
function findSrcSets(value) {
  if (typeof value === "string") return SRCSET.test(value) ? [value] : [];
  if (value && typeof value === "object") return Object.values(value).flatMap(findSrcSets);
  return [];
}

const parseSrcSet = (srcSet) =>
  srcSet.split(", ").map((entry) => {
    const [url, width] = entry.split(" ");
    return { url, width: parseInt(width, 10) };
  });

const fileFor = (url) => path.join(PUBLIC, url);
const exists = (file) => access(file).then(() => true, () => false);

// Resizes a WebP to the given width inside the browser and re-encodes it
async function resize(page, original, width) {
  const { dataUrl, naturalWidth } = await page.evaluate(
    async ({ src, width, quality }) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const height = Math.round((img.naturalHeight * width) / img.naturalWidth);
      const bitmap = await createImageBitmap(img, { resizeWidth: width, resizeHeight: height, resizeQuality: "high" });
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(bitmap, 0, 0);
      return { dataUrl: canvas.toDataURL("image/webp", quality), naturalWidth: img.naturalWidth };
    },
    { src: `data:image/webp;base64,${original.toString("base64")}`, width, quality: WEBP_QUALITY },
  );
  return { webp: Buffer.from(dataUrl.split(",")[1], "base64"), naturalWidth };
}

const force = process.argv.includes("--force");
const jobs = [];
for (const srcSet of new Set(PROJECTS.flatMap(findSrcSets))) {
  const [original, ...copies] = parseSrcSet(srcSet).sort((a, b) => b.width - a.width);
  for (const copy of copies) {
    if (force || !(await exists(fileFor(copy.url)))) jobs.push({ original, copy });
  }
}

if (!jobs.length) {
  console.log("Every image size already exists.");
} else {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  const warned = new Set();

  for (const { original, copy } of jobs) {
    const { webp, naturalWidth } = await resize(page, await readFile(fileFor(original.url)), copy.width);
    if (naturalWidth !== original.width && !warned.has(original.url)) {
      warned.add(original.url);
      console.warn(`! ${original.url} is ${naturalWidth}px wide, but its srcset says ${original.width}w`);
    }
    await writeFile(fileFor(copy.url), webp);
    console.log(`✓ ${copy.url}  (${Math.round(webp.length / 1024)} KB)`);
  }

  await browser.close();
}
