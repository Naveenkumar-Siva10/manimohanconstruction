import { LOGO } from "@/lib/logo";
import { COLORS } from "@/lib/site";

type LogoMarkProps = {
  className?: string;
  /** Accessible name; omit when the mark sits next to visible brand text. */
  title?: string;
};

/** The MMC house mark as crisp vector art (paths in lib/logo.ts). */
export default function LogoMark({ className = "", title }: LogoMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${LOGO.width} ${LOGO.height}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {LOGO.silhouette.map((d) => (
        <path key={d} d={d} fill={COLORS.ink} />
      ))}
      {LOGO.blush.map((d) => (
        <path key={d} d={d} fill={COLORS.blush} />
      ))}
      {LOGO.cream.map((d) => (
        <path key={d} d={d} fill={COLORS.paper} />
      ))}
    </svg>
  );
}
