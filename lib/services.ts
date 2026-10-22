import type { Picture } from "@/lib/content";
import saidapetHouse from "@/public/assets/projects/ongoing/saidapet-house.jpg";
import thoraipakkamFront from "@/public/assets/projects/ongoing/thoraipakkam-front.jpg";
import thoraipakkamFrame from "@/public/assets/projects/ongoing/thoraipakkam-frame.jpg";
import thoraipakkamCorner from "@/public/assets/projects/ongoing/thoraipakkam-corner.jpg";
import siteSupervision from "@/public/assets/services/site-supervision.jpg";
import commercialBuildings from "@/public/assets/projects/commercial-buildings.jpg";
import renovationProjects from "@/public/assets/projects/renovation-projects.jpg";

/*
 * Every service, with the copy for its own landing page at
 * /services/[slug]. The home page, the services index, the header menu, the
 * footer, the enquiry form's service list and the sitemap all read from here,
 * so adding a service is one new entry.
 *
 * Photos: our own site photos where one fits; commercial and renovation use
 * licensed stock (see public/assets/CREDITS.md) until project photos exist.
 * Services without a photo get a branded panel instead.
 */

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  /** Short name for menus. */
  short: string;
  /** One line for cards and the home page. */
  description: string;
  /** Page intro under the headline. */
  intro: string;
  /** What the service covers. */
  includes: string[];
  /** Three reasons this service is in good hands. */
  highlights: { title: string; body: string }[];
  faqs: ServiceFaq[];
  image?: Picture;
};

