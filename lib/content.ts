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

export const SERVICES = [
  {
    title: "Individual house construction",
    description: "Complete construction of independent homes, from foundation to final finish, built around your family's needs.",
  },
  {
    title: "Residential building construction",
    description: "Multi-unit residential buildings planned and built for lasting strength, comfort and value.",
  },
  {
    title: "Apartment construction",
    description: "Well-planned apartment projects with sound structure, efficient layouts and quality common areas.",
  },
  {
    title: "Commercial building construction",
    description: "Shops, offices and commercial spaces built to schedule, to standard and ready for business.",
  },
  {
    title: "Home renovation and remodelling",
    description: "Thoughtful upgrades that repair, refresh and modernise the home you already love.",
  },
  {
    title: "Building extensions and additional floors",
    description: "Structurally sound extensions and extra floors that add space without compromising safety.",
  },
  {
    title: "Interior finishing and painting",
    description: "Careful plastering, painting and finishing work that completes every room cleanly.",
  },
  {
    title: "Tiles and flooring",
    description: "Precise tile and flooring installation in a wide range of materials, laid to last.",
  },
  {
    title: "Electrical and plumbing works",
    description: "Safe, neatly executed electrical and plumbing installations for new builds and renovations.",
  },
  {
    title: "Construction planning and project coordination",
    description: "Clear planning, budgeting and site coordination that keep your project on track from start to handover.",
  },
];

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
