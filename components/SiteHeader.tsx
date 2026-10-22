"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button, { ArrowIcon } from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { SERVICES, serviceHref } from "@/lib/services";
import { CONTACT, CTA, NAV, SITE, contactLinks } from "@/lib/site";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

/** Nav link whose label rolls up to a fresh copy on hover. */
function RollLabel({ label }: { label: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{label}</span>
      <span aria-hidden="true" className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">
        {label}
      </span>
    </span>
  );
}

const pill = (active: boolean) =>
  `group relative flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[0.875rem] font-semibold transition-colors duration-300 ${
    active ? "bg-ink text-paper" : "text-ink hover:bg-ink/[0.06]"
  }`;

/** Desktop "Services" item: a link to the index plus a panel of every service page. */
function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef(0);

  // Close when the route changes or Escape is pressed.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI on navigation
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div className="relative" onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}>
      <Link href="/services" aria-current={active ? "page" : undefined} className={pill(active)}>
        <RollLabel label="Services" />
        <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="m4 6 4 4 4-4" />
        </svg>
      </Link>
      {/* Opens on hover and on keyboard focus; Tab continues into the panel. */}
      <div
        id="services-menu"
        className={`absolute left-1/2 top-full w-[min(44rem,90vw)] -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-300 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-1 rounded-[1.75rem] border border-ink/[0.06] bg-paper/95 p-3 shadow-[0_30px_60px_-30px_rgba(25,27,29,0.45)] backdrop-blur-xl">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={serviceHref(service.slug)}
              tabIndex={open ? 0 : -1}
              className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-300 hover:bg-ink/[0.05]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush/60 font-display text-[0.7rem] text-ink transition-colors group-hover:bg-blush">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold leading-tight text-ink">{service.short}</span>
            </Link>
          ))}
          <Link
            href="/services"
            tabIndex={open ? 0 : -1}
            className="col-span-2 mt-1 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-paper"
          >
            View all services
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Floating pill header. It slides away while scrolling down and returns on
 * the way up; the current page is highlighted. Below lg a full-screen
 * charcoal menu replaces the inline links.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page starts with the header visible and the menu closed.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI on navigation
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Escape closes the menu and returns focus to the toggle; page scroll is held while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-expo)] ${
        hidden && !open ? "-translate-y-[130%]" : ""
      }`}
    >
      <div className="container-site pt-3 md:pt-4">
        <div
          className={`relative z-10 flex h-16 items-center justify-between gap-4 rounded-full border pl-4 pr-2 transition-[background-color,box-shadow,border-color] duration-500 md:pl-5 ${
            open
              ? "border-transparent bg-transparent"
              : scrolled
                ? "border-ink/[0.06] bg-paper/80 shadow-[0_18px_40px_-24px_rgba(25,27,29,0.35)] backdrop-blur-xl"
                : "border-ink/[0.05] bg-paper/70 backdrop-blur-md"
          }`}
        >
          <Link href="/" aria-label={`${SITE.name} — home`} className="shrink-0">
            <Logo tone={open ? "light" : "dark"} className="[&_svg]:h-9" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  {item.href === "/services" ? (
                    <ServicesMenu active={isActive(pathname, item.href)} />
                  ) : (
                    <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className={pill(isActive(pathname, item.href))}>
                      <RollLabel label={item.label} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href={CTA.primary.href} label={CTA.primary.label} size="sm" className="hidden sm:inline-flex" />
            <button
              ref={buttonRef}
              type="button"
              className={`relative grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                open ? "bg-blush text-ink" : "bg-ink text-paper"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="flex w-5 flex-col items-end gap-[6px]">
                <span className={`h-[2px] w-5 rounded bg-current transition-transform duration-500 ease-[var(--ease-expo)] ${open ? "translate-y-[4px] rotate-45" : ""}`} />
                <span className={`h-[2px] rounded bg-current transition-all duration-500 ease-[var(--ease-expo)] ${open ? "w-5 -translate-y-[4px] -rotate-45" : "w-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen menu (below lg) */}
      <div
        id="mobile-menu"
        data-lenis-prevent=""
        className={`fixed inset-0 overflow-y-auto bg-ink transition-[clip-path,visibility] duration-700 ease-[var(--ease-expo)] lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col justify-between gap-10 pb-8 pt-28">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-paper/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`flex items-baseline justify-between py-3.5 font-display text-[clamp(2rem,9vw,3.25rem)] leading-none transition-transform duration-700 ease-[var(--ease-expo)] ${
                    isActive(pathname, item.href) ? "text-blush" : "text-paper"
                  } ${open ? "translate-y-0" : "translate-y-full"}`}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" } as CSSProperties}
                >
                  {item.label}
                  <span className="font-sans text-xs font-bold tracking-[0.2em] text-blush">{String(i + 1).padStart(2, "0")}</span>
                </Link>
                {item.href === "/services" && (
                  <ul className={`flex flex-wrap gap-2 pb-4 transition-opacity delay-300 duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={serviceHref(service.slug)}
                          onClick={() => setOpen(false)}
                          tabIndex={open ? 0 : -1}
                          className="inline-flex rounded-full border border-paper/15 px-3 py-1.5 text-xs font-semibold text-paper/80"
                        >
                          {service.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className={`transition-opacity delay-300 duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
            <Button
              href={CTA.primary.href}
              label={CTA.primary.label}
              variant="blush"
              className="w-full justify-between"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            />
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
              <a href={contactLinks.call} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="link-underline">
                {CONTACT.phone}
              </a>
              <a href={contactLinks.email} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="link-underline">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
