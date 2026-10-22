import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope } from "next/font/google";
import FloatingActions from "@/components/FloatingActions";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import JsonLd from "@/components/page/JsonLd";
import { SERVICES } from "@/lib/services";
import { COLORS, CONTACT, SERVICE_AREAS, SITE, isPlaceholder } from "@/lib/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const accent = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = `${SITE.name} — ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    title,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
    url: "/",
    images: [{ url: "/assets/projects/ongoing/thoraipakkam-front.jpg", width: 2400, height: 1350, alt: "A Mani Mohan Construction building under construction in Thoraipakkam, Chennai" }],
  },
  twitter: { card: "summary_large_image", title, description: SITE.description },
};

/** The business, for search engines. Contact fields are added once they're real. */
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  image: `${SITE.url}/assets/projects/ongoing/thoraipakkam-front.jpg`,
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: "Tamil Nadu", addressCountry: "IN" },
  areaServed: [SITE.city, ...SERVICE_AREAS].map((name) => ({ "@type": "Place", name })),
  knowsAbout: SERVICES.map((s) => s.title),
  ...(isPlaceholder(CONTACT.phone) ? {} : { telephone: CONTACT.phone }),
  ...(isPlaceholder(CONTACT.email) ? {} : { email: CONTACT.email }),
};

export const viewport: Viewport = {
  themeColor: COLORS.paper,
  colorScheme: "light",
};

/** Brand colours from lib/site.ts → CSS variables consumed by globals.css. */
const brandVars = Object.fromEntries(
  Object.entries(COLORS).map(([name, value]) => [`--brand-${name}`, value]),
) as CSSProperties;

/*
 * Runs before first paint: flags JS (so reveal animations only hide content
 * they can show again) and starts the preloader state. The timeout is a
 * safety net — if the app never hydrates, the page is released anyway.
 */
const bootScript = `(function(){var r=document.documentElement;r.classList.add('js','is-loading');setTimeout(function(){if(r.classList.contains('is-loading')){r.classList.remove('is-loading');r.classList.add('is-ready');}},9000);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${accent.variable}`}
      style={brandVars}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body id="top" className="bg-paper font-sans text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <ScrollProgress />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
        <FloatingActions />
        <JsonLd data={businessSchema} />
      </body>
    </html>
  );
}
