import type { StaticImageData } from "next/image";
import teamOnSlab from "@/public/assets/about/team-on-slab.jpg";
import siteSupervision from "@/public/assets/services/site-supervision.jpg";
import thoraipakkamFront from "@/public/assets/projects/ongoing/thoraipakkam-front.jpg";
import thoraipakkamFrame from "@/public/assets/projects/ongoing/thoraipakkam-frame.jpg";
import thoraipakkamCorner from "@/public/assets/projects/ongoing/thoraipakkam-corner.jpg";
import saidapetHouse from "@/public/assets/projects/ongoing/saidapet-house.jpg";

/*
 * Page copy and imagery. In titles, *asterisks* mark the italic accent word
 * (see components/ui/SplitText.tsx). Brand, colours, navigation and contact details are
 * in lib/site.ts.
 *
 * Photographs are the company's own, taken on its current sites (see
 * public/assets/CREDITS.md). To add a project, drop a photo in
 * public/assets/projects/ongoing and add an entry to ONGOING below.
 */

export type Picture = { src: StaticImageData; alt: string };

export const HERO = {
  headline: ["Building Dreams.", "Creating Legacies."],
  body: "Quality construction, honest service and reliable project execution across Chennai.",
  trustLine: "Family-run for 27+ years · 100+ buildings across Chennai.",
  scrollCue: "Scroll to watch it rise",
  /** Shown over the finished house at the end of the hero sequence. */
  outro: "Your home — built with quality, trust and care.",
};

/**
 * The hero's scroll-scrubbed build sequence. `frames` are the client's build
 * video exported as an image sequence; each `word` is rendered as extruded
 * 3D type and also kept in the DOM as a heading.
 */
export const BUILD_SEQUENCE = {
  label: "How We Build",
  title: "From an empty plot to your finished home",
  /**
   * Every frame of the build video as a still image (see
   * public/assets/frames/README.md). Desktop: 160 frames at 1280px;
   * phones: 120 frames at 960px.
   */
  frames: {
    desktop: { dir: "/assets/frames/desktop", count: 160 },
    mobile: { dir: "/assets/frames/mobile", count: 120 },
  },
  video: {
    description:
      "Animation: an empty plot is marked out with setting-out lines, the structural frame rises, the roof slab and walls are added, and the finished two-storey home appears.",
  },
  chapters: [
    {
      word: "Plan.",
      stage: "Stage 01 · Site & setting out",
      caption:
        "We study the site, prepare clear drawings and an honest estimate, then mark out every line on the ground before work begins.",
    },
    {
      word: "Build.",
      stage: "Stage 02 · Structure & walls",
      caption:
        "The frame rises under daily supervision — quality materials, skilled workmanship and safety on site at every step.",
    },
    {
      word: "Deliver.",
      stage: "Stage 03 · Finishes & handover",
      caption:
        "Finishes, fittings and final checks complete the picture. We hand over a home your family can trust for generations.",
    },
  ],
};

export const ABOUT = {
  label: "01 — Our Company",
  title: "About Our *Company*",
  body: "Mani Mohan Construction is a family-run construction business with more than 27 years in the industry and over 100 buildings completed across Chennai. We focus on quality construction, customer satisfaction, transparent pricing and reliable project execution.",
  pillars: ["Quality construction", "Customer satisfaction", "Transparent pricing", "Reliable project execution"],
  image: {
    src: teamOnSlab,
    alt: "Our team on the top-floor slab of the Thoraipakkam apartment building, walking between the steel reinforcement before the concrete pour.",
  } satisfies Picture,
};

export const SERVICES_INTRO = {
  label: "02 — What We Do",
  title: "Our *Services*",
  body: "From a single family home to a commercial building, we handle every stage of construction with the same care, clear communication and attention to detail.",
  image: {
    src: siteSupervision,
    alt: "A Mani Mohan Construction supervisor checking the slab reinforcement on the Thoraipakkam site while workers tie steel behind him.",
  } satisfies Picture,
};

/* The service list itself lives in lib/services.ts. */

