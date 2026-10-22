"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { CONTACT, CTA, NAV, SITE, contactLinks } from "@/lib/site";

/** Nav link whose label rolls up to a fresh copy on hover. */
function RollLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      className={`group relative flex h-9 items-center rounded-full px-3.5 text-[0.875rem] font-semibold transition-colors duration-300 ${
        active ? "bg-ink text-paper" : "text-ink hover:bg-ink/[0.06]"
      }`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{label}</span>
        <span aria-hidden="true" className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">
          {label}
        </span>
      </span>
    </a>
  );
}

/**
 * Floating pill header. It slides away while scrolling down and returns on
 * the way up; the link for the section in view is highlighted. Below lg a
 * full-screen charcoal menu replaces the inline links.
 */
export default function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
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

  // Highlight the nav item for whichever section crosses the middle of the screen.
  useEffect(() => {
    const sections = NAV.map((item) => document.querySelector(item.href)).filter((el): el is Element => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
          <a href="#home" aria-label={`${SITE.name} — home`} className="shrink-0">
            <Logo tone={open ? "light" : "dark"} className="[&_svg]:h-9" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <RollLink href={item.href} label={item.label} active={active === item.href} />
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
        className={`fixed inset-0 bg-ink transition-[clip-path,visibility] duration-700 ease-[var(--ease-expo)] lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="container-site flex h-full flex-col justify-between pb-8 pt-28">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-paper/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-baseline justify-between py-3.5 font-display text-[clamp(2rem,9vw,3.25rem)] leading-none text-paper transition-transform duration-700 ease-[var(--ease-expo)] ${
                    open ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" } as CSSProperties}
                >
                  {item.label}
                  <span className="font-sans text-xs font-bold tracking-[0.2em] text-blush">{String(i + 1).padStart(2, "0")}</span>
                </a>
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
