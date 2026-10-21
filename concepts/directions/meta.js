import * as Folio from "./Folio";
import * as Threshold from "./Threshold";
import * as InSitu from "./InSitu";
import * as Editions from "./Editions";

// Tokens verified in the repo: src/index.css (:root and .room-dark in
// components/studio/rooms.css) and public/fonts.
export const DIRECTIONS = [
  {
    id: "editions",
    numeral: "IV",
    name: "Editions",
    kind: "Combined · chosen direction",
    parts: Editions,
    final: true,
    rationale:
      "Threshold is the signature; Folio is the structure. Work is shown in lit rooms behind the site's own doorway, and everything else is set as a calm editorial page. Every post shares the same running head, the same floor line at the same height, a credits strip and an honesty status, so the grid reads as one publication. Paper and room alternate, so it never turns gloomy.",
    colours: [
      { hex: "#F4EEE6", name: "Paper", token: "--paper · editorial posts" },
      { hex: "#13110D", name: "Room", token: ".room-dark · work posts" },
      { hex: "#121212", name: "Ink", token: "--foreground · text on paper" },
      { hex: "#F1EBE3", name: "Cream", token: "text in rooms" },
      { hex: "#A67C52", name: "Ochre", token: "--accent · doors, numerals" },
      { hex: "#B98550", name: "Lamp", token: "ochre inside rooms" },
    ],
    type: [
      { family: "Cormorant Garamond", use: "Statements, names, quotes (300 and italic)" },
      { family: "Cormorant SC", use: "Running heads, labels, footers" },
      { family: "Inter", use: "Explanations, decisions, steps" },
      { family: "JetBrains Mono", use: "Credits, plates, recording marks" },
    ],
    system: [
      "Two grounds only. Paper for editorial posts, room for work. Alternate them on the grid.",
      "The floor line sits at y 1110 on every post. Doors stand on it; credits sit just under it.",
      "One door per post (two only for the residents). Solid means commissioned, dashed means speculative, and a door cut into paper is an opening into the studio.",
      "Light spills only from a lit door. No other glows or gradients.",
      "Every post ends with the same foot: studio on the left, honesty status on the right.",
      "One oversized line per post, and it never covers the work.",
    ],
    effort: "About 45–75 minutes per post from the templates: choose a template, drop in screenshots, write the copy, export.",
    risk: "The system only works if its rules are kept. Adding extra doors, glows or a third ground colour would quickly dilute it.",
  },
  {
    id: "folio",
    numeral: "I",
    name: "Folio",
    kind: "Editorial & typographic",
    parts: Folio,
    rationale:
      "The feed as a printed studio monograph. Work is presented as numbered plates that bleed off the page, set against running heads, folios and a credits page. It is the most continuous with the site's paper and serif voice, and the quietest of the three.",
    colours: [
      { hex: "#F4EEE6", name: "Paper", token: "--paper" },
      { hex: "#E3DED5", name: "Stone", token: "new, Studies only" },
      { hex: "#121212", name: "Ink", token: "--foreground" },
      { hex: "#A67C52", name: "Ochre", token: "--accent" },
      { hex: "#8C6239", name: "Deep ochre", token: "--accent-strong" },
    ],
    type: [
      { family: "Cormorant Garamond", use: "Titles, statements, captions in italic" },
      { family: "Cormorant SC", use: "Running heads, labels, credits" },
      { family: "Inter", use: "Meta lines and notes only" },
    ],
    system: [
      "Every post carries a running head (section, left; number, right) and a folio at the foot.",
      "Real work sits on paper; speculative work sits on stone. The difference is visible before anything is read.",
      "Three layouts: Plate (work bleeding off one edge), Spread (type only), Credits (a list at the foot).",
      "Ochre is used only for numerals and one emphasised word.",
    ],
    effort: "About 1 to 1.5 hours per post once the Figma or HTML templates exist. Screenshots drop straight into plates.",
    risk: "It is calm and well-made, but cream editorial is a common taste signal. It relies on composition discipline to avoid looking like many tasteful studios.",
  },
  {
    id: "threshold",
    numeral: "II",
    name: "Threshold",
    kind: "Experimental & art-directed",
    parts: Threshold,
    rationale:
      "Every post is a room seen through the site's own doorway: an ochre frame, open at the floor, with light spilling across it. Type is oversized and cut by the door and the canvas edge. JetBrains Mono annotates like an architect's drawing, with dimensions, status and credits. Speculative work stands behind a dashed, unbuilt door.",
    colours: [
      { hex: "#13110D", name: "Room dark", token: ".room-dark" },
      { hex: "#F1EBE3", name: "Room light", token: ".room-dark fg" },
      { hex: "#B98550", name: "Lamp ochre", token: "dark --accent" },
      { hex: "#A59D92", name: "Shadow", token: ".room-dark muted" },
      { hex: "#2B2A28", name: "Print shade", token: "--print-shade" },
    ],
    type: [
      { family: "Cormorant Garamond", use: "Oversized display, cut by frames" },
      { family: "JetBrains Mono", use: "Annotations, dimensions, credits, status" },
      { family: "Inter", use: "The occasional explanatory line" },
    ],
    system: [
      "One rule: every post has at least one door. Solid ochre for commissioned work, dashed for studies, a slab for words.",
      "The floor line always sits at the same height (y 1110), so the grid reads as one continuous corridor.",
      "One word per post is allowed to be enormous and to break the frame.",
      "Annotations are factual: real dimensions, platform, status and launch Lighthouse score. Nothing decorative.",
    ],
    effort: "About 1.5 hours per post. Doors and annotation lines are reusable components, and the screenshot crop is the creative decision.",
    risk: "It is the most striking, but also the darkest and the most demanding. Done carelessly it can read as moody tech. It needs strict restraint: one big word, one door, one light.",
  },
  {
    id: "insitu",
    numeral: "III",
    name: "In Situ",
    kind: "Material & immersive",
    parts: InSitu,
    rationale:
      "The website shown in its place. The client's real space is blurred behind (as Selected Work does on the site), with the site laid on top as a white-bordered print and the palette sampled from the live site beside it. It makes 'places, not pages' literal, and talks to owners in the language of their own interiors.",
    colours: [
      { hex: "#F4EEE6", name: "Paper", token: "--paper" },
      { hex: "#FBF9F5", name: "Print", token: "--print" },
      { hex: "#2B2A28", name: "Print shade", token: "--print-shade" },
      { hex: "#121212", name: "Ink", token: "--foreground" },
      { hex: "#A67C52", name: "Ochre", token: "--accent" },
    ],
    type: [
      { family: "Cormorant Garamond", use: "Titles and quotes on cards" },
      { family: "Inter", use: "Labels, like a printed specimen card" },
      { family: "JetBrains Mono", use: "Hex values on swatches" },
    ],
    system: [
      "Every Room post has three layers: the place (blurred), the print (the website) and the card (the facts).",
      "Every project carries its palette, sampled from the live site, so no two posts are the same colour, but every post has the same anatomy.",
      "Speculative work has no real place, so it sits on a material instead (procedural plaster, paint chips), never on a generated photo.",
      "Paper, prints and cards are the only surfaces. No other shapes are added.",
    ],
    effort: "About 2 hours per post: the blur, the prints and the palette sampling are quick, but each needs a usable photograph of the place.",
    risk: "It depends on owning or having permission for good photos of each client's space. The feed's colour shifts with every project, so the grid is less unified.",
  },
];
