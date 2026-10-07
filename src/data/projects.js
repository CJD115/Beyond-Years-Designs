// Central project data. Each project powers both the homepage Selected Work
// section and its individual case-study page at /work/:slug.
// Add real projects here — the case-study page renders whatever fields exist.

// Images are served at several widths (name-800.webp, name-1600.webp, and the
// original name.webp at `fullWidth`) so phones download a small one. Smaller
// widths than the original are made by `npm run images`.
const srcSetFor = (src, fullWidth = 2400, widths = [800, 1600]) =>
  widths
    .filter((w) => w < fullWidth)
    .map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`)
    .concat(`${src} ${fullWidth}w`)
    .join(", ");

// The small pinned prints in Selected Work
const detailSrcSetFor = (src, fullWidth) => srcSetFor(src, fullWidth, [200, 400]);

export const PROJECTS = [
  {
    slug: "churcham-homes",
    name: "Churcham Homes",
    industry: "Luxury Property Developer",
    year: "2025",
    location: "Cheltenham, UK",
    tagline: "A family-run luxury property developer. This website spotlights each new development with galleries, floor plans, pricing, and a direct route to enquire. ",
    description:
      "A modern, visual-first website for high-end property developments across Gloucestershire. ",
    services: ["Website Design", "Web Development", "Copywriting", "Content Writing", "Content & Project Showcase", "Responsive Design"],
    tech: ["WordPress", "Elementor", "JavaScript"],
    image: "/work/churcham-homes-desktop.webp",
    imageSrcSet: srcSetFor("/work/churcham-homes-desktop.webp"),
    thumb: "/hero-trail/churcham-homes.webp",
    // Selected Work ("Rooms") — the pinned prints
    print: "/work/churcham-homes.webp",
    printSrcSet: srcSetFor("/work/churcham-homes.webp", 1440),
    detail: {
      image: "/work/churcham-homes-mobile.webp",
      srcSet: detailSrcSetFor("/work/churcham-homes-mobile.webp", 391),
      caption: "On the phone",
      alt: "The Churcham Homes website on a phone",
      portrait: true,
    },
    responsiveImage: "/work/churcham-homes-lifestyle.webp",
    responsiveImageSrcSet: srcSetFor("/work/churcham-homes-lifestyle.webp"),
    mobileImage: "/work/churcham-homes-mobile.webp",
    // Selected Work ("Three Rooms"): the real place blurred behind, the
    // website in its frame, and one line about it
    room: {
      line: "A family-run luxury developer. Each new development gets its own galleries, floor plans, pricing and a direct route to enquire.",
      place: "/work/churcham-homes-lifestyle-800.webp",
      screen: "/work/churcham-homes-desktop.webp",
      screenSrcSet: srcSetFor("/work/churcham-homes-desktop.webp"),
    },
    featured: true,
    overview:
      "This polished, image-led website is designed to showcase what the brand does, and convert interest into enquiries." +
      " It uses responsive design and premium photography to convey the luxurious brand feel, and spotlights each development with galleries, floor plans, and relevant contact details.",
    clientBackground:
      "Churcham Homes is a family-run premium property developer in Gloucestershire. Their developments focus on high-end finishes, modern layouts, and a premium customer experience.",
    problem:
      "The client’s business had grown significantly since their original website was put together. It was time to try something a little more sophisticated that better reflected where the brand was today.",
    approach:
      "After meeting with the client to discuss what they felt wasn’t working, we mapped out a more updated, modern-looking site that better reflected their new brand feel." +
      " Wanting to emphasise the luxurious nature of their properties, we opted for an image-focussed approach, letting the company’s developments speak for themselves." +
      " With the pictures in place, we designed around it, creating a responsive, SEO-friendly site that better showcased their premium feel, while remaining true to their core brand values.  ",
    keyFeatures: [
      "Development listings with live status and guide pricing",
      "Image-led galleries, floor plans and digital brochures",
      "Previous developments archive showcasing the track record",
      "Dedicated land acquisition enquiry route",
    ],
    metrics: { performance: 99, accessibility: 96, bestPractices: 96, seo: 100 },
    outcome:
      "The refreshed website gives the brand a whole new look, with refined layouts and premium imagery underlining and spotlighting the brand’s luxury image.",
  },

  {
    slug: "groves-hairstyling",
    name: "Groves Hairstyling",
    industry: "Hair Stylist",
    year: "2024",
    location: "Cheltenham, UK",
    tagline: "A long-standing local hair salon with a loyal client base. This website highlights their services, pricing, and product options, with a clean modern look that reflects the brand’s friendly, professional feel.",
    description:
      "An elegant, welcoming website for a trusted hairstyling brand in Gloucestershire.",
    services: ["E-commerce", "Copywriting", "Web Design"],
    tech: ["Squarespace", "CSS"],
    image: "/work/groves-hairstyling-desktop.webp",
    imageSrcSet: srcSetFor("/work/groves-hairstyling-desktop.webp"),
    thumb: "/hero-trail/groves-hairstyling.webp",
    // Selected Work ("Rooms") — the pinned prints, and a quote shown in place of the tagline
    print: "/work/groves-hairstyling.webp",
    printSrcSet: srcSetFor("/work/groves-hairstyling.webp"),
    detail: {
      image: "/work/groves-salon.webp",
      srcSet: detailSrcSetFor("/work/groves-salon.webp", 480),
      caption: "The salon itself",
      alt: "Inside the Groves Hairstyling salon",
    },
    quote: {
      text: "I wanted the site to feel like walking into the salon itself: marble, crystal, that quiet sense of being looked after.",
      by: "Connor",
    },
    responsiveImage: "/work/groves-hairstyling-services.webp",
    responsiveImageSrcSet: srcSetFor("/work/groves-hairstyling-services.webp"),
    mobileImage: "/work/groves-hairstyling-mobile.webp",
    room: {
      line: "“I wanted the site to feel like walking into the salon itself: marble, crystal, that quiet sense of being looked after.” — Connor",
      place: "/work/groves-salon-400.webp",
      screen: "/work/groves-hairstyling-services.webp",
      screenSrcSet: srcSetFor("/work/groves-hairstyling-services.webp"),
    },
    liveUrl: "https://www.groveshairstyling.com/",
    overview:
      "This elegant, approachable website is designed to show customers exactly what the company offers, and make it easy for them to book.",
    clientBackground:
      "Groves Hairstyling is a family-run hair salon with decades of experience and a strong reputation in the local area.",
    problem:
      "Until working with the client, they had been relying solely on social media to serve as their online presence, and to engage with their customers. ",
    approach:
      "Coming into this project, we wanted to bring the in-person feel of the salon into the digital space. It started by sitting down with the client and understanding the brand image they wanted to convey.  The client was particular about maintaining the warmth and approachability of the salon. So, we took particular care to introduce each staff member with bios that highlighted their individual personalities, and promoted the friendliness of the entire team. ",
    keyFeatures: [
      "Full service menu with clear pricing",
      "Individual stylist bios introducing the whole team",
      "Online shop for the salon’s product range",
      "‘Book today’ prompts leading to a simple contact page",
      "Salon-inspired design: marble, crystal and a warm welcome",
    ],
    metrics: { performance: 99, accessibility: 96, bestPractices: 96, seo: 92 },
    outcome:
      "The new website gives Groves Hairstyling a modern, reliable online presence that feels true to the brand. Customers can find services, check prices, and get in touch easily. ",
  },
  
  {
    slug: "hidden-gem",
    name: "Hidden Gem",
    industry: "Removals & Clearances",
    year: "2024",
    location: "Birmingham, UK",
    tagline: "A nationally accredited auction house, local antiques shop, and removals business. This website reflects the professional, friendly brand image with clean layouts, and finds customers with full SEO.",
    description:
      "A friendly, informative website that showcases the brand feel while generating online leads.",
    services: ["Web Design", "Local SEO", "Copywriting"],
    tech: ["WordPress", "Elementor", "JavaScript"],
    image: "/work/hidden-gem-desktop.webp",
    imageSrcSet: srcSetFor("/work/hidden-gem-desktop.webp"),
    thumb: "/hero-trail/hidden-gem.webp",
    // Selected Work ("Rooms")
    print: "/work/hidden-gem.webp",
    printSrcSet: srcSetFor("/work/hidden-gem.webp"),
    detail: {
      image: "/work/hidden-gem-phone.webp",
      srcSet: detailSrcSetFor("/work/hidden-gem-phone.webp", 900),
      caption: "On the phone",
      alt: "The Hidden Gem website on a phone",
      portrait: true,
    },
    responsiveImage: "/work/hidden-gem-intro.webp",
    responsiveImageSrcSet: srcSetFor("/work/hidden-gem-intro.webp"),
    mobileImage: "/work/hidden-gem-mobile.webp",
    room: {
      line: "An auction house, an antiques shop and a removals business, in one friendly website that’s easy to find and easy to understand.",
      place: "/work/hidden-gem-800.webp",
      screen: "/work/hidden-gem-intro.webp",
      screenSrcSet: srcSetFor("/work/hidden-gem-intro.webp"),
    },
    liveUrl: "https://hiddengemremovals.co.uk/",
    overview:
      "With clear information and friendly copy, this website reflects the brand’s professional personality. Everything is laid out simply and clearly, so visitors can find what they need without digging. SEO works in the background to make the site easy to discover.",
    clientBackground:
      "Hidden Gem comprises a nationally accredited auction house and a local antiques business with a strong reputation. Alongside their auction work and highstreet shop, they also offer a clearances and removals service, giving customers a reliable, friendly experience across all three arms of the business.",
    problem:
      "As the client was scaling up, they needed a website that reflected the new arm of their business. Word of mouth was no longer a viable source of exposure, so it needed to be easily found online, and reliably convert site visitors into customers.",
    approach:
      "Visibility was of major importance to the client on this project. We outlined in the beginning what that meant to them, and it came down to two key points: they wanted to be easy to find, and they wanted all their information to be easy to understand. When designing the website itself, we took care to ensure the information was presented in clear, easily-readable layouts, with accessibility-friendly colour pairings and plenty of structured sections to increase comprehension. Behind the scenes, we made the SEO work hard, with key words, meta tags and proper titling contributing to the site’s visibility on Google’s search pages.  ",
    keyFeatures: [
      "Dedicated sections for auctions, antiques, and removals & clearances",
      "Simple, structured layouts so visitors find what they need without digging",
      "Accessibility-friendly colour pairings throughout",
      "Local SEO groundwork: keywords, meta tags and page titles",
      "Clear enquiry routes that turn visitors into customers",
    ],
    outcome:
      "The new website ranks highly for SEO, making it easily found by visitors. Its clear and informative layout help convert leads into customers. ",
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};