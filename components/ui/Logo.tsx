import LogoMark from "@/components/ui/LogoMark";
import { SITE } from "@/lib/site";

type LogoProps = {
  /** "full" = MMC mark + stacked wordmark; "mark" = MMC mark only. */
  variant?: "full" | "mark";
  /** "dark" = charcoal wordmark for light backgrounds; "light" = cream. */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * The MMC house mark beside a stacked wordmark — MANI MOHAN set in the
 * semi-expanded display face, CONSTRUCTION tracked wide underneath.
 */
export default function Logo({ variant = "full", tone = "dark", className = "" }: LogoProps) {
  const ink = tone === "light" ? "text-paper" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-auto shrink-0" />
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.05rem] tracking-[0.01em] ${ink}`}>{SITE.wordmark}</span>
          <span className={`mt-1.5 text-[0.56rem] font-bold tracking-[0.42em] ${tone === "light" ? "text-paper/60" : "text-slate"}`}>
            {SITE.wordmarkSub}
          </span>
        </span>
      )}
    </span>
  );
}
