import { srcSetFor } from "@/data/projects";

// Case-study copy and screens for the case-study pages (/work/:slug), on top
// of each project's entry in src/data/projects.js.
//
// Lines given as arrays mix plain text with { em } parts, which are set in
// ochre italic.
//
// `shots` are the screens shown for each key feature, in the same order as
// the project's keyFeatures. Only these screenshots are in the repo for now,
// so some repeat. Swap in a screenshot of the matching part of the live site
// (the listings, the galleries…) whenever one is ready: put the file in
// public/work and point its entry here. `position` is the CSS
// object-position used to crop a landscape shot; `portrait` marks a phone
// screenshot, which is shown whole rather than cropped; `whole` shows a
// landscape shot whole too, letterboxed, when it's wider than the screen.
//
// A study can also bring its own `hero` (the site in the doorway), `place`
// (blurred behind the hero), `resultDesktop` and `resultPhone`; without
// them the page uses the project's images from projects.js.

const landscape = (src, position = "50% 0%") => ({ src, srcSet: srcSetFor(src), position });
const portrait = (src, srcSet) => ({ src, srcSet, portrait: true });

// Churcham's captures of the live site (captures/churcham-homes), in
// public/work/churcham with -800 and -1600 copies
const churcham = (name, position) => landscape(`/work/churcham/${name}.webp`, position);
// Groves', likewise (captures/groves-hairstyling, in public/work/groves)
const groves = (name, position) => landscape(`/work/groves/${name}.webp`, position);
const grovesPhone = (name) => ({
  src: `/work/groves/${name}.webp`,
  srcSet: `/work/groves/${name}-400.webp 400w, /work/groves/${name}.webp 780w`,
});

export const CASE_STUDIES = {
  "churcham-homes": {
    intro: "This website spotlights each new development with galleries, floor plans, pricing, and a direct route to enquire.",
    client: "A family-run premium property developer in Gloucestershire.",
    problem: "The client’s business had grown significantly since their original website was put together.",
    brief: [
      "It was time to try something a little more ",
      { em: "sophisticated" },
      " that better reflected where the brand was today.",
    ],
    approach: [
      "We opted for an image-focussed approach, letting the company’s developments ",
      { em: "speak for themselves." },
    ],
    result: "The refreshed website gives the brand a whole new look,",
    resultMore: "with refined layouts and premium imagery underlining and spotlighting the brand’s luxury image.",
    hero: churcham("home-hero-v2"),
    place: "/work/churcham/story-lifestyle-800.webp",
    shots: [
      // listings: the current developments, each with its own page
      churcham("current-developments", "50% 50%"),
      // galleries: the showroom's image grid
      churcham("showroom-gallery", "50% 0%"),
      // the track record: the showroom of finished homes
      churcham("home-showroom", "50% 50%"),
      // the enquiry route: the contact page, wider than the screen, so shown
      // whole rather than lose its logo
      { ...churcham("contact-hero", "50% 50%"), whole: true },
    ],
    // the exterior, its headline clear of the phone in front
    resultDesktop: churcham("story-craft"),
    resultPhone: { src: "/work/churcham/mobile-home-hero.webp", srcSet: "/work/churcham/mobile-home-hero-400.webp 400w, /work/churcham/mobile-home-hero.webp 780w" },
  },

  "groves-hairstyling": {
    intro: "This website highlights their services, pricing, and product options, with a clean modern look that reflects the brand’s friendly, professional feel.",
    client: "A family-run hair salon with decades of experience and a strong local reputation.",
    problem: "Until now, the salon had relied solely on social media for its online presence.",
    brief: [
      "The salon needed a home online, ",
      { em: "beyond social media," },
      " that showed customers exactly what it offers.",
    ],
    approach: ["We wanted to bring the in-person feel of the salon into the ", { em: "digital space." }],
    result: "The new website gives Groves Hairstyling a modern, reliable online presence",
    resultMore: "that feels true to the brand. Customers can find services, check prices, and get in touch easily.",
    hero: groves("home-hero"),
    place: "/work/groves/home-hero-800.webp",
    shots: [
      // the service menu and its prices
      groves("services-menu"),
      // the stylists: Colour on the phone, "specialist stylists dedicated
      // to delivering excellence" (no photos of the team: we don't have
      // their consent to show them)
      { ...grovesPhone("mobile-colour"), portrait: true },
      // the shop: the basket, top right on the phone (no capture of the
      // shop itself yet)
      { ...grovesPhone("mobile-home-hero"), portrait: true },
      // 'Book today', under the home page's welcome
      groves("home-hero"),
      // the salon's marble and crystal
      groves("cutting-styling"),
    ],
    // Colour's words on the left, clear of the phone in front
    resultDesktop: groves("colour"),
    resultPhone: grovesPhone("mobile-cutting-styling"),
  },

  "hidden-gem": {
    intro: "This website reflects the professional, friendly brand image with clean layouts, and finds customers with full SEO.",
    client: "An accredited auction house, antiques shop and removals business in the Midlands.",
    problem: "As the business scaled up, word of mouth was no longer enough to bring customers in.",
    brief: [
      "The business needed a website that was ",
      { em: "easily found online," },
      " and that reliably turned visitors into customers.",
    ],
    approach: [
      "Two things mattered most: being ",
      { em: "easy to find," },
      " and being ",
      { em: "easy to understand." },
    ],
    result: "The new website ranks highly for SEO, making it easily found by visitors,",
    resultMore: "while its clear and informative layout helps convert leads into customers.",
    shots: [
      landscape("/work/hidden-gem-intro.webp", "50% 100%"),
      landscape("/work/hidden-gem.webp"),
      landscape("/work/hidden-gem-intro.webp"),
      landscape("/work/hidden-gem-desktop.webp"),
      portrait("/work/hidden-gem-phone.webp", "/work/hidden-gem-phone-200.webp 200w, /work/hidden-gem-phone-400.webp 400w, /work/hidden-gem-phone.webp 900w"),
    ],
  },
};