export const GOALS_INTRO = {
  label: "03 — Our Goals",
  title: "Our *Goals*",
  body: "What we work towards on every site, with every customer, every day.",
};

export const GOALS = [
  { title: "Build with Quality", body: "Deliver strong, safe and beautiful buildings that our customers can trust." },
  { title: "Earn Customer Trust", body: "Maintain honesty, transparency and customer satisfaction in every project." },
  { title: "Grow Our Business", body: "Reach more customers and take on new construction projects across Chennai." },
  { title: "Show Our Best Work", body: "Showcase our completed projects and construction experience through our website." },
  { title: "Grow Online", body: "Reach more people through Google, social media and our professional website." },
  {
    title: "Continue Our Legacy",
    body: "Honour our late founder’s vision and carry forward our family’s construction journey with pride.",
  },
];

export const VISION = {
  label: "04 — Our Vision",
  title: "Our *Vision*",
  statement: "To turn every customer’s dream into reality by building with quality, trust and care.",
};

export const PROJECTS_INTRO = {
  label: "05 — Our Work",
  title: "Building *right now*",
  body: "Real sites, photographed this season. Three buildings are going up across Chennai today — and every one gets the same daily supervision.",
};

/**
 * Track record. The numbers are the company's own figures; the Saidapet line
 * is how the family describes its home neighbourhood.
 */
export const TRACK_RECORD = {
  stats: [
    { value: 27, suffix: "+", label: "Years building in Chennai" },
    { value: 100, suffix: "+", label: "Buildings completed" },
    { value: 3, suffix: "", label: "Sites under construction now" },
  ],
  legacy: {
    title: "Our proof is in the *streets*",
    body: "Most of our 100+ buildings were finished long before every phone had a camera, so there’s little online to show for them. Walk around Saidapet instead — around half the buildings in our neighbourhood were built by Mani Mohan Construction.",
  },
};

export type OngoingProject = {
  location: string;
  type: string;
  stage: string;
  description: string;
  /** First picture is the cover; any others show as thumbnails. Empty = photos to follow. */
  pictures: Picture[];
};

export const ONGOING: OngoingProject[] = [
  {
    location: "Thoraipakkam",
    type: "Apartment building",
    stage: "Structure · top-floor slab",
    description:
      "A multi-storey apartment block with stilt parking. The frame is up, brickwork has started on the lower floors and the top slab is being reinforced for its pour.",
    pictures: [
      {
        src: thoraipakkamFront,
        alt: "The Thoraipakkam apartment building under construction: a four-storey concrete frame with brick walls on the first floor and shuttering props on the top floor.",
      },
      {
        src: thoraipakkamFrame,
        alt: "Looking up at the concrete frame of the Thoraipakkam apartment, with cantilevered balcony slabs and steel props supporting the top-floor shuttering.",
      },
      {
        src: thoraipakkamCorner,
        alt: "Corner view of the Thoraipakkam apartment frame, showing balconies on every floor and brickwork rising on the first floor.",
      },
    ],
  },
  {
    location: "Saidapet",
    type: "Individual house",
    stage: "Brickwork · upper floors",
    description:
      "A multi-storey family home in Saidapet — right in the neighbourhood where so much of our work already stands.",
    pictures: [
      {
        src: saidapetHouse,
        alt: "The Saidapet house under construction: a narrow concrete frame with red brick walls, shuttering on the top floor and building materials stacked at the entrance.",
      },
    ],
  },
  {
    location: "Kundrathur",
    type: "Site in progress",
    stage: "Work under way",
    description: "Construction under way. Photos from this site are coming soon.",
    pictures: [],
  },
];

export const CONTACT_COPY = {
  label: "06 — Contact",
  title: "Let’s Build Your *Dream* Project",
  body: "Tell us about your construction needs. Our team is ready to discuss your ideas, requirements and project goals.",
};

/** Words for the scrolling band under the hero. */
export const MARQUEE = [
  "Individual Homes",
  "Apartments",
  "Commercial Buildings",
  "Renovations",
  "Extensions",
  "Interiors",
];

/* --------------------------------------------------------------- shared */

