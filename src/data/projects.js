// Central project data. Each project powers both the homepage Selected Work
// section and its individual case-study page at /work/:slug.
// Add real projects here — the case-study page renders whatever fields exist.

export const PROJECTS = [
  {
    slug: "churcham-homes",
    name: "Churcham Homes",
    industry: "Luxury Property Developer",
    year: "2025",
    location: "Cheltenham, UK",
    tagline: "A family-run luxury property developer. This website concept spotlights each new development with galleries, floor plans, pricing, and a direct route to enquire. ",
    description:
      "A modern, visual-first website for high-end property developments across Gloucestershire. ",
    services: ["Website Design", "Web Development", "Copywriting", "Content Writing", "Content & Project Showcase", "Responsive Design"],
    tech: ["Wordpress", "Elementor", "Javascript"],
    image: "/Churcham-homes-hero.png",
    thumb: "/hero-trail/churcham-homes.webp",
    // Selected Work ("Rooms") — the pinned prints
    print: "/work/churcham-homes.webp",
    detail: {
      image: "/work/churcham-homes-mobile.webp",
      caption: "On the phone",
      alt: "The Churcham Homes website on a phone",
      portrait: true,
    },
    responsiveImage: "/Churcham-homes-location-to-lifestyle.png",
    mobileImage: "/Churcham-homes-hero-mobile.png",
    liveUrl: "https://example.com/churcham-homes",
    featured: true,
    overview:
      "This polished, image-led website concept is designed to showcase what the brand does, and convert interest into enquiries." + 
      "It uses responsive design and premium photography to convey the luxurious brand feel, and spotlights each development with galleries, floor plans, and relevant contact details.",
    clientBackground:
      "Churcham Homes is a family-run premium property developer in Gloucestershire. Their developments focus on high-end finishes, modern layouts, and a premium customer experience.",
    problem:
      "The client’s business had grown significantly since their original website was put together. It was time to try something a little more sophisticated that better reflected where the brand was today.",
    approach:
      "Our mindset and how we came into the project",
    designProcess:
      "what was coming up with the idea steps etc",
    developmentProcess:
      "How did development look",
    keyFeatures: [
      "Development listings with live status and guide pricing",
      "Image-led galleries, floor plans and digital brochures",
      "Previous developments archive showcasing the track record",
      "Dedicated land acquisition enquiry route",
    ],
    metrics: { performance: 99, accessibility: 96, bestPractices: 96, seo: 100 },
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante and the resulting experience supports the intended content.",
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
    services: ["Service One", "Service Two", "Service Four", "Service Five"],
    tech: ["Squarespace", "CSS"],
    image: "/work/groves-hairstyling-desktop.webp",
    thumb: "/hero-trail/groves-hairstyling.webp",
    // Selected Work ("Rooms") — the pinned prints, and a quote shown in place of the tagline
    print: "/work/groves-hairstyling.webp",
    detail: {
      image: "/work/groves-salon.webp",
      caption: "The salon itself",
      alt: "Inside the Groves Hairstyling salon",
    },
    quote: {
      text: "I wanted the site to feel like walking into the salon itself: marble, crystal, that quiet sense of being looked after.",
      by: "Connor",
    },
    responsiveImage: "/work/groves-hairstyling-services.webp",
    mobileImage: "/work/groves-hairstyling-mobile.webp",
    liveUrl: "https://www.groveshairstyling.com/",
    overview:
      "This elegant, approachable website is designed to show customers exactly what the company offers, and make it easy for them to book.",
    clientBackground:
      "Groves Hairstyling is a family-run hair salon with decades of experience and a strong reputation in the local area.",
    problem:
      "Until working with the client, they had been relying solely on social media to serve as their online presence, and to engage with their customers. ",
    approach:
      "Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor, with a clear set of screens and repeatable content patterns.",
    designProcess:
      "Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum, with imagery and typography supporting the page hierarchy.",
    developmentProcess:
      "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. The implementation supports responsive content and a streamlined interaction model.",
    keyFeatures: [
      "Editorial placeholder content pages",
      "Streamlined content pathway",
      "Flexible data-driven templates",
      "Responsive image presentation",
      "Clear interaction patterns",
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
    services: ["Service Alpha", "Service Beta", "Service Gamma"],
    tech: ["Wordpress", "Elementor"],
    image: "/work/hidden-gem-desktop.webp",
    thumb: "/hero-trail/hidden-gem.webp",
    // Selected Work ("Rooms")
    print: "/work/hidden-gem.webp",
    detail: {
      image: "/work/hidden-gem-phone.webp",
      caption: "On the phone",
      alt: "The Hidden Gem website on a phone",
      portrait: true,
    },
    responsiveImage: "/work/hidden-gem-intro.webp",
    mobileImage: "/work/hidden-gem-mobile.webp",
    liveUrl: "https://hiddengemremovals.co.uk/",
    overview:
      "With clear information and friendly copy, this website reflects the brand’s professional personality. Everything is laid out simply and clearly, so visitors can find what they need without digging. SEO works in the background to make the site easy to discover.",
    clientBackground:
      "Hidden Gem comprises a nationally accredited auction house and a local antiques business with a strong reputation. Alongside their auction work and highstreet shop, they also offer a clearances and removals service, giving customers a reliable, friendly experience across all three arms of the business.",
    problem:
      "As the client was scaling up, they needed a website that reflected the new arm of their business. Word of mouth was no longer a viable source of exposure, so it needed to be easily found online, and reliably convert site visitors into customers.",
    approach:
      "Vestibulum id ligula porta felis euismod semper. The layout gives visual content priority while keeping supporting information easy to find.",
    designProcess:
      "Cras mattis consectetur purus sit amet fermentum. Large images, quiet transitions, and a flexible grid create a measured presentation.",
    developmentProcess:
      "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. The implementation supports reusable content blocks and responsive presentation.",
    keyFeatures: [
      "Gallery-first content layout",
      "Considered image reveals",
      "Clear content pathways",
      "Archive-style project sections",
      "Flexible editing structure",
    ],
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The resulting page provides a durable home for the project's visual content.",
  },

  // {
  //   slug: "northbank-architecture",
  //   name: "Project Amet",
  //   industry: "Practice Placeholder",
  //   year: "2024",
  //   location: "County, UK",
  //   tagline: "A project-led site that gives the content room to breathe.",
  //   description:
  //     "A project-led site with structured placeholder content, flexible layouts and a clear editorial rhythm across each page.",
  //   services: ["Service One", "Service Two", "Service Three", "Service Four"],
  //   tech: ["Tool H", "Tool I"],
  //   image: "/finance-manager-main.png",
  //   mobileImage: "",
  //   liveUrl: "https://example.com/project-amet",
  //   overview:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The project is organised around a portfolio of structured placeholder entries.",
  //   clientBackground:
  //     "Donec sed odio dui. A small team and a considered collection of placeholder work provide the project context.",
  //   problem:
  //     "Nullam id dolor id nibh ultricies vehicula ut id elit. Important project information needed a clearer structure and easier browsing experience.",
  //   approach:
  //     "Curabitur blandit tempus porttitor. Each project receives a repeatable page structure with imagery, narrative, and supporting metadata.",
  //   designProcess:
  //     "Aenean lacinia bibendum nulla sed consectetur. Full-width imagery, thin rules, and typographic restraint create a focused reading experience.",
  //   developmentProcess:
  //     "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Structured fields support consistent project pages across screen sizes.",
  //   keyFeatures: [
  //     "Structured project pages",
  //     "Full-width placeholder imagery",
  //     "Reusable content patterns",
  //     "Consistent responsive layouts",
  //     "Fast visual presentation",
  //   ],
  //   outcome:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The project provides a consistent portfolio framework for future content.",
  // },

  // {
  //   slug: "linden-and-co",
  //   name: "Project Elit",
  //   industry: "Retail Placeholder",
  //   year: "2025",
  //   location: "District, UK",
  //   tagline: "A warm, editorial site for a placeholder project.",
  //   description:
  //     "A warm, editorial site for a placeholder project, with structured sections, flexible content and a clear visual hierarchy.",
  //   services: ["Service Two", "Service Four", "Service Six", "Service Seven"],
  //   tech: ["Tool J", "Tool K"],
  //   image: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/8596c3ed9_generated_image.png",
  //   mobileImage: "https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/e22e97e3a_generated_image.png",
  //   liveUrl: "https://example.com/project-elit",
  //   overview:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The project balances editorial content with a simple, accessible information structure.",
  //   clientBackground:
  //     "Vestibulum id ligula porta felis euismod semper. The project uses a concise collection of placeholder content and supporting details.",
  //   problem:
  //     "Maecenas faucibus mollis interdum. Existing information needed a stronger hierarchy and more visible pathways through the page.",
  //   approach:
  //     "Donec ullamcorper nulla non metus auctor fringilla. The approach combines modular sections with a consistent editorial presentation.",
  //   designProcess:
  //     "Cras mattis consectetur purus sit amet fermentum. Paper-toned surfaces, serif headings, and generous spacing support the intended visual tone.",
  //   developmentProcess:
  //     "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. The page system is designed to accommodate repeatable content and future updates.",
  //   keyFeatures: [
  //     "Editorial content section",
  //     "Structured updates area",
  //     "Clear conversion pathway",
  //     "Flexible content voice",
  //     "Self-managed page sections",
  //   ],
  //   outcome:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The completed structure provides a flexible home for future project content.",
  // },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};