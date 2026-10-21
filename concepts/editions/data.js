// The launch set: nine posts in the combined direction ("Editions").
//
// Every fact here was checked against the project's own records:
//   src/data/projects.js, caseStudies.js, team.js, services.js, process.js,
//   aftercare.js and the contact section (ContactDoor.jsx).
// Corrections and open questions are listed in `approvals` per post and in
// campaign/approvals.md.
//
// Status words drive the honesty system on the artwork itself:
//   commissioned  real client work (solid door)
//   speculative   invented business, labelled on the artwork (dashed door)
//   illustrative  invented example copy (no door, ruled slip)
//   studio        about Beyond Years itself

export const ROOM_I = {
  numeral: "I",
  name: "Churcham Homes",
  first: "Churcham",
  rest: "Homes",
  // churchamhomes.co.uk: "Premium homes built … across Gloucestershire".
  // (The case study says Cheltenham; their developments span the county.)
  place: "Gloucestershire",
  year: "2025",
  platform: "WordPress",
  url: "churchamhomes.co.uk",
  lighthouse: 99,
  phone: "/work/churcham/mobile-home-hero-400.webp",
  desktop: "/work/churcham/home-hero-v2-1600.webp",
  decisions: [
    "Image-led, so the developments speak for themselves.",
    "Every development gets its own galleries, floor plans and guide pricing.",
    "A direct route to enquire on each development.",
  ],
};

export const ROOM_II = {
  numeral: "II",
  name: "Groves Hairstyling",
  first: "Groves",
  rest: "Hairstyling",
  // The client's own homepage says "High-end hairstyling in the Forest of
  // Dean" and directories list the salon in Cinderford. The case study on
  // beyondyears.co.uk says Cheltenham, which looks wrong: confirm and fix.
  place: "Forest of Dean",
  year: "2024",
  platform: "Squarespace",
  url: "groveshairstyling.com",
  lighthouse: 99,
  phone: "/work/groves/mobile-home-hero-400.webp",
  desktop: "/work/groves/services-menu-1600.webp",
  decisions: [
    "Marble, crystal and a warm welcome: the salon itself, brought online.",
    "The full service menu, with clear prices.",
    "Every stylist introduced by name, plus an online shop.",
  ],
};

// From src/data/team.js (their own published bio lines), not invented
export const RESIDENTS = [
  {
    name: "Connor",
    role: "Design, development & technical delivery",
    line: "I design and build websites, but I don’t really think of them as pages. I think of them as places.",
    image: "/team/connor.webp",
    focus: "50% 22%",
  },
  {
    name: "Mike",
    role: "Copywriting & outreach",
    line: "My job is all about conveying information in a clear way.",
    image: "/team/mike.webp",
    focus: "50% 26%",
  },
];

// Illustrative example. The "after" line is a DRAFT for Mike to replace
// or approve; it must not be published until he has.
export const NOTE = {
  before: "Welcome to our salon, where we offer a wide range of hair services to suit all your needs.",
  after: ["Bring the photo", "you’ve been saving.", "We’ll tell you", "honestly what it’ll", "take to get there."],
  why: "Every salon offers a wide range of services. Only you can promise an honest conversation about the photo on someone’s phone.",
};

// From services.js, process.js and the contact section. No prices: none are
// published on the site, so none are invented here.
export const WORKING = {
  steps: [
    ["Groundwork", "We talk through your vision for the site, then outline the process."],
    ["Planning", "Milestones and deadlines, agreed before we start."],
    ["Production", "Connor designs and builds your site. Mike writes the words."],
    ["Complete", "It’s yours, with hosting and upkeep if you want them."],
  ],
  services: ["Websites", "Design", "Copywriting", "Performance", "Aftercare"],
  // Set to a string such as "Websites from £—" only once prices are decided
  priceLine: null,
};

export const SECOND_LOOK = {
  steps: [
    "About three minutes, recorded on a phone",
    "Three observations, one of them good news",
    "One line of your copy, rewritten by Mike",
    "Sent to you privately. Never posted.",
  ],
  contact: "connor@beyondyears.co.uk",
};

