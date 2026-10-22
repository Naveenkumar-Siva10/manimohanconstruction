type SectionLabelProps = {
  /** e.g. "01 — Our Company": the number and the name are styled apart. */
  children: string;
  /** "dark" for light backgrounds, "light" for dark sections and imagery. */
  tone?: "dark" | "light";
  className?: string;
};

/** Small uppercase section label: a blush chip with the number, then the name. */
export default function SectionLabel({ children, tone = "dark", className = "" }: SectionLabelProps) {
  const [number, name] = children.includes(" — ") ? children.split(" — ") : [null, children];
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-paper" : "text-ink"} ${className}`}>
      {number ? (
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blush px-2 tracking-[0.06em] text-ink tabular-nums">
          {number}
        </span>
      ) : (
        <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-blush" />
      )}
      {name}
    </p>
  );
}