export const SERVICES: Service[] = [
  {
    slug: "individual-house-construction",
    title: "Individual house construction",
    short: "Individual Houses",
    description: "Complete construction of independent homes, from foundation to final finish, built around your family's needs.",
    intro:
      "Your own home, built the way your family lives. We take an independent house from the empty plot to the day you move in — foundation, structure, walls, roof, services and finishes — with one team accountable for all of it.",
    includes: [
      "Site visit, soil and plot assessment",
      "Foundation, columns, beams and slabs",
      "Brickwork, plastering and waterproofing",
      "Electrical, plumbing and drainage",
      "Flooring, tiling, doors, windows and painting",
      "Final checks, cleaning and handover",
    ],
    highlights: [
      { title: "Built around your plan", body: "Room sizes, staircases, parking and future floors are discussed before a single line is marked on site." },
      { title: "Daily supervision", body: "Someone from our team is on site every working day, checking materials, workmanship and safety." },
      { title: "Clear, written pricing", body: "You get a transparent estimate with the scope and payment stages written down before work begins." },
    ],
    faqs: [
      { q: "Can you build on a narrow or awkward plot?", a: "Yes. Many of our homes in Chennai sit on tight city plots. We study the plot first and plan the structure, light and access around it." },
      { q: "Can the house be designed to add a floor later?", a: "Tell us at the start. We can plan the foundation and columns so an additional floor can be added safely in the future." },
      { q: "How do I follow progress?", a: "You'll have a direct contact on our team for updates, and you're welcome to visit the site at agreed times." },
    ],
    image: {
      src: saidapetHouse,
      alt: "A family home under construction in Saidapet: a multi-storey concrete frame with red brick walls rising floor by floor.",
    },
  },
  {
    slug: "residential-building-construction",
    title: "Residential building construction",
    short: "Residential Buildings",
    description: "Multi-unit residential buildings planned and built for lasting strength, comfort and value.",
    intro:
      "Multi-family residential buildings that stay strong and comfortable for decades. We plan the structure, services and common areas together, then build floor by floor under daily supervision.",
    includes: [
      "Structural planning with your engineer and architect",
      "RCC frame, slabs and stilt parking",
      "Staircases, lift cores and common areas",
      "Unit-by-unit electrical and plumbing",
      "Waterproofing, terrace and drainage",
      "Finishes for units and common spaces",
    ],
    highlights: [
      { title: "Structure first", body: "Columns, beams and slabs are checked at every stage — the parts you never see are the parts that matter most." },
      { title: "Coordinated trades", body: "Masons, steel fixers, electricians and plumbers are scheduled together so floors move forward without rework." },
      { title: "Built in Chennai, for Chennai", body: "27+ years of building through Chennai summers and monsoons shapes how we detail roofs, drains and waterproofing." },
    ],
    faqs: [
      { q: "Do you build residential buildings for landowners and joint developments?", a: "Yes — tell us your arrangement and we'll explain how we scope, price and stage the work for it." },
      { q: "Can you work with my own architect?", a: "Absolutely. We regularly build from drawings prepared by the client's architect and structural engineer." },
      { q: "Is one of your residential buildings under construction now?", a: "Yes — see our Thoraipakkam apartment building on the Projects page." },
    ],
    image: {
      src: thoraipakkamFront,
      alt: "The Thoraipakkam residential building under construction: a four-storey concrete frame with stilt parking and brick walls on the first floor.",
    },
  },
  {
    slug: "apartment-construction",
    title: "Apartment construction",
    short: "Apartments",
    description: "Well-planned apartment projects with sound structure, efficient layouts and quality common areas.",
    intro:
      "Apartment projects where every home in the building gets the same care. We focus on a sound structure, efficient layouts and well-built common areas that owners will live with for years.",
    includes: [
      "Planning of floors, units and parking",
      "RCC framework and slab casting",
      "Balconies, staircases and lift shafts",
      "Services for every unit, metered separately",
      "Common areas, terrace and compound",
      "Snag checks before each unit is handed over",
    ],
    highlights: [
      { title: "Consistent quality", body: "The top floor gets the same materials and attention as the first." },
      { title: "On-site every day", body: "Our supervisors walk every floor daily — reinforcement, shuttering and pours are checked before they're closed up." },
      { title: "Transparent stages", body: "Work and payments are tied to clear stages, so you always know where the project stands." },
    ],
    faqs: [
      { q: "Do you take on apartment projects of different sizes?", a: "Yes. Share the plot size, number of floors and units, and we'll discuss scope and schedule." },
      { q: "Who prepares the drawings?", a: "We can work from your architect's drawings or help coordinate planning and drawings for you." },
      { q: "Can I see an apartment you're building now?", a: "Our Thoraipakkam apartment building is under construction — photos are on the Projects page." },
    ],
    image: {
      src: thoraipakkamFrame,
      alt: "Looking up at the concrete frame of an apartment building under construction in Thoraipakkam, with balcony slabs and steel props.",
    },
  },
  {
    slug: "commercial-building-construction",
    title: "Commercial building construction",
    short: "Commercial Buildings",
    description: "Shops, offices and commercial spaces built to schedule, to standard and ready for business.",
    intro:
      "Shops, offices and commercial spaces built to open on time. We plan the structure and services around how the building will be used — loads, frontage, access and future fit-outs.",
    includes: [
      "Planning for frontage, access and parking",
      "RCC structure for open floor plates",
      "Shutters, storefronts and glazing openings",
      "Electrical capacity for business use",
      "Toilets, plumbing and drainage",
      "Finishes ready for your fit-out",
    ],
    highlights: [
      { title: "Schedule-minded", body: "A commercial building earns from the day it opens, so we plan the sequence of work to keep the schedule moving." },
      { title: "Built for use", body: "Floor loads, ceiling heights and service routes are planned for the business that will move in." },
      { title: "One accountable team", body: "From structure to finishes, you deal with one team instead of chasing separate contractors." },
    ],
    faqs: [
      { q: "Do you build mixed-use buildings — shops below, homes above?", a: "Yes. Tell us how each floor will be used and we'll plan the structure and services for both." },
      { q: "Can you finish the building to a shell so tenants do their own fit-out?", a: "Yes, we can hand over to an agreed shell-and-core stage or carry on to full finishes." },
      { q: "Do you work outside Saidapet?", a: "We work across Chennai, with current sites in Saidapet, Thoraipakkam and Kundrathur." },
    ],
    image: {
      src: commercialBuildings,
      alt: "Stock photo: a modern commercial building with a glass and metal façade at sunset.",
    },
  },
  {
    slug: "home-renovation-and-remodelling",
    title: "Home renovation and remodelling",
    short: "Renovation & Remodelling",
    description: "Thoughtful upgrades that repair, refresh and modernise the home you already love.",
    intro:
      "Give the home you already love a new life. We repair what's failing, open up what feels cramped and modernise kitchens, bathrooms and finishes — while protecting the parts of the house that are working well.",
    includes: [
      "Inspection of structure, leaks and cracks",
      "Wall changes, openings and layout updates",
      "Kitchen and bathroom remodelling",
      "Waterproofing and terrace repairs",
      "Re-wiring and re-plumbing",
      "New flooring, plastering and painting",
    ],
    highlights: [
      { title: "Inspect before we quote", body: "We look for the cause of cracks and damp first, so the money goes into a lasting fix, not a cover-up." },
      { title: "Lived-in homes, respected", body: "We plan noisy work, dust control and access around your family if you're staying in the house." },
      { title: "Structure-aware", body: "Every wall removal and new opening is checked for safety before it's touched." },
    ],
    faqs: [
      { q: "Can we stay in the house during renovation?", a: "Often, yes. We'll plan the work in phases and tell you honestly when a room or floor needs to be empty." },
      { q: "Can you fix seepage and leaks for good?", a: "We trace where the water is coming from first, then repair the source and waterproof properly rather than just repainting." },
      { q: "Do you renovate commercial spaces too?", a: "Yes — shops and offices as well as homes." },
    ],
    image: {
      src: renovationProjects,
      alt: "Stock photo: the inside of a house during renovation, with walls opened up to the structure and timber supports in place.",
    },
  },
  {
    slug: "building-extensions-and-additional-floors",
    title: "Building extensions and additional floors",
    short: "Extensions & Additional Floors",
    description: "Structurally sound extensions and extra floors that add space without compromising safety.",
    intro:
      "More space without moving house. We add rooms and complete floors to existing buildings — after checking that the structure below can safely carry them.",
    includes: [
      "Structural assessment of the existing building",
      "Column, beam and slab extensions",
      "Additional floors and terrace rooms",
      "Staircase extensions and access",
      "Connecting electrical and plumbing",
      "Matching finishes inside and out",
    ],
    highlights: [
      { title: "Safety before space", body: "We check the existing foundation and columns before recommending what can be added." },
      { title: "Seamless joins", body: "New work is tied into the old structure properly and finished to match the rest of the building." },
      { title: "Minimal disruption", body: "Work is sequenced so the floors below can keep being used wherever it's safe to do so." },
    ],
    faqs: [
      { q: "Can any building take an additional floor?", a: "Not always. It depends on the existing foundation and columns — that's why we assess the building first and tell you honestly." },
      { q: "Can we live downstairs while the new floor is built?", a: "In many cases, yes, with safe access arrangements. We'll discuss it after the site visit." },
      { q: "Will the new floor match the old building?", a: "We match levels, openings and exterior finishes so the addition looks like it was always there." },
    ],
    image: {
      src: thoraipakkamCorner,
      alt: "Upper floors rising on a concrete frame in Thoraipakkam, with shuttering and props on the newest floor.",
    },
  },
  {
    slug: "interior-finishing-and-painting",
    title: "Interior finishing and painting",
    short: "Interior Finishing & Painting",
    description: "Careful plastering, painting and finishing work that completes every room cleanly.",
    intro:
      "The finish is what you see every day. We plaster, putty and paint with care, and finish the details — edges, corners, joinery and ceilings — so every room looks complete.",
    includes: [
      "Internal and external plastering",
      "Wall putty, primer and painting",
      "False ceilings and cornices",
      "Doors, windows and joinery fixing",
      "Texture and feature walls",
      "Final touch-ups and cleaning",
    ],
    highlights: [
      { title: "Surface preparation", body: "Good paint needs a good surface — we fix cracks and level walls before the first coat." },
      { title: "Clean workmanship", body: "Floors, fittings and furniture are covered and protected while we work." },
      { title: "Finished properly", body: "We walk every room with you at the end and touch up anything that isn't right." },
    ],
    faqs: [
      { q: "Do you do painting for houses you didn't build?", a: "Yes. We take on finishing and painting work for existing homes and buildings too." },
      { q: "Can you help choose colours and finishes?", a: "We're happy to share what works well in Chennai's climate and show you options before you decide." },
      { q: "Do you paint exteriors?", a: "Yes — exterior plastering and weather-resistant painting are part of this service." },
    ],
  },
  {
    slug: "tiles-and-flooring",
    title: "Tiles and flooring",
    short: "Tiles & Flooring",
    description: "Precise tile and flooring installation in a wide range of materials, laid to last.",
    intro:
      "Floors and tiles that stay level, tight and easy to clean. We lay floor and wall tiles, stone and other finishes with careful levelling, slopes where water needs to drain and neat, consistent joints.",
    includes: [
      "Floor levelling and screeding",
      "Vitrified and ceramic floor tiles",
      "Granite and natural stone",
      "Bathroom and kitchen wall tiles",
      "Slopes for bathrooms, balconies and terraces",
      "Skirting, grouting and finishing",
    ],
    highlights: [
      { title: "Level and true", body: "Floors are levelled before tiling so tiles don't crack, rock or trap water." },
      { title: "Right slope, right place", body: "Wet areas get the correct fall to drains — no standing water." },
      { title: "Neat detailing", body: "Cuts, corners and joints are planned so the finished floor looks clean and even." },
    ],
    faqs: [
      { q: "Can you re-tile an existing floor?", a: "Yes. We check the base first and either tile over or remove the old floor, depending on its condition." },
      { q: "Do you supply the tiles?", a: "We can work with tiles you choose or help you select and source them — tell us your preference." },
      { q: "Do you tile bathrooms and kitchens?", a: "Yes, including waterproofing underneath and correct slopes in wet areas." },
    ],
  },
  {
    slug: "electrical-and-plumbing-works",
    title: "Electrical and plumbing works",
    short: "Electrical & Plumbing",
    description: "Safe, neatly executed electrical and plumbing installations for new builds and renovations.",
    intro:
      "The services hidden in your walls should be safe, neat and easy to maintain. We plan and install wiring, plumbing and drainage for new buildings and renovations, coordinated with the structure so nothing is cut in later.",
    includes: [
      "Electrical layout and conduit planning",
      "Wiring, boards and earthing",
      "Water supply lines and tanks",
      "Drainage and sewage connections",
      "Bathroom and kitchen fittings",
      "Testing before walls are closed",
    ],
    highlights: [
      { title: "Planned with the structure", body: "Conduits and pipes are placed before slabs are cast and walls are plastered — not chased in afterwards." },
      { title: "Tested, not assumed", body: "Lines are checked for leaks and faults before they're covered up." },
      { title: "Easy to maintain", body: "Neat routing and accessible points make future repairs simpler." },
    ],
    faqs: [
      { q: "Can you re-wire an old house?", a: "Yes. Re-wiring and re-plumbing are common parts of our renovation work." },
      { q: "Do you fix leaks inside walls?", a: "We trace the leak, repair the line and restore the wall and finish." },
      { q: "Do you handle drainage connections?", a: "Yes — drainage and sewage lines are part of this service." },
    ],
  },
  {
    slug: "construction-planning-and-project-coordination",
    title: "Construction planning and project coordination",
    short: "Planning & Coordination",
    description: "Clear planning, budgeting and site coordination that keep your project on track from start to handover.",
    intro:
      "Good buildings start long before the first bag of cement arrives. We help you plan the scope, budget and schedule, coordinate drawings and trades, and keep the project on track to handover.",
    includes: [
      "Requirement discussion and site visit",
      "Scope, budget and stage-wise estimate",
      "Coordination with architects and engineers",
      "Material planning and procurement",
      "Trade scheduling and site management",
      "Progress updates and handover checks",
    ],
    highlights: [
      { title: "Decisions up front", body: "Most delays come from late decisions — we help you make them early and in writing." },
      { title: "Honest numbers", body: "Estimates are transparent and broken down, so you know where every rupee is going." },
      { title: "27+ years of sites", body: "Experience from 100+ buildings goes into every schedule and every plan." },
    ],
    faqs: [
      { q: "Can you coordinate a project where I've hired other contractors?", a: "Tell us how the project is set up and we'll explain where we can take responsibility." },
      { q: "Do you help with budgeting before I buy a plot?", a: "Yes — we can give you a realistic picture of build costs to help you decide." },
      { q: "How often will I get updates?", a: "You'll have a single point of contact and regular updates at every stage of the work." },
    ],
    image: {
      src: siteSupervision,
      alt: "A Mani Mohan Construction supervisor checking slab reinforcement on site while workers tie steel.",
    },
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const serviceHref = (slug: string) => `/services/${slug}`;