export const LAUNCH = [
  {
    id: "01",
    slug: "front-door",
    title: "The Front Door",
    ground: "paper",
    template: "Doorway spread",
    status: "studio",
    pin: 1,
    caption: `We’re Connor and Mike, a two-person web studio in Bristol.

We think of websites as places: somewhere a customer steps into, looks around, and decides whether they’d like to stay. So we design each one from a blank page, build it properly, and write the words ourselves.

This is where we’ll show the rooms we’ve built, a few we’ve imagined, and how we think about the details.

If you run an independent business and your website doesn’t feel like the place you’ve made, our door’s open. Link in bio.`,
    alt: "Cream paper page. Large serif text reads ‘Places people step into, not pages they scroll past.’ To the right, an ochre doorway opens onto a dark room showing the Churcham Homes website on a phone.",
    approvals: ["Connor and Mike: sign off the studio description."],
  },
  {
    id: "02",
    slug: "room-i-churcham-homes",
    title: "Room I: Churcham Homes",
    ground: "room",
    template: "Room",
    status: "commissioned",
    pin: 2,
    caption: `Room I: Churcham Homes

A family-run developer building premium homes across Gloucestershire. Their business had grown a lot since their first website was put together, and it was time for something that reflected where they are now.

We went image-first and let the developments speak for themselves. Each one has its own galleries, floor plans, guide pricing and a direct route to enquire.

Design & build: Connor
Words: Mike
WordPress · 2025

Live at churchamhomes.co.uk`,
    alt: "Dark room. An ochre doorway holds the Churcham Homes mobile homepage, a timber-clad house under a blue sky. Beside it, the desktop homepage and three design decisions. Credits along the floor: design and build Connor, words Mike, WordPress, Lighthouse performance 99 at launch.",
    approvals: [
      "Churcham Homes: courtesy heads-up before posting (the work is already public on your site). Ask before tagging them.",
      "Lighthouse 99 is the launch score from your case study. Re-run it if you want to quote a current figure.",
    ],
  },
  {
    id: "03",
    slug: "the-residents",
    title: "The Residents",
    ground: "paper",
    template: "Doorway spread",
    status: "studio",
    caption: `The residents.

Connor designs and builds. He started out making games, and still thinks of websites as places rather than pages.

Mike writes. Six years of professional writing, and a habit of looking up where obscure words come from.

Between us we do the whole thing: design, build and words. When you get in touch, you’re talking to one of us.`,
    alt: "Cream paper page titled ‘Two people, one studio.’ Two ochre doorways hold black-and-white portraits of Connor and Mike, each with their name, role and a line from their bio.",
    approvals: ["Connor and Mike: approve portraits and the bio lines (taken from your site's About section)."],
  },
  {
    id: "04",
    slug: "room-ii-groves-hairstyling",
    title: "Room II: Groves Hairstyling",
    ground: "room",
    template: "Room (mirrored)",
    status: "commissioned",
    caption: `Room II: Groves Hairstyling

A family-run salon in the Forest of Dean that had only ever lived on social media. They needed a home online that showed people exactly what they offer.

We wanted the site to feel like walking into the salon: marble, crystal and a warm welcome. The full service menu is there with clear prices, every stylist is introduced by name, and there’s a shop for the products they use.

Design & build: Connor
Words: Mike
Squarespace · 2024`,
    alt: "Dark room. An ochre doorway holds the Groves Hairstyling mobile homepage, a salon interior with the line ‘Hairstylists you can trust’. Beside it, the black-marble service menu page and three design decisions. Credits run along the floor.",
    approvals: [
      "Confirm the salon's location. The client's own site says Forest of Dean; your case study says Cheltenham.",
      "Groves: courtesy heads-up before posting; ask before tagging them.",
    ],
  },
  {
    id: "05",
    slug: "note-01-words",
    title: "Note 01: Words",
    ground: "paper",
    template: "Slip",
    status: "illustrative",
    caption: `Note 01: Words

Almost every salon website says something like the first line. It isn’t wrong; it just doesn’t tell you anything about this salon.

The second line is a promise only a particular salon can make, about a particular moment: someone showing you a photo on their phone.

That’s most of what Mike does: find the thing that’s true about you and nobody else, then say it plainly.

(An illustrative example, not a real business’s copy.)`,
    alt: "Cream paper page. A ruled slip shows a generic salon line struck through in ochre. Below, a large italic rewrite reads ‘Bring the photo you’ve been saving. We’ll tell you honestly what it’ll take to get there.’ Labelled as an illustrative example.",
    approvals: ["Mike: replace or approve the rewrite. It's a placeholder until he does. Don't publish before."],
  },
  {
    id: "06",
    slug: "study-01-a-salon-imagined",
    title: "Study 01: A Salon, Imagined",
    ground: "room",
    template: "Study",
    status: "speculative",
    caption: `Study 01: A salon, imagined

Ottoline isn’t real. It’s a salon we invented to test a few ideas before a client needs them.

The main one: where most salon sites put a stock photo, Ottoline has a mirror. The site is about the person in the chair, not the room. The price list reads at a glance, and you can book a chair from every screen.

Coded, not mocked up.

A speculative study: Ottoline is fictional and not a client.`,
    alt: "Dark room. A dashed ochre doorway, marking unbuilt work, holds a coded homepage for Ottoline, a fictional salon: an arched mirror with the word ‘you’. Text reads ‘A salon, imagined.’ A label says speculative study, fictional salon, not a client.",
    approvals: ["Re-check that no salon trades as ‘Ottoline’ in your area before posting."],
  },
  {
    id: "07",
    slug: "second-look",
    title: "Second Look",
    ground: "paper",
    template: "Doorway spread",
    status: "studio",
    caption: `Second Look

It’s hard to see your own website the way a new customer does.

So we’ll look for you. We record a short walk through your site on a phone, as your next customer would see it: three observations, one of them good news, and one line rewritten by Mike.

It comes to you privately. We never post it, and there’s no charge and no obligation.

If you’d like one, send us a message or email connor@beyondyears.co.uk.`,
    alt: "Cream paper page titled ‘Second Look’. A small doorway shows a phone recording of a website, marked as a fictional example. Four numbered lines explain the private website walkthrough.",
    approvals: ["Connor and Mike: confirm Second Look is free and how many you can take on each week."],
  },
  {
    id: "08",
    slug: "study-02-a-stay-imagined",
    title: "Study 02: A Stay, Imagined",
    ground: "room",
    template: "Study (mirrored)",
    status: "speculative",
    caption: `Study 02: A stay, imagined

Hesper is a shepherd’s hut we made up, to test one idea: a stay’s website should feel like the hour you’d most want to be there.

So the homepage follows the light. In the morning it’s pale and clear; by late afternoon the sky turns and the hut window comes on. Dates and prices sit on the first screen.

A speculative study: Hesper is fictional and not a client.`,
    alt: "Dark room. A dashed ochre doorway holds a coded homepage for Hesper, a fictional shepherd’s hut, at dusk: a hut silhouette with one lit window under an orange sky. Text reads ‘A stay, imagined.’ Labelled speculative study, fictional stay, not a client.",
    approvals: ["Re-check that no stay trades as ‘Hesper’ before posting."],
  },
  {
    id: "09",
    slug: "working-with-us",
    title: "Working With Us",
    ground: "paper",
    template: "Doorway spread",
    status: "studio",
    pin: 3,
    caption: `Our door’s open.

Most projects start with a free call. We get to know you and your business and talk through what you need, scaled to your size, goals and budget.

Then groundwork, planning and production. Connor designs and builds your site on the platform that suits you; Mike writes the words. Once it’s live, we can host it, look after it and help it grow.

Websites, design, words and aftercare for independent businesses, from a two-person studio in Bristol.

beyondyears.co.uk`,
    alt: "Cream paper page titled ‘Our door’s open.’ A doorway glows with warm light. Four steps (groundwork, planning, production, complete) and a list of services, ending with ‘Start with a free call’.",
    approvals: ["Decide whether to publish prices. None are shown until you do."],
  },
];

// The profile grid as it should look once all nine are live: three pinned
// posts on the top row, then newest first. Posting 03 → 08 in order gives
// this arrangement, which alternates paper and room like a chequerboard.
export const PROFILE_ORDER = ["01", "02", "09", "08", "07", "06", "05", "04", "03"];

// Planned publish dates (see campaign/calendar.csv). 03 → 08 must go out in
// this order for the profile grid to alternate paper and room.
export const SCHEDULE = {
  "01": "Mon 19 Oct",
  "02": "Mon 19 Oct",
  "09": "Mon 19 Oct",
  "03": "Wed 21 Oct",
  "04": "Fri 23 Oct",
  "05": "Tue 27 Oct",
  "06": "Thu 29 Oct",
  "07": "Mon 2 Nov",
  "08": "Wed 4 Nov",
};
