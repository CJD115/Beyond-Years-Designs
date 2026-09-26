// Captures clean, consistent screenshots of past client sites for the portfolio.
//
//   npm run capture:work                 every site in scripts/work-sites.json
//   npm run capture:work -- hidden-gem   just one (or several) by slug
//
// For each site it saves, in captures/<slug>/:
//   desktop.webp  first screen at 1440 × 900, shot at 2× (2400px wide)
//   full.webp     the whole page at 1440 wide (1600px wide)
//   mobile.webp   first screen on an iPhone-sized viewport (780px wide)
//   *.png         the untouched originals, in case you want to crop by hand
//
// Nothing is written to public/ — review the captures first, then copy the
// ones you want into public/work/.
//
// Uses the Playwright engine that ships with the global `playwright-cli`
// install and drives the installed Microsoft Edge, so the project gains no
// dependencies. WebP encoding happens inside Edge via <canvas>.

import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "captures");

const DESKTOP = { width: 1440, height: 900, scale: 2 };
const WEBP_QUALITY = 0.82;

// Cookie banners, chat bubbles and pop-ups that commonly sit over client
// sites (WordPress/Elementor and Squarespace plugins). They're hidden with
// CSS, never clicked, so no consent is given. Add site-specific selectors
// to "hide" in work-sites.json.
const ALWAYS_HIDE = [
  "#cookie-notice",
  "#cookie-law-info-bar",
  ".cky-consent-container",
  ".cky-overlay",
  "#cmplz-cookiebanner-container",
  ".cmplz-cookiebanner",
  "#moove_gdpr_cookie_info_bar",
  "#CybotCookiebotDialog",
  "#onetrust-consent-sdk",
  ".cc-window",
  ".sqs-cookie-banner-v2",
  ".gdpr-cookie-banner",
  ".elementor-popup-modal",
  "#hubspot-messages-iframe-container",
  ".tawk-min-container",
  "iframe[title*='chat' i]",
  "[class*='cookie-banner' i]",
  "[id*='cookie-banner' i]",
];

function loadPlaywright() {
  const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
  const require = createRequire(path.join(globalRoot, "@playwright", "cli", "package.json"));
  return require("playwright-core");
}

async function settle(page, hide) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
      ${[...ALWAYS_HIDE, ...hide].join(",\n")} { display: none !important; }
    `,
  });

  // Walk down the page so lazy-loaded images and scroll reveals fire, then return.
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((img) => !img.complete)
        .map((img) => new Promise((r) => { img.onload = img.onerror = r; })),
    );
  });
  await page.waitForTimeout(800);
}

async function open(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
  } catch {
    // Some sites never go network-idle (analytics, video); "load" is enough.
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  }
  return page;
}

// Encodes a PNG buffer to WebP at the given width, inside the browser.
async function toWebp(encoder, png, width) {
  const dataUrl = await encoder.evaluate(
    async ({ src, width, quality }) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const scale = Math.min(1, width / img.naturalWidth);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", quality);
    },
    { src: `data:image/png;base64,${png.toString("base64")}`, width, quality: WEBP_QUALITY },
  );
  return Buffer.from(dataUrl.split(",")[1], "base64");
}

async function capture(browser, devices, encoder, site) {
  const dir = path.join(OUT, site.slug);
  await mkdir(dir, { recursive: true });
  const hide = site.hide ?? [];
  const shots = [];

  const desktop = await browser.newContext({
    viewport: { width: DESKTOP.width, height: DESKTOP.height },
    deviceScaleFactor: DESKTOP.scale,
    reducedMotion: "reduce",
  });
  const page = await open(desktop, site.url);
  await settle(page, hide);
  shots.push(["desktop", await page.screenshot(), 2400]);
  shots.push(["full", await page.screenshot({ fullPage: true }), 1600]);
  await desktop.close();

  const mobile = await browser.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
  const phone = await open(mobile, site.url);
  await settle(phone, hide);
  shots.push(["mobile", await phone.screenshot(), 780]);
  await mobile.close();

  for (const [name, png, width] of shots) {
    await writeFile(path.join(dir, `${name}.png`), png);
    await writeFile(path.join(dir, `${name}.webp`), await toWebp(encoder, png, width));
  }
  console.log(`✓ ${site.slug}  →  captures/${site.slug}/`);
}

const only = process.argv.slice(2);
const sites = JSON.parse(await readFile(path.join(ROOT, "scripts", "work-sites.json"), "utf8"))
  .filter((site) => !only.length || only.includes(site.slug));

const missing = sites.filter((site) => !site.url);
for (const site of missing) console.warn(`– ${site.slug}: no url in work-sites.json, skipped`);

const { chromium, devices } = loadPlaywright();
const browser = await chromium.launch({ channel: "msedge" });
const encoder = await browser.newPage();

let failed = 0;
for (const site of sites.filter((s) => s.url)) {
  try {
    await capture(browser, devices, encoder, site);
  } catch (err) {
    failed++;
    console.error(`✗ ${site.slug}: ${err.message.split("\n")[0]}`);
  }
}

await browser.close();
process.exitCode = failed ? 1 : 0;
