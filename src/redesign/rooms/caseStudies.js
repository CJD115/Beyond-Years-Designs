import { srcSetFor } from "@/data/projects";

// Case-study copy and screens for the Rooms preview (/rooms/work/:slug), on
// top of each project's entry in src/data/projects.js. Kept here, not in
// projects.js, so the live case studies don't change until this design does.
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
// screenshot, which is shown whole rather than cropped.

export const roomsCaseStudyPath = (slug) => `/rooms/work/${slug}/`;

const landscape = (src, position = "50% 0%") => ({ src, srcSet: srcSetFor(src), position });
const portrait = (src, srcSet) => ({ src, srcSet, portrait: true });

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
    shots: [
      landscape("/work/churcham-homes-desktop.webp"),
      landscape("/work/churcham-homes-lifestyle.webp", "50% 50%"),
      portrait("/work/churcham-homes-mobile.webp", "/work/churcham-homes-mobile-200.webp 200w, /work/churcham-homes-mobile.webp 391w"),
      landscape("/work/churcham-homes-desktop.webp", "50% 100%"),
    ],
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
    shots: [
      landscape("/work/groves-hairstyling-services.webp"),
      landscape("/work/groves-hairstyling.webp", "50% 40%"),
      portrait("/work/groves-hairstyling-mobile.webp"),
      landscape("/work/groves-hairstyling-desktop.webp", "50% 100%"),
      landscape("/work/groves-hairstyling.webp"),
    ],
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
