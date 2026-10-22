import Logo from "@/components/ui/Logo";
import { CONTACT, FOOTER_NAV, SITE, contactLinks } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-site border-t border-paper/10">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-[24rem] leading-relaxed text-paper/60">{SITE.footerDescription}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="eyebrow text-blush">Explore</h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline text-paper/85 hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
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
              <li>{SITE.city}, Tamil Nadu</li>
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
        <div className="flex flex-col gap-3 py-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <a href="#home" className="link-underline font-semibold text-paper/85">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