/** How a project runs, start to finish (About, Services and service pages). */
export const PROCESS = {
  label: "How We Work",
  title: "Five steps from *idea* to handover",
  steps: [
    { title: "Talk to us", body: "Call, WhatsApp or send the form. Tell us about your plot, your plans and your budget." },
    { title: "Site visit", body: "We visit the site, study the plot or building and understand exactly what you need." },
    { title: "Clear estimate", body: "You get a transparent, written estimate with the scope, stages and schedule spelled out." },
    { title: "Build, supervised daily", body: "Work begins with our team on site every day, checking materials, workmanship and safety." },
    { title: "Checks & handover", body: "We inspect every room with you, fix what needs fixing and hand over a building you can trust." },
  ],
};

/** Reasons to choose us — only claims the company can stand behind. */
export const WHY_US = {
  label: "Why Mani Mohan",
  title: "Why families *trust* us",
  items: [
    { title: "27+ years, one family", body: "A family-run company that has built across Chennai for more than 27 years — and plans to for many more." },
    { title: "100+ buildings", body: "Homes, apartments and commercial buildings, many of them still standing proudly in Saidapet." },
    { title: "Daily supervision", body: "Our team is on site every working day. Nothing gets covered up before it's been checked." },
    { title: "Transparent pricing", body: "Written estimates with clear stages. No surprise bills halfway through." },
    { title: "Quality materials", body: "Good materials and skilled workmanship at every stage, from foundation to final coat of paint." },
    { title: "One team, start to finish", body: "Structure, services and finishes under one roof — one point of contact for your whole project." },
  ],
};

/** General questions (contact page; also used in FAQ structured data). */
export const GENERAL_FAQ = [
  { q: "Which areas do you work in?", a: "We build across Chennai. Our current sites are in Saidapet, Thoraipakkam and Kundrathur, and Saidapet is our home neighbourhood." },
  { q: "How do I get started?", a: "Call or WhatsApp us, or send the enquiry form. We'll arrange a site visit, understand your needs and follow up with a written estimate." },
  { q: "Do you give a written estimate?", a: "Yes. Transparent pricing is one of our core commitments — you'll get the scope, stages and costs in writing before work begins." },
  { q: "Do you only build new houses?", a: "No. Alongside new homes, apartments and commercial buildings, we take on renovations, extensions, additional floors, finishing, tiling, electrical and plumbing work." },
  { q: "Can I work with my own architect?", a: "Yes. We regularly build from drawings prepared by our clients' architects and structural engineers." },
];

/** About page */
export const ABOUT_PAGE = {
  label: "About Us",
  title: "A family that has been *building* Chennai for 27+ years",
  intro:
    "Mani Mohan Construction is a family-run builder from Saidapet, Chennai. For more than 27 years we've built homes, apartments and commercial buildings with the same simple promise: quality work, honest prices and a building you can trust.",
  story: {
    title: "Our *story*",
    paragraphs: [
      "What began with our founder more than 27 years ago grew one building at a time — first in our own neighbourhood, then across Chennai. Today, around half the buildings around us in Saidapet carry our work.",
      "Most of those 100+ buildings were finished long before every phone had a camera, so there's little of them online. What we have instead is a reputation passed from one family to the next.",
      "Today the family carries our late founder's vision forward: building with quality, earning trust and treating every customer's project as if it were our own home.",
    ],
  },
};

/** Careers page */
export const CAREERS = {
  label: "Careers",
  title: "Build your *career* with us",
  intro:
    "We're a family-run company that has kept building for 27+ years because of the people on our sites. If you take pride in good work, we'd like to hear from you.",
  roles: [
    { title: "Site engineers", body: "Civil engineers who want hands-on experience across houses, apartments and commercial buildings." },
    { title: "Site supervisors", body: "Experienced supervisors who keep work safe, on schedule and to standard." },
    { title: "Skilled tradespeople", body: "Masons, bar benders, carpenters, electricians, plumbers, tilers and painters." },
  ],
  note: "We don't list fixed openings — send your details and the kind of work you do, and we'll get in touch when there's a fit.",
};
