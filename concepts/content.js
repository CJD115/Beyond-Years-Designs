// Shared content for the Instagram concept gallery. Every direction renders
// the same content, so the three can be compared like for like.
//
// Real projects: facts come from src/data/projects.js and the live case
// studies. Nothing here is a client quote, result or claim the site doesn't
// already make. The Lighthouse scores are the site's own launch audit.
//
// The salon ("Ottoline") is FICTIONAL. It is a speculative study, not a
// client, and every place it appears is labelled as such.

export const STUDIO = {
  name: "Beyond Years Designs",
  short: "Beyond Years",
  city: "Bristol",
  handle: "@beyondyearsdesigns",
  // From the site's mobile hero
  line: ["Places people", "step into,", "not pages they", "scroll past."],
};

export const ROOMS = [
  {
    id: "churcham",
    numeral: "I",
    name: "Churcham Homes",
    nameLines: ["Churcham", "Homes"],
    industry: "Luxury property developer",
    location: "Cheltenham",
    year: "2025",
    platform: "WordPress",
    // projects.js, room.line
    line: "Each new development gets its own galleries, floor plans, pricing and a direct route to enquire.",
    brief: "A family developer who had outgrown their first website.",
    lighthouse: 99,
    desktop: "/work/churcham/home-hero-v2-1600.webp",
    detail: "/work/churcham/current-developments-1600.webp",
    phone: "/work/churcham/mobile-home-hero-400.webp",
    place: "/work/churcham-homes-lifestyle-1600.webp",
    // Sampled from the live site's own imagery and type (see the gallery notes)
    palette: [
      { hex: "#222222", name: "Charcoal" },
      { hex: "#A88858", name: "Brass title" },
      { hex: "#898575", name: "Cedar" },
      { hex: "#2E3424", name: "Hedge" },
      { hex: "#ABD2F0", name: "Cotswold sky" },
    ],
  },
  {
    id: "groves",
    numeral: "II",
    name: "Groves Hairstyling",
    nameLines: ["Groves", "Hairstyling"],
    industry: "Family-run salon",
    location: "Cheltenham",
    year: "2024",
    platform: "Squarespace",
    line: "A salon that had only ever lived on social media, given a home online with its full menu, prices and stylists.",
    brief: "Bring the in-person feel of the salon online: marble, crystal and a warm welcome.",
    lighthouse: 99,
    desktop: "/work/groves/home-hero-1600.webp",
    detail: "/work/groves/services-menu-1600.webp",
    phone: "/work/groves/mobile-home-hero-400.webp",
    place: "/work/groves/colour-1600.webp",
    palette: [
      { hex: "#0F100E", name: "Black marble" },
      { hex: "#33342F", name: "Vein" },
      { hex: "#828178", name: "Chrome" },
      { hex: "#F8F8F8", name: "Crystal" },
    ],
  },
];

// Illustrative copy note. The rewrite is a draft for Mike to replace with his
// own line before anything is posted; it is not attributed to him.
export const NOTE = {
  number: "01",
  label: "Words",
  before: "Welcome to our salon, where we offer a wide range of hair services to suit all your needs.",
  after: ["Bring the photo", "you’ve been saving.", "We’ll tell you", "honestly what it’ll", "take to get there."],
  afterFlat: "Bring the photo you’ve been saving. We’ll tell you honestly what it’ll take to get there.",
  why: "Every salon offers a wide range of services. Only you can promise an honest conversation about the photo on someone’s phone.",
  example: "Illustrative example, not a real business’s copy.",
};

// FICTIONAL salon for Study 01. Name checked against a web search; no UK
// salon trading under it came up, but re-check before publishing.
export const STUDY = {
  number: "01",
  name: "Ottoline",
  kind: "Hair & colour",
  fictional: true,
  label: "Speculative study · fictional salon · not a client",
  hero: ["Hair that looks", "like you on your", "best morning."],
  heroFlat: "Hair that looks like you on your best morning.",
  menu: [
    ["Cut & finish", "from £58"],
    ["Full colour", "from £95"],
    ["Balayage", "from £165"],
    ["Colour consultation", "free"],
  ],
  stylists: ["Iris", "Noor", "Tamsin"],
  palette: [
    { hex: "#E9DFD3", name: "Plaster" },
    { hex: "#B5654A", name: "Terracotta" },
    { hex: "#5B2E2A", name: "Oxblood" },
    { hex: "#C2A16B", name: "Brass" },
    { hex: "#1E1A17", name: "Walnut" },
  ],
};

// From src/data/team.js (their own bio lines)
export const RESIDENTS = [
  {
    name: "Connor",
    role: "Design & build",
    quote: "I don’t really think of them as pages. I think of them as places.",
    image: "/team/connor-640.webp",
  },
  {
    name: "Mike",
    role: "Words",
    quote: "Even when I’m not working, I still love words.",
    image: "/team/mike-640.webp",
  },
];
