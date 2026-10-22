/**
 * ============================================================================
 *  SITE CONFIGURATION — Mani Mohan Construction
 * ============================================================================
 *  Brand name, colours, navigation labels and contact details live here and
 *  only here. Every component reads from this file, and the colour values
 *  are injected as CSS variables in app/layout.tsx, so Tailwind classes
 *  (bg-ink, text-rose, …) and the WebGL lettering stay in sync.
 * ============================================================================
 */

export const SITE = {
  name: "Mani Mohan Construction",
  shortName: "MMC",
  wordmark: "MANI MOHAN",
  wordmarkSub: "CONSTRUCTION",
  city: "Chennai",
  tagline: "Building Dreams. Creating Legacies.",
  description:
    "Mani Mohan Construction is a family-run construction company in Chennai with 27+ years of experience and 100+ buildings completed — quality house, apartment and commercial construction with honest service and reliable project execution.",
  footerDescription: "Quality construction, trusted service and a family legacy built with care.",
} as const;

export const COLORS = {
  /** Main page background — the logo's warm cream. */
  paper: "#FBF9F5",
  /** Card background — pure white. */
  surface: "#FFFFFF",
  /** Primary text and dark sections — the logo's charcoal outline. */
  ink: "#191B1D",
  /** Secondary text — warm grey. */
  slate: "#5D6166",
  /** Brand accent — the logo's blush pink (fills, highlights, dark-section accents). */
  blush: "#F7B2B7",
  /** Deep rose — blush darkened for accent type on light backgrounds (5:1 on paper). */
  rose: "#B4475B",
  /** Fine borders. */
  line: "#E7E1DA",
} as const;

/** Main navigation, in page order. `href` values are in-page section anchors. */
export const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#goals", label: "Our Goals" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const FOOTER_NAV = NAV.filter((item) => item.href !== "#home");

export const CTA = {
  primary: { href: "#contact", label: "Start Your Project" },
  secondary: { href: "#services", label: "View Our Services" },
} as const;

/**
 * ----------------------------------------------------------------------------
 *  CONTACT DETAILS — PLACEHOLDERS, EDIT BEFORE LAUNCH
 * ----------------------------------------------------------------------------
 *  None of these values are real. Replace each one with the company's actual
 *  details. While a value still contains "X" digits, "example.com" or
 *  "[EDIT]", the related button links to the contact details block instead of
 *  dialling, messaging or emailing a non-existent address.
 * ----------------------------------------------------------------------------
 */
export const CONTACT = {
  /** Phone number as displayed, e.g. "+91 98765 43210". */
  phone: "+91 XXXXX XXXXX",
  /** WhatsApp number: country code + number, digits only, e.g. "919876543210". */
  whatsapp: "91XXXXXXXXXX",
  email: "hello@example.com",
  address: "[EDIT] Office address, Chennai, Tamil Nadu",
  hours: "[EDIT] Mon – Sat, 9:00 AM – 7:00 PM",
} as const;

/** True while a contact value is still a placeholder. */
export const isPlaceholder = (value: string) => /X{3,}|example\.com|\[EDIT\]/i.test(value);

/** Fallback target for buttons whose contact detail isn't filled in yet. */
const DETAILS_ANCHOR = "#contact-details";

export const contactLinks = {
  call: isPlaceholder(CONTACT.phone) ? DETAILS_ANCHOR : `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`,
  whatsapp: isPlaceholder(CONTACT.whatsapp)
    ? DETAILS_ANCHOR
    : `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello Mani Mohan Construction, I would like to discuss a construction project.",
      )}`,
  consultation: isPlaceholder(CONTACT.email)
    ? DETAILS_ANCHOR
    : `mailto:${CONTACT.email}?subject=${encodeURIComponent("Consultation request")}`,
  email: isPlaceholder(CONTACT.email) ? DETAILS_ANCHOR : `mailto:${CONTACT.email}`,
};
