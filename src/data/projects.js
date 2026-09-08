// Central project data. Each project powers both the homepage Selected Work
// section and its individual case-study page at /work/:slug.
// Add real projects here — the case-study page renders whatever fields exist.

export const PROJECTS = [
  {
    slug: "marston-roe",
    name: "Marston & Roe",
    industry: "Independent Law Firm",
    year: "2025",
    location: "Bath, UK",
    tagline: "A measured, authoritative site for a boutique practice.",
    description:
      "A measured, authoritative site for a boutique practice — clear structure, restrained typography and copy that turns legal expertise into plain English.",
    services: ["Web Design", "Front-end Development", "Responsive Development", "Copywriting", "CMS Integration"],
    tech: ["React", "Sanity CMS", "Vercel"],
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/a0682dfef_generated_image.png",
    mobileImage: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/e22e97e3a_generated_image.png",
    liveUrl: "https://marstonroe.example.co.uk",
    featured: true,
    overview:
      "Marston & Roe are a five-partner law firm in Bath with a reputation for quiet, thorough work. Their old website was a brochure nobody read. We rebuilt it around the way their clients actually look for help — by problem, not by partner.",
    clientBackground:
      "A respected high-street practice serving families, small businesses and property clients across the South West. The partners wanted to feel approachable without losing authority, and to stop apologising for a site that no longer represented them.",
    problem:
      "The existing site buried useful information under legal jargon and a structure that mirrored the firm's internal departments. Visitors couldn't tell whether the firm could help with their situation, and most left within a few seconds.",
    approach:
      "We restructured the site around the questions clients actually ask — 'can you help with this?' — and wrote every page in plain English. The visual direction is restrained and confident: serif headings, generous space, and photography of the city the firm calls home.",
    designProcess:
      "We began with a content audit and a new site map, then designed a small set of flexible page templates rather than a fixed look. Typography and spacing carry the brand — there are no heavy graphics, no stock handshakes, nothing that would date.",
    developmentProcess:
      "Built as a fast, static front end with a headless CMS the partners can edit themselves. Pages load in under a second, score well on accessibility, and the structure makes it simple to add new practice areas without involving us.",
    keyFeatures: [
      "Problem-led navigation, not department-led",
      "Plain-English copy written with the partners",
      "Editable practice-area pages via Sanity CMS",
      "Accessible, keyboard-navigable contact forms",
      "Sub-second page loads across the site",
    ],
    outcome:
      "Enquiries through the site roughly doubled in the first quarter after launch, and the partners now update their own content without a phone call to us. The site reads like the firm — calm, capable and local.",
  },
  {
    slug: "foundry-coffee",
    name: "Foundry Coffee Roasters",
    industry: "Speciality Coffee",
    year: "2024",
    location: "Leeds, UK",
    tagline: "A full-bleed e-commerce experience built around the ritual of coffee.",
    description:
      "A full-bleed e-commerce experience built around the ritual of coffee — editorial product pages, subscription flow and a subscription-grade checkout.",
    services: ["Web Design", "Front-end Development", "E-commerce", "Strategy"],
    tech: ["Next.js", "Shopify"],
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/c7bce8d87_generated_image.png",
    mobileImage: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/327621928_generated_image.png",
    liveUrl: "https://foundrycoffee.example.co.uk",
    overview:
      "Foundry roast their own beans and sell them online and through a handful of cafés. They wanted a shop that felt like their packaging — warm, considered and a little bit slow — rather than a generic product grid.",
    clientBackground:
      "A small roastery with a loyal following and a growing subscription base, selling single-origin coffee to people who care about where it comes from.",
    problem:
      "Their previous shop was a standard Shopify theme that looked like every other coffee subscription. It worked, but it didn't communicate the care that goes into the roastery, and the subscription flow lost people at checkout.",
    approach:
      "We designed editorial product pages that tell the story of each coffee — origin, roast, flavour — and rebuilt the subscription flow to be a few short steps rather than a wall of options. The shop runs on Shopify, but the front end is entirely ours.",
    designProcess:
      "Photography-led. We art-directed a shoot of the roastery and the coffees, then built the layout around large, warm imagery and quiet typography. The cart and checkout were redesigned to feel like the rest of the site, not a separate utility.",
    developmentProcess:
      "A Next.js storefront on top of Shopify's Storefront API, with the subscription system handled through Shopify. Pages are statically generated for speed, and the cart updates without a page reload.",
    keyFeatures: [
      "Editorial, story-led product pages",
      "Streamlined subscription checkout",
      "Headless Shopify storefront",
      "Static generation for fast loads",
      "Cart that never reloads the page",
    ],
    outcome:
      "Subscription sign-ups increased meaningfully and the average order value rose, helped by product pages that make the case for each coffee. The owners finally have a shop that looks like their brand.",
  },
  {
    slug: "atelier-boyd",
    name: "Atelier Boyd",
    industry: "Ceramics Studio",
    year: "2025",
    location: "Edinburgh, UK",
    tagline: "A quiet, gallery-led portfolio for a working ceramicist.",
    description:
      "A quiet, gallery-led portfolio for a working ceramicist — generous whitespace, slow image reveals and a shop that never interrupts the work.",
    services: ["Web Design", "Front-end Development", "Responsive Development"],
    tech: ["Astro", "Stripe"],
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/f1434b54c_generated_image.png",
    mobileImage: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/e22e97e3a_generated_image.png",
    liveUrl: "https://atelierboyd.example.co.uk",
    overview:
      "Atelier Boyd is the studio of a ceramicist whose work sells the moment it is posted. The brief was simple: let the work be the whole site, and make buying a piece feel like collecting rather than shopping.",
    clientBackground:
      "A single maker producing small batches of functional and sculptural ceramics, sold direct to collectors and through a few select galleries.",
    problem:
      "The maker had no real website, relying on social media and word of mouth. Pieces sold fast but there was nowhere to show the full body of work, and no record of past collections.",
    approach:
      "A gallery-first site. The homepage is the work. We kept everything else — about, shop, contact — quiet and out of the way, so the ceramics are always the first thing you see.",
    designProcess:
      "Almost no typography on the surface. Large images, slow fades, and a grid that lets each piece breathe. The shop is integrated so buying a piece takes one step from the gallery itself.",
    developmentProcess:
      "Built with Astro for speed and simplicity, with Stripe handling sales. New pieces are added by dropping an image into the CMS — no form-filling, no metadata gymnastics.",
    keyFeatures: [
      "Gallery-first homepage",
      "Slow, considered image reveals",
      "One-step purchase from the gallery",
      "Archive of past collections",
      "Effortless CMS for a solo maker",
    ],
    outcome:
      "The site now serves as both a portfolio and a quiet shop. Collectors return to check for new work, and the maker has a permanent record of every piece they've made.",
  },
  {
    slug: "northbank-architecture",
    name: "Northbank Architecture",
    industry: "Architectural Practice",
    year: "2024",
    location: "Manchester, UK",
    tagline: "A project-led site that lets the work breathe.",
    description:
      "A project-led site that lets the work breathe — case study structure, full-bleed imagery and a CMS the practice can keep current without us.",
    services: ["Web Design", "Front-end Development", "Copywriting", "CMS Integration"],
    tech: ["React", "Sanity CMS"],
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/cb4f409e5_generated_image.png",
    mobileImage: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/327621928_generated_image.png",
    liveUrl: "https://northbank.example.co.uk",
    overview:
      "Northbank is a small practice with a portfolio of residential and cultural work. They needed a site that presented projects as case studies rather than thumbnails, and that they could keep up to date themselves.",
    clientBackground:
      "A practice of six architects, working on considered residential and small public projects across the North of England.",
    problem:
      "Their previous site was a fixed gallery that hadn't been updated in years because it required a developer to change. New projects went unseen, and the site didn't reflect the quality of the work.",
    approach:
      "We built a case-study structure — each project gets its own page with full-bleed imagery, a written narrative and the team's role. The CMS lets the practice add a new project in an afternoon.",
    designProcess:
      "Architecture is a visual discipline, so the design gets out of the way. Full-bleed images, a thin rule system, and typographic restraint. The case-study pages were designed to be read, not scrolled past.",
    developmentProcess:
      "A React front end with Sanity for content. Project pages are generated from structured fields, so the practice fills in a form and a well-designed page appears — no layout decisions required.",
    keyFeatures: [
      "Case-study project pages",
      "Full-bleed project imagery",
      "Self-service project publishing",
      "Structured, consistent layouts",
      "Fast, image-heavy without being slow",
    ],
    outcome:
      "The practice now publishes new work as it completes, and the site has become a genuine portfolio they send to prospective clients. Enquiries are better informed from the first call.",
  },
  {
    slug: "linden-and-co",
    name: "Linden & Co.",
    industry: "Independent Bookshop",
    year: "2025",
    location: "Norwich, UK",
    tagline: "A literary, warm site for a high-street bookshop.",
    description:
      "A literary, warm site for a high-street bookshop — events, recommendations and a membership scheme, all written in the shop's own voice.",
    services: ["Web Design", "Front-end Development", "Copywriting", "CMS Integration"],
    tech: ["Next.js", "Payload CMS"],
    image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/8596c3ed9_generated_image.png",
    mobileImage: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/e22e97e3a_generated_image.png",
    liveUrl: "https://lindenco.example.co.uk",
    overview:
      "Linden & Co. is a much-loved independent bookshop. They wanted a site that felt like the shop itself — warm, opinionated and full of recommendations — rather than an online catalogue.",
    clientBackground:
      "A high-street bookshop with a loyal local following, a busy events programme and a membership scheme that funds the shop through quieter months.",
    problem:
      "The shop's website was a basic brochure that didn't capture any of its character. Events were advertised on social media and lost, and the membership scheme had no online presence at all.",
    approach:
      "We built the site around the shop's voice — staff recommendations, events and membership — and wrote the copy with the owners so it sounds like them, not like a marketing department.",
    designProcess:
      "Warm and literary. Paper-toned backgrounds, serif headings, book-cover grids and space for the staff to write. The events and membership sections were designed to be the heart of the site, not an afterthought.",
    developmentProcess:
      "A Next.js site with Payload CMS, so the staff can publish recommendations and events themselves. Membership sign-up and renewal are handled on the site, integrated with the shop's till system.",
    keyFeatures: [
      "Staff-written recommendations section",
      "Events programme with booking",
      "Online membership sign-up and renewal",
      "Copy in the shop's own voice",
      "Self-publishing for the staff team",
    ],
    outcome:
      "Membership sign-ups moved online and grew, events now have a permanent home, and the site finally reads like the shop. The owners update it themselves between customers.",
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};