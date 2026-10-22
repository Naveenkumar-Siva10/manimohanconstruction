import Link from "next/link";
import FooterAccordion from "@/components/FooterAccordion";
import Logo from "@/components/ui/Logo";
import { SERVICES, serviceHref } from "@/lib/services";
import { CONTACT, FOOTER_NAV, SITE, contactLinks, isPlaceholder } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-site border-t border-paper/10">
        <div className="grid py-16 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:py-20">
          <div className="mb-10 md:col-span-2 md:mb-0 lg:col-span-3">
            <Logo tone="light" />
            <p className="mt-6 max-w-[24rem] leading-relaxed text-paper/60">{SITE.footerDescription}</p>
            <p className="mt-4 text-sm font-semibold text-paper/60">Family-run · 27+ years · 100+ buildings</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-5">
            <FooterAccordion title="Services" label="Services">
              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link href={serviceHref(service.slug)} className="link-underline text-paper/85 hover:text-paper">
                      {service.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="lg:col-span-2">
            <FooterAccordion title="Company" label="Company">
              <ul className="space-y-3">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline text-paper/85 hover:text-paper">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="mt-10 md:mt-0 lg:col-span-3">
            <h2 className="eyebrow text-blush">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-paper/60">
              <li>
                <a href={contactLinks.call} className="link-underline text-paper/85">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={contactLinks.email} className="link-underline text-paper/85">
                  {CONTACT.email}
                </a>
              </li>
              <li>{isPlaceholder(CONTACT.address) ? `${SITE.city}, Tamil Nadu` : CONTACT.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[13vw] leading-[0.8] tracking-[-0.05em] text-paper/[0.06]"
      >
        {SITE.wordmark}
      </p>

      <div className="container-site relative border-t border-paper/10">
        <div className="flex flex-col gap-3 py-6 pr-20 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="link-underline font-semibold text-paper/85">
              Privacy Policy
            </Link>
            <a href="#top" className="link-underline font-semibold text-paper/85">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
