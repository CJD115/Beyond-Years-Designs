// Aftercare ("Beyond launch") content for the live section
// (components/studio/aftercare/AftercareNewGame.jsx, "New Game+"). The
// archived handover note and aftercare card (design-archive/aftercare/) read
// the same items.
//
// Each item: `summary` is the one-line description on the live section,
// `body` the longer one the archived note shows, and `terms` how it works.
// Swap a price into `terms` ("from £X / month") whenever you're happy to
// publish one.

export const AFTERCARE_GROUPS = [
  {
    title: "Keeping it running",
    items: [
      {
        name: "Hosting & Maintenance",
        summary: "We host your site and keep it maintained, hassle-free.",
        body: "If you don’t already have a hosting solution in mind, don’t worry! We’ll host your site and keep everything maintained, hassle-free. Contact us with any changes you’d like made, as and when you need, and let us handle the rest.",
        terms: "Ongoing",
      },
      {
        name: "Domain",
        summary: "Set up and managed for you. You keep full access.",
        body: "Need help securing your domain name? Not a problem! We’ll get you set up with your domain of choice (depending on availability), and manage it all from our end. You’ll still have full access, but we’ll handle all the faff. ",
        terms: "Renewed yearly",
      },
    ],
  },
  {
    title: "Helping it grow",
    items: [
      {
        name: "Content",
        summary: "Blogs, newsletters and more, professionally written.",
        body: "Do you have a blog, newsletter, or other written content that you’d like support with? We can help! We can provide you with regular, professionally written content, or offer ad-hoc support as and when you need it. Let us know!",
        terms: "Regular or ad hoc",
      },
      {
        name: "Analytics",
        summary: "Clear, simple insights into your audience.",
        body: "Data analytics shows you how people use your site, like how long they stay and where they are from. We’ll set everything up so you can easily view this information, giving you clear, simple insights that help understand your audience. ",
        terms: "One-off",
      },
    ],
  },
];

// Supporting line beside the key
export const AFTERCARE_ASIDE =
  "Take as much or as little as you need. We’ll talk it through when your site’s finished.";

// The handover note. Plain strings are set as normal text; { em } parts are
// picked out in ochre italic.
export const AFTERCARE_NOTE = [
  "Once your site’s live, we can keep it running with ",
  { em: "hosting" },
  " and ",
  { em: "maintenance" },
  ", and help it grow with ",
  { em: "blogs and newsletters" },
  " and ",
  { em: "analytics" },
  ".",
];

export const AFTERCARE_SIGNOFF = "Connor & Mike";

export const AFTERCARE_LINK = { label: "Ask about aftercare", href: "#contact" };

// "New Game+": the line under the heading and the closing line by the link
export const AFTERCARE_INTRO =
  "Your site’s live, but the story doesn’t end there. We stay on hand, with as much or as little support as you need.";
export const AFTERCARE_EQUIP = "Pick only what’s useful to you.";
