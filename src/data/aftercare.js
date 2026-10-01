// Aftercare ("Beyond launch") content for the live section
// (components/studio/aftercare/AftercareNote.jsx). The archived aftercare card
// (design-archive/aftercare/AftercareCard.jsx) reads the same items.
//
// `terms` is how each item works. The live section doesn't show it yet; the
// archived card does. Swap in a price ("from £X / month") whenever you're
// happy to publish one.

export const AFTERCARE_GROUPS = [
  {
    title: "Keeping it running",
    items: [
      {
        name: "Hosting",
        body: "If you don’t already have a hosting solution in mind, don’t worry! We’re happy to host your site for you, making sure everything’s kept online and taken care of, hassle-free.",
        terms: "Ongoing",
      },
      {
        name: "Domain",
        body: "Need help securing your domain name? Not a problem! We’ll get you set up with your domain of choice (depending on availability), and manage it all from our end. You’ll still have full access, but we’ll handle all the faff. ",
        terms: "Yearly",
      },
      {
        name: "Maintenance",
        body: "If your site will need regular updates, we can keep the door open for you. Once we’ve agreed the scope and frequency, you’ll be able to contact us to make any changes to your website, as and when you need.",
        terms: "Agreed plan",
      },
    ],
  },
  {
    title: "Helping it grow",
    items: [
      {
        name: "Content",
        body: "Do you have a blog, newsletter, or other written content that you’d like support with? We can help! We can provide you with regular, professionally written content, or offer ad-hoc support as and when you need it. Let us know!",
        terms: "Regular or ad hoc",
      },
      {
        name: "SEO setup",
        body: "To increase your site’s visibility, we’ll set up a strong foundation of SEO. Properly configured keywords, titles, meta descriptions and alt text make it easier for search engines to read your site properly, meaning your business is easier to find.",
        terms: "One-off",
      },
      {
        name: "Analytics",
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
  "Once your site is live, we don’t have to say goodbye. If you’d like us to stay on, we can look after the ",
  { em: "hosting" },
  " and ",
  { em: "your domain" },
  ", keep everything ",
  { em: "maintained" },
  ", and help it grow with ",
  { em: "blogs and newsletters" },
  ", ",
  { em: "SEO" },
  " and ",
  { em: "analytics" },
  ".",
];

export const AFTERCARE_SIGNOFF = "Connor & Mike";

export const AFTERCARE_LINK = { label: "Ask about aftercare", href: "#contact" };
