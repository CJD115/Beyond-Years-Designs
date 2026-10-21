// Builds the launch captions file from the launch data, so the captions in
// the campaign toolkit and the ones shown in the gallery never drift apart.
//
//   node concepts/make-campaign-captions.mjs "Claude outputs/campaign/captions.md"

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const { LAUNCH, SCHEDULE } = await import(pathToFileURL(path.join(HERE, "editions", "data.js")).href);

const [out] = process.argv.slice(2);
if (!out) {
  console.error('Usage: node concepts/make-campaign-captions.mjs "Claude outputs/campaign/captions.md"');
  process.exit(1);
}

let md = `# Launch captions

The nine launch captions and alt texts below are generated from \`concepts/editions/data.js\`. Edit them there, then regenerate this file with \`node concepts/make-campaign-captions.mjs "Claude outputs/campaign/captions.md"\`. LinkedIn versions and the ideas bank are in \`linkedin-and-ideas.md\`.

Rules for every caption:
- Write the way you'd talk to the owner across the counter.
- Every claim must be checkable: say what you did and why, never "stunning", "elevate" or "results".
- Credits go at the end. Tag a client only if they've said yes.
- At most 3–5 hashtags, and only ones you can see real Bristol independents using.
- Paste the alt text under Advanced settings → Accessibility.

`;

for (const p of LAUNCH) {
  md += `## ${p.id} · ${p.title}\n\n`;
  md += `*${SCHEDULE[p.id]} · ${p.status}${p.pin ? ` · pin ${p.pin}` : ""} · file: concepts/exports/${p.id}-${p.slug}.png*\n\n`;
  md += `**Caption**\n\n${p.caption.split("\n").map((l) => (l ? `> ${l}` : ">")).join("\n")}\n\n`;
  md += `**Alt text:** ${p.alt}\n\n`;
  md += `**Needs a yes first:** ${p.approvals.join(" ")}\n\n`;
}

await writeFile(out, md);
console.log(`✓ ${out}`);
