import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import LogoMark from "@/components/ui/LogoMark";
import { CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="relative grid min-h-svh place-items-center overflow-hidden bg-paper px-5 pb-24 pt-32 outline-none">
      <LogoMark className="pointer-events-none absolute -right-20 bottom-0 h-auto w-[min(70vw,40rem)] opacity-[0.06]" />
      <div className="relative max-w-[40rem] text-center">
        <p className="font-display text-[clamp(6rem,20vw,12rem)] leading-none text-outline text-rose">404</p>
        <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-ink">
          This page is still <span className="accent text-rose">under construction</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate">The page you’re looking for doesn’t exist or has moved. Let’s get you back on solid ground.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" label="Back to home" />
          <Button href={CTA.secondary.href} label={CTA.secondary.label} variant="outline" icon={false} />
        </div>
      </div>
    </main>
  );
}
