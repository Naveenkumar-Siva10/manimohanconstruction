import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope } from "next/font/google";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import { COLORS, SITE } from "@/lib/site";
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
  title: { default: title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    title,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: SITE.description },
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
      <body className="bg-paper font-sans text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <ScrollProgress />
          <SiteHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
